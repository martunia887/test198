import {
  setViewerPayload,
  ImageViewer as ImageViewerMock,
} from '../../mocks/_image-viewer';

const mockImageViewer = {
  ImageViewer: ImageViewerMock,
};
jest.mock('../../../newgen/viewers/image', () => mockImageViewer);

import * as React from 'react';
import { ReactWrapper } from 'enzyme';
import { Observable } from 'rxjs';
import Spinner from '@atlaskit/spinner';
import Button from '@atlaskit/button';
import {
  MediaClient,
  ProcessedFileState,
  Identifier,
  FileIdentifier,
  FileState,
} from '@atlaskit/media-client';
import { mountWithIntlContext } from '@atlaskit/media-test-helpers';
import {
  ItemViewer,
  ItemViewerBase,
  Props as ItemViewerBaseProps,
  State as ItemViewerBaseState,
} from '../../../newgen/item-viewer';
import { ErrorMessage } from '../../../newgen/error';
import { ImageViewer } from '../../../newgen/viewers/image';
import { VideoViewer } from '../../../newgen/viewers/video';
import { AudioViewer } from '../../../newgen/viewers/audio';
import { DocViewer } from '../../../newgen/viewers/doc';
import {
  name as packageName,
  version as packageVersion,
} from '../../../../package.json';

const identifier: any = {
  id: 'some-id',
  occurrenceKey: 'some-custom-occurrence-key',
  mediaItemType: 'file',
  collectionName: 'some-collection',
};

const makeFakeContext = (observable: Observable<any>) =>
  ({
    file: {
      getFileState: jest.fn(() => observable),
    },
  } as any);

function mountComponent(mediaClient: MediaClient, identifier: Identifier) {
  const el = mountWithIntlContext(
    <ItemViewer
      previewCount={0}
      mediaClient={mediaClient}
      identifier={identifier}
    />,
  );
  const instance = el.find(ItemViewerBase).instance() as any;
  return { el, instance };
}

function mountBaseComponent(
  mediaClient: MediaClient,
  identifier: FileIdentifier,
) {
  const createAnalyticsEventSpy = jest.fn();
  createAnalyticsEventSpy.mockReturnValue({ fire: jest.fn() });
  const el: ReactWrapper<
    ItemViewerBaseProps,
    ItemViewerBaseState
  > = mountWithIntlContext(
    <ItemViewerBase
      createAnalyticsEvent={createAnalyticsEventSpy}
      previewCount={0}
      mediaClient={mediaClient}
      identifier={identifier}
    />,
  );
  const instance = el.instance() as ItemViewerBase;
  return { el, instance, createAnalyticsEventSpy };
}

