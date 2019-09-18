import * as React from 'react';
import { MediaClient, Identifier } from '@atlaskit/media-client';
import {
  hideControlsClassName,
  WithShowControlMethodProp,
} from '@atlaskit/media-ui';
import { ItemViewer } from './item-viewer';
import { HeaderWrapper, ListWrapper } from './styled';
import { Navigation } from './navigation';
import Header from './header';
import { MediaViewerAction } from '../components/types';

export type Props = Readonly<
  {
    onClose?: () => void;
    onNavigationChange?: (selectedItem: Identifier) => void;
    defaultSelectedItem: Identifier;
    items: Identifier[];
    mediaClient: MediaClient;
    action?: MediaViewerAction;
  } & WithShowControlMethodProp
>;

export type State = {
  selectedItem: Identifier;
  previewCount: number;
};

export class List extends React.Component<Props, State> {
  state: State = {
    selectedItem: this.props.defaultSelectedItem,
    previewCount: 0,
  };

  componentDidUpdate(props: Props, state: State) {
    const { onNavigationChange } = this.props;
    const { selectedItem } = this.state;

    if (
      onNavigationChange &&
      (props.onNavigationChange !== onNavigationChange ||
        state.selectedItem !== selectedItem)
    ) {
      onNavigationChange(selectedItem);
    }
  }

  render() {
    const { items } = this.props;

    return this.renderContent(items);
  }

  renderContent(items: Identifier[]) {
    const { action, mediaClient, onClose, showControls } = this.props;
    const { selectedItem } = this.state;

    return (
      <ListWrapper>
        <HeaderWrapper className={hideControlsClassName}>
          <Header
            action={action}
            mediaClient={mediaClient}
            identifier={selectedItem}
            onClose={onClose}
          />
        </HeaderWrapper>
        <ItemViewer
          mediaClient={mediaClient}
          identifier={selectedItem}
          showControls={showControls}
          onClose={onClose}
          previewCount={this.state.previewCount}
        />
        <Navigation
          items={items}
          selectedItem={selectedItem}
          onChange={this.onNavigationChange}
        />
      </ListWrapper>
    );
  }

  onNavigationChange = (selectedItem: Identifier) => {
    const { onNavigationChange = () => {}, showControls } = this.props;

    onNavigationChange(selectedItem);
    if (showControls) {
      showControls();
    }

    this.setState({ selectedItem, previewCount: this.state.previewCount + 1 });
  };
}
