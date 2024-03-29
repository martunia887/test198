import { NodeSelection } from 'prosemirror-state';
import {
  compareSelection,
  createEditorFactory,
  doc,
  p,
  blockquote,
  decisionList,
  decisionItem,
  taskList,
  taskItem,
  mediaGroup,
  media,
  br,
  panel,
  insertText,
} from '@atlaskit/editor-test-helpers';
import { uuid } from '@atlaskit/adf-schema';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next';
import { ProviderFactory } from '@atlaskit/editor-common';
import { insertTaskDecision } from '../../../../plugins/tasks-and-decisions/commands';
import { TaskDecisionListType } from '../../../../plugins/tasks-and-decisions/types';
import tasksAndDecisionsPlugin from '../../../../plugins/tasks-and-decisions';
import mediaPlugin from '../../../../plugins/media';
import panelPlugin from '../../../../plugins/panel';

describe('tasks and decisions - commands', () => {
  const createEditor = createEditorFactory();

  const contextIdentifierProvider = Promise.resolve({
    containerId: 'DUMMY-CONTAINER-ID',
    objectId: 'DUMMY-OBJECT-ID',
    userContext: 'edit',
  });

  let createAnalyticsEvent: CreateUIAnalyticsEventSignature;
  let providerFactory: ProviderFactory;

  beforeEach(() => {
    uuid.setStatic('local-uuid');
  });

  afterEach(() => {
    uuid.setStatic(false);
  });

  const editorFactory = (doc: any) => {
    createAnalyticsEvent = jest.fn().mockReturnValue({ fire() {} });
    providerFactory = new ProviderFactory();
    providerFactory.setProvider(
      'contextIdentifierProvider',
      contextIdentifierProvider,
    );

    return createEditor({
      doc,
      editorPlugins: [tasksAndDecisionsPlugin, mediaPlugin(), panelPlugin],
      editorProps: { allowAnalyticsGASV3: true },
      createAnalyticsEvent,
      providerFactory,
    });
  };

  describe('insertTaskDecision', () => {
    const scenarios = [
      {
        name: 'action',
        listName: 'taskList' as TaskDecisionListType,
        list: taskList,
        item: taskItem,
        listProps: { localId: 'local-uuid' },
        itemProps: { localId: 'local-uuid', state: 'TODO' },
      },
      {
        name: 'decision',
        listName: 'decisionList' as TaskDecisionListType,
        list: decisionList,
        item: decisionItem,
        listProps: { localId: 'local-uuid' },
        itemProps: { localId: 'local-uuid' },
      },
    ];
    scenarios.forEach(
      ({ name, listName, list, item, listProps, itemProps }) => {
        describe(name, () => {
          it(`can convert paragraph node to ${name}`, () => {
            const { editorView } = editorFactory(doc(p('Hello{<>} World')));

            expect(insertTaskDecision(editorView, listName)).toBe(true);

            const expectedDoc = doc(
              list(listProps)(item(itemProps)('Hello{<>} World')),
            );
            expect(editorView.state.doc).toEqualDocument(expectedDoc);
            compareSelection(editorFactory, expectedDoc, editorView);
          });

          it(`can convert empty paragraph node to ${name}`, () => {
            const { editorView } = editorFactory(doc(p('{<>}')));
            expect(insertTaskDecision(editorView, listName)).toBe(true);

            const expectedDoc = doc(list(listProps)(item(itemProps)('{<>}')));
            expect(editorView.state.doc).toEqualDocument(expectedDoc);
            compareSelection(editorFactory, expectedDoc, editorView);
          });

          it(`can convert blockquote to ${name}`, () => {
            const { editorView } = editorFactory(
              doc(blockquote(p('Hello{<>} World'))),
            );
            expect(insertTaskDecision(editorView, listName)).toBe(true);
            expect(editorView.state.doc).toEqualDocument(
              doc(list(listProps)(item(itemProps)('Hello World'))),
            );
          });

          it(`can convert content with hardbreaks to ${name}`, () => {
            const { editorView } = editorFactory(
              doc(p('Hello', br(), ' World{<>}')),
            );
            expect(insertTaskDecision(editorView, listName)).toBe(true);

            const expectedDoc = doc(
              list(listProps)(item(itemProps)('Hello', br(), ' World{<>}')),
            );
            expect(editorView.state.doc).toEqualDocument(expectedDoc);
            compareSelection(editorFactory, expectedDoc, editorView);
          });

          it(`cannot convert media node to ${name}`, () => {
            const { editorView } = editorFactory(
              doc(
                mediaGroup(
                  media({
                    id: 'test',
                    type: 'file',
                    collection: 'blah',
                  })(),
                ),
              ),
            );
            const { state } = editorView;
            const { tr } = state;
            tr.setSelection(new NodeSelection(tr.doc.resolve(1)));
            expect(insertTaskDecision(editorView, listName)).toBe(false);
          });

          describe('when cursor is inside of a block node', () => {
            it(`should append an empty ${name} list after the parent block node`, () => {
              const { editorView } = editorFactory(doc(panel()(p('te{<>}xt'))));
              insertTaskDecision(editorView, listName);

              const expectedDoc = doc(
                panel()(p('text')),
                list(listProps)(item(itemProps)('{<>}')),
              );
              expect(editorView.state.doc).toEqualDocument(expectedDoc);
              compareSelection(editorFactory, expectedDoc, editorView);
            });
          });

          describe(`when cursor is inside empty ${name} item`, () => {
            it(`should not create another ${name} item`, () => {
              const { editorView } = editorFactory(
                doc(list(listProps)(item(itemProps)('{<>}'))),
              );
              insertTaskDecision(editorView, listName);

              const expectedDoc = doc(list(listProps)(item(itemProps)('{<>}')));
              expect(editorView.state.doc).toEqualDocument(expectedDoc);
              compareSelection(editorFactory, expectedDoc, editorView);
            });
            // TODO FS-2896 - change in behaviour
          });

          describe(`when cursor is inside non-empty ${name} item`, () => {
            it(`should add a task item to ${name} list`, () => {
              const { editorView } = editorFactory(
                doc(list(listProps)(item(itemProps)('Hello World{<>}'))),
              );
              insertTaskDecision(editorView, listName);

              const expectedDoc = doc(
                list(listProps)(
                  item(itemProps)('Hello World'),
                  item(itemProps)('{<>}'),
                ),
              );

              expect(editorView.state.doc).toEqualDocument(expectedDoc);
              compareSelection(editorFactory, expectedDoc, editorView);
            });
          });
        });
      },
    );

    describe('action/decisions', () => {
      it('can convert decision item to action', () => {
        const { editorView } = editorFactory(
          doc(
            decisionList({ localId: 'local-list' })(
              decisionItem({ localId: 'local-item' })('Hello World'),
            ),
          ),
        );
        expect(insertTaskDecision(editorView, 'taskList')).toBe(true);
        expect(editorView.state.doc).toEqualDocument(
          doc(
            taskList({ localId: 'local-uuid' })(
              taskItem({ localId: 'local-uuid', state: 'TODO' })('Hello World'),
            ),
          ),
        );
        // TODO FS-2896 - change in behaviour
      });

      it('can convert action item to decision', () => {
        const { editorView } = editorFactory(
          doc(
            taskList({ localId: 'local-uuid' })(
              taskItem({ localId: 'local-uuid' })('Hello World'),
            ),
          ),
        );
        expect(insertTaskDecision(editorView, 'decisionList')).toBe(true);
        expect(editorView.state.doc).toEqualDocument(
          doc(
            decisionList({ localId: 'local-uuid' })(
              decisionItem({ localId: 'local-uuid' })('Hello World'),
            ),
          ),
        );
        // TODO FS-2896 - change in behaviour
      });
    });

    describe('switching back and forth between types is possible FS-2800', () => {
      it('should change p -> taskList -> decisionList -> taskList', () => {
        const { editorView } = editorFactory(doc(p('Hello{<>}')));

        expect(insertTaskDecision(editorView, 'taskList')).toBe(true);
        expect(editorView.state.doc).toEqualDocument(
          doc(
            taskList({ localId: 'local-uuid' })(
              taskItem({ localId: 'local-uuid', state: 'TODO' })('Hello'),
            ),
          ),
        );

        expect(insertTaskDecision(editorView, 'decisionList')).toBe(true);
        expect(editorView.state.doc).toEqualDocument(
          doc(
            decisionList({ localId: 'local-uuid' })(
              decisionItem({ localId: 'local-uuid', state: 'DECIDED' })(
                'Hello',
              ),
            ),
          ),
        );

        expect(insertTaskDecision(editorView, 'taskList')).toBe(true);
        expect(editorView.state.doc).toEqualDocument(
          doc(
            taskList({ localId: 'local-uuid' })(
              taskItem({ localId: 'local-uuid', state: 'TODO' })('Hello'),
            ),
          ),
        );
      });
    });

    it('should change p -> decisionList -> taskList -> decisionList', () => {
      const { editorView } = editorFactory(doc(p('Hello{<>}')));

      expect(insertTaskDecision(editorView, 'decisionList')).toBe(true);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          decisionList({ localId: 'local-uuid' })(
            decisionItem({ localId: 'local-uuid', state: 'DECIDED' })('Hello'),
          ),
        ),
      );

      expect(insertTaskDecision(editorView, 'taskList')).toBe(true);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          taskList({ localId: 'local-uuid' })(
            taskItem({ localId: 'local-uuid', state: 'TODO' })('Hello'),
          ),
        ),
      );

      expect(insertTaskDecision(editorView, 'decisionList')).toBe(true);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          decisionList({ localId: 'local-uuid' })(
            decisionItem({ localId: 'local-uuid', state: 'DECIDED' })('Hello'),
          ),
        ),
      );
    });

    describe('analytics', () => {
      const generatePayload = (position: number, listSize: number) => ({
        action: 'inserted',
        actionSubject: 'document',
        actionSubjectId: 'action',
        eventType: 'track',
        attributes: {
          inputMethod: 'toolbar',
          containerAri: 'DUMMY-CONTAINER-ID',
          objectAri: 'DUMMY-OBJECT-ID',
          localId: 'local-uuid',
          listLocalId: 'local-uuid',
          userContext: 'edit',
          position,
          listSize,
        },
      });

      it('should fire analytics event when add new item when no parent list', async () => {
        const { editorView } = editorFactory(doc(p('{<>}')));
        await contextIdentifierProvider;
        insertTaskDecision(editorView, 'taskList');
        expect(createAnalyticsEvent).toHaveBeenCalledWith(
          generatePayload(0, 1),
        );
      });

      it('should fire analytics event when add item to existing list', async () => {
        const { editorView, sel } = editorFactory(doc(p('{<>}')));
        await contextIdentifierProvider;
        insertTaskDecision(editorView, 'taskList');
        insertText(editorView, 'task 1', sel + 1);
        insertTaskDecision(editorView, 'taskList');
        insertText(editorView, 'task 2', sel + 9);
        expect(createAnalyticsEvent).toHaveBeenCalledWith(
          generatePayload(1, 2),
        );
        insertTaskDecision(editorView, 'taskList');
        expect(createAnalyticsEvent).toHaveBeenCalledWith(
          generatePayload(2, 3),
        );
      });
    });
  });
});
