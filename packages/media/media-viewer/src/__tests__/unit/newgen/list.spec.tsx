import * as React from 'react';
import { Identifier, FileIdentifier } from '@atlaskit/media-client';
import { Observable } from 'rxjs';
import { List, Props, State } from '../../../newgen/list';
import ArrowRightCircleIcon from '@atlaskit/icon/glyph/chevron-right-circle';
import { ItemViewer } from '../../../newgen/item-viewer';
import { mountWithIntlContext } from '@atlaskit/media-test-helpers';

function createFixture(props: Partial<Props>) {
  const items: FileIdentifier[] = [];
  const selectedItem: Identifier = {
    id: '',
    occurrenceKey: '',
    mediaItemType: 'file',
  };
  const mediaClient = {
    file: {
      getFileState: () =>
        Observable.of({
          id: '123',
          mediaType: 'image',
          status: 'processed',
        }),
    },
  } as any;
  const el = mountWithIntlContext<Props, State>(
    <List
      items={items}
      defaultSelectedItem={selectedItem}
      mediaClient={mediaClient}
      {...props}
    />,
  );

  return el;
}

describe('<List />', () => {
  const identifier: Identifier = {
    id: 'some-id',
    occurrenceKey: 'some-custom-occurrence-key',
    mediaItemType: 'file',
  };

  it('should update navigation', () => {
    const identifier2: Identifier = {
      id: 'some-id-2',
      occurrenceKey: 'some-custom-occurrence-key',
      mediaItemType: 'file',
    };
    const el = createFixture({
      items: [identifier, identifier2],
      defaultSelectedItem: identifier,
    });
    expect(el.state().selectedItem).toMatchObject({ id: 'some-id' });
    el.find(ArrowRightCircleIcon).simulate('click');
    expect(el.state().selectedItem).toMatchObject({ id: 'some-id-2' });
  });

  it('should show controls when navigation occurs', () => {
    const showControls = jest.fn();
    const el = createFixture({
      items: [identifier, identifier, identifier],
      defaultSelectedItem: identifier,
      showControls,
    });

    el.find(ArrowRightCircleIcon).simulate('click');
    el.find(ArrowRightCircleIcon).simulate('click');
    expect(showControls).toHaveBeenCalledTimes(2);
  });

  describe('AutoPlay', () => {
    it('should pass ItemViewer an initial previewCount value of zero', () => {
      const showControls = jest.fn();
      const el = createFixture({
        items: [identifier, identifier, identifier],
        defaultSelectedItem: identifier,
        showControls,
      });
      const itemViewer = el.find(ItemViewer);
      expect(itemViewer.prop('previewCount')).toEqual(0);
    });

    it("should increase ItemViewer's previewCount on navigation", () => {
      const showControls = jest.fn();
      const el = createFixture({
        items: [identifier, identifier, identifier],
        defaultSelectedItem: identifier,
        showControls,
      });
      el.find(ArrowRightCircleIcon).simulate('click');
      const itemViewer = el.find(ItemViewer);
      expect(itemViewer.prop('previewCount')).toEqual(1);
    });
  });

  describe('onNavigationChange', () => {
    const identifier2: Identifier = {
      id: 'some-id-2',
      occurrenceKey: 'some-custom-occurrence-key',
      mediaItemType: 'file',
    };

    const defaultProps = {
      items: [identifier, identifier2],
      defaultSelectedItem: identifier,
    };

    const onNavChangeMockFn: (selectedItem: Identifier) => void = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should not be called if onNavigationChange prop is not provided', () => {
      const el = createFixture(defaultProps);
      el.setState({
        selectedItem: identifier2,
      });

      expect(onNavChangeMockFn).not.toHaveBeenCalled();
    });

    it('should be called if selected item state changed', () => {
      const el = createFixture({
        ...defaultProps,
        onNavigationChange: onNavChangeMockFn,
      });
      el.setState({
        selectedItem: identifier2,
      });

      expect(onNavChangeMockFn).toHaveBeenCalledWith(el.state('selectedItem'));
    });

    it('should be called if onNavigationChange prop changed', () => {
      const onNavChangeMockFn2 = jest.fn();
      const el = createFixture({
        ...defaultProps,
        onNavigationChange: onNavChangeMockFn,
      });
      el.setProps({
        onNavigationChange: onNavChangeMockFn2,
      });

      expect(onNavChangeMockFn2).toHaveBeenCalledWith(el.state('selectedItem'));
    });

    it('should not be called if onNavigationChange prop and selected item did not change', () => {
      const el = createFixture({
        ...defaultProps,
        onNavigationChange: onNavChangeMockFn,
      });
      const prevState = el.state();
      el.setState({
        previewCount: prevState.previewCount++,
      });

      expect(onNavChangeMockFn).not.toHaveBeenCalled();
    });
  });
});
