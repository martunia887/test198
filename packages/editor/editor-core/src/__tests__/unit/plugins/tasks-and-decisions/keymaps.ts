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
import {
  CreateUIAnalyticsEvent,
  UIAnalyticsEvent,
} from '@atlaskit/analytics-next';
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
    createAnalyticsEvent = jest.fn(() => ({ fire() {} } as UIAnalyticsEvent));
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

  scenarios.forEach(({ name, list, item, listProps, itemProps }) => {
    describe(name, () => {
      describe('Enter', () => {
        describe(`when ${name}List is empty`, () => {
          it('should remove decisionList and replace with paragraph', () => {
            const { editorView } = editorFactory(
              doc(list(listProps)(item(itemProps)('{<>}'))),
            );

            sendKeyToPm(editorView, 'Enter');
            const expectedDoc = doc(p('{<>}'));
            expect(editorView.state.doc).toEqualDocument(expectedDoc);
            compareSelection(editorFactory, expectedDoc, editorView);
          });
        });

        describe(`when cursor is at the end of empty ${name}Item`, () => {
          it(`should remove ${name}Item and insert a paragraph after`, () => {
            const { editorView } = editorFactory(
              doc(
                p('before'),
                list(listProps)(
                  item(itemProps)('Hello World'),
                  item(itemProps)('{<>}'),
                ),
                p('after'),
              ),
            );

            sendKeyToPm(editorView, 'Enter');

            const expectedDoc = doc(
              p('before'),
              list(listProps)(item(itemProps)('Hello World')),
              p('{<>}'),
              p('after'),
            );

            expect(editorView.state.doc).toEqualDocument(expectedDoc);
            compareSelection(editorFactory, expectedDoc, editorView);
          });

          it(`should remove ${name}Item and insert a paragraph before`, () => {
            const { editorView } = editorFactory(
              doc(
                p('before'),
                list(listProps)(
                  item(itemProps)('{<>}'),
                  item(itemProps)('Hello World'),
                ),
                p('after'),
              ),
            );

            sendKeyToPm(editorView, 'Enter');

            const expectedDoc = doc(
              p('before'),
              p('{<>}'),
              list(listProps)(item(itemProps)('Hello World')),
              p('after'),
            );
            expect(editorView.state.doc).toEqualDocument(expectedDoc);
            compareSelection(editorFactory, expectedDoc, editorView);
          });

          it(`should split ${name}List and insert a paragraph when in middle`, () => {
            const { editorView } = editorFactory(
              doc(
                p('before'),
                list(listProps)(
                  item(itemProps)('Hello World'),
                  item(itemProps)('{<>}'),
                  item(itemProps)('Goodbye World'),
                ),
                p('after'),
              ),
            );

            sendKeyToPm(editorView, 'Enter');

            const expectedDoc = doc(
              p('before'),
              list(listProps)(item(itemProps)('Hello World')),
              p('{<>}'),
              list(listProps)(item(itemProps)('Goodbye World')),
              p('after'),
            );
            expect(editorView.state.doc).toEqualDocument(expectedDoc);
            compareSelection(editorFactory, expectedDoc, editorView);
          });
        });

        describe(`when cursor is at the end of non-empty ${name}Item`, () => {
          it(`should insert another ${name}Item`, () => {
            const { editorView } = editorFactory(
              doc(list(listProps)(item(itemProps)('Hello World{<>}'))),
            );

            sendKeyToPm(editorView, 'Enter');

            const expectedDoc = doc(
              list(listProps)(
                item(itemProps)('Hello World'),
                item(itemProps)('{<>}'),
              ),
            );

            expect(editorView.state.doc).toEqualDocument(expectedDoc);
            compareSelection(editorFactory, expectedDoc, editorView);
          });

          it(`should insert another ${name}Item when in middle of list`, () => {
            const { editorView } = editorFactory(
              doc(
                list(listProps)(
                  item(itemProps)('Hello World{<>}'),
                  item(itemProps)('Goodbye World'),
                ),
              ),
            );

            sendKeyToPm(editorView, 'Enter');

            const expectedDoc = doc(
              list(listProps)(
                item(itemProps)('Hello World'),
                item(itemProps)('{<>}'),
                item(itemProps)('Goodbye World'),
              ),
            );

            expect(editorView.state.doc).toEqualDocument(expectedDoc);
            compareSelection(editorFactory, expectedDoc, editorView);
          });
        });

        it(`should fire v3 analytics event when insert ${name}`, () => {
          const { editorView } = editorFactory(
            doc(list(listProps)(item(itemProps)('Hello World{<>}'))),
          );

          sendKeyToPm(editorView, 'Enter');

          expect(createAnalyticsEvent).toHaveBeenCalledWith({
            action: 'inserted',
            actionSubject: 'document',
            actionSubjectId: name,
            attributes: expect.objectContaining({ inputMethod: 'keyboard' }),
            eventType: 'track',
          });
        });
      });

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
});
