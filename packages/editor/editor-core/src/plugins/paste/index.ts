import { EditorPlugin } from '../../types';
import { createPlugin } from './pm-plugins/main';
import { Node } from 'prosemirror-model';

export interface PasteHandler {
  nodes: Array<string>;
  clipboardTextSerializer: (node: Node) => string | undefined;
}

const pastePlugin = (): EditorPlugin => ({
  name: 'paste',

  pmPlugins(pasteHandlers: Array<PasteHandler> = []) {
    return [
      {
        name: 'paste',
        plugin: ({ schema, props }) =>
          createPlugin(
            schema,
            props.UNSAFE_cards,
            props.sanitizePrivateContent,
            pasteHandlers,
          ),
      },
    ];
  },
});

export default pastePlugin;
