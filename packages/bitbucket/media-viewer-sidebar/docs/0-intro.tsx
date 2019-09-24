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
  import React from 'react';
  import EditorPanelIcon from '@atlaskit/icon/glyph/editor/panel';
  import { MediaViewer } from '@atlaskit/media-viewer';
  import { Identifier } from '@atlaskit/media-core';
  import { MediaViewerSidebar } from '@atlaskit/bitbucket-media-viewer-sidebar';
  import {
    createStorybookContext,
    defaultCollectionName,
  } from '@atlaskit/media-test-helpers';

  interface State {
    openMediaId?: Identifier;
    isSidebarOpen: boolean;
  }

  const items = [
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

  class ExampleViewer extends React.Component<{}, State> {
    state = {
      openMediaId: undefined,
      isSidebarOpen: false,
    };

    mediaClientConfig = {
      authProvider: () =>
        Promise.resolve({
          id: '',
          token: '',
          baseUrl: '',
        }),
    };

    toggleSidebar = (isSidebarOpen: boolean) => {
      this.setState({ isSidebarOpen });
    };

    getToggleAction = () => {
      if (this.state.isSidebarOpen) {
        return {
          icon: <EditorPanelIcon label="show" />,
          label: 'Show sidebar',
          handler: () => this.toggleSidebar(false),
        };
      } else {
        return {
          icon: <EditorPanelIcon label="hide" />,
          label: 'Hide sidebar',
          handler: () => this.toggleSidebar(true),
        };
      }
    };

    closeMediaViewer = () => {
      this.setState({
        isSidebarOpen: false,
        openMediaId: undefined,
      });
    };

    openMediaViewer = async (mediaId: Identifier) => {
      this.setState({ openMediaId: mediaId });
    };

    updateSidebar = (nextMediaId: Identifier) => {
      if (nextMediaId !== this.state.openMediaId) {
        this.setState({
          openMediaId: nextMediaId,
        });
      }
    };

    render() {
      const { isSidebarOpen, openMediaId } = this.state;
      const isMediaViewerOpen = !!openMediaId;

      return (
        <>
          <button onClick={() => this.openMediaViewer(items[0])}>Show</button>
          {isMediaViewerOpen && (
            <>
              <MediaViewer
                action={this.getToggleAction()}
                mediaClientConfig={mediaClientConfig}
                selectedItem={items[0]}
                dataSource={{ list: items }}
                collectionName="myCollection"
                onClose={this.closeMediaViewer}
                onNavigationChange={
                  isSidebarOpen ? this.updateSidebar : undefined
                }
              />
              {isSidebarOpen && (
                <MediaViewerSidebar>
                  <h2>File details</h2>
                  {Object.keys(this.state.openMediaId!).map(k => (
                    <p>
                      {k}: {this.state.openMediaId![k]}
                    </p>
                  ))}
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
