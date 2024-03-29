import { ProviderFactory } from '@atlaskit/editor-common';
import { doc, createEditorFactory, p } from '@atlaskit/editor-test-helpers';

import {
  stateKey as mediaPluginKey,
  MediaPluginState,
  MediaProvider,
} from '../../../../plugins/media/pm-plugins/main';
import mediaPlugin from '../../../../plugins/media';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next';
import PickerFacade from '../../../../plugins/media/picker-facade';
import { MediaFile } from '../../../../../../../media/media-picker';
import {
  imagePreview,
  imageFile,
  getFreshMediaProvider,
  waitForAllPickersInitialised,
} from './_utils';

describe('Media Analytics', () => {
  const createEditor = createEditorFactory<MediaPluginState>();
  let mediaProvider: Promise<MediaProvider>;
  let providerFactory: ProviderFactory;
  let createAnalyticsEvent: CreateUIAnalyticsEventSignature;
  let pickers: PickerFacade[];

  const editor = (doc: any) => {
    mediaProvider = getFreshMediaProvider();
    providerFactory = ProviderFactory.create({ mediaProvider });
    createAnalyticsEvent = jest.fn(() => ({ fire() {} }));

    return createEditor({
      doc,
      editorPlugins: [
        mediaPlugin({
          provider: mediaProvider,
          allowMediaSingle: true,
          customDropzoneContainer: document.body,
        }),
      ],
      editorProps: { allowAnalyticsGASV3: true },
      providerFactory,
      createAnalyticsEvent,
      pluginKey: mediaPluginKey,
    });
  };

  beforeEach(async () => {
    const { pluginState } = editor(doc(p('{<>}')));
    await waitForAllPickersInitialised(pluginState);
    pickers = pluginState.pickers;
  });

  afterEach(() => {
    providerFactory.destroy();
  });

  describe('insert media', () => {
    const insertMedia = (media: MediaFile, pickerType = 'popup') => {
      const picker = pickers.find(p => p.type === pickerType);
      if (picker) {
        (picker.mediaPicker as any).emit('upload-preview-update', {
          file: media,
          preview: imagePreview,
        });
      } else {
        throw Error(`No media picker found for ${pickerType}`);
      }
    };

    const mediaPickers = [
      { picker: 'popup', inputMethod: 'cloudPicker' },
      { picker: 'clipboard', inputMethod: 'clipboard' },
      { picker: 'dropzone', inputMethod: 'dragAndDrop' },
    ];
    mediaPickers.forEach(mediaPicker => {
      it(`should fire analytics event when inserted via ${
        mediaPicker.picker
      }`, () => {
        insertMedia(imageFile, mediaPicker.picker);
        expect(createAnalyticsEvent).toHaveBeenCalledWith({
          action: 'inserted',
          actionSubject: 'document',
          actionSubjectId: 'media',
          attributes: {
            inputMethod: mediaPicker.inputMethod,
            fileExtension: 'jpg',
          },
          eventType: 'track',
        });
      });
    });

    it('should use correct file extension in analytics event', () => {
      insertMedia(imageFile);
      expect(createAnalyticsEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          attributes: expect.objectContaining({
            fileExtension: 'jpg',
          }),
        }),
      );
      (createAnalyticsEvent as jest.Mock).mockClear();

      const imageFilePng: MediaFile = {
        ...imageFile,
        id: '2',
        upfrontId: Promise.resolve('2'),
        type: 'image/png',
        name: 'bilby.png',
      };
      insertMedia(imageFilePng);
      expect(createAnalyticsEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          attributes: expect.objectContaining({
            fileExtension: 'png',
          }),
        }),
      );
    });

    it('should handle no file extension for inserted file in analytics event', () => {
      const imageNoExtension: MediaFile = {
        ...imageFile,
        id: '3',
        upfrontId: Promise.resolve('3'),
        type: '',
        name: 'bettong',
      };
      insertMedia(imageNoExtension);
      expect(createAnalyticsEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          attributes: expect.objectContaining({
            fileExtension: undefined,
          }),
        }),
      );
    });
  });
});
