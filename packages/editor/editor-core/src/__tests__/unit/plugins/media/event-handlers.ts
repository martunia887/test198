import {
  doc,
  mediaSingle,
  media,
  createEditorFactory,
} from '@atlaskit/editor-test-helpers';
import { EditorView } from 'prosemirror-view';
import { stateKey as mediaPluginKey } from '../../../../plugins/media/pm-plugins/main';
import { EditorProps } from '../../../../types';

const mediaMeta = {
  id: 'my-media-id',
  collection: 'TestCollection',
  occurrenceKey: '2',
};
const mediaNode = media({ ...mediaMeta, type: 'file' });
const mediaSinglePmNode: any = {
  child: jest.fn(() => ({
    attrs: mediaMeta,
  })),
};

describe('Media plugin event handlers', () => {
  const createEditor = createEditorFactory();
  const clickHandlerSpy = jest.fn();
  let editorView: EditorView;
  let plugin: Plugin;
  let handleClickOn: (direct: boolean) => boolean;

  const editor = (doc: any, editorProps: Partial<EditorProps>) =>
    createEditor({
      doc,
      editorProps: {
        media: {
          allowMediaSingle: true,
        },
        ...editorProps,
      },
      pluginKey: mediaPluginKey,
    });

  const initEditor = ({
    addClickEventHandler,
  }: { addClickEventHandler?: boolean } = {}) => {
    let editorProps = {};
    if (addClickEventHandler) {
      editorProps = {
        eventHandlers: {
          media: { onClick: clickHandlerSpy },
        },
      };
    }

    ({ editorView, plugin } = editor(
      doc(mediaSingle()(mediaNode())),
      editorProps,
    ));
    handleClickOn = (direct: boolean) =>
      (plugin as any).spec.props.handleClickOn(
        editorView,
        1,
        mediaSinglePmNode,
        1,
        {} as any,
        direct,
      );
  };

  beforeEach(() => {
    clickHandlerSpy.mockReset();
  });

  describe('clickHandler', () => {
    it('should call handler if media is directly clicked', () => {
      initEditor({ addClickEventHandler: true });
      handleClickOn(true);
      expect(clickHandlerSpy).toHaveBeenCalledWith(
        mediaMeta.id,
        mediaMeta.collection,
        mediaMeta.occurrenceKey,
      );
    });

    it('should not call handler if media is not directly clicked', () => {
      initEditor({ addClickEventHandler: true });
      handleClickOn(false);
      expect(clickHandlerSpy).not.toHaveBeenCalled();
    });

    it('should handle no handler being provided', () => {
      initEditor();
      handleClickOn(true);
      expect(clickHandlerSpy).not.toHaveBeenCalled();
    });
  });
});
