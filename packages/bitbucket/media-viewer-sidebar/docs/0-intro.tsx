import * as React from 'react';
import {
  md,
  code,
  Example,
  Props,
  AtlassianInternalWarning,
} from '@atlaskit/docs';

export default md`
${<AtlassianInternalWarning />}

MediaViewer Sidebar is a component for displaying metadata next to Atlaskit Media Viewer.

  ## Usage

  ### Using with the Atlaskit MediaViewer

  In this example, the button could be replaced with a FilmStrip containing Cards.

${code`
import React, { Component } from 'react';
import { MediaViewerSidebar } from '../src';

// additional Atlaskit components
import EditorPanelIcon from '@atlaskit/icon/glyph/editor/panel';
import { MediaViewer } from '@atlaskit/media-viewer';
import { Identifier } from '@atlaskit/media-core';

import MockSidebarContent from '../example-helpers/MockSidebarContent';
import * as styles from '../example-helpers/styled';


  const identifiers = [
    {
      id: 'some-valid-id-1',
      occurrenceKey: 'key1',
      mediaItemType: 'file',
    },
    {
      id: 'some-valid-id-2',
      occurrenceKey: 'item-1',
      mediaItemType: 'file',
    },
    {
      id: 'some-valid-id-2',
      occurrenceKey: 'item-2',
      mediaItemType: 'file',
    },
  ];

const firstItem = identifiers[0];

export default class SidebarWithMediaViewer extends Component<*,*> {
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
      selectedItem: firstItem,
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
        <button onClick={this.openMediaViewer}>Open</button>
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
                <p>Current identifier ID: {selectedItem.id}</p>
              </MediaViewerSidebar>
            )}
          </>
        )}
      </>
    );
  }
}
`}

  ## Sidebar

  The sidebar is simply a component that is styled to work with the Atlaskit MediaViewer as a sibling component.
  Using both components together, media IDs can be used to display rich metadata or other content within the sidebar.

  ${(
    <Example
      Component={require('../examples/01-basic').default}
      title="Basic component"
      source={require('!!raw-loader!../examples/01-basic')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/sidebar')}
    />
  )}
  `;
