import React from 'react';
import { mount } from 'enzyme';
import MediaSingleNode from '../mediaSingle';
import {
  getMediaSingleProps,
  createMediaProvider,
} from '../__utils__/mediaSingle';

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
