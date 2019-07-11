import * as React from 'react';
jest.mock('../../../service/newUploadServiceImpl');
import { Dropzone } from '../../dropzone/dropzone';
import { mount, ReactWrapper } from 'enzyme';
import { DropzoneDragEnterEventPayload } from '../../types';
import { fakeMediaClient } from '@atlaskit/media-test-helpers';

const files = [new File([], '')];

const createDragOverOrDropEvent = (
  eventName: 'dragover' | 'drop' | 'dragleave',
  type?: string,
) => {
  const event = document.createEvent('Event') as any;
  event.initEvent(eventName, true, true);
  event.preventDefault = () => {};
  event.dataTransfer = {
    types: [type || 'Files'],
    effectAllowed: 'move',
    items: [{ kind: 'file' }, { kind: 'string' }],
    files,
  };
  return event;
};

const createDragOverEvent = (type?: string) => {
  return createDragOverOrDropEvent('dragover', type);
};

const createDragLeaveEvent = () => {
  return createDragOverOrDropEvent('dragleave');
};

const createDropEvent = () => {
  return createDragOverOrDropEvent('drop');
};

const mediaClient = fakeMediaClient();

const container = document.createElement('div');

[
  {
    config: { container, uploadParams: {} },
    expectedContainer: container,
  },
  {
    config: { uploadParams: {} },
    expectedContainer: document.body,
  },
].forEach(data => {
  describe(`Dropzone with config: ${data.config}`, () => {
    let component: ReactWrapper;
    const { config, expectedContainer } = data;

    afterEach(() => {
      if (component.exists()) component.unmount();
    });

    it('adds "dragover", "dragleave" and "drop" events to container', async () => {
      let addEventListenerSpy: jest.SpyInstance<any>;
      addEventListenerSpy = jest.spyOn(expectedContainer, 'addEventListener');

      component = mount(<Dropzone mediaClient={mediaClient} config={config} />); // Must mount after syping

      const events = addEventListenerSpy.mock.calls.map(args => args[0]);
      expect(events).toContain('dragover');
      expect(events).toContain('dragleave');
      expect(events).toContain('drop');
    });

    it('removes "dragover", "dragleave" and "drop" events from container', async () => {
      const removeEventListenerSpy = jest.spyOn(
        expectedContainer,
        'removeEventListener',
      );

      component = mount(<Dropzone mediaClient={mediaClient} config={config} />); // Must mount after syping
      component.unmount();

      const events = removeEventListenerSpy.mock.calls.map(args => args[0]);
      expect(events).toContain('dragover');
      expect(events).toContain('dragleave');
      expect(events).toContain('drop');
    });

    it('should emit drag-enter for drag over with type "Files" and contain files length', done => {
      component = mount(
        <Dropzone
          mediaClient={mediaClient}
          config={config}
          onDragEnter={(e: DropzoneDragEnterEventPayload) => {
            expect(e.length).toEqual(1);
            done();
          }}
        />,
      );

      expectedContainer.dispatchEvent(createDragOverEvent());
    });

    it('should not emit drag-enter for drag over with type "Not Files"', done => {
      component = mount(
        <Dropzone
          mediaClient={mediaClient}
          config={config}
          onDragEnter={() => {
            done(new Error('drag-enter should not be emitted'));
          }}
        />,
      );

      expectedContainer.dispatchEvent(createDragOverEvent('Not Files'));
      done();
    });

    it('should emit drag-leave for dragleave event', async done => {
      component = mount(
        <Dropzone
          mediaClient={mediaClient}
          config={config}
          onDragLeave={() => {
            done();
          }}
        />,
      );

      expectedContainer.dispatchEvent(createDragOverEvent());
      expectedContainer.dispatchEvent(createDragLeaveEvent());
    });

    it('should not emit drag-leave for dragleave event if there was no dragover', () => {
      component = mount(
        <Dropzone
          mediaClient={mediaClient}
          config={config}
          onDragLeave={() => {
            throw new Error('drag-leave should not be emitted');
          }}
        />,
      );

      expectedContainer.dispatchEvent(createDragLeaveEvent());
    });

    it('should upload files when files are dropped', () => {
      component = mount(<Dropzone mediaClient={mediaClient} config={config} />);

      const componentInstance = component.instance() as any;
      componentInstance.uploadService.addFiles = jest.fn();

      expectedContainer.dispatchEvent(createDropEvent());

      expect(componentInstance.uploadService.addFiles).toHaveBeenCalledTimes(1);
      expect(componentInstance.uploadService.addFiles).toBeCalledWith(files);
    });

    it('should provide a function to onCancelFn callback property and call uploadService.cancel', () => {
      const onCancelFnMock = jest.fn();
      component = mount(
        <Dropzone
          mediaClient={mediaClient}
          config={config}
          onCancelFn={onCancelFnMock}
        />,
      );
      const instance = component.instance() as Dropzone;
      expect(onCancelFnMock).toBeCalled();
      onCancelFnMock.mock.calls[0][0]();
      expect((instance as any).uploadService.cancel).toBeCalled();
    });

    it('should change event listeners when container changes', () => {
      const onCancelFnMock = jest.fn();
      const newContainer = document.createElement('DIV');

      const removeEventListenerSpyOverOldContainer = jest.spyOn(
        expectedContainer,
        'removeEventListener',
      );
      const addEventListenerSpyOverNewContainer = jest.spyOn(
        newContainer,
        'addEventListener',
      );

      component = mount(
        <Dropzone
          mediaClient={mediaClient}
          config={config}
          onCancelFn={onCancelFnMock}
        />,
      );

      // clear the calls on initial render
      removeEventListenerSpyOverOldContainer.mockClear();

      component.setProps({
        config: {
          container: newContainer,
        },
      });

      expect(removeEventListenerSpyOverOldContainer).toBeCalledTimes(3);
      expect(addEventListenerSpyOverNewContainer).toBeCalledTimes(3);
    });
  });
});
