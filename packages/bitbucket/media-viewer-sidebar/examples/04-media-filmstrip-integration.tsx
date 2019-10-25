import React, { Component } from 'react';
import { MediaViewerSidebar } from '../src';

// additional Atlaskit components
import { FilmstripView } from '@atlaskit/media-filmstrip';
import EditorPanelIcon from '@atlaskit/icon/glyph/editor/panel';
import { MediaViewer } from '@atlaskit/media-viewer';
import { Identifier } from '@atlaskit/media-core';
import { Card } from '@atlaskit/media-card';

// shared example helpers
import MockSidebarContent from '../example-helpers/MockSidebarContent';
import {
  toSyncIdentifier,
  identifiers,
  mediaClientConfig,
  collectionName,
  SyncIdentifier,
} from '../example-helpers/index';
import * as styles from '../example-helpers/styled';

const firstItem = identifiers[0];

type Props = {};

type State = {
  selectedItem?: SyncIdentifier;
  isSidebarOpen: boolean;
  offset: number;
  animate: boolean;
};

export default class ExampleMediaViewerWithSidebar extends Component<
  Props,
  State
> {
  state = {
    animate: false,
    isSidebarOpen: false,
    offset: 0,
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

  renderCards() {
    return identifiers.map((item, index) => (
      <>
        <Card
          key={index}
          identifier={item}
          mediaClientConfig={mediaClientConfig}
          onClick={() => this.openMediaViewer(item)}
        />
      </>
    ));
  }

  handleSizeChange = ({ offset }: Pick<State, 'offset'>) =>
    this.setState({ offset });

  handleScrollChange = ({
    animate,
    offset,
  }: Pick<State, 'offset' | 'animate'>) => this.setState({ animate, offset });

  render() {
    const { animate, isSidebarOpen, offset, selectedItem } = this.state;
    const isMediaViewerOpen = !!selectedItem;

    const toggleSidepanelActionProps = {
      icon: <EditorPanelIcon label={isSidebarOpen ? 'show' : 'hide'} />,
      onClick: this.toggleSidebar,
    };

    return (
      <>
        <styles.Section>
          <styles.Header>
            Media Filmstrip Integration Example (@atlaskit/media-filmstrip)
            <p>also uses: @atlaskit/media-viewer, @atlaskit/media-card</p>
          </styles.Header>

          <FilmstripView
            animate={animate}
            offset={offset}
            onSize={this.handleSizeChange}
            onScroll={this.handleScrollChange}
          >
            {this.renderCards()}
          </FilmstripView>
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
