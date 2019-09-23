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
      describe('Backspace', () => {
        describe(`when ${name}List exists before paragraph`, () => {
          it(`should merge paragraph with ${name}Item and preserve content`, () => {
            test(
              doc(list(listProps)(item(itemProps)('Hello')), p('{<>}World')),
              doc(list(listProps)(item(itemProps)('Hello{<>}World'))),
              ['Backspace'],
            );
          });

          it(`should remove paragraph with ${name}Item and preserve content`, () => {
            test(
              doc(list(listProps)(item(itemProps)('Hello')), p('{<>}')),
              doc(list(listProps)(item(itemProps)('Hello{<>}'))),
              ['Backspace'],
            );
          });

          it('should delete only internal node on backspace', () => {
            test(
              doc(
                list(listProps)(
                  item(itemProps)(
                    'Hello ',
                    mention({ id: '1234', text: '@Oscar Wallhult' })(),
                    '{<>}',
                  ),
                ),
              ),
              doc(list(listProps)(item(itemProps)('Hello {<>}'))),
              ['Backspace'],
            );
          });
        });

        describe(`when cursor is at the beginning of a ${name}Item`, () => {
          it('should convert item to paragraph, splitting the list', () => {
            test(
              doc(
                list(listProps)(
                  item(itemProps)('Hello'),
                  item(itemProps)('{<>}World'),
                  item(itemProps)('Cheese is great!'),
                ),
              ),
              doc(
                list(listProps)(item(itemProps)('Hello')),
                p('{<>}World'),
                list(listProps)(item(itemProps)('Cheese is great!')),
              ),
              ['Backspace'],
            );
          });

          it('should merge with previous item, when backspacing twice', () => {
            test(
              doc(
                list(listProps)(
                  item(itemProps)('Hello'),
                  item(itemProps)('{<>}World'),
                  item(itemProps)('Cheese is great!'),
                ),
              ),
              doc(
                list(listProps)(
                  item(itemProps)('Hello{<>}World'),
                  item(itemProps)('Cheese is great!'),
                ),
              ),
              ['Backspace', 'Backspace'],
            );
          });
        });

        describe(`when cursor is at the beginning of the first ${name}Item`, () => {
          it('should convert item to paragraph', () => {
            test(
              doc(
                list(listProps)(
                  item(itemProps)('{<>}Hello'),
                  item(itemProps)('World'),
                ),
              ),
              doc(p('{<>}Hello'), list(listProps)(item(itemProps)('World'))),
              ['Backspace'],
            );
          });

          it('should convert item to paragraph and remove the list if it is empty', () => {
            test(
              doc(list(listProps)(item(itemProps)('{<>}Hello World'))),
              doc(p('{<>}Hello World')),
              ['Backspace'],
            );
          });

          it(`should delete selection and keep ${name}Item`, () => {
            test(
              doc(list(listProps)(item(itemProps)('{<}Hello {>}World'))),
              doc(list(listProps)(item(itemProps)('{<>}World'))),
              ['Backspace'],
            );
          });
        });

        describe('when nested inside tables', () => {
          describe('when cursor is at the beginning of the first taskItem', () => {
            it('should convert item to paragraph and keep the cursor in the same cell', () => {
              test(
                doc(
                  table()(
                    tr(
                      tdEmpty,
                      td()(list(listProps)(item(itemProps)('{<>}'))),
                      tdEmpty,
                    ),
                  ),
                ),
                doc(table()(tr(tdEmpty, tdCursor, tdEmpty))),
                ['Backspace'],
              );
            });
          });
        });
      });
    });
  });

  // indentation-specific tests
  describe('action', () => {
    const listProps = { localId: 'local-uuid' };
    const itemProps = { localId: 'local-uuid', state: 'TODO' };

    describe('Backspace', () => {
      it('lifts nested task one level', () => {
        test(
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Top level'),
              taskList(listProps)(
                taskItem(itemProps)('{<>}Nested first'),
                taskItem(itemProps)('Nested first but also second'),
                taskList(listProps)(
                  taskItem(itemProps)('Nested second'),
                  taskList(listProps)(
                    taskItem(itemProps)('Nested third'),
                    taskItem(itemProps)('Nested fourth'),
                  ),
                ),
              ),
            ),
          ),
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Top level'),
              taskItem(itemProps)('{<>}Nested first'),
              taskList(itemProps)(
                taskItem(itemProps)('Nested first but also second'),
                taskList(listProps)(
                  taskItem(itemProps)('Nested second'),
                  taskList(listProps)(
                    taskItem(itemProps)('Nested third'),
                    taskItem(itemProps)('Nested fourth'),
                  ),
                ),
              ),
            ),
          ),
          ['Backspace'],
        );
      });

      it('splits nested lists and moves into text', () => {
        test(
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Top level'),
              taskItem(itemProps)('{<>}Now doc level'),
              taskList(listProps)(
                taskItem(itemProps)('Nested first but also second'),
                taskList(listProps)(
                  taskItem(itemProps)('Nested second'),
                  taskList(listProps)(
                    taskItem(itemProps)('Nested third'),
                    taskItem(itemProps)('Nested fourth'),
                  ),
                ),
              ),
            ),
          ),
          doc(
            taskList(listProps)(taskItem(itemProps)('Top level')),
            p('{<>}Now doc level'),
            taskList(listProps)(
              taskItem(itemProps)('Nested first but also second'),
              taskList(listProps)(
                taskItem(itemProps)('Nested second'),
                taskList(listProps)(
                  taskItem(itemProps)('Nested third'),
                  taskItem(itemProps)('Nested fourth'),
                ),
              ),
            ),
          ),
          ['Backspace'],
        );
      });

      it('joins to previous list after backspacing twice', () => {
        test(
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Top level'),
              taskItem(itemProps)('{<>}Now doc level'),
              taskList(listProps)(
                taskItem(itemProps)('Nested first but also second'),
                taskList(listProps)(
                  taskItem(itemProps)('Nested second'),
                  taskList(listProps)(
                    taskItem(itemProps)('Nested third'),
                    taskItem(itemProps)('Nested fourth'),
                  ),
                ),
              ),
            ),
          ),
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Top level{<>}Now doc level'),
              taskItem(itemProps)('Nested first but also second'),
              taskList(listProps)(
                taskItem(itemProps)('Nested second'),
                taskList(listProps)(
                  taskItem(itemProps)('Nested third'),
                  taskItem(itemProps)('Nested fourth'),
                ),
              ),
            ),
          ),
          ['Backspace', 'Backspace'],
        );
      });

      it('moves first item text into paragraph, leaving remaining tasks', () => {
        test(
          doc(
            taskList(listProps)(
              taskItem(itemProps)('{<>}Top level'),
              taskList(listProps)(taskItem(itemProps)('Nested first level')),
              taskItem(itemProps)('Also top level'),
              taskList(listProps)(taskItem(itemProps)('Also nested level')),
            ),
          ),
          doc(
            p('{<>}Top level'),
            taskList(listProps)(
              taskItem(itemProps)('Nested first level'),
              taskItem(itemProps)('Also top level'),
              taskList(listProps)(taskItem(itemProps)('Also nested level')),
            ),
          ),
          ['Backspace'],
        );
      });

      it('unindents and lifts all nested tasks up', () => {
        test(
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Top level'),
              taskItem(itemProps)('Now doc level'),
              taskList(listProps)(
                taskItem(itemProps)('{<>}Nested first but also second'),
                taskList(listProps)(
                  taskItem(itemProps)('Nested second'),
                  taskList(listProps)(
                    taskItem(itemProps)('Nested third'),
                    taskItem(itemProps)('Nested fourth'),
                  ),
                ),
              ),
            ),
          ),
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Top level'),
              taskItem(itemProps)('Now doc level'),
              taskItem(itemProps)('{<>}Nested first but also second'),
              taskList(listProps)(
                taskItem(itemProps)('Nested second'),
                taskList(listProps)(
                  taskItem(itemProps)('Nested third'),
                  taskItem(itemProps)('Nested fourth'),
                ),
              ),
            ),
          ),
          ['Backspace'],
        );
      });

      it('unindents and merges text for deeply nested', () => {
        test(
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Top level'),
              taskItem(itemProps)('Now doc level'),
              taskList(listProps)(
                taskItem(itemProps)('Nested first but also second'),
                taskList(listProps)(
                  taskItem(itemProps)('Nested second'),
                  taskList(listProps)(
                    taskItem(itemProps)('Nested third'),
                    taskItem(itemProps)('{<>}Nested fourth'),
                  ),
                ),
              ),
            ),
          ),
          doc(
            taskList(listProps)(
              taskItem(itemProps)('Top level'),
              taskItem(itemProps)('Now doc level'),
              taskList(listProps)(
                taskItem(itemProps)('Nested first but also second'),
                taskList(listProps)(
                  taskItem(itemProps)('Nested second'),
                  taskList(listProps)(
                    taskItem(itemProps)('Nested third{<>}Nested fourth'),
                  ),
                ),
              ),
            ),
          ),
          ['Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace'],
        );
      });
    });
  });
});
