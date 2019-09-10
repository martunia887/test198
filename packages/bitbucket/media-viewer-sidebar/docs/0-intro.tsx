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
  import React, { useState } from 'react';
  import InfoIcon from '@atlaskit/icon/glyph/info-icon';
  import { MediaViewer } from '@atlaskit/media-viewer';
  import { MediaViewerSidebar } from '@atlaskit/bitbucket-media-viewer-sidebar';
  import {
    createStorybookContext,
    defaultCollectionName,
  } from '@atlaskit/media-test-helpers';

  type State = {
    openMediaId: Identifier;
    openSidebarId: Identifier;
  };

  class ExampleViewer extends React.Component<{}, State> {
    state = {
      openMediaId: undefined,
      openSidebarId: undefined,
    };

    const mediaClientConfig = {
      authProvider: () => Promise.resolve({id: '', token: '', baseUrl: ''})
    }

    const items = [
      {
        id: 'some-valid-id-1',
        occurrenceKey: 'key1',
        type: 'file',
      },
      {
        id: 'some-valid-id-2',
        occurrenceKey: 'item-1',
        type: 'file',
      },
      {
        id: 'some-valid-id-2',
        occurrenceKey: 'item-2',
        type: 'file',
      },
    ];

    const selectedItem = items[1];

    const dataSource = {
      list: items,
    };

    // this is just a helper to format our dummy data
    // MediaViewer want file info formatted as an Identifier
    const getIdentifier = (fileDetails) => {
      return {
        name: fileDetails.name,
        id: fileDetails.id,
        mediaItemType: fileDetails.mediaItemType,
      }
    }

    openSidebar = mediaId => {
      this.setState({ openSidebarId: mediaId });
    };

    closeSidebar = () => {
      this.setState({ openSidebarId: undefined });
    };

    // when closing viewer we also need to close sidebar
    closeMediaViewer = () => {
      this.setState({
        openMediaId: undefined,
        openSidebarId: undefined,
      });
    };

    openMediaViewer = mediaId => {
      this.setState({
        openMediaId: mediaId,
        openSidebarId: undefined,
      });
    };

    updateSidebar = nextMediaId => {
      // wrapper could do whatever they wanted here
      if (nextMediaId !== this.state.openSidebarId) {
        this.setState({
          openSidebarId: nextMediaId,
        })
      }
    };

    getMetaForId = id => {
      // get metadata from attachments object using the id
      // return metadata object
    }

    getToggleAction () {
      const isSidebarOpen = !!this.state.openSidebarId;

      if(isSidebarOpen) {
        return ({
          icon: <InfoIcon />,
          label: 'Show sidebar',
          handler: this.openSidebar
        });
      } else {
        return ({
          icon: <InfoIcon />,
          label: 'Hide sidebar',
          handler: this.closeSidebar,
        });
      }
    }

    render() {
      const isSidebarOpen = !!this.state.openSidebarId;
      const isMediaViewerOpen = !!this.state.openMediaId;
      const identifierA = getIdentifier(fileA);
      const identifierB = getIdentifier(fileB);

      return (
        <>
          <button onClick={() => this.openMediaViewer(identifierA)}>
            Show
          </button>
          {isMediaViewerOpen && (
            <>
              <MediaViewer
                mediaClientConfig={mediaClientConfig}
                selectedItem={this.state.openMediaId}
                dataSource={{ list: [identifierA, identifierB] }}
                collectionName={'myCollection'}
                onClose={this.closeMediaViewer}
                onNavigationChange={this.updateSidebar}
                action={this.getToggleAction()}
              />
              {isSidebarOpen && (
                <MediaViewerSidebar>
                  <h2>File details</h2>
                  <MetadataTable meta={getMetaForId(this.state.openSidebarId)} />
                </MediaViewerSidebar>
              )}
            </>
          )}
        </>
      );
    }
  }
  `}

  ## About something

  Add more text...

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
