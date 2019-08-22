import { shallow } from 'enzyme';
import * as React from 'react';
import {
  getComponentClassWithStore,
  mockState,
  mockStore,
} from '@atlaskit/media-test-helpers';
import { State } from '../../../../../popup/domain';
import {
  StatelessSidebar,
  default as ConnectedSidebar,
  SidebarProps,
} from '../../sidebar';
import { ServiceList, Separator, UploadButtonWrapper } from '../../styled';
import SidebarItem from '../../item/sidebarItem';
import LocalBrowserButton from '../../../../../popup/components/views/upload/uploadButton';

const ConnectedSidebarWithStore = getComponentClassWithStore(ConnectedSidebar);

const createConnectedComponent = (
  props?: Partial<SidebarProps>,
  storeState?: Partial<State>,
) => {
  const store = mockStore(storeState);
  const dispatch = store.dispatch;
  const component = shallow(
    <ConnectedSidebarWithStore store={store} {...props} />,
  ).find(StatelessSidebar);
  return { component, dispatch };
};

describe('<Sidebar />', () => {
  const emptyRecents = { items: [] };
  const notEmptyRecents = { items: [{} as any] };

  it('should deliver all required props to stateless component', () => {
    const { component } = createConnectedComponent();
    const props = component.props();
    expect(props.selected).toEqual(mockState.view.service.name);
  });

  describe('#render()', () => {
    it('should render ServiceList, 3 SidebarItems and Separator', () => {
      const element = shallow(
        <StatelessSidebar
          selected=""
          selectedItems={[]}
          recents={emptyRecents}
        />,
      );

      expect(element.find(ServiceList)).toHaveLength(1);
      expect(element.find(SidebarItem)).toHaveLength(3);
      expect(element.find(Separator)).toHaveLength(1);
    });

    it('should use selected prop to pass isActive prop to SidebarItem components', () => {
      const uploadElement = shallow(
        <StatelessSidebar
          selected="upload"
          selectedItems={[]}
          recents={emptyRecents}
        />,
      );

      const dropBoxElement = shallow(
        <StatelessSidebar
          selected="dropbox"
          selectedItems={[]}
          recents={emptyRecents}
        />,
      );

      const googleElement = shallow(
        <StatelessSidebar
          selected="google"
          selectedItems={[]}
          recents={emptyRecents}
        />,
      );

      expect(
        uploadElement
          .find(SidebarItem)
          .find({ serviceName: 'upload' })
          .prop('isActive'),
      ).toBe(true);
      expect(
        uploadElement
          .find(SidebarItem)
          .find({ serviceName: 'dropbox' })
          .prop('isActive'),
      ).toBe(false);
      expect(
        uploadElement
          .find(SidebarItem)
          .find({ serviceName: 'google' })
          .prop('isActive'),
      ).toBe(false);

      expect(
        dropBoxElement
          .find(SidebarItem)
          .find({ serviceName: 'dropbox' })
          .prop('isActive'),
      ).toBe(true);
      expect(
        dropBoxElement
          .find(SidebarItem)
          .find({ serviceName: 'google' })
          .prop('isActive'),
      ).toBe(false);

      expect(
        googleElement
          .find(SidebarItem)
          .find({ serviceName: 'upload' })
          .prop('isActive'),
      ).toBe(false);
      expect(
        googleElement
          .find(SidebarItem)
          .find({ serviceName: 'dropbox' })
          .prop('isActive'),
      ).toBe(false);
      expect(
        googleElement
          .find(SidebarItem)
          .find({ serviceName: 'google' })
          .prop('isActive'),
      ).toBe(true);
    });

    it('should render upload button at primary appearance when recents empty', () => {
      const { component } = createConnectedComponent({
        recents: emptyRecents,
        browserRef: {} as any,
      });

      expect(
        component
          .dive()
          .find(UploadButtonWrapper)
          .find(LocalBrowserButton)
          .prop('appearance'),
      ).toBe('primary');
    });

    it('should render upload button at primary appearance when recents not empty and items not selected', () => {
      const { component } = createConnectedComponent({
        recents: notEmptyRecents,
        selectedItems: [],
        browserRef: {} as any,
      });

      expect(
        component
          .dive()
          .find(UploadButtonWrapper)
          .find(LocalBrowserButton)
          .prop('appearance'),
      ).toBe('primary');
    });

    it('should render upload button at default appearance when recents not empty and items selected', () => {
      const { component } = createConnectedComponent(
        {
          browserRef: {} as any,
        },
        {
          selectedItems: [{} as any],
          recents: notEmptyRecents,
        },
      );

      expect(
        component
          .dive()
          .find(UploadButtonWrapper)
          .find(LocalBrowserButton)
          .prop('appearance'),
      ).toBe('default');
    });
  });
});
