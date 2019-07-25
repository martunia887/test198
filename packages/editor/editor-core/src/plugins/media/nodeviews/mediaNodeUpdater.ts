import uuidV4 from 'uuid/v4';
import { updateMediaNodeAttrs } from '../commands';
import { MediaAttributes, ExternalMediaAttributes } from '@atlaskit/adf-schema';
import {
  DEFAULT_IMAGE_HEIGHT,
  DEFAULT_IMAGE_WIDTH,
} from '@atlaskit/editor-common';
import {
  getViewMediaClientConfigFromMediaProvider,
  getUploadMediaClientConfigFromMediaProvider,
} from '../utils/media-common';
import { getMediaClient } from '@atlaskit/media-client';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { EditorAppearance } from '../../../types';
import { MediaProvider } from '../types';
import { ContextIdentifierProvider } from '@atlaskit/editor-common';

export type RemoteDimensions = { id: string; height: number; width: number };

export interface MediaNodeUpdaterProps {
  view: EditorView;
  node: PMNode; // assumed to be media type node (ie. child of MediaSingle, MediaGroup)
  editorAppearance: EditorAppearance;
  mediaProvider?: Promise<MediaProvider>;
  contextIdentifierProvider: Promise<ContextIdentifierProvider>;
  isMediaSingle: boolean;
}

export class MediaNodeUpdater {
  props: MediaNodeUpdaterProps;

  constructor(props: MediaNodeUpdaterProps) {
    this.props = props;
  }

  // Updates the node with contextId if it doesn't have one already
  updateContextId = async () => {
    const attrs = this.getAttrs();
    if (!attrs) {
      return;
    }

    const { id } = attrs;
    const objectId = await this.getObjectId();

    updateMediaNodeAttrs(
      id,
      {
        __contextId: objectId,
        contextId: objectId,
      },
      this.props.isMediaSingle,
    )(this.props.view.state, this.props.view.dispatch);
  };

  getAttrs = (): MediaAttributes | undefined => {
    const { attrs } = this.props.node;
    if (attrs) {
      return attrs as MediaAttributes;
    }

    return undefined;
  };

  getObjectId = async (): Promise<string> => {
    const contextIdentifierProvider = await this.props
      .contextIdentifierProvider;

    return contextIdentifierProvider.objectId;
  };

  getCurrentContextId = (): string | undefined => {
    const attrs = this.getAttrs();
    if (!attrs) {
      return undefined;
    }

    return attrs.__contextId;
  };

  updateDimensions = (dimensions: RemoteDimensions) => {
    updateMediaNodeAttrs(
      dimensions.id,
      {
        height: dimensions.height,
        width: dimensions.width,
      },
      true,
    )(this.props.view.state, this.props.view.dispatch);
  };

  async getRemoteDimensions(): Promise<false | RemoteDimensions> {
    const mediaProvider = await this.props.mediaProvider;
    const { attrs } = this.props.node;
    if (!mediaProvider || !attrs) {
      return false;
    }
    const { height, type, width } = attrs as
      | MediaAttributes
      | ExternalMediaAttributes;
    if (type === 'external') {
      return false;
    }
    const { id, collection } = attrs as MediaAttributes;
    if (height && width) {
      return false;
    }

    // can't fetch remote dimensions on mobile, so we'll default them
    if (this.props.editorAppearance === 'mobile') {
      return {
        id,
        height: DEFAULT_IMAGE_HEIGHT,
        width: DEFAULT_IMAGE_WIDTH,
      };
    }

    const viewMediaClientConfig = await getViewMediaClientConfigFromMediaProvider(
      mediaProvider,
    );
    const mediaClient = getMediaClient({
      mediaClientConfig: viewMediaClientConfig,
    });
    const state = await mediaClient.getImageMetadata(id, {
      collection,
    });

    if (!state || !state.original) {
      return false;
    }

    return {
      id,
      height: state.original.height || DEFAULT_IMAGE_HEIGHT,
      width: state.original.width || DEFAULT_IMAGE_WIDTH,
    };
  }

  isNodeFromDifferentCollection = async (): Promise<boolean> => {
    const mediaProvider = await this.props.mediaProvider;
    if (!mediaProvider || !mediaProvider.uploadParams) {
      return false;
    }

    const currentCollectionName = mediaProvider.uploadParams.collection;
    const attrs = this.getAttrs();
    if (!attrs) {
      return false;
    }

    const { collection: nodeCollection, __contextId } = attrs;
    const contextId = __contextId || (await this.getObjectId());

    if (contextId && currentCollectionName !== nodeCollection) {
      return true;
    }

    return false;
  };

  copyNode = async () => {
    const mediaProvider = await this.props.mediaProvider;
    const attrs = this.getAttrs();
    if (!mediaProvider || !mediaProvider.uploadParams || !attrs) {
      return;
    }

    const currentCollectionName = mediaProvider.uploadParams.collection;
    const contextId = this.getCurrentContextId() || (await this.getObjectId());
    const uploadMediaClientConfig = await getUploadMediaClientConfigFromMediaProvider(
      mediaProvider,
    );
    if (!uploadMediaClientConfig) {
      return;
    }
    const mediaClient = getMediaClient({
      mediaClientConfig: uploadMediaClientConfig,
    });

    if (uploadMediaClientConfig.getAuthFromContext) {
      const auth = await uploadMediaClientConfig.getAuthFromContext(contextId);
      const { id, collection } = attrs;
      const source = {
        id,
        collection,
        authProvider: () => Promise.resolve(auth),
      };
      const destination = {
        collection: currentCollectionName,
        authProvider: uploadMediaClientConfig.authProvider,
        occurrenceKey: uuidV4(),
      };
      const mediaFile = await mediaClient.file.copyFile(source, destination);

      updateMediaNodeAttrs(
        source.id,
        {
          id: mediaFile.id,
          collection: currentCollectionName,
        },
        this.props.isMediaSingle,
      )(this.props.view.state, this.props.view.dispatch);
    }
  };
}
