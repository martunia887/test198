import * as React from 'react';
import {
  MediaClient,
  Identifier,
  isFileIdentifier,
  generateIdentifierKey,
} from '@atlaskit/media-client';
import {
  hideControlsClassName,
  WithShowControlMethodProp,
} from '@atlaskit/media-ui';
import { ItemViewer } from './item-viewer';
import { HeaderWrapper, ListWrapper, ItemViewerWrapper } from './styled';
import { Navigation } from './navigation';
import Header from './header';
import { MediaViewerExtensions } from '../components/types';

export type Props = Readonly<
  {
    onClose?: () => void;
    onNavigationChange?: (selectedItem: Identifier) => void;
    defaultSelectedItem: Identifier;
    items: Identifier[];
    mediaClient: MediaClient;
    extensions?: MediaViewerExtensions;
    onSidebarButtonClick?: () => void;
    isSidebarVisible?: boolean;
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

  async componentDidMount() {
    // TODO: limit how many items to preload? 10?
    const { mediaClient, defaultSelectedItem, items } = this.props;
    const collectionName = isFileIdentifier(defaultSelectedItem)
      ? defaultSelectedItem.collectionName
      : undefined;
    const fileIds = items.map(item => {
      if (isFileIdentifier(item)) {
        return item.id;
      }
    });
    const resolvedFileIds = await Promise.all(fileIds);
    console.log({ resolvedFileIds });
    // TODO: create filesToPreload(identifiers: Identifier[]): string[]
    resolvedFileIds.forEach(fileId => {
      if (fileId) {
        mediaClient.file.getFileState(fileId, { collectionName });
      }
    });
  }

  render() {
    const { items } = this.props;

    return this.renderContent(items);
  }

  private renderViewer = () => {
    const {
      mediaClient,
      onClose,
      showControls,
      isSidebarVisible,
      items,
    } = this.props;
    const { selectedItem, previewCount } = this.state;
    const selectedItemIndex = items.findIndex(identifier =>
      isFileIdentifier(selectedItem) && isFileIdentifier(identifier)
        ? selectedItem.id === identifier.id
        : false,
    );
    // const nextItemIndex = selectedItemIndex !== -1 ? selectedItemIndex + 1 : -1;
    // const nextItem = items[nextItemIndex];
    const classnames = {
      '-2': 'next-next-item',
      '-1': 'next-item',
      '0': 'current-item',
      '1': 'prev-item',
      '2': 'prev-prev-item',
    };
    const viewers = items.map((identifier, currentIndex) => {
      const delta = selectedItemIndex - currentIndex;
      if (Math.abs(delta) <= 2) {
        const className = classnames[delta.toString()];
        console.log(delta.toString(), { className });
        const key = generateIdentifierKey(identifier);
        console.log({ key });
        return (
          <ItemViewer
            key={generateIdentifierKey(identifier)}
            className={className}
            mediaClient={mediaClient}
            identifier={identifier}
            showControls={showControls}
            onClose={onClose}
            previewCount={previewCount}
            isSidebarVisible={isSidebarVisible}
          />
        );
      }
    });
    // console.log({selectedItemIndex, nextItemIndex})
    return (
      <ItemViewerWrapper className="item-viewer-wrapper">
        {viewers}
      </ItemViewerWrapper>
    );
  };

  renderContent(items: Identifier[]) {
    const {
      mediaClient,
      onClose,
      extensions,
      onSidebarButtonClick,
      isSidebarVisible,
    } = this.props;
    const { selectedItem } = this.state;

    return (
      <ListWrapper>
        <HeaderWrapper className={hideControlsClassName}>
          <Header
            mediaClient={mediaClient}
            identifier={selectedItem}
            onClose={onClose}
            extensions={extensions}
            onSidebarButtonClick={onSidebarButtonClick}
            isSidebarVisible={isSidebarVisible}
          />
        </HeaderWrapper>
        {this.renderViewer()}
        <Navigation
          items={items}
          selectedItem={selectedItem}
          onChange={this.onNavigationChange}
        />
      </ListWrapper>
    );
  }

  onNavigationChange = (selectedItem: Identifier) => {
    const { onNavigationChange, showControls } = this.props;
    if (onNavigationChange) {
      onNavigationChange(selectedItem);
    }
    if (showControls) {
      showControls();
    }

    this.setState({ selectedItem, previewCount: this.state.previewCount + 1 });
  };
}
