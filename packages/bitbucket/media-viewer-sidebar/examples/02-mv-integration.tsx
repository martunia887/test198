import React from 'react';
import InfoIcon from '@atlaskit/icon/glyph/info';
import { MediaViewer } from '@atlaskit/media-viewer';
import { MediaViewerSidebar } from '../src';
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
import MetadataTable from '../src/components/metadata-table';
import meta from '../example-helpers/meta/meta1';

type SyncIdentifier = Omit<Identifier, 'id'> & { id?: string };
interface State {
  openMediaId?: SyncIdentifier;
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
  state = {
    openMediaId: undefined,
  };

  openSidebar = async (mediaId: Identifier) => {
    this.setState({
      openMediaId: await toSyncIdentifier(mediaId),
    });
  };

  closeSidebar = () => {
    this.setState({ openMediaId: undefined });
  };

  // when closing viewer we also need to close sidebar
  closeMediaViewer = () => {
    this.setState({
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

  getMetaForId = ({ id }: SyncIdentifier) => ({
    ...meta,
    id,
  });

  getToggleAction = () => {
    const isSidebarOpen = !!this.state.openMediaId;

    if (isSidebarOpen) {
      return {
        icon: <InfoIcon label="show" />,
        label: 'Show sidebar',
        handler: this.openSidebar,
      };
    } else {
      return {
        icon: <InfoIcon label="hide" />,
        label: 'Hide sidebar',
        handler: this.closeSidebar,
      };
    }
  };

  render() {
    const { openMediaId } = this.state;
    const isMediaViewerOpen = !!openMediaId;

    return (
      <>
        <button onClick={() => this.openMediaViewer(items[0])}>Show</button>
        {isMediaViewerOpen && (
          <>
            <MediaViewer
              mediaClientConfig={mediaClientConfig}
              selectedItem={items[0]}
              dataSource={{ list: items }}
              collectionName={defaultCollectionName}
              onClose={this.closeMediaViewer}
              onNavigationChange={this.updateSidebar}
              //action={this.getToggleAction}
            />

            {openMediaId ? (
              <MediaViewerSidebar>
                <h2>File details</h2>
                <MetadataTable meta={this.getMetaForId(openMediaId!)} />
              </MediaViewerSidebar>
            ) : null}
          </>
        )}
      </>
    );
  }
}
