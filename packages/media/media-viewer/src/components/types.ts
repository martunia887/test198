import { Identifier, MediaClient } from '@atlaskit/media-client';
import { MediaViewerFeatureFlags } from '../newgen/domain';

export interface MediaViewerDataSource {
  list?: Array<Identifier>;
  collectionName?: string;
}

export type EventHandler = (identifier: Identifier) => void;

// MediaViewer might want to consume an array of actions that can be loaded into the header
export interface ToolbarAction {
  icon?: React.ReactChild;
  onClick: EventHandler;
}

export interface MediaViewerProps {
  readonly mediaClient: MediaClient;
  readonly selectedItem: Identifier;
  readonly dataSource: MediaViewerDataSource;

  readonly collectionName: string;
  readonly pageSize?: number;

  readonly onClose?: () => void;

  readonly featureFlags?: MediaViewerFeatureFlags;

  readonly extraToolbarAction?: ToolbarAction;
  readonly onNavigate?: (selectedItem: Identifier) => void;
  readonly withSidebar?: boolean;
}
