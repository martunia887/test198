import { IntlProvider } from 'react-intl';
import { ProviderFactory } from '@atlaskit/editor-common';
import {
  createEditorFactory,
  doc,
  media,
  mediaSingle,
  storyContextIdentifierProviderFactory,
} from '@atlaskit/editor-test-helpers';
import { EditorView } from 'prosemirror-view';

import { MediaAttributes } from '../../../../../../../adf-schema/src';
import {
  FloatingToolbarButton,
  FloatingToolbarConfig,
} from '../../../../../plugins/floating-toolbar/types';
import { MediaOptions } from '../../../../../plugins/media';
import { messages as altTextMessages } from '../../../../../plugins/media/pm-plugins/alt-text/messages';
import {
  MediaPluginState,
  stateKey,
} from '../../../../../plugins/media/pm-plugins/main';
import { floatingToolbar } from '../../../../../plugins/media/toolbar';
import { Command } from '../../../../../types';
import { setNodeSelection } from '../../../../../utils';
import {
  findToolbarBtn,
  getToolbarItems,
} from '../../floating-toolbar/_helpers';
import {
  getFreshMediaProvider,
  temporaryFileId,
  testCollectionName,
} from '../_utils';

interface ToolbarWrapper {
  editorView: EditorView;
  toolbar: FloatingToolbarConfig | undefined;
  buttons: {
    altText: FloatingToolbarButton<Command> | undefined;
    editAltText: FloatingToolbarButton<Command> | undefined;
  };
}

describe('media', () => {
  const intlProvider = new IntlProvider({ locale: 'en' });
  const { intl } = intlProvider.getChildContext();

  const createEditor = createEditorFactory<MediaPluginState>();

  const editor = (doc: any, mediaPropsOverride: MediaOptions = {}) => {
    const contextIdentifierProvider = storyContextIdentifierProviderFactory();
    const mediaProvider = getFreshMediaProvider();
    const providerFactory = ProviderFactory.create({
      contextIdentifierProvider,
      mediaProvider,
    });
    const wrapper = createEditor({
      doc,
      editorProps: {
        media: {
          provider: mediaProvider,
          allowMediaSingle: true,
          ...mediaPropsOverride,
        },
      },
      providerFactory,
      pluginKey: stateKey,
    });
    return wrapper;
  };

  const dummyMediaAttributes: MediaAttributes = {
    id: temporaryFileId,
    type: 'file',
    collection: testCollectionName,
    __fileMimeType: 'image/png',
    __contextId: 'DUMMY-OBJECT-ID',
    width: 100,
    height: 100,
  };

  const temporaryMediaSingleWithoutAltText = mediaSingle({ layout: 'center' })(
    media(dummyMediaAttributes)(),
  );

  const temporaryMediaSingleWithAltText = mediaSingle({ layout: 'center' })(
    media({
      ...dummyMediaAttributes,
      alt: 'test',
    })(),
  );

  const docWithAltText = doc(temporaryMediaSingleWithAltText);
  const docWithoutAltText = doc(temporaryMediaSingleWithoutAltText);

  async function setupToolbar(
    doc: any,
    UNSAFE_allowAltTextOnImages = false,
  ): Promise<ToolbarWrapper> {
    // Setup editor
    const { editorView, pluginState } = editor(doc, {
      UNSAFE_allowAltTextOnImages,
    });
    await pluginState.setMediaProvider(getFreshMediaProvider());

    setNodeSelection(editorView, 0);

    const toolbar = floatingToolbar(editorView.state, intl, {
      UNSAFE_allowAltTextOnImages,
    });
    const items = getToolbarItems(toolbar!, editorView);

    return {
      editorView,
      toolbar,
      buttons: {
        altText: findToolbarBtn(
          items,
          intl.formatMessage(altTextMessages.altText),
        ),
        editAltText: findToolbarBtn(
          items,
          intl.formatMessage(altTextMessages.editAltText),
        ),
      },
    };
  }

  describe('Toolbar', () => {
    describe('Alt Text', () => {
      describe('when feature flag is off', () => {
        it('should hide alt text button', async () => {
          const { buttons } = await setupToolbar(docWithoutAltText, false);

          expect(buttons.altText).toBeUndefined();
          expect(buttons.editAltText).toBeUndefined();
        });
      });

      describe('when feature flag is on', () => {
        it('should show alt text button if there is no alt text in the image', async () => {
          const { buttons } = await setupToolbar(docWithoutAltText, true);

          expect(buttons.altText).toBeDefined();
          expect(buttons.editAltText).toBeUndefined();
        });

        it('should show edit alt text button if there is alt text in the image', async () => {
          const { buttons } = await setupToolbar(docWithAltText, true);

          expect(buttons.altText).toBeUndefined();
          expect(buttons.editAltText).toBeDefined();
        });
      });
    });
  });
});
