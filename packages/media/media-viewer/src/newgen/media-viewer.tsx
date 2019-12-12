import * as React from 'react';
import { SyntheticEvent, Component } from 'react';
import {
  MediaClient,
  Identifier,
  isFileIdentifier,
} from '@atlaskit/media-client';
import { IntlProvider, intlShape } from 'react-intl';
import { Shortcut } from '@atlaskit/media-ui';
import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
  UIAnalyticsEvent,
} from '@atlaskit/analytics-next';
import { mediaViewerModalEvent } from './analytics/media-viewer';
import FolderIcon from '@atlaskit/icon/glyph/folder';
import { closedEvent, ClosedInputType } from './analytics/closed';
import { channel } from './analytics/index';
import {
  GasPayload,
  GasScreenEventPayload,
} from '@atlaskit/analytics-gas-types';
import { ItemSource, MediaViewerFeatureFlags } from './domain';
import { List } from './list';
import { Collection } from './collection';
import { Content } from './content';
import { Blanket, SidebarWrapper } from './styled';
import { start } from 'perf-marks';
import {
  MediaViewerExtensions,
  MediaViewerExtensionsActions,
} from '../components/types';
import { ArchiveSidebar } from './viewers/archive-sidebar';
import { ZipEntry } from 'zipizape';
import { getArchiveEntriesFromIdentifier } from './viewers/archive';

export type Props = {
  onClose?: () => void;
  selectedItem?: Identifier;
  featureFlags?: MediaViewerFeatureFlags;
  mediaClient: MediaClient;
  itemSource: ItemSource;
  extensions?: MediaViewerExtensions;
} & WithAnalyticsEventsProps;

export interface State {
  isSidebarVisible: boolean;
  selectedIdentifier?: Identifier;
  shouldRenderDefaultExtension?: boolean;
}

export class MediaViewerComponent extends Component<Props, State> {
  state: State = {
    isSidebarVisible: false,
  };

  static contextTypes = {
    intl: intlShape,
  };

  private fireAnalytics = (payload: GasPayload | GasScreenEventPayload) => {
    const { createAnalyticsEvent } = this.props;
    if (createAnalyticsEvent) {
      const ev = createAnalyticsEvent(payload);
      ev.fire(channel);
    }
  };

  componentDidMount() {
    if (!this.defaultSelectedItem) {
      return;
    }

    this.checkShouldRenderDefaultExtension(this.defaultSelectedItem);
  }

  private checkShouldRenderDefaultExtension = async (
    identifier: Identifier,
  ) => {
    const { mediaClient } = this.props;

    if (!isFileIdentifier(identifier)) {
      return;
    }

    const fileState = await mediaClient.file.getCurrentState(
      await identifier.id,
      { collectionName: identifier.collectionName },
    );

    if (fileState.status === 'error') {
      return;
    }

    this.setState({
      shouldRenderDefaultExtension: fileState.mediaType === 'archive',
    });
  };

  UNSAFE_componentWillMount() {
    this.fireAnalytics(mediaViewerModalEvent());
    start('MediaViewer.SessionDuration');
  }

  onShortcutClosed = () => {
    this.sendClosedEvent('escKey');
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };

  onContentClose = (_e?: SyntheticEvent, analyticsEvent?: UIAnalyticsEvent) => {
    const { onClose } = this.props;
    if (
      analyticsEvent &&
      analyticsEvent.payload &&
      analyticsEvent.payload.actionSubject === 'button'
    ) {
      this.sendClosedEvent('button');
    }
    if (onClose) {
      onClose();
    }
  };

  private sendClosedEvent(input: ClosedInputType) {
    this.fireAnalytics(closedEvent(input));
  }

  private toggleSidebar = () => {
    this.setState({
      isSidebarVisible: !this.state.isSidebarVisible,
    });
  };

  private get defaultSelectedItem(): Identifier | undefined {
    const { itemSource, selectedItem } = this.props;

    if (itemSource.kind === 'COLLECTION') {
      return selectedItem;
    }

    const { items } = itemSource;
    const firstItem = items[0];

    return selectedItem || firstItem;
  }

