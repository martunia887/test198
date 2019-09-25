import {
  createEditorFactory,
  doc,
  decisionList,
  decisionItem,
  sendKeyToPm,
  taskList,
  taskItem,
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
      describe('Shift-Tab', () => {
        it('should do nothing on a first level list', () => {
          test(
            doc(list(listProps)(item(itemProps)('Hello{<>} World'))),
            doc(list(listProps)(item(itemProps)('Hello{<>} World'))),
            ['Shift-Tab'],
          );
        });
      });
    });
  });

  // indentation-specific tests
  describe('action', () => {
    const listProps = { localId: 'local-uuid' };
    const itemProps = { localId: 'local-uuid', state: 'TODO' };

    describe('Shift-Tab', () => {
      it('should do not unindent past first level', () => {
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
              taskItem(itemProps)('Say yall{<>} wanna live with the dream'),
            ),
          ),
          ['Shift-Tab'],
        );
      });

      it('can unindent to first level, without sibling', () => {
        test(
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Level 1'),
              taskList(listProps)(taskItem(itemProps)('Level {<>}2')),
            ),
          ),
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Level 1'),
              taskItem(itemProps)('Level {<>}2'),
            ),
          ),
          ['Shift-Tab'],
        );
      });

      it('can unindent to first level, even with sibling', () => {
        test(
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Level 1'),
              taskList(listProps)(
                taskItem(itemProps)('Level {<>}2'),
                taskItem(itemProps)('I am indentable, however'),
              ),
            ),
          ),
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Level 1'),
              taskItem(itemProps)('Level {<>}2'),
              taskList(listProps)(
                taskItem(itemProps)('I am indentable, however'),
              ),
            ),
          ),
          ['Shift-Tab'],
        );
      });

      it('can unindent to end of first level', () => {
        test(
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Level 1'),
              taskList(listProps)(
                taskItem(itemProps)('Level 2'),
                taskItem(itemProps)('I am {<>}indentable, however'),
              ),
            ),
          ),
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Level 1'),
              taskList(listProps)(taskItem(itemProps)('Level 2')),
              taskItem(itemProps)('I am {<>}indentable, however'),
            ),
          ),
          ['Shift-Tab'],
        );
      });

      it('can unindent multiple tasks at same level', () => {
        test(
          doc(
            taskList(listProps)(
              taskItem(itemProps)("Say ya'll wanna roll in the scene"),
              taskList(listProps)(
                taskItem(itemProps)("Ya'll wanna live in the dream"),
                taskItem(itemProps)("Ay-ya, ya'll never been {<}with the team"),
                taskItem(itemProps)('Ay-ya, ya-ya-ya{>}, ya-ya-ya'),
                taskItem(itemProps)("Say ya'll wanna roll in the scene"),
              ),
            ),
          ),
          doc(
            taskList(listProps)(
              taskItem(itemProps)("Say ya'll wanna roll in the scene"),
              taskList(listProps)(
                taskItem(itemProps)("Ya'll wanna live in the dream"),
              ),
              taskItem(itemProps)("Ay-ya, ya'll never been {<}with the team"),
              taskItem(itemProps)('Ay-ya, ya-ya-ya{>}, ya-ya-ya'),
              taskList(listProps)(
                taskItem(itemProps)("Say ya'll wanna roll in the scene"),
              ),
            ),
          ),
          ['Shift-Tab'],
        );
      });

      it('should lift all child taskLists and taskItems', () => {
        test(
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Top level'),
              taskList(listProps)(
                taskItem(itemProps)('Nested{<>} first'),
                taskList(listProps)(
                  taskItem(itemProps)('Nested second'),
                  taskList(listProps)(taskItem(itemProps)('Nested third')),
                ),
              ),
            ),
          ),
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Top level'),
              taskItem(itemProps)('Nested{<>} first'),
              taskList(listProps)(
                taskItem(itemProps)('Nested second'),
                taskList(listProps)(taskItem(itemProps)('Nested third')),
              ),
            ),
          ),
          ['Shift-Tab'],
        );
      });

      it('should lift only selected taskItems maintaining children', () => {
        test(
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Top level'),
              taskList(listProps)(
                taskItem(itemProps)('Nested{<>} first'),
                taskItem(itemProps)('Nested first but also second'),
                taskList(listProps)(
                  taskItem(itemProps)('Nested second'),
                  taskList(listProps)(taskItem(itemProps)('Nested third')),
                ),
              ),
            ),
          ),
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Top level'),
              taskItem(itemProps)('Nested{<>} first'),
              taskList(listProps)(
                taskItem(itemProps)('Nested first but also second'),
                taskList(listProps)(
                  taskItem(itemProps)('Nested second'),
                  taskList(listProps)(taskItem(itemProps)('Nested third')),
                ),
              ),
            ),
          ),
          ['Shift-Tab'],
        );
      });

      it('should lift only selected taskItems lifting children', () => {
        test(
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Top level'),
              taskList(listProps)(
                taskItem(itemProps)('Nested first'),
                taskItem(itemProps)('Nested{<>} first but also second'),
                taskList(listProps)(
                  taskItem(itemProps)('Nested second'),
                  taskList(listProps)(taskItem(itemProps)('Nested third')),
                ),
              ),
            ),
          ),
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Top level'),
              taskList(listProps)(taskItem(itemProps)('Nested first')),
              taskItem(itemProps)('Nested{<>} first but also second'),
              taskList(listProps)(
                taskItem(itemProps)('Nested second'),
                taskList(listProps)(taskItem(itemProps)('Nested third')),
              ),
            ),
          ),
          ['Shift-Tab'],
        );
      });
    });
  });
});
