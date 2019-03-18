import * as React from 'react';
import {
  floatingToolbar,
  messages,
  AnnotationToolbar,
} from '../../../../plugins/media/toolbar';
import { IntlProvider } from 'react-intl';
import {
  createEditorFactory,
  doc,
  p,
  randomId,
  mediaSingle,
  media,
  bodiedExtension,
  layoutSection,
  layoutColumn,
  ul,
  li,
  table,
  tr,
  td,
  storyMediaProviderFactory,
} from '@atlaskit/editor-test-helpers';

import commonMessages from '../../../../messages';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import {
  FloatingToolbarButton,
  FloatingToolbarCustom,
} from '../../../../plugins/floating-toolbar/types';
import { setNodeSelection } from '../../../../utils';
import { Command } from '../../../../types';
import { ReactElement } from 'react';
import { shallow } from 'enzyme';
import {
  MediaPluginState,
  stateKey,
} from '../../../../plugins/media/pm-plugins/main';
import Button from '../../../../plugins/floating-toolbar/ui/Button';

describe('media', () => {
  const createEditor = createEditorFactory<MediaPluginState>();

  const testCollectionName = `media-plugin-mock-collection-${randomId()}`;
  const temporaryFileId = `temporary:${randomId()}`;

  const createAnalyticsEvent = jest.fn().mockReturnValue({ fire() {} });

  const getFreshMediaProvider = () =>
    storyMediaProviderFactory({
      collectionName: testCollectionName,
      includeUserAuthProvider: true,
    });

  const editor = (doc: any) => {
    return createEditor({
      doc,
      editorProps: {
        media: {
          provider: getFreshMediaProvider(),
          allowMediaSingle: true,
        },
        allowExtension: true,
        allowLayouts: true,
        allowLists: true,
        allowTables: true,
        allowAnalyticsGASV3: true,
        analyticsHandler: jest.fn(),
      },
      createAnalyticsEvent,
      pluginKey: stateKey,
    });
  };

  const temporaryMedia = media({
    id: temporaryFileId,
    type: 'file',
    collection: testCollectionName,
    __fileMimeType: 'image/png',
    width: 100,
    height: 100,
  })();

  const temporaryMediaSingle = mediaSingle({ layout: 'center' })(
    temporaryMedia,
  );

  const docWithMediaSingle = doc(temporaryMediaSingle);

  describe('toolbar', () => {
    const intlProvider = new IntlProvider({ locale: 'en' });
    const { intl } = intlProvider.getChildContext();

    const removeTitle = intl.formatMessage(commonMessages.remove);

    it('has a remove button', () => {
      const { editorView } = editor(docWithMediaSingle);

      const toolbar = floatingToolbar(editorView.state, intl);
      expect(toolbar).toBeDefined();
      const removeButton = toolbar!.items.find(
        item => item.type === 'button' && item.title === removeTitle,
      );

      expect(removeButton).toBeDefined();
      expect(removeButton).toMatchObject({
        appearance: 'danger',
        icon: RemoveIcon,
      });
    });

    it('should render alignment, wrapping and breakout buttons in full page without resizing enabled', () => {
      const { editorView } = editor(docWithMediaSingle);

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        undefined,
        undefined,
        'full-page',
      );
      expect(toolbar).toBeDefined();
      expect(toolbar!.items.length).toEqual(11);
    });

    it('should only render alignment and wrapping buttons in full page when resizing is enabled', () => {
      const { editorView } = editor(docWithMediaSingle);

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        true,
        undefined,
        'full-page',
      );
      expect(toolbar).toBeDefined();
      expect(toolbar!.items.length).toEqual(8);
    });

    it('can render regular toolbar with annotation in full page', () => {
      const { editorView } = editor(docWithMediaSingle);

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        true,
        true,
        'full-page',
      );
      expect(toolbar).toBeDefined();
      expect(toolbar!.items.length).toEqual(9);
      const item = toolbar!.items.find(cmd => cmd.type === 'custom');
      expect(item).toBeDefined();
    });

    it('should not render any layout buttons when in comment', () => {
      const { editorView } = editor(docWithMediaSingle);

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        true,
        undefined,
        'comment',
      );
      expect(toolbar).toBeDefined();
      expect(toolbar!.items.length).toEqual(1);
    });

    it('should not render any layout buttons when inside a macro', () => {
      const { editorView } = editor(
        doc(
          bodiedExtension({
            extensionKey: 'extensionKey',
            extensionType: 'bodiedExtension',
          })(temporaryMediaSingle),
        ),
      );

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        true,
        undefined,
        'full-page',
      );
      expect(toolbar).toBeDefined();
      expect(toolbar!.items.length).toEqual(1);
    });

    it('should not render any layout buttons when inside columns', () => {
      const { editorView } = editor(
        doc(
          layoutSection(
            layoutColumn({ width: 50 })(p('')),
            layoutColumn({ width: 50 })(temporaryMediaSingle),
          ),
        ),
      );

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        true,
        undefined,
        'full-page',
      );
      expect(toolbar).toBeDefined();
      expect(toolbar!.items.length).toEqual(1);
    });

    it('should not render any layout buttons when inside a list item', () => {
      const { editorView } = editor(doc(ul(li(temporaryMediaSingle))));

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        true,
        undefined,
        'full-page',
      );
      expect(toolbar).toBeDefined();
      expect(toolbar!.items.length).toEqual(1);
    });

    it('should not render any layout buttons when inside a table', () => {
      const { editorView } = editor(
        doc(table()(tr(td()(temporaryMediaSingle)))),
      );

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        true,
        undefined,
        'full-page',
      );
      expect(toolbar).toBeDefined();
      expect(toolbar!.items.length).toEqual(1);
    });

    it('deletes a media single', () => {
      const { editorView } = editor(docWithMediaSingle);
      setNodeSelection(editorView, 0);

      const toolbar = floatingToolbar(editorView.state, intl);
      const removeButton = toolbar!.items.find(
        item => item.type === 'button' && item.title === removeTitle,
      ) as FloatingToolbarButton<Command>;

      removeButton.onClick(editorView.state, editorView.dispatch);
      expect(editorView.state.doc).toEqualDocument(doc(p()));
    });

    it('aligns a media single to the left', () => {
      const { editorView } = editor(docWithMediaSingle);
      setNodeSelection(editorView, 0);

      const alignLeftTitle = intl.formatMessage(commonMessages.alignImageLeft);

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        true,
        undefined,
        'full-page',
      );
      const button = toolbar!.items.find(
        item => item.type === 'button' && item.title === alignLeftTitle,
      ) as FloatingToolbarButton<Command>;

      button.onClick(editorView.state, editorView.dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(mediaSingle({ layout: 'align-start' })(temporaryMedia)),
      );
    });

    describe('image annotation', () => {
      const mockMediaContext = {
        file: {
          getCurrentState: jest.fn(() => {
            return Promise.resolve({
              status: 'success',
              mediaType: 'image',
            });
          }),
        },
      };

      it('has an AnnotationToolbar custom toolbar element', async () => {
        const { editorView, pluginState } = editor(docWithMediaSingle);
        await pluginState.setMediaProvider(getFreshMediaProvider());

        setNodeSelection(editorView, 0);

        const toolbar = floatingToolbar(
          editorView.state,
          intl,
          true,
          true,
          'full-page',
        );

        const annotateToolbarComponent = toolbar!.items.find(
          item => item.type === 'custom',
        ) as FloatingToolbarCustom<Command>;

        const annotationToolbar = shallow(annotateToolbarComponent.render(
          editorView,
        ) as ReactElement<any>);
        expect(annotationToolbar.instance()).toBeInstanceOf(AnnotationToolbar);
      });

      it('renders an annotate button when an image is selected', async () => {
        const toolbar = shallow(
          <AnnotationToolbar
            viewContext={mockMediaContext as any}
            id="1234"
            intl={intl}
          />,
        );

        await mockMediaContext.file.getCurrentState();

        expect(
          toolbar
            .find(Button)
            .first()
            .prop('title'),
        ).toEqual(messages.annotate.defaultMessage);
      });

      it('fires analytics when the annotate button is clicked', async () => {
        const { editorView, pluginState } = editor(docWithMediaSingle);
        await pluginState.setMediaProvider(getFreshMediaProvider());

        setNodeSelection(editorView, 0);

        const toolbar = shallow(
          <AnnotationToolbar
            viewContext={mockMediaContext as any}
            id="1234"
            intl={intl}
            view={editorView}
          />,
        );

        await mockMediaContext.file.getCurrentState();

        toolbar.find(Button).simulate('click');
        expect(createAnalyticsEvent).toHaveBeenCalledWith({
          action: 'clicked',
          actionSubject: 'media',
          actionSubjectId: 'annotateButton',
          eventType: 'ui',
        });
      });
    });
  });
});
