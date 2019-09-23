import {
  createEditorFactory,
  doc,
  p,
  decisionList,
  decisionItem,
  sendKeyToPm,
  taskList,
  taskItem,
  mention,
  table,
  td,
  tdCursor,
  tdEmpty,
  tr,
  RefsNode,
} from '@atlaskit/editor-test-helpers';
import { uuid } from '@atlaskit/adf-schema';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import { MockMentionResource } from '@atlaskit/util-data-test';
import { Schema } from 'prosemirror-model';

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

  const scenarios = [
    {
      name: 'action',
      list: taskList,
      item: taskItem,
      listProps: { localId: 'local-uuid' },
      itemProps: { localId: 'local-uuid', state: 'TODO' },
    },
    {
      name: 'decision',
      list: decisionList,
      item: decisionItem,
      listProps: { localId: 'local-uuid' },
      itemProps: { localId: 'local-uuid' },
    },
  ];

  const test = (
    before: (schema: Schema) => RefsNode,
    after: (schema: Schema) => RefsNode,
    keys: string[],
  ) => {
    const { editorView } = editorFactory(before);
    keys.forEach(key => sendKeyToPm(editorView, key));
    expect(editorView.state).toEqualDocumentAndSelection(after);
  };

  scenarios.forEach(({ name, list, item, listProps, itemProps }) => {
    describe(name, () => {
      describe('Tab', () => {
        it('should do nothing on a first level list', () => {
          test(
            doc(list(listProps)(item(itemProps)('Hello{<>} World'))),
            doc(list(listProps)(item(itemProps)('Hello{<>} World'))),
            ['Tab'],
          );
        });
      });
    });
  });

  // indentation-specific tests
  describe('action', () => {
    const listProps = { localId: 'local-uuid' };
    const itemProps = { localId: 'local-uuid', state: 'TODO' };

    describe('Tab', () => {
      it('should indent top level items following the first', () => {
        test(
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Hello World'),
              taskItem(itemProps)('Say yall{<>} wanna live with the dream'),
            ),
          ),
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Hello World'),
              taskList(listProps)(
                taskItem(itemProps)('Say yall{<>} wanna live with the dream'),
              ),
            ),
          ),
          ['Tab'],
        );
      });

      it('should not indent items past 6 levels', () => {
        const nestedDoc = doc(
          taskList(listProps)(
            taskItem(itemProps)('Level 1'),
            taskList(listProps)(
              taskItem(itemProps)('Level 2'),
              taskList(listProps)(
                taskItem(itemProps)('Level 3'),
                taskList(listProps)(
                  taskItem(itemProps)('Level 4'),
                  taskList(listProps)(
                    taskItem(itemProps)('Level 5'),
                    taskList(listProps)(
                      taskItem(itemProps)(
                        'Say yall{<>} wanna live with the dream',
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        );

        test(nestedDoc, nestedDoc, ['Tab']);
      });
    });
  });
});
