import React, { Component } from 'react';
import { MediaViewerSidebar } from '../src';

// additional Atlaskit components
import EditorPanelIcon from '@atlaskit/icon/glyph/editor/panel';
import { MediaViewer } from '@atlaskit/media-viewer';
import { Identifier } from '@atlaskit/media-core';

// shared example helpers
import MockSidebarContent from '../example-helpers/MockSidebarContent';
import {
  toSyncIdentifier,
  identifiers,
  SyncIdentifier,
  mediaClientConfig,
  collectionName,
} from '../example-helpers/index';
import * as styles from '../example-helpers/styled';

const firstItem = identifiers[0];

type Props = {};

type State = {
  selectedItem?: SyncIdentifier;
  isSidebarOpen: boolean;
};

export default class SidebarWithMediaViewer extends Component<Props, State> {
  state = {
    selectedItem: undefined,
    isSidebarOpen: false,
  };

  toggleSidebar = () => {
    this.setState(state => ({
      isSidebarOpen: !state.isSidebarOpen,
    }));
  };

  closeMediaViewer = () => {
    this.setState({
      isSidebarOpen: false,
      selectedItem: undefined,
    });
  };

  openMediaViewer = async () => {
    this.setState({
      selectedItem: await toSyncIdentifier(firstItem),
    });
  };

  // when user navigates left or right in media-viewer, we need to make sure
  // the sidebar is showing data for the current selected item
  updateSidebar = async (nextIdentifier: Identifier) => {
    this.setState({
      selectedItem: await toSyncIdentifier(nextIdentifier),
    });
  };

  render() {
    const { isSidebarOpen, selectedItem } = this.state;
    const isMediaViewerOpen = !!selectedItem;

    const toggleSidepanelActionProps = {
      icon: <EditorPanelIcon label={isSidebarOpen ? 'show' : 'hide'} />,
      onClick: this.toggleSidebar,
    };

    return (
      <>
        <styles.Section>
          <styles.Header>
            Media Viewer Integration Example (@atlaskit/media-viewer)
          </styles.Header>
          <button onClick={this.openMediaViewer}>Open</button>
        </styles.Section>
        {isMediaViewerOpen && (
          <>
            <MediaViewer
              withSidebar={isSidebarOpen}
              extraToolbarAction={toggleSidepanelActionProps}
              mediaClientConfig={mediaClientConfig}
              selectedItem={firstItem}
              dataSource={{ list: identifiers }}
              collectionName={collectionName}
              onClose={this.closeMediaViewer}
              onNavigate={this.updateSidebar}
            />
            {isSidebarOpen && (
              <MediaViewerSidebar>
                <MockSidebarContent data={selectedItem} />
              </MediaViewerSidebar>
            )}
          </>
        )}
      </>
    );
  }
}
