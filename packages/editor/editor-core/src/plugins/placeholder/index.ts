import { Node } from 'prosemirror-model';
import { Plugin, PluginKey, EditorState } from 'prosemirror-state';
import { DecorationSet, Decoration, EditorView } from 'prosemirror-view';
import { EditorPlugin } from '../../types';
import { isInEmptyLine, isEmptyDocument } from '../../utils/document';
import { placeHolderClassName } from './styles';
export const pluginKey = new PluginKey('placeholderPlugin');

interface PlaceHolderState {
  hasPlaceholder: boolean;
  placeholderText?: string;
  pos?: number;
}

function getPlaceholderState(editorState: EditorState): PlaceHolderState {
  return pluginKey.getState(editorState);
}

export function createPlaceholderDecoration(
  doc: Node,
  placeholderText: string,
  pos: number = 1,
): DecorationSet {
  const placeholderDecoration = document.createElement('span');
  placeholderDecoration.className = placeHolderClassName;
  const placeholderNode = document.createElement('span');
  placeholderNode.textContent = placeholderText;
  placeholderDecoration.appendChild(placeholderNode);
  return DecorationSet.create(doc, [
    Decoration.widget(pos, placeholderDecoration, {
      side: -1,
      key: 'placeholder',
    }),
  ]);
}

function removePlaceholderIfData(view: EditorView, event: Event) {
  const placeHolderState = getPlaceholderState(view.state);
  const compositionEvent = event as CompositionEvent;

  const hasData =
    compositionEvent.type === 'compositionstart' ||
    (compositionEvent.type === 'compositionupdate' && !!compositionEvent.data);

  if (placeHolderState.hasPlaceholder && hasData) {
    view.dispatch(
      view.state.tr.setMeta(pluginKey, { removePlaceholder: true }),
    );
  }

  return false;
}

function applyPlaceholderIfEmpty(view: EditorView, event: Event) {
  const placeHolderState = getPlaceholderState(view.state);
  const compositionEvent = event as CompositionEvent;

  const emptyData = compositionEvent.data === '';

  if (!placeHolderState.hasPlaceholder && emptyData) {
    view.dispatch(
      view.state.tr.setMeta(pluginKey, {
        applyPlaceholderIfEmpty: true,
      }),
    );
  }

  return false;
}

function setPlaceHolderState(
  placeholderText: string,
  pos?: number,
): PlaceHolderState {
  return {
    hasPlaceholder: true,
    placeholderText,
    pos: pos ? pos : 1,
  };
}

const emptyPlaceholder: PlaceHolderState = { hasPlaceholder: false };

function createPlaceHolderStateFrom(
  editorState: EditorState,
  getPlaceholderHintMessage: () => string | undefined,
  defaultPlaceholderText?: string,
): PlaceHolderState {
  if (defaultPlaceholderText && isEmptyDocument(editorState.doc)) {
    return setPlaceHolderState(defaultPlaceholderText);
  }

  const placeholderHint = getPlaceholderHintMessage();
  if (placeholderHint && isInEmptyLine(editorState)) {
    const { $from } = editorState.selection;
    return setPlaceHolderState(placeholderHint, $from.pos);
  }

  return emptyPlaceholder;
}

function createGetPlaceholderHintMessage(
  placeholderHints?: string[],
): () => string | undefined {
  let index = 0;
  const length = placeholderHints ? placeholderHints.length : 0;
  return () => {
    if (length === 0) {
      return;
    }

    // if length !== 0 placeholderHints always exist
    const placeholder = placeholderHints![index++];
    index = index % length;

    return placeholder;
  };
}

export function createPlugin(
  defaultPlaceholderText?: string,
  placeholderHints?: string[],
): Plugin | undefined {
  if (!defaultPlaceholderText && !placeholderHints) {
    return;
  }

  const getPlaceholderHintMessage = createGetPlaceholderHintMessage(
    placeholderHints,
  );

  return new Plugin<PlaceHolderState>({
    key: pluginKey,
    state: {
      init: (_, state) =>
        createPlaceHolderStateFrom(
          state,
          getPlaceholderHintMessage,
          defaultPlaceholderText,
        ),
      apply: (tr, _oldPluginState, _oldEditorState, newEditorState) => {
        const meta = tr.getMeta(pluginKey);

        if (meta) {
          if (meta.removePlaceholder) {
            return emptyPlaceholder;
          }

          if (meta.applyPlaceholderIfEmpty) {
            return createPlaceHolderStateFrom(
              newEditorState,
              getPlaceholderHintMessage,
              defaultPlaceholderText,
            );
          }
        }

        return createPlaceHolderStateFrom(
          newEditorState,
          getPlaceholderHintMessage,
          defaultPlaceholderText,
        );
      },
    },
    props: {
      decorations(editorState): DecorationSet | undefined {
        const { hasPlaceholder, placeholderText, pos } = getPlaceholderState(
          editorState,
        );

        if (hasPlaceholder && placeholderText && pos !== undefined) {
          return createPlaceholderDecoration(
            editorState.doc,
            placeholderText,
            pos,
          );
        }
        return;
      },
      // Workaround for ED-4063: On Mobile / Android, a user can start typing but it won't trigger
      // an Editor state update so the placeholder will still be shown. We hook into the compositionstart
      // and compositionend events instead, to make sure we show/hide the placeholder for these devices.
      handleDOMEvents: {
        compositionstart: removePlaceholderIfData,
        compositionupdate: (view: EditorView, event: Event) =>
          applyPlaceholderIfEmpty(view, event) ||
          removePlaceholderIfData(view, event),
        compositionend: applyPlaceholderIfEmpty,
      },
    },
  });
}

interface PlaceholderPluginOptions {
  placeholder?: string;
  placeholderHints?: string[];
}

const placeholderPlugin = (
  options?: PlaceholderPluginOptions,
): EditorPlugin => ({
  name: 'placeholder',

  pmPlugins() {
    return [
      {
        name: 'placeholder',
        plugin: () =>
          createPlugin(
            options && options.placeholder,
            options && options.placeholderHints,
          ),
      },
    ];
  },
});

export default placeholderPlugin;
