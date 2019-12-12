import * as React from 'react';
import {
  MediaClient,
  Identifier,
  isFileIdentifier,
  generateIdentifierKey,
  isSameIdentifier,
} from '@atlaskit/media-client';
import {
  hideControlsClassName,
  WithShowControlMethodProp,
} from '@atlaskit/media-ui';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ItemViewer } from './item-viewer';
import {
  HeaderWrapper,
  ListWrapper,
  ItemViewerWrapper,
  animationSpeedInMs,
} from './styled';
import { Navigation, NavigationDirection } from './navigation';
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
  prevSelectedItem?: Identifier;
  previewCount: number;
  direction: NavigationDirection;
};

export const clearlyTempAndExperimentalObjectUrlCache: {
  [key: string]: { objectUrl: string; orientation: number };
} = {};

export class List extends React.Component<Props, State> {
  state: State = {
    selectedItem: this.props.defaultSelectedItem,
    previewCount: 0,
    direction: 'next',
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
    // TODO: create filesToPreload(identifiers: Identifier[]): string[]
    resolvedFileIds.forEach(fileId => {
      if (fileId) {
        mediaClient.file.getFileState(fileId, { collectionName });
      }
    });
  }

  componentWillUnmount(): void {
    Object.keys(clearlyTempAndExperimentalObjectUrlCache).forEach(key => {
      URL.revokeObjectURL(
        clearlyTempAndExperimentalObjectUrlCache[key].objectUrl,
      );
      delete clearlyTempAndExperimentalObjectUrlCache[key];
    });
  }

  render() {
    const { items } = this.props;

    return this.renderContent(items);
  }

  private renderViewer = () => {
    const {
      showControls,
      mediaClient,
      onClose,
      isSidebarVisible,
      items,
    } = this.props;
    const { selectedItem } = this.state;

    const selectedItemIndex = items.findIndex(identifier =>
      isSameIdentifier(identifier, selectedItem),
    );

    const prerenderItems: Identifier[] = [];
    for (let i = selectedItemIndex - 2; i < selectedItemIndex + 3; i++) {
      if (i >= 0 && i < items.length && i !== selectedItemIndex) {
        prerenderItems.push(items[i]);
      }
    }

    return (
      <>
        {prerenderItems.map((item, i) => (
          <ItemViewerWrapper
            key={generateIdentifierKey(item)}
            className="item-viewer-wrapper hide-me"
          >
            <ItemViewer
              mediaClient={mediaClient}
              identifier={item}
              showControls={showControls}
              onClose={onClose}
              previewCount={this.state.previewCount}
              isSidebarVisible={isSidebarVisible}
            />
          </ItemViewerWrapper>
        ))}
        <TransitionGroup component={React.Fragment}>
          <CSSTransition
            key={'CSSTransition-' + generateIdentifierKey(selectedItem)}
            timeout={animationSpeedInMs}
            classNames="item-viewer"
          >
            {/* "item-viewer-wrapper" here is for debugging purposes (easier to see) */}
            <ItemViewerWrapper
              key={generateIdentifierKey(selectedItem)}
              className="item-viewer-wrapper"
            >
              <ItemViewer
                mediaClient={mediaClient}
                identifier={selectedItem}
                showControls={showControls}
                onClose={onClose}
                previewCount={this.state.previewCount}
                isSidebarVisible={isSidebarVisible}
              />
            </ItemViewerWrapper>
          </CSSTransition>
        </TransitionGroup>
      </>
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
    const { selectedItem, direction } = this.state;

    return (
      <ListWrapper
        className={direction === 'next' ? 'move-left' : 'move-right'}
      >
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

  onNavigationChange = (
    selectedItem: Identifier,
    direction: NavigationDirection,
  ) => {
    const { onNavigationChange, showControls } = this.props;
    if (onNavigationChange) {
      onNavigationChange(selectedItem);
    }
    if (showControls) {
      showControls();
    }

    this.setState(prevState => ({
      selectedItem,
      prevSelectedItem: prevState.selectedItem,
      previewCount: this.state.previewCount + 1,
      direction,
    }));
  };
}
