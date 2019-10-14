import {
  compareSelection,
  createEditorFactory,
  doc,
  p,
  decisionList,
  decisionItem,
  sendKeyToPm,
  taskList,
  taskItem,
} from '@atlaskit/editor-test-helpers';
import { uuid } from '@atlaskit/adf-schema';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import { MockMentionResource } from '@atlaskit/util-data-test';

describe('tasks and decisions - keymaps', () => {
  const createEditor = createEditorFactory();

  let createAnalyticsEvent: CreateUIAnalyticsEvent;

  beforeEach(() => {
    uuid.setStatic('local-uuid');
  });

  afterEach(() => {
    uuid.setStatic(false);
  });

  const editorFactory = (doc: any) => {
    createAnalyticsEvent = jest.fn(() => ({ fire() {} }));
    return createEditor({
      doc,
      editorProps: {
        allowAnalyticsGASV3: true,
        allowTables: true,
        allowTasksAndDecisions: true,
        mentionProvider: Promise.resolve(new MockMentionResource({})),
        allowNestedTasks: true,
      },
      createAnalyticsEvent,
    });
  };

  describe.each([
    [
      'action',
      taskList,
      taskItem,
      { localId: 'local-uuid' },
      { localId: 'local-uuid', state: 'TODO' },
    ],
    [
      'decision',
      decisionList,
      decisionItem,
      { localId: 'local-uuid' },
      { localId: 'local-uuid' },
    ],
  ])('%s', (name, list, item, listProps, itemProps) => {
    describe('Down Arrow', () => {
      it(`should navigate out of ${name}`, () => {
        const { editorView } = editorFactory(
          doc(list(listProps)(item(itemProps)('Hello world{<>}'))),
        );

        sendKeyToPm(editorView, 'ArrowDown');

        const expectedDoc = doc(
          list(listProps)(item(itemProps)('Hello world')),
          p('{<>}'),
        );

        expect(editorView.state.doc).toEqualDocument(expectedDoc);
        compareSelection(editorFactory, expectedDoc, editorView);
      });
    });
  });
});