  renderSidebar = () => {
    const extensions = this.getExtensions();
    const { isSidebarVisible, selectedIdentifier } = this.state;
    const sidebardSelectedIdentifier =
      selectedIdentifier || this.defaultSelectedItem;

    if (
      sidebardSelectedIdentifier &&
      isSidebarVisible &&
      extensions &&
      extensions.sidebar
    ) {
      return (
        <SidebarWrapper data-testid="media-viewer-sidebar-content">
          {extensions.sidebar.renderer(sidebardSelectedIdentifier, {
            close: this.toggleSidebar,
          })}
        </SidebarWrapper>
      );
    }
  };

  render() {
    const content = (
      <Blanket data-testid="media-viewer-popup">
        {<Shortcut keyCode={27} handler={this.onShortcutClosed} />}
        <Content onClose={this.onContentClose}>{this.renderContent()}</Content>
        {this.renderSidebar()}
      </Blanket>
    );

    return this.context.intl ? (
      content
    ) : (
      <IntlProvider locale="en">{content}</IntlProvider>
    );
  }

  private onNavigationChange = async (selectedIdentifier: Identifier) => {
    this.setState({ selectedIdentifier });
  };

  private getDefaultExtension = (): MediaViewerExtensions | undefined => {
    const { shouldRenderDefaultExtension } = this.state;
    const { mediaClient } = this.props;

    if (!shouldRenderDefaultExtension) {
      return undefined;
    }

    return {
      sidebar: {
        icon: <FolderIcon label="explore files" />,
        renderer: (
          selectedIdentifier: Identifier,
          actions: MediaViewerExtensionsActions,
        ) => (
          <ArchiveSidebarRenderer
            selectedIdentifier={selectedIdentifier}
            actions={actions}
            mediaClient={mediaClient}
          />
        ),
      },
    };
  };

  private getExtensions = () => {
    return this.props.extensions || this.getDefaultExtension();
  };

  private renderContent() {
    const { mediaClient, onClose, itemSource } = this.props;
    const { isSidebarVisible } = this.state;

    if (itemSource.kind === 'COLLECTION') {
      return (
        <Collection
          pageSize={itemSource.pageSize}
          defaultSelectedItem={this.defaultSelectedItem}
          collectionName={itemSource.collectionName}
          mediaClient={mediaClient}
          onClose={onClose}
          extensions={this.getExtensions()}
          onNavigationChange={this.onNavigationChange}
          onSidebarButtonClick={this.toggleSidebar}
        />
      );
    } else if (itemSource.kind === 'ARRAY') {
      const { items } = itemSource;
      // TODO: only show icon if Archive

      return (
        <List
          defaultSelectedItem={this.defaultSelectedItem || items[0]}
          items={items}
          mediaClient={mediaClient}
          onClose={onClose}
          extensions={this.getExtensions()}
          onNavigationChange={this.onNavigationChange}
          onSidebarButtonClick={this.toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />
      );
    } else {
      return null as never;
    }
  }
}

export const MediaViewer = withAnalyticsEvents()(MediaViewerComponent);

// TODO: move into different file
interface ArchiveSidebarRendererProps {
  selectedIdentifier: Identifier;
  actions: MediaViewerExtensionsActions;
  mediaClient: MediaClient;
}

interface ArchiveSidebarRendererState {
  entries: ZipEntry[];
}

class ArchiveSidebarRenderer extends Component<
  ArchiveSidebarRendererProps,
  ArchiveSidebarRendererState
> {
  state: ArchiveSidebarRendererState = {
    entries: [],
  };

  async componentDidMount() {
    const { selectedIdentifier, mediaClient } = this.props;
    const entries = await getArchiveEntriesFromIdentifier(
      selectedIdentifier,
      mediaClient,
    );

    this.setState({ entries });
  }

  private changeSelectedEntry = () => {};

  render() {
    const { entries } = this.state;

    return (
      <ArchiveSidebar
        entries={entries}
        onEntrySelected={this.changeSelectedEntry}
      />
    );
  }
}
