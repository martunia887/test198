import React, { Component } from 'react';
import { MediaViewerSidebar } from '../src';

// additional Atlaskit components
import { Card } from '@atlaskit/media-card';
import { MediaViewer } from '@atlaskit/media-viewer';
import { Identifier } from '@atlaskit/media-core';
import EditorPanelIcon from '@atlaskit/icon/glyph/editor/panel';

// shared example helpers
import {
  toSyncIdentifier,
  identifiers,
  mediaClientConfig,
  collectionName,
  SyncIdentifier,
} from '../example-helpers/index';
import MockSidebarContent from '../example-helpers/MockSidebarContent';
import * as styles from '../example-helpers/styled';

const firstItem = identifiers[0];

type Props = {};

type State = {
  selectedItem?: SyncIdentifier;
  isSidebarOpen: boolean;
};

export default class ExampleMediaCardWithSidebar extends Component<
  Props,
  State
> {
  state = {
    isSidebarOpen: false,
    selectedItem: undefined,
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

  openMediaViewer = async (identifier: Identifier) => {
    this.setState({
      selectedItem: await toSyncIdentifier(identifier),
    });
  };

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
            Media Card Integration Example (@atlaskit/media-card)
            <p>also uses: @atlaskit/media-viewer</p>
          </styles.Header>
          <Card
            identifier={firstItem}
            mediaClientConfig={mediaClientConfig}
            onClick={() => this.openMediaViewer(firstItem)}
          />
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
