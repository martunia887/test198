import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Observable } from 'rxjs';
import { CustomMediaPlayer } from '@atlaskit/media-ui';
import { MediaFileArtifacts } from '@atlaskit/media-store';
import { FileIdentifier, FileState } from '@atlaskit/media-core';
import {
  InlinePlayer,
  InlinePlayerProps,
  getPreferredVideoArtifact,
} from '../../../root/inlinePlayer';
import { CardLoading } from '../../../utils';
import { InlinePlayerWrapper } from '../../../root/styled';

describe('<InlinePlayer />', () => {
  const defaultArtifact: MediaFileArtifacts = {
    'video_1280.mp4': { processingStatus: 'succeeded', url: '' },
  };
  const setup = (
    props?: Partial<InlinePlayerProps>,
    artifacts: MediaFileArtifacts = defaultArtifact,
  ) => {
    const context = {
      file: {
        getFileState: jest.fn().mockReturnValue(
          Observable.of({
            status: 'processed',
            artifacts,
          }),
        ),
        getArtifactURL: jest.fn().mockReturnValue('some-url'),
      },
    } as any;
    const identifier = {
      id: Promise.resolve('some-id'),
      collectionName: 'some-collection',
    } as FileIdentifier;

    const component = shallow(
      <InlinePlayer context={context} identifier={identifier} {...props} />,
    );

    return {
      component,
      context,
    };
  };
  const update = async (component: ShallowWrapper) => {
    await new Promise(resolve => window.setTimeout(resolve));
    component.update();
  };

  it('should render loading component when the video src is not ready', () => {
    const { component } = setup({
      dimensions: {
        width: 10,
        height: '5%',
      },
    });

    expect(component.find(CardLoading)).toHaveLength(1);
    expect(component.find(CardLoading).prop('dimensions')).toEqual({
      width: 10,
      height: '5%',
    });
  });

  it('should call getFileState with right properties', async () => {
    const { component, context } = setup();

    await update(component);
    expect(context.file.getFileState).toBeCalledTimes(1);
    expect(context.file.getFileState).toBeCalledWith('some-id', {
      collectionName: 'some-collection',
    });
  });

  it('should use default dimensions', () => {});

  it('should set width according to dimensions in the wrapper element', async () => {
    const { component } = setup({
      dimensions: {
        width: 1,
        height: 1,
      },
    });

    await update(component);
    expect(component.find(InlinePlayerWrapper).prop('style')).toEqual({
      width: 1,
    });
  });

  it('should use local preview if available', async () => {
    const blob = new Blob([], { type: 'video/mp4' });
    const context = {
      file: {
        getFileState: jest.fn().mockReturnValue(
          Observable.of({
            status: 'uploading',
            preview: {
              value: blob,
            },
          }),
        ),
      },
    } as any;
    const { component } = setup({ context });

    await update(component);

    expect(component.find(CustomMediaPlayer).prop('src')).toEqual(
      'mock result of URL.createObjectURL()',
    );
  });

  it('should use right file artifact', async () => {
    const { component, context } = setup();

    await update(component);
    expect(context.file.getArtifactURL).toBeCalledTimes(1);
    expect(context.file.getArtifactURL).toBeCalledWith(
      {
        'video_1280.mp4': {
          processingStatus: 'succeeded',
          url: '',
        },
      },
      'video_1280.mp4',
      'some-collection',
    );
    expect(component.find(CustomMediaPlayer).prop('src')).toEqual('some-url');
  });

  it('should use sd artifact if hd one is not present', async () => {
    const { component, context } = setup(undefined, {
      'video_640.mp4': {
        processingStatus: 'succeeded',
        url: '',
      },
    });

    await update(component);
    expect(context.file.getArtifactURL).toBeCalledTimes(1);
    expect(context.file.getArtifactURL).toBeCalledWith(
      {
        'video_640.mp4': {
          processingStatus: 'succeeded',
          url: '',
        },
      },
      'video_640.mp4',
      'some-collection',
    );
    expect(component.find(CustomMediaPlayer).prop('src')).toEqual('some-url');
  });

  describe('getPreferredVideoArtifact()', () => {
    it('should return hd artifact if present', () => {
      const state = {
        status: 'processed',
        artifacts: {
          'video_1280.mp4': {},
          'video_640.mp4': {},
        },
      };

      expect(getPreferredVideoArtifact(state as FileState)).toEqual(
        'video_1280.mp4',
      );
    });

    it('should fallback to sd artifact if hd is not present', () => {
      const state = {
        status: 'processed',
        artifacts: {
          'audio.mp3': {},
          'video_640.mp4': {},
        },
      };

      expect(getPreferredVideoArtifact(state as FileState)).toEqual(
        'video_640.mp4',
      );
    });

    it('should work with processing status', () => {
      const state = {
        status: 'processing',
        artifacts: {
          'video_1280.mp4': {},
        },
      };

      expect(getPreferredVideoArtifact(state as FileState)).toEqual(
        'video_1280.mp4',
      );
    });
  });
});
