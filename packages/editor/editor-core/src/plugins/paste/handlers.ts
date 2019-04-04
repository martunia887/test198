import { TextSelection, Selection } from 'prosemirror-state';
import { hasParentNodeOfType } from 'prosemirror-utils';

import { taskDecisionSliceFilter } from '../../utils/filter';
import { linkifyContent } from '../hyperlink/utils';
import { Slice, Mark } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { runMacroAutoConvert } from '../macro';
import { closeHistory } from 'prosemirror-history';
import { applyTextMarksToSlice, hasOnlyNodesOfType } from './util';
import { queueCardsFromChangedTr } from '../card/pm-plugins/doc';
import {
  pluginKey as textFormattingPluginKey,
  TextFormattingState,
} from '../text-formatting/pm-plugins/main';
import { compose } from '../../utils';
import { CommandDispatch, Command } from '../../types';
import { insertMediaAsMediaSingle } from '../media/utils/media-single';

export function handlePasteIntoTaskAndDecision(slice: Slice): Command {
  return (state: EditorState, dispatch?: CommandDispatch): boolean => {
    const {
      schema,
      tr: { selection },
    } = state;

    const {
      marks: { code: codeMark },
      nodes: {
        decisionItem,
        decisionList,
        emoji,
        hardBreak,
        mention,
        paragraph,
        taskList,
        taskItem,
        text,
      },
    } = schema;

    if (
      !decisionItem ||
      !decisionList ||
      !taskList ||
      !taskItem ||
      !hasParentNodeOfType([decisionItem, taskItem])(state.selection)
    ) {
      return false;
    }

    const filters: Array<(slice: Slice) => Slice> = [
      linkifyContent(schema),
      taskDecisionSliceFilter(schema),
    ];

    const selectionMarks = selection.$head.marks();

    const textFormattingState: TextFormattingState = textFormattingPluginKey.getState(
      state,
    );

    if (
      selection instanceof TextSelection &&
      Array.isArray(selectionMarks) &&
      selectionMarks.length > 0 &&
      hasOnlyNodesOfType(paragraph, text, emoji, mention, hardBreak)(slice) &&
      (!codeMark.isInSet(selectionMarks) || textFormattingState.codeActive) // for codeMarks let's make sure mark is active
    ) {
      filters.push(applyTextMarksToSlice(schema, selection.$head.marks()));
    }

    const transformedSlice = compose.apply(null, filters)(slice);

    const tr = closeHistory(state.tr)
      .replaceSelection(transformedSlice)
      .scrollIntoView();

    queueCardsFromChangedTr(state, tr);
    if (dispatch) {
      dispatch(tr);
    }
    return true;
  };
}

export function handlePasteAsPlainText(
  slice: Slice,
  event: ClipboardEvent,
): Command {
  return (state: EditorState, dispatch?, view?: EditorView): boolean => {
    // In case of SHIFT+CMD+V ("Paste and Match Style") we don't want to run the usual
    // fuzzy matching of content. ProseMirror already handles this scenario and will
    // provide us with slice containing paragraphs with plain text, which we decorate
    // with "stored marks".
    // @see prosemirror-view/src/clipboard.js:parseFromClipboard()).
    // @see prosemirror-view/src/input.js:doPaste().
    if (view && (view as any).shiftKey) {
      const tr = closeHistory(state.tr);

      // <- using the same internal flag that prosemirror-view is using

      tr.replaceSelection(slice);
      (state.storedMarks || []).forEach(mark => {
        tr.addMark(tr.selection.from, tr.selection.from + slice.size, mark);
      });
      tr.scrollIntoView();
      if (dispatch) {
        dispatch(tr);
      }
      return true;
    }
    return false;
  };
}

