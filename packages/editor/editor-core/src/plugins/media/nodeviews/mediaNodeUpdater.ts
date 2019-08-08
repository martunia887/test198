import uuidV4 from 'uuid/v4';
import { updateMediaNodeAttrs } from '../commands';
import { MediaSingleNodeProps } from './types';
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

export type RemoteDimensions = { id: string; height: number; width: number };
export class MediaNodeUpdater {
  props: MediaSingleNodeProps;

  constructor(props: MediaSingleNodeProps) {
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
      true,
    )(this.props.view.state, this.props.view.dispatch);
  };

  getAttrs = (): MediaAttributes | undefined => {
    const { firstChild } = this.props.node;
    if (firstChild) {
      return firstChild.attrs as MediaAttributes;
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
    const { node, mediaPluginOptions } = this.props;
    const { firstChild } = node;
    if (!mediaProvider || !firstChild) {
      return false;
    }
    const { height, type, width } = firstChild.attrs as
      | MediaAttributes
      | ExternalMediaAttributes;
    if (type === 'external') {
      return false;
    }
    const { id, collection } = firstChild.attrs as MediaAttributes;
    if (height && width) {
      return false;
    }

    // can't fetch remote dimensions on mobile, so we'll default them
    if (mediaPluginOptions && !mediaPluginOptions.allowRemoteDimensionsFetch) {
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
        true,
      )(this.props.view.state, this.props.view.dispatch);
    }
  };
}
