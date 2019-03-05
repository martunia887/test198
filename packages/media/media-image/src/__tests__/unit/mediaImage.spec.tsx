import * as React from 'react';
import { shallow } from 'enzyme';
import { Observable } from 'rxjs';
import {
  asMock,
  fakeMediaClient,
  nextTick,
} from '@atlaskit/media-test-helpers';
import { imageFileId } from '@atlaskit/media-test-helpers';
import { MediaImageBase, MediaImageProps } from '../../index';
import { Omit } from '@atlaskit/type-helpers';
import { MediaClient } from '@atlaskit/media-client';

const shallowRender = async (props: Omit<MediaImageProps, 'children'>) => {
  const wrapper = shallow<MediaImageBase, MediaImageProps, any>(
    <MediaImageBase {...props}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>loading</div>;
        }

        if (error) {
          return <div>error</div>;
        }

        if (!data) {
          return null;
        }

        return <img src={data.src} />;
      }}
    </MediaImageBase>,
  );

  await nextTick();

  return wrapper;
};

describe('<MediaImage />', () => {
  let defaultProps: Omit<MediaImageProps, 'children'>;
  let mediaClient: MediaClient;
  let createObjectURLSpy: jest.SpyInstance<any>;
  let revokeObjectURLSpy: jest.SpyInstance<any>;

  beforeEach(() => {
    revokeObjectURLSpy = jest.spyOn(URL, 'revokeObjectURL');
    createObjectURLSpy = jest
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('some-image-url');

    mediaClient = fakeMediaClient();
    asMock(mediaClient.file.getFileState).mockReturnValue(
      Observable.of({
        status: 'processed',
        mediaType: 'image',
      }),
    );

    defaultProps = {
      apiConfig: {
        width: 100,
        height: 100,
        upscale: true,
        mode: 'full-fit',
      },
      identifier: imageFileId,
      mediaClient: mediaClient,
    };
  });

  afterEach(() => {
    createObjectURLSpy.mockReset();
    revokeObjectURLSpy.mockReset();
    jest.resetAllMocks();
  });

  it('should render error placeholder if request fails', async () => {
    asMock(mediaClient.file.getFileState).mockReturnValue(
      Observable.create((observer: { error: Function }) => {
        observer.error('');
      }),
    );

    const props = {
      ...defaultProps,
      mediaClient,
    };
    const wrapper = await shallowRender(props);
    expect(wrapper.find('div').text()).toEqual('error');
  });

  it('should render error placeholder if the media type is NOT an image', async () => {
    asMock(mediaClient.file.getFileState).mockReturnValue(
      Observable.of({ status: 'processed', mediaType: 'doc' }),
    );

    const props = {
      ...defaultProps,
      mediaClient,
    };
    const wrapper = await shallowRender(props);

    expect(wrapper.find('div').text()).toEqual('error');
  });

  it('should render error placeholder if the request status is `error`', async () => {
    asMock(mediaClient.file.getFileState).mockReturnValue(
      Observable.of({ status: 'error', mediaType: 'image' }),
    );

    const props = {
      ...defaultProps,
      mediaClient,
    };
    const wrapper = await shallowRender(props);

    expect(wrapper.find('div').text()).toEqual('error');
  });

  it('should remove subscription if the component is unmounted', async () => {
    const wrapper = await shallowRender(defaultProps);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'unsubscribe');

    wrapper.unmount();

    expect(instance.unsubscribe).toHaveBeenCalledTimes(1);
    expect(revokeObjectURLSpy).toHaveBeenCalledTimes(1);
  });

  it('should render a placeholder while the src is loading', async () => {
    asMock(mediaClient.file.getFileState).mockReturnValue(
      Observable.of({ status: 'loading', mediaType: 'image' }),
    );

    const props = {
      ...defaultProps,
      mediaClient,
    };
    const wrapper = await shallowRender(props);

    expect(wrapper.find('div').text()).toEqual('loading');
  });

  it('should NOT trigger subscribe if new dimension is smaller than the current used', async () => {
    const wrapper = await shallowRender(defaultProps);
    expect(mediaClient.file.getFileState).toHaveBeenCalledTimes(1);

    wrapper.setProps({ apiConfig: { width: 90, height: 90 } });
    await wrapper.update();

    expect(mediaClient.file.getFileState).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger subscribe if new dimension is smaller than the current used', async () => {
    const wrapper = await shallowRender(defaultProps);
    expect(mediaClient.file.getFileState).toHaveBeenCalledTimes(1);

    wrapper.setProps({ identifier: defaultProps.identifier });
    await wrapper.update();

    expect(mediaClient.file.getFileState).toHaveBeenCalledTimes(1);
  });

  it('should trigger subscribe if new dimension is bigger than the current used', async () => {
    const wrapper = await shallowRender(defaultProps);
    expect(mediaClient.file.getFileState).toHaveBeenCalledTimes(1);

    wrapper.setProps({ apiConfig: { width: 110, height: 110 } });
    await wrapper.update();
    expect(mediaClient.file.getFileState).toHaveBeenCalledTimes(2);
  });

  it('should render preview image based on create object url output', async () => {
    asMock(mediaClient.file.getFileState).mockReturnValue(
      Observable.of({
        status: 'processed',
        mediaType: 'image',
        preview: Promise.resolve(new Blob()),
      }),
    );

    const img = 'img.jpg';
    createObjectURLSpy.mockReturnValue(img);

    const props = {
      ...defaultProps,
      mediaClient,
    };
    const wrapper = await shallowRender(props);

    expect(mediaClient.getImage).toHaveBeenCalledTimes(0);
    expect(wrapper.find('img').props().src).toEqual(img);
  });

  it('should render preview image based on getImage output', async () => {
    asMock(mediaClient.file.getFileState).mockReturnValue(
      Observable.of({ status: 'processed', mediaType: 'image' }),
    );
    const img = 'img2.jpg';
    createObjectURLSpy.mockReturnValue(img);
    asMock(mediaClient.getImage).mockReturnValue(
      new Blob([img], { type: 'image/jpeg' }),
    );

    const props = {
      ...defaultProps,
      mediaClient,
    };
    const wrapper = await shallowRender(props);

    expect(mediaClient.getImage).toHaveBeenCalledTimes(1);
    expect(wrapper.find('img').props().src).toEqual(img);
  });
});
