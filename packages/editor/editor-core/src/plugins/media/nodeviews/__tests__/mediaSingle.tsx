import React from 'react';
import { mount } from 'enzyme';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

import { MediaPluginState, MediaProvider } from '../../pm-plugins/main';
import MediaSingleNode from '../mediaSingle';

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

jest.mock('../media', () => () => null);
jest.mock('../mediaNodeUpdater', () => ({
  MediaNodeUpdater: jest.fn(() => ({
    updateFileAttrs: jest.fn(),
    updateContextId: jest.fn(),
    getRemoteDimensions: jest.fn(),
    getCurrentContextId: jest.fn(),
    isNodeFromDifferentCollection: jest.fn(),
  })),
}));

describe('mediaSingle', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('updates file attrs on mount', async () => {
    const { MediaNodeUpdater } = await import('../mediaNodeUpdater');
    mount(<MediaSingleNode {...getMediaSingleProps()} />);
    expect(MediaNodeUpdater).toHaveBeenCalledTimes(1);
  });

  test('updates file attrs for props change', async () => {
    const { MediaNodeUpdater } = await import('../mediaNodeUpdater');

    mount(<MediaSingleNode {...getMediaSingleProps()} />).setProps({
      mediaProvider: createMediaProvider(),
    });

    expect(MediaNodeUpdater).toHaveBeenCalledTimes(2);
  });

  test('does not update file attrs for props change on mobile appearance', async () => {
    const { MediaNodeUpdater } = await import('../mediaNodeUpdater');

    mount(
      <MediaSingleNode {...getMediaSingleProps()} editorAppearance="mobile" />,
    ).setProps({
      mediaProvider: createMediaProvider(),
    });

    expect(MediaNodeUpdater).toHaveBeenCalledTimes(1);
  });
});
