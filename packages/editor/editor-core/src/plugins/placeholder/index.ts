import { Node } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { DecorationSet, Decoration, EditorView } from 'prosemirror-view';
import { EditorPlugin, MessageDescriptor } from '../../types';
// import { isEmptyDocument } from '../../utils';
import { isInEmptyLine, isEmptyDocument } from '../../utils/document';

export const pluginKey = new PluginKey('placeholderPlugin');

export function createPlaceholderDecoration(
  doc: Node,
  placeholderText: string,
  pos: number = 1,
): DecorationSet {
  const placeholderDecoration = document.createElement('span');
  placeholderDecoration.className = 'placeholder-decoration';
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
  const havePlaceholder = pluginKey.getState(view.state);
  const compositionEvent = event as CompositionEvent;

  const hasData =
    compositionEvent.type === 'compositionstart' ||
    (compositionEvent.type === 'compositionupdate' && !!compositionEvent.data);

  if (havePlaceholder && hasData) {
    view.dispatch(
      view.state.tr.setMeta(pluginKey, { removePlaceholder: true }),
    );
  }

  return false;
}

function applyPlaceholderIfEmpty(view: EditorView, event: Event) {
  const havePlaceholder = pluginKey.getState(view.state);
  const compositionEvent = event as CompositionEvent;

  const emptyData = compositionEvent.data === '';

  if (!havePlaceholder && emptyData) {
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
interface PlaceHolderState {
  hasPlaceholder: boolean;
  placeholderText?: string;
  pos?: number;
}

type AvailableMessages = 'slashCommand';

const messages: Record<AvailableMessages, MessageDescriptor> = {
  slashCommand: {
    id: 'slash-placheholder',
    defaultMessage: "Type '/' to insert content.",
    description: 'Message to be shown when the user is in a new empty line.',
  },
};

export function createPlugin(
  defaultPlaceholderText?: string,
  enablePlaceHolderHint?: boolean,
): Plugin | undefined {
  if (!defaultPlaceholderText) {
    return;
  }

  return new Plugin<PlaceHolderState>({
    key: pluginKey,
    state: {
      init: (_, state) => {
        if (isEmptyDocument(state.doc)) {
          return setPlaceHolderState(defaultPlaceholderText);
        }
        return {
          hasPlaceholder: false,
        };
      },
      apply: (tr, _oldPluginState, _oldEditorState, newEditorState) => {
        const meta = tr.getMeta(pluginKey);

        if (meta) {
          if (meta.removePlaceholder) {
            return { hasPlaceholder: false };
          }

          if (
            meta.applyPlaceholderIfEmpty &&
            isEmptyDocument(newEditorState.doc)
          )
            return setPlaceHolderState(defaultPlaceholderText);
        }

        if (isEmptyDocument(newEditorState.doc)) {
          return setPlaceHolderState(defaultPlaceholderText);
        }

        if (isInEmptyLine(newEditorState)) {
          const { $from } = newEditorState.selection;
          return setPlaceHolderState(
            messages.slashCommand.defaultMessage,
            $from.pos,
          );
        }
        // non-plugin specific transaction; don't excessively recalculate
        // if the document is empty
        if (!tr.docChanged) {
          return _oldPluginState;
        }

        return {
          hasPlaceholder: false,
        };
      },
    },
    props: {
      decorations(editorState): DecorationSet | undefined {
        const { hasPlaceholder, placeholderText, pos } = pluginKey.getState(
          editorState,
        ) as PlaceHolderState;

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
}

const placeholderPlugin = (
  options?: PlaceholderPluginOptions,
): EditorPlugin => ({
  name: 'placeholder',

  pmPlugins() {
    return [
      {
        name: 'placeholder',
        plugin: () => createPlugin(options && options.placeholder),
      },
    ];
  },
});

export default placeholderPlugin;