describe('<ItemViewer />', () => {
  beforeEach(() => {
    setViewerPayload({ status: 'success' });
  });

  it('shows an indicator while loading', () => {
    const mediaClient = makeFakeContext(Observable.empty());
    const { el } = mountComponent(mediaClient, identifier);
    expect(el.find(Spinner)).toHaveLength(1);
  });

  it('shows a generic error on unkown error', () => {
    const mediaClient = makeFakeContext(
      Observable.throw('something bad happened!'),
    );
    const { el } = mountComponent(mediaClient, identifier);
    el.update();
    const errorMessage = el.find(ErrorMessage);
    expect(errorMessage).toHaveLength(1);
    expect(errorMessage.text()).toContain('Something went wrong');
    expect(errorMessage.find(Button)).toHaveLength(0);
  });

  it('should show the image viewer if media type is image', () => {
    const mediaClient = makeFakeContext(
      Observable.of({
        id: identifier.id,
        mediaType: 'image',
        status: 'processed',
      }),
    );
    const { el } = mountComponent(mediaClient, identifier);
    el.update();
    expect(el.find(ImageViewer)).toHaveLength(1);
    // MSW:720 - passes the collectionName along
    expect(el.find(ImageViewer).prop('collectionName')).toEqual(
      identifier.collectionName,
    );
  });

  it('should should error and download button if processing Status failed', () => {
    const mediaClient = makeFakeContext(Observable.of({ status: 'error' }));
    const { el } = mountComponent(mediaClient, identifier);
    el.update();
    const errorMessage = el.find(ErrorMessage);
    expect(errorMessage).toHaveLength(1);
    expect(errorMessage.text()).toContain(
      `We couldn't generate a preview for this file.Try downloading the file to view it.Download`,
    );
    expect(errorMessage.find(Button)).toHaveLength(1);
  });

  it('should should error and download button if file is processing failed', () => {
    const mediaClient = makeFakeContext(
      Observable.of({
        id: '123',
        mediaType: 'video',
        status: 'failed-processing',
      }),
    );
    const el = mountWithIntlContext(
      <ItemViewer
        previewCount={0}
        mediaClient={mediaClient}
        identifier={identifier}
      />,
    );
    el.update();
    const errorMessage = el.find(ErrorMessage);
    expect(errorMessage).toHaveLength(1);
    expect(errorMessage.text()).toContain(
      `We couldn't generate a preview for this file.Try downloading the file to view it.Download`,
    );
    expect(errorMessage.find(Button)).toHaveLength(1);
  });

  it('should should error and download button if file is in error state', () => {
    const mediaClient = makeFakeContext(
      Observable.of({
        id: '123',
        mediaType: 'image',
        status: 'error',
      }),
    );
    const el = mountWithIntlContext(
      <ItemViewer
        previewCount={0}
        mediaClient={mediaClient}
        identifier={identifier}
      />,
    );
    el.update();
    const errorMessage = el.find(ErrorMessage);
    expect(errorMessage).toHaveLength(1);
    expect(errorMessage.text()).toContain(
      `We couldn't generate a preview for this file.Try downloading the file to view it.Download`,
    );
    expect(errorMessage.find(Button)).toHaveLength(1);
  });

  it('should show the video viewer if media type is video', () => {
    const state: ProcessedFileState = {
      id: identifier.id,
      mediaType: 'video',
      status: 'processed',
      mimeType: '',
      name: '',
      size: 1,
      artifacts: {},
      representations: {},
    };
    const mediaClient = makeFakeContext(Observable.of(state));
    const { el } = mountComponent(mediaClient, identifier);
    el.update();
    expect(el.find(VideoViewer)).toHaveLength(1);
    // MSW:720 - passes the collectionName along
    expect(el.find(VideoViewer).prop('collectionName')).toEqual(
      identifier.collectionName,
    );
  });

  it('should show the audio viewer if media type is audio', () => {
    const mediaClient = makeFakeContext(
      Observable.of({
        id: identifier.id,
        mediaType: 'audio',
        status: 'processed',
      }),
    );
    const { el } = mountComponent(mediaClient, identifier);
    el.update();
    expect(el.find(AudioViewer)).toHaveLength(1);
    // MSW:720 - passes the collectionName along
    expect(el.find(AudioViewer).prop('collectionName')).toEqual(
      identifier.collectionName,
    );
  });

  it('should show the document viewer if media type is document', () => {
    const state: FileState = {
      id: identifier.id,
      mediaType: 'doc',
      status: 'processed',
      artifacts: {},
      name: '',
      size: 0,
      mimeType: '',
      representations: { image: {} },
    };
    const mediaClient = makeFakeContext(Observable.of(state));
    const { el } = mountComponent(mediaClient, identifier);
    el.update();
    expect(el.find(DocViewer)).toHaveLength(1);
    // MSW:720 - passes the collectionName along
    expect(el.find(DocViewer).prop('collectionName')).toEqual(
      identifier.collectionName,
    );
  });

  it('should should error and download button if file is unsupported', () => {
    const mediaClient = makeFakeContext(
      Observable.of({
        id: identifier.id,
        mediaType: 'unknown',
        status: 'processed',
      }),
    );
    const { el } = mountComponent(mediaClient, identifier);
    el.update();
    const errorMessage = el.find(ErrorMessage);
    expect(errorMessage).toHaveLength(1);
    expect(errorMessage.text()).toContain(
      `We can't preview this file type.Try downloading the file to view it.Download`,
    );
    expect(errorMessage.find(Button)).toHaveLength(1);
  });

  it('MSW-720: passes the collectionName to getFileState', () => {
    const mediaClient = makeFakeContext(
      Observable.of({
        id: identifier.id,
        mediaType: 'image',
        status: 'processed',
      }),
    );
    const { el } = mountComponent(mediaClient, identifier);
    el.update();
    expect(mediaClient.file.getFileState).toHaveBeenCalledWith('some-id', {
      collectionName: 'some-collection',
    });
  });

  describe('Subscription', () => {
    it('unsubscribes from the provider when unmounted', () => {
      const release = jest.fn();
      const mediaClient = makeFakeContext(
        Observable.of({
          id: '123',
          mediaType: 'unknown',
          status: 'processed',
        }),
      );
      const { el, instance } = mountComponent(mediaClient, identifier);
      instance.release = release;
      expect(instance.release).toHaveBeenCalledTimes(0);
      el.unmount();
      expect(instance.release).toHaveBeenCalledTimes(1);
    });

    it('resubscribes to the provider when the data property value is changed', () => {
      const identifierCopy = { ...identifier };
      const mediaClient = makeFakeContext(
        Observable.of({
          id: '123',
          mediaType: 'unknown',
          status: 'processed',
        }),
      );
      const { el } = mountComponent(mediaClient, identifier);
      expect(mediaClient.file.getFileState).toHaveBeenCalledTimes(1);

      // if the values stay the same, we will not resubscribe
      el.setProps({ mediaClient, identifier: identifierCopy });
      expect(mediaClient.file.getFileState).toHaveBeenCalledTimes(1);

      // ... but if the identifier change we will resubscribe
      const identifier2 = {
        ...identifier,
        id: 'some-other-id',
      };
      el.setProps({ mediaClient, identifier: identifier2 });
      expect(mediaClient.file.getFileState).toHaveBeenCalledTimes(2);

      // if the mediaClient changes, we will also resubscribe
      const newContext = makeFakeContext(
        Observable.of({
          id: '123',
          mediaType: 'unknown',
          status: 'processed',
        }),
      );

      el.setProps({ mediaClient: newContext, identifier: identifier2 });
      expect(mediaClient.file.getFileState).toHaveBeenCalledTimes(2);
      expect(newContext.file.getFileState).toHaveBeenCalledTimes(1);
    });

    it('should return to PENDING state when resets', () => {
      const mediaClient = makeFakeContext(
        Observable.of({
          id: '123',
          mediaType: 'unknown',
          status: 'processed',
        }),
      );
      const { el, instance } = mountBaseComponent(mediaClient, identifier);
      expect(instance.state.item.status).toEqual('SUCCESSFUL');

      const identifier2 = {
        ...identifier,
        id: 'some-other-id',
      };

      // since the test is executed synchronously
      // let's prevent the second call to getFile from immediately resolving and
      // updating the state to SUCCESSFUL before we run the assertion.
      mediaClient.file.getFileState = () => Observable.never();
      el.setProps({ mediaClient, identifier: identifier2 });
      el.update();

      expect(instance.state.item.status).toEqual('PENDING');
    });
  });

  describe('Analytics', () => {
    const analyticsBaseAttributes = {
      componentName: 'media-viewer',
      packageName,
      packageVersion,
    };

    it('should trigger analytics when the preview commences', () => {
      const mediaClient = makeFakeContext(
        Observable.of({
          id: identifier.id,
          mediaType: 'unknown',
          status: 'processed',
        }),
      );
      const { createAnalyticsEventSpy } = mountBaseComponent(
        mediaClient,
        identifier,
      );
      expect(createAnalyticsEventSpy).toHaveBeenCalledWith({
        action: 'commenced',
        actionSubject: 'mediaFile',
        actionSubjectId: 'some-id',
        attributes: {
          fileId: 'some-id',
          ...analyticsBaseAttributes,
        },
        eventType: 'operational',
      });
    });

    it('should trigger analytics when metadata fetching ended with an error', () => {
      const mediaClient = makeFakeContext(
        Observable.throw('something bad happened!'),
      );
      const { createAnalyticsEventSpy } = mountBaseComponent(
        mediaClient,
        identifier,
      );
      expect(createAnalyticsEventSpy).toHaveBeenCalledTimes(2);
      expect(createAnalyticsEventSpy).toHaveBeenCalledWith({
        action: 'commenced',
        actionSubject: 'mediaFile',
        actionSubjectId: 'some-id',
        attributes: {
          fileId: 'some-id',
          ...analyticsBaseAttributes,
        },
        eventType: 'operational',
      });
      expect(createAnalyticsEventSpy).toHaveBeenCalledWith({
        action: 'loadFailed',
        actionSubject: 'mediaFile',
        actionSubjectId: 'some-id',
        attributes: {
          failReason: 'Metadata fetching failed',
          fileId: 'some-id',
          status: 'fail',
          ...analyticsBaseAttributes,
        },
        eventType: 'operational',
      });
    });

    it('should trigger analytics when viewer returned an error', () => {
      setViewerPayload({
        status: 'error',
        errorMessage: 'Image viewer failed :(',
      });
      const mediaClient = makeFakeContext(
        Observable.of({
          id: identifier.id,
          mediaType: 'image',
          status: 'processed',
        }),
      );
      const { createAnalyticsEventSpy } = mountBaseComponent(
        mediaClient,
        identifier,
      );
      expect(createAnalyticsEventSpy).toHaveBeenCalledWith({
        action: 'loadFailed',
        actionSubject: 'mediaFile',
        actionSubjectId: 'some-id',
        attributes: {
          failReason: 'Image viewer failed :(',
          fileId: 'some-id',
          fileMediatype: 'image',
          fileSize: undefined,
          status: 'fail',
          ...analyticsBaseAttributes,
        },
        eventType: 'operational',
      });
    });

    it('should trigger analytics when viewer is successful', () => {
      const mediaClient = makeFakeContext(
        Observable.of({
          id: identifier.id,
          mediaType: 'image',
          status: 'processed',
        }),
      );
      const { createAnalyticsEventSpy } = mountBaseComponent(
        mediaClient,
        identifier,
      );
      expect(createAnalyticsEventSpy).toHaveBeenCalledWith({
        action: 'loadSucceeded',
        actionSubject: 'mediaFile',
        actionSubjectId: 'some-id',
        attributes: {
          fileId: 'some-id',
          fileMediatype: 'image',
          fileSize: undefined,
          status: 'success',
          ...analyticsBaseAttributes,
        },
        eventType: 'operational',
      });
    });
  });
});
