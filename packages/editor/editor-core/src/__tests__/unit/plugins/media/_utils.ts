import { MediaAttributes } from '@atlaskit/adf-schema';
import { ProviderFactory } from '@atlaskit/editor-common';
import {
  randomId,
  media,
  mediaGroup,
  storyMediaProviderFactory,
  storyContextIdentifierProviderFactory,
  createEditorFactory,
} from '@atlaskit/editor-test-helpers';
import { ImagePreview, MediaFile } from '@atlaskit/media-picker/types';
import { EditorView } from 'prosemirror-view';

import {
  stateKey as mediaPluginKey,
  MediaPluginState,
} from '../../../../plugins/media/pm-plugins/main';
import { insertMediaGroupNode } from '../../../../plugins/media/utils/media-files';
import { EditorProps } from '../../../../types';

export const testCollectionName = `media-plugin-mock-collection-${randomId()}`;
export const temporaryFileId = `temporary:${randomId()}`;

export const temporaryMediaAttrs: MediaAttributes = {
  id: temporaryFileId,
  type: 'file',
  collection: testCollectionName,
};

export const temporaryMedia = media(temporaryMediaAttrs)();

export const temporaryMediaWithDimensions = (width = 256, height = 128) => {
  return media({
    ...temporaryMediaAttrs,
    width,
    height,
  })();
};

export const temporaryMediaGroup = mediaGroup(temporaryMedia);

export const imageFile: MediaFile = {
  id: '1',
  type: 'image/jpeg',
  name: 'quokka.jpg',
  size: 100,
  creationDate: 1553664168293,
};

export const imagePreview: ImagePreview = {
  dimensions: {
    height: 100,
    width: 100,
  },
  scaleFactor: 2,
};

export const getFreshMediaProvider = (collectionName = testCollectionName) =>
  storyMediaProviderFactory({
    collectionName,
    includeUserAuthProvider: true,
  });

export const waitForAllPickersInitialised = async (
  pluginState: MediaPluginState,
) => {
  while (pluginState.pickers.length < 1) {
    await new Promise(resolve => resolve());
  }
};

const createEditor = createEditorFactory<MediaPluginState>();
export const mediaEditor = (
  doc: any,
  additionalProps: Partial<EditorProps> = {},
  uploadErrorHandler?: () => void,
) => {
  const contextIdentifierProvider = storyContextIdentifierProviderFactory();
  const mediaProvider = getFreshMediaProvider();

  const providerFactory = ProviderFactory.create({
    mediaProvider,
    contextIdentifierProvider,
  });

  return createEditor({
    doc,
    editorProps: {
      uploadErrorHandler,
      media: {
        provider: mediaProvider,
        allowMediaSingle: true,
      },
      contextIdentifierProvider,
      ...additionalProps,
    },
    providerFactory,
    pluginKey: mediaPluginKey,
  });
};

/**
 * Inserts a media group node via `insertMediaGroupNode` with the
 * testing collection name.
 *
 * @param view The EditorView under test.
 * @param id The initially inserted id and __key for the media node.
 */
export const insertMediaGroupItem = (view: EditorView, id: string) => {
  insertMediaGroupNode(view, [{ id }], testCollectionName);

  return media({
    id,
    type: 'file',
    collection: testCollectionName,
  })();
};