export function handlePastePreservingMarks(slice: Slice): Command {
  return (state: EditorState, dispatch?): boolean => {
    const {
      schema,
      tr: { selection },
    } = state;

    const {
      marks: { code: codeMark, link: linkMark },
      nodes: {
        bulletList,
        emoji,
        hardBreak,
        heading,
        listItem,
        mention,
        orderedList,
        paragraph,
        text,
      },
    } = schema;

    if (!(selection instanceof TextSelection)) {
      return false;
    }

    const selectionMarks = selection.$head.marks();
    if (selectionMarks.length === 0) {
      return false;
    }

    const textFormattingState: TextFormattingState = textFormattingPluginKey.getState(
      state,
    );

    // special case for codeMark: will preserve mark only if codeMark is currently active
    // won't preserve mark if cursor is on the edge on the mark (namely inactive)
    if (codeMark.isInSet(selectionMarks) && !textFormattingState.codeActive) {
      return false;
    }

    const isPlainTextSlice =
      slice.content.childCount === 1 &&
      slice.content.firstChild!.type === paragraph &&
      slice.content.firstChild!.content.childCount === 1 &&
      slice.content.firstChild!.firstChild!.type === text;

    // special case for plainTextSlice & linkMark: merge into existing link
    if (
      isPlainTextSlice &&
      linkMark.isInSet(selectionMarks) &&
      selectionMarks.length === 1
    ) {
      const tr = closeHistory(state.tr)
        .replaceSelectionWith(slice.content.firstChild!.firstChild!, true)
        .setStoredMarks(selectionMarks)
        .scrollIntoView();

      queueCardsFromChangedTr(state, tr);
      if (dispatch) {
        dispatch(tr);
      }
      return true;
    }

    if (
      hasOnlyNodesOfType(
        bulletList,
        hardBreak,
        heading,
        listItem,
        paragraph,
        text,
        emoji,
        mention,
        orderedList,
      )(slice)
    ) {
      const transformedSlice = applyTextMarksToSlice(schema, selectionMarks)(
        slice,
      );

      const tr = closeHistory(state.tr)
        .replaceSelection(transformedSlice)
        .setStoredMarks(selectionMarks)
        .scrollIntoView();

      queueCardsFromChangedTr(state, tr);
      if (dispatch) {
        dispatch(tr);
      }
      return true;
    }

    return false;
  };
}

export function handleMacroAutoConvert(text: string, slice: Slice): Command {
  return (
    state: EditorState,
    dispatch?: CommandDispatch,
    view?: EditorView,
  ) => {
    const macro = runMacroAutoConvert(state, text);
    if (macro) {
      const selection = state.tr.selection;
      const tr = state.tr.replaceSelection(slice);
      const before = tr.mapping.map(selection.from, -1);

      if (dispatch && view) {
        // insert the text or linkified/md-converted clipboard data
        dispatch(tr);

        // replace the text with the macro as a separate transaction
        // so the autoconversion generates 2 undo steps
        dispatch(
          closeHistory(view.state.tr)
            .replaceRangeWith(before, before + slice.size, macro)
            .scrollIntoView(),
        );
      }
    }
    return !!macro;
  };
}

export function handleCodeBlock(text: string): Command {
  return (state, dispatch, view) => {
    const { codeBlock } = state.schema.nodes;
    if (text && hasParentNodeOfType(codeBlock)(state.selection)) {
      const tr = closeHistory(state.tr);
      if (dispatch) {
        dispatch(tr.insertText(text));
      }
      return true;
    }
    return false;
  };
}

function isOnlyMedia(state: EditorState, slice: Slice) {
  const { media } = state.schema.nodes;
  return (
    slice.content.childCount === 1 && slice.content.firstChild!.type === media
  );
}

export function handleMediaSingle(slice: Slice): Command {
  return (state, dispatch, view) => {
    if (view && isOnlyMedia(state, slice)) {
      return insertMediaAsMediaSingle(view, slice.content.firstChild!);
    }
    return false;
  };
}

export function handleMarkdown(markdownSlice: Slice): Command {
  return (state, dispatch) => {
    const tr = closeHistory(state.tr);
    tr.replaceSelection(markdownSlice);

    queueCardsFromChangedTr(state, tr);
    if (dispatch) {
      dispatch(tr.scrollIntoView());
    }
    return true;
  };
}

function removePrecedingBackTick(tr: Transaction) {
  const {
    $from: { nodeBefore },
    from,
  } = tr.selection;
  if (nodeBefore && nodeBefore.isText && nodeBefore.text!.endsWith('`')) {
    tr.delete(from - 1, from);
  }
}

function hasInlineCode(state: EditorState, slice: Slice) {
  return (
    slice.content.firstChild &&
    slice.content.firstChild.marks.some(
      (m: Mark) => m.type === state.schema.marks.code,
    )
  );
}

export function handleRichText(slice: Slice): Command {
  return (state, dispatch) => {
    const { codeBlock } = state.schema.nodes;
    // In case user is pasting inline code,
    // any backtick ` immediately preceding it should be removed.
    const tr = state.tr;
    if (hasInlineCode(state, slice)) {
      removePrecedingBackTick(tr);
    }

    closeHistory(tr);
    tr.replaceSelection(slice);
    tr.setStoredMarks([]);
    if (tr.selection.empty && tr.selection.$from.parent.type === codeBlock) {
      tr.setSelection(TextSelection.near(tr.selection.$from, 1) as Selection);
    }

    // queue link cards, ignoring any errors
    if (dispatch) {
      dispatch(queueCardsFromChangedTr(state, tr));
    }
    return true;
  };
}
