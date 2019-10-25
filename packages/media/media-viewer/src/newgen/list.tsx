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
import { ToolbarAction } from '../components/types';

export type Props = Readonly<
  {
    onClose?: () => void;
    defaultSelectedItem: Identifier;
    items: Identifier[];
    mediaClient: MediaClient;
    extraToolbarAction?: ToolbarAction;
    onNavigate?: (selectedItem: Identifier) => void;
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
    const { onNavigate } = this.props;
    const { selectedItem } = this.state;

    if (
      onNavigate &&
      (props.onNavigate !== onNavigate || state.selectedItem !== selectedItem)
    ) {
      onNavigate(selectedItem);
    }
  }

  render() {
    const { items } = this.props;

    return this.renderContent(items);
  }

  renderContent(items: Identifier[]) {
    const {
      mediaClient,
      onClose,
      showControls,
      extraToolbarAction,
    } = this.props;
    const { selectedItem } = this.state;

    return (
      <ListWrapper>
        <HeaderWrapper className={hideControlsClassName}>
          <Header
            mediaClient={mediaClient}
            identifier={selectedItem}
            onClose={onClose}
            extraToolbarAction={extraToolbarAction}
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
    const { showControls, onNavigate } = this.props;

    if (onNavigate) {
      onNavigate(selectedItem);
    }
    if (showControls) {
      showControls();
    }

    this.setState({ selectedItem, previewCount: this.state.previewCount + 1 });
  };
}
