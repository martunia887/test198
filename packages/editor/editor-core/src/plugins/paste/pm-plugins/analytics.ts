import {
  ACTION,
  INPUT_METHOD,
  EVENT_TYPE,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  AnalyticsEventPayload,
  addAnalytics,
  PASTE_ACTION_SUBJECT_ID,
  PasteType,
  PasteSource,
  PasteContent,
  PasteTypes,
  PasteContents,
  withAnalytics,
} from '../../analytics';
import { commandWithAnalytics as commandWithV2Analytics } from '../../../analytics';
import { EditorView } from 'prosemirror-view';
import { Slice, Node } from 'prosemirror-model';
import { getPasteSource } from '../util';
import {
  handlePasteAsPlainText,
  handlePasteIntoTaskAndDecision,
  handleCodeBlock,
  handleMediaSingle,
  handlePastePreservingMarks,
  handleMarkdown,
  handleRichText,
} from '../handlers';
import { Command } from '../../../types';
import { pipe } from '../../../utils';
import { EditorState } from 'prosemirror-state';
import { findParentNode } from 'prosemirror-utils';

type PasteContext = {
  type: PasteType;
  asPlain?: boolean;
};

type PastePayloadAttributes = {
  pasteSize: number;
  type: PasteType;
  content: PasteContent;
  source: PasteSource;
};

const contentToPasteContent: { [name: string]: PasteContent } = {
  url: PasteContents.url,
  paragraph: PasteContents.text,
  bulletList: PasteContents.bulletList,
  orderedList: PasteContents.orderedList,
  heading: PasteContents.heading,
  blockquote: PasteContents.blockquote,
  codeBlock: PasteContents.codeBlock,
  panel: PasteContents.panel,
  rule: PasteContents.rule,
  mediaSingle: PasteContents.mediaSingle,
  table: PasteContents.table,
  tableCells: PasteContents.tableCells,
  tableHeader: PasteContents.tableHeader,
  tableRow: PasteContents.tableRow,
  decisionList: PasteContents.decisionList,
  decisionItem: PasteContents.decisionItem,
  taskList: PasteContents.taskItem,
  extension: PasteContents.extension,
  bodiedExtension: PasteContents.bodiedExtension,
  blockCard: PasteContents.blockCard,
};

const nodeToActionSubjectId: { [name: string]: PASTE_ACTION_SUBJECT_ID } = {
  blockquote: ACTION_SUBJECT_ID.PASTE_BLOCKQUOTE,
  blockCard: ACTION_SUBJECT_ID.PASTE_BLOCK_CARD,
  bodiedExtension: ACTION_SUBJECT_ID.PASTE_BODIED_EXTENSION,
  bulletList: ACTION_SUBJECT_ID.PASTE_BULLET_LIST,
  codeBlock: ACTION_SUBJECT_ID.PASTE_CODE_BLOCK,
  decisionList: ACTION_SUBJECT_ID.PASTE_DECISION_LIST,
  extension: ACTION_SUBJECT_ID.PASTE_EXTENSION,
  heading: ACTION_SUBJECT_ID.PASTE_HEADING,
  mediaGroup: ACTION_SUBJECT_ID.PASTE_MEDIA_GROUP,
  mediaSingle: ACTION_SUBJECT_ID.PASTE_MEDIA_SINGLE,
  orderedList: ACTION_SUBJECT_ID.PASTE_ORDERED_LIST,
  panel: ACTION_SUBJECT_ID.PASTE_PANEL,
  rule: ACTION_SUBJECT_ID.PASTE_RULE,
  table: ACTION_SUBJECT_ID.PASTE_TABLE,
  tableCell: ACTION_SUBJECT_ID.PASTE_TABLE_CELL,
  tableHeader: ACTION_SUBJECT_ID.PASTE_TABLE_HEADER,
  tableRow: ACTION_SUBJECT_ID.PASTE_TABLE_ROW,
  taskList: ACTION_SUBJECT_ID.PASTE_TASK_LIST,
};

function getContent(state: EditorState, slice: Slice): PasteContent {
  const {
    schema: {
      nodes: { paragraph },
      marks: { link },
    },
  } = state;
  const nodeOrMarkName = new Set<string>();
  slice.content.forEach((node: Node) => {
    if (node.type === paragraph && node.content.size === 0) {
      // Skip empty paragraph
      return;
    }

    if (node.type === paragraph) {
      if (node.rangeHasMark(0, node.nodeSize - 2, link)) {
        // Check node contain link
        nodeOrMarkName.add('url');
        return;
      }
    }
    nodeOrMarkName.add(node.type.name);
  });

  if (nodeOrMarkName.size > 1) {
    return PasteContents.mixed;
  }

  if (nodeOrMarkName.size === 0) {
    return PasteContents.uncategorized;
  }

  const type = nodeOrMarkName.values().next().value;
  const pasteContent = contentToPasteContent[type];

  return pasteContent ? pasteContent : PasteContents.uncategorized;
}

function getActionSubjectId(view: EditorView): PASTE_ACTION_SUBJECT_ID {
  const {
    state: {
      selection,
      schema: {
        nodes: { paragraph, listItem, taskItem, decisionItem },
      },
    },
  } = view;
  const parent = findParentNode((node: Node) => {
    if (
      node.type !== paragraph &&
      node.type !== listItem &&
      node.type !== taskItem &&
      node.type !== decisionItem
    ) {
      return true;
    }
    return false;
  })(selection);

  if (!parent) {
    return ACTION_SUBJECT_ID.PASTE_PARAGRAPH;
  }
  const parentType = parent.node.type;
  const actionSubjectId = nodeToActionSubjectId[parentType.name];

  return actionSubjectId ? actionSubjectId : ACTION_SUBJECT_ID.PASTE_PARAGRAPH;
}

