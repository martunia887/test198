import {
  createEditorFactory,
  doc,
  decisionList,
  decisionItem,
  taskList,
  taskItem,
  table,
  tr,
  td,
  layoutSection,
  layoutColumn,
  p,
  testKeymap,
} from '@atlaskit/editor-test-helpers';
import { uuid } from '@atlaskit/adf-schema';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import { MockMentionResource } from '@atlaskit/util-data-test';

describe('tasks and decisions - keymaps', () => {
  const createEditor = createEditorFactory();
  const editorProps = {
    allowAnalyticsGASV3: true,
    allowTables: true,
    allowTasksAndDecisions: true,
    mentionProvider: Promise.resolve(new MockMentionResource({})),
    allowNestedTasks: true,

    allowLayouts: true,
  };

  let createAnalyticsEvent: CreateUIAnalyticsEvent = jest.fn(() => ({
    fire() {},
  }));

  beforeEach(() => {
    uuid.setStatic('local-uuid');
  });

  afterEach(() => {
    uuid.setStatic(false);
  });

  const editorFactory = (doc: any) => {
    return createEditor({
      doc,
      editorProps,
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
    describe('Tab', () => {
      it('should do nothing on a first level list', () => {
        testKeymap(
          editorFactory,
          doc(list(listProps)(item(itemProps)('Hello{<>} World'))),
          doc(list(listProps)(item(itemProps)('Hello{<>} World'))),
          ['Tab'],
        );
      });
    });
  });

  // indentation-specific tests
  describe('action', () => {
    const listProps = { localId: 'local-uuid' };
    const itemProps = { localId: 'local-uuid', state: 'TODO' };

    describe('Tab', () => {
      it('should indent top level items following the first', () => {
        testKeymap(
          editorFactory,
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

      it('can indent in a table', () => {
        testKeymap(
          editorFactory,
          doc(
            table({})(
              tr(
                td()(
                  taskList(listProps)(
                    taskItem(itemProps)('Hello World'),
                    taskItem(itemProps)(
                      'Say yall{<>} wanna live with the dream',
                    ),
                  ),
                ),
              ),
            ),
          ),
          doc(
            table({})(
              tr(
                td()(
                  taskList(listProps)(
                    taskItem(itemProps)('Hello World'),
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

          ['Tab'],
        );
      });

      it('can indent in a layout', () => {
        testKeymap(
          editorFactory,
          doc(
            layoutSection(
              layoutColumn({ width: 50 })(
                taskList(listProps)(
                  taskItem(itemProps)('Hello World'),
                  taskItem(itemProps)('Say yall{<>} wanna live with the dream'),
                ),
              ),
              layoutColumn({ width: 50 })(p()),
            ),
          ),
          doc(
            layoutSection(
              layoutColumn({ width: 50 })(
                taskList(listProps)(
                  taskItem(itemProps)('Hello World'),
                  taskList(listProps)(
                    taskItem(itemProps)(
                      'Say yall{<>} wanna live with the dream',
                    ),
                  ),
                ),
              ),
              layoutColumn({ width: 50 })(p()),
            ),
          ),

          ['Tab'],
        );
      });

      it('should not indent past parent', () => {
        const nestedDoc = doc(
          taskList(listProps)(
            taskItem(itemProps)('Level 1'),
            taskList(listProps)(taskItem(itemProps)('Level {<>}2')),
          ),
        );

        testKeymap(editorFactory, nestedDoc, nestedDoc, ['Tab']);
      });

      it('should not indent past parent, even with sibling', () => {
        const nestedDoc = doc(
          taskList(listProps)(
            taskItem(itemProps)('Level 1'),
            taskList(listProps)(
              taskItem(itemProps)('Level {<>}2'),
              taskItem(itemProps)('I am indentable, however'),
            ),
          ),
        );

        testKeymap(editorFactory, nestedDoc, nestedDoc, ['Tab']);
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
                    taskItem(itemProps)(
                      'See, my nose is wide, my blood is honey and my',
                    ),
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

        testKeymap(editorFactory, nestedDoc, nestedDoc, ['Tab']);
      });

      it('cannot wrap children past 6 levels', () => {
        const nestedDoc = doc(
          taskList(listProps)(
            taskItem(itemProps)('The first item in the list'),
            taskItem(itemProps)('{<>}Level 1'),
            taskList(listProps)(
              taskItem(itemProps)('Level 2'),
              taskList(listProps)(
                taskItem(itemProps)('Level 3'),
                taskList(listProps)(
                  taskItem(itemProps)('Level 4'),
                  taskList(listProps)(
                    taskItem(itemProps)('Level 5'),
                    taskItem(itemProps)(
                      'See, my nose is wide, my blood is honey and my',
                    ),
                    taskList(listProps)(
                      taskItem(itemProps)('Say yall wanna live with the dream'),
                    ),
                  ),
                ),
              ),
            ),
          ),
        );

        testKeymap(editorFactory, nestedDoc, nestedDoc, ['Tab']);
      });

      it('can indent multiple tasks at same level', () => {
        testKeymap(
          editorFactory,
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
                taskList(listProps)(
                  taskItem(itemProps)(
                    "Ay-ya, ya'll never been {<}with the team",
                  ),
                  taskItem(itemProps)('Ay-ya, ya-ya-ya{>}, ya-ya-ya'),
                ),
                taskItem(itemProps)("Say ya'll wanna roll in the scene"),
              ),
            ),
          ),
          ['Tab'],
        );
      });
    });
  });

  describe('allowNestedTasks', () => {
    let simpleFactory = (doc: any) => {
      return createEditor({
        doc,
        editorProps: { ...editorProps, allowNestedTasks: false },
        createAnalyticsEvent,
      });
    };

    describe('action', () => {
      const listProps = { localId: 'local-uuid' };
      const itemProps = { localId: 'local-uuid', state: 'TODO' };

      describe('Tab', () => {
        it('does nothing without feature flag turned on', () => {
          const testDoc = doc(
            taskList(listProps)(
              taskItem(itemProps)('Hello World'),
              taskItem(itemProps)('Say yall{<>} wanna live with the dream'),
            ),
          );
          testKeymap(simpleFactory, testDoc, testDoc, ['Tab']);
        });
      });
    });
  });
});
