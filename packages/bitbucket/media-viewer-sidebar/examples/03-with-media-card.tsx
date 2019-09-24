import React from 'react';
import EditorPanelIcon from '@atlaskit/icon/glyph/editor/panel';
import { Card } from '@atlaskit/media-card';
import { MediaViewer } from '@atlaskit/media-viewer';
import {
  createStorybookMediaClientConfig,
  imageFileId,
  smallImageFileId,
  largeImageFileId,
  defaultCollectionName,
  externalImageIdentifier,
  videoFileId,
} from '@atlaskit/media-test-helpers';
import { Identifier } from '@atlaskit/media-core';

import { MediaViewerSidebar } from '../src';

type SyncIdentifier = Omit<Identifier, 'id'> & { id?: string };
interface State {
  openMediaId?: SyncIdentifier;
  isSidebarOpen: boolean;
}

const mediaClientConfig = createStorybookMediaClientConfig();

const items: Identifier[] = [
  imageFileId,
  smallImageFileId,
  externalImageIdentifier,
  largeImageFileId,
  videoFileId,
];

const toSyncIdentifier = async (id: Identifier) =>
  id.mediaItemType === 'file'
    ? {
        ...id,
        id: await id.id,
      }
    : {
        ...id,
        id: 'external file yo',
      };

export default class ExampleViewer extends React.Component<{}, State> {
  state = { openMediaId: undefined, isSidebarOpen: false };

  toggleSidebar = (isSidebarOpen: boolean) => {
    this.setState({ isSidebarOpen });
  };

  // when closing viewer we also need to close sidebar
  closeMediaViewer = () => {
    this.setState({
      isSidebarOpen: false,
      openMediaId: undefined,
    });
  };

  openMediaViewer = async (mediaId: Identifier) => {
    this.setState({
      openMediaId: await toSyncIdentifier(mediaId),
    });
  };

  updateSidebar = async (nextMediaId: Identifier) => {
    // wrapper could do whatever they wanted here
    if (nextMediaId !== this.state.openMediaId) {
      this.setState({
        openMediaId: await toSyncIdentifier(nextMediaId),
      });
    }
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

  render() {
    const { isSidebarOpen, openMediaId } = this.state;

    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {items.map((item, index) => (
            <>
              <Card
                key={index}
                identifier={item}
                mediaClientConfig={mediaClientConfig}
                onClick={() => this.openMediaViewer(item)}
              />
              <br />
            </>
          ))}
        </div>
        {openMediaId && (
          <>
            <MediaViewer
              action={this.getToggleAction()}
              mediaClientConfig={mediaClientConfig}
              selectedItem={openMediaId!}
              dataSource={{ list: items }}
              collectionName={defaultCollectionName}
              onClose={this.closeMediaViewer}
              onNavigationChange={
                isSidebarOpen ? this.updateSidebar : undefined
              }
            />

            {isSidebarOpen ? (
              <MediaViewerSidebar>
                <h2 style={{ color: 'white' }}>Details</h2>
                {Object.keys(openMediaId!).map(k => (
                  <p>
                    {k}: {openMediaId![k]}
                  </p>
                ))}
              </MediaViewerSidebar>
            ) : null}
          </>
        )}
      </>
    );
  }
}
