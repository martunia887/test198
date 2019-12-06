import { EditorView } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import { MediaPluginState, MediaProvider } from '../../pm-plugins/main';

export const createMediaProvider = async (): Promise<MediaProvider> =>
  ({} as MediaProvider);

export const getMediaSingleProps = () => ({
  view: {} as EditorView<any>,
  node: { attrs: {}, firstChild: { attrs: {} } } as PMNode<any>,
  mediaPluginState: { mediaPluginOptions: {} } as MediaPluginState,
  mediaProvider: createMediaProvider(),
  selected: jest.fn(),
  getPos: jest.fn(),
});