function createPasteAsPlainPayload(
  actionSubjectId: PASTE_ACTION_SUBJECT_ID,
  text: string,
): AnalyticsEventPayload {
  return {
    action: ACTION.PASTED_AS_PLAIN,
    actionSubject: ACTION_SUBJECT.DOCUMENT,
    actionSubjectId,
    eventType: EVENT_TYPE.TRACK,
    attributes: {
      inputMethod: INPUT_METHOD.KEYBOARD,
      pasteSize: text.length,
    },
  };
}

function createPastePayload(
  actionSubjectId: PASTE_ACTION_SUBJECT_ID,
  attributes: PastePayloadAttributes,
): AnalyticsEventPayload {
  return {
    action: ACTION.PASTED,
    actionSubject: ACTION_SUBJECT.DOCUMENT,
    actionSubjectId,
    eventType: EVENT_TYPE.TRACK,
    attributes: {
      inputMethod: INPUT_METHOD.KEYBOARD,
      ...attributes,
    },
  };
}

export function createPasteAnalyticsPayload(
  view: EditorView,
  event: ClipboardEvent,
  slice: Slice,
  pasteContext: PasteContext,
): AnalyticsEventPayload {
  const text = event.clipboardData.getData('text/plain');

  const actionSubjectId = getActionSubjectId(view);

  if (pasteContext.asPlain) {
    return createPasteAsPlainPayload(actionSubjectId, text);
  }

  const source = getPasteSource(event);

  if (pasteContext.type === PasteTypes.plain) {
    return createPastePayload(actionSubjectId, {
      pasteSize: text.length,
      type: pasteContext.type,
      content: PasteContents.text,
      source,
    });
  }

  const pasteSize = slice.size;
  const content = getContent(view.state, slice);

  return createPastePayload(actionSubjectId, {
    type: pasteContext.type,
    pasteSize,
    content,
    source,
  });
}

// TODO: ED-6612 We should not dispatch only analytics, it's preferred to wrap each command with his own analytics.
// However, handlers like handleMacroAutoConvert dispatch multiple time,
// so pasteCommandWithAnalytics is useless in this case.
export function sendPasteAnalyticsEvent(
  view: EditorView,
  event: ClipboardEvent,
  slice: Slice,
  pasteContext: PasteContext,
) {
  const payload = createPasteAnalyticsPayload(view, event, slice, pasteContext);

  view.dispatch(addAnalytics(view.state.tr, payload));
}

export function pasteCommandWithAnalytics(
  view: EditorView,
  event: ClipboardEvent,
  slice: Slice,
  pasteContext: PasteContext,
) {
  return withAnalytics(() =>
    createPasteAnalyticsPayload(view, event, slice, pasteContext),
  );
}

export const handlePasteAsPlainTextWithAnalytics = (
  view: EditorView,
  event: ClipboardEvent,
  slice: Slice,
): Command =>
  pipe(
    handlePasteAsPlainText,
    pasteCommandWithAnalytics(view, event, slice, {
      type: PasteTypes.plain,
      asPlain: true,
    }),
    commandWithV2Analytics('atlassian.editor.paste.alt', {
      source: getPasteSource(event),
    }),
  )(slice, event);

export const handlePasteIntoTaskAndDecisionWithAnalytics = (
  view: EditorView,
  event: ClipboardEvent,
  slice: Slice,
  type: PasteType,
): Command =>
  pipe(
    handlePasteIntoTaskAndDecision,
    commandWithV2Analytics('atlassian.fabric.action-decision.editor.paste'),
    pasteCommandWithAnalytics(view, event, slice, {
      type: type,
    }),
  )(slice);

export const handleCodeBlockWithAnalytics = (
  view: EditorView,
  event: ClipboardEvent,
  slice: Slice,
  text: string,
): Command =>
  pipe(
    handleCodeBlock,
    pasteCommandWithAnalytics(view, event, slice, {
      type: PasteTypes.plain,
    }),
  )(text);

export const handleMediaSingleWithAnalytics = (
  view: EditorView,
  event: ClipboardEvent,
  slice: Slice,
  type: PasteType,
): Command =>
  pipe(
    handleMediaSingle,
    commandWithV2Analytics('atlassian.editor.paste', {
      source: getPasteSource(event),
    }),
    pasteCommandWithAnalytics(view, event, slice, {
      type,
    }),
  )(slice);

export const handlePastePreservingMarksWithAnalytics = (
  view: EditorView,
  event: ClipboardEvent,
  slice: Slice,
  type: PasteType,
): Command => {
  let withV2Analytics = commandWithV2Analytics('atlassian.editor.paste', {
    source: getPasteSource(event),
  });

  if (type === PasteTypes.markdown) {
    withV2Analytics = commandWithV2Analytics('atlassian.editor.markdown');
  }

  return pipe(
    handlePastePreservingMarks,
    withV2Analytics,
    pasteCommandWithAnalytics(view, event, slice, {
      type,
    }),
  )(slice);
};

export const handleMarkdownWithAnalytics = (
  view: EditorView,
  event: ClipboardEvent,
  slice: Slice,
): Command =>
  pipe(
    handleMarkdown,
    commandWithV2Analytics('atlassian.editor.markdown'),
    pasteCommandWithAnalytics(view, event, slice, {
      type: PasteTypes.markdown,
    }),
  )(slice);

export const handleRichTextWithAnalytics = (
  view: EditorView,
  event: ClipboardEvent,
  slice: Slice,
): Command =>
  pipe(
    handleRichText,
    commandWithV2Analytics('atlassian.editor.paste', {
      source: getPasteSource(event),
    }),
    pasteCommandWithAnalytics(view, event, slice, {
      type: PasteTypes.richText,
    }),
  )(slice);
