import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { createEditorFactory, chaiPlugin } from '@atlaskit/editor-test-helpers';
import {
  doc,
  p,
  blockquote,
  decisionList,
  decisionItem,
  randomId,
  storyMediaProviderFactory,
  bodiedExtension,
} from '@atlaskit/editor-test-helpers';
import { EditorView } from 'prosemirror-view';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import { defaultSchema } from '@atlaskit/adf-schema';
import { Transformer, ProviderFactory } from '@atlaskit/editor-common';

import {
  MediaPluginState,
  stateKey as mediaPluginStateKey,
  MediaState,
} from './../../../src/plugins/media/pm-plugins/main';
import extensionPlugin from '../../../src/plugins/extension';
import tasksAndDecisionsPlugin from '../../../src/plugins/tasks-and-decisions';
import mediaPlugin from '../../../src/plugins/media';
import EditorActions from '../../../src/actions';
import { toJSON } from '../../../src/utils';
import { EventDispatcher } from '../../../src/event-dispatcher';

chai.use(chaiPlugin);

const jsonTransformer = new JSONTransformer();

const dummyTransformer: Transformer<string> = {
  parse: content => doc(blockquote(p(content)))(defaultSchema),
  encode: node => node.textContent,
};

describe('@atlaskit/editor-core', () => {
  describe('EditorActions', () => {
    const testTempFileId = `temporary:${randomId()}`;
    const testTempFileId2 = `temporary:${randomId()}`;
    const testCollectionName = `media-plugin-mock-collection-${randomId()}`;
    const mediaProvider = storyMediaProviderFactory({
      collectionName: testCollectionName,
      includeUserAuthProvider: true,
    });
    let providerFactory: ProviderFactory;

    const getMediaPluginState = (editorView: EditorView): MediaPluginState => {
      const mediaPluginState = mediaPluginStateKey.getState(
        editorView.state,
      ) as any;
      sinon
        .stub(mediaPluginState, 'collectionFromProvider' as any)
        .returns(testCollectionName);
      return mediaPluginState;
    };

    beforeEach(() => {
      providerFactory = new ProviderFactory();
      providerFactory.setProvider('mediaProvider', mediaProvider);
    });

    afterEach(() => {
      providerFactory.destroy();
    });

    describe('with waitForMediaUpload === true', () => {
      const createEditor = createEditorFactory();
      let editorActions: EditorActions;
      let editorView: EditorView;

      beforeEach(() => {
        const editor = createEditor({
          editorPlugins: [tasksAndDecisionsPlugin, mediaPlugin()],
          editorProps: {
            mediaProvider,
            waitForMediaUpload: true,
            uploadErrorHandler: () => {},
          },
          providerFactory,
        });
        editorView = editor.editorView;
        editorActions = new EditorActions();
        editorActions._privateRegisterEditor(editorView, new EventDispatcher());
      });

      describe('#focus', () => {
        describe('when focus has already been set', () => {
          beforeEach(() => {
            editorActions.focus();
          });

          it('should not set focus', () => {
            expect(editorActions.focus()).to.equal(false);
            expect(editorView.hasFocus()).to.equal(true);
          });

          it('should not scroll editor focus into view', () => {
            const dispatchSpy = sinon.spy(editorView, 'dispatch');
            editorActions.focus();
            expect(dispatchSpy.called).to.equal(false);
          });
        });

        describe('when focus has not been set', () => {
          it('should set focus', () => {
            expect(editorActions.focus()).to.equal(true);
            expect(editorView.hasFocus()).to.equal(true);
          });

          it('should scroll editor focus into view', () => {
            const dispatchSpy = sinon.spy(editorView, 'dispatch');
            editorActions.focus();
            const [tr] = dispatchSpy.firstCall.args;
            expect(tr.scrolledIntoView).to.equal(true);
          });
        });
      });

      describe('#blur', () => {
        it(`should not blur editor if it doesn't have focus`, () => {
          expect(editorActions.blur()).to.equal(false);
          expect(editorView.hasFocus()).to.equal(false);
        });

        it('should blur editor if it has focus', () => {
          editorActions.focus();
          expect(editorActions.blur()).to.equal(true);
          expect(editorView.hasFocus()).to.equal(false);
        });
      });

      describe('#clear', () => {
        it('should remove all content from an editor', () => {
          const tr = editorView.state.tr;
          tr.insertText('some text', 1);
          editorView.dispatch(tr);
          expect(editorView.state.doc.nodeSize).to.be.gt(4);
          expect(editorActions.clear()).to.equal(true);
          expect(editorView.state.doc.nodeSize).to.equal(4);
        });
      });

      describe('#getValue', function() {
        it('should return current editor value', async () => {
          const result = doc(p('some text'))(defaultSchema);
          const tr = editorView.state.tr;
          tr.insertText('some text', 1);
          editorView.dispatch(tr);

          const val = await editorActions.getValue();
          expect(val).to.not.equal(undefined);
          expect(val).to.deep.equal(toJSON(result));
        });

        describe('with waitForMediaUpload === true', () => {
          it('should not resolve when all media operations are pending', async () => {
            const provider = await mediaProvider;
            await provider.uploadContext;
            const mediaPluginState = getMediaPluginState(editorView);
            mediaPluginState.insertFile({ id: testTempFileId }, () => {});

            let resolved: any;

            editorActions
              .getValue()
              .then(potentialValue => (resolved = potentialValue));

            return new Promise(resolve => {
              window.setTimeout(() => {
                expect(resolved).to.equal(undefined);
                resolve();
              }, 50);
            });
          });

          it('should reject after timeout is reached', async () => {
            const provider = await mediaProvider;
            await provider.uploadContext;

            const mediaPluginState = getMediaPluginState(editorView);
            mediaPluginState.insertFile({ id: testTempFileId }, () => {});

            // Note: getValue() public API doesn't yet support timeout, but the
            //       plugin state does and we want to have coverage of that.
            return mediaPluginState
              .waitForPendingTasks(1)
              .then(() => {
                throw new Error('The promise should not resolve successfully');
              })
              .catch(() => {});
          });

          it('should not resolve when some media operations are pending', async () => {
            const provider = await mediaProvider;
            await provider.uploadContext;
            const mediaPluginState = getMediaPluginState(editorView);

            const evts: Array<(state: MediaState) => void> = [];
            mediaPluginState.insertFile({ id: testTempFileId }, evt =>
              evts.push(evt),
            );

            let resolved: any;

            editorActions
              .getValue()
              .then(potentialValue => (resolved = potentialValue));

            mediaPluginState.insertFile({ id: testTempFileId2 }, () => {});

            evts.forEach(cb =>
              cb({
                status: 'ready',
                id: testTempFileId,
                publicId: testTempFileId,
              }),
            );

            return new Promise(resolve => {
              window.setTimeout(() => {
                expect(resolved).to.equal(undefined);
                resolve();
              }, 50);
            });
          });

          it('should resolve after media have resolved', async () => {
            const provider = await mediaProvider;
            await provider.uploadContext;
            const mediaPluginState = getMediaPluginState(editorView);

            const evts: Array<(state: MediaState) => void> = [];
            mediaPluginState.insertFile({ id: testTempFileId }, evt =>
              evts.push(evt),
            );

            // To simulate async behavior, trigger ready on next tick
            window.setTimeout(() => {
              evts.forEach(cb =>
                cb({
                  status: 'ready',
                  id: testTempFileId,
                  publicId: testTempFileId,
                }),
              );
            }, 0);

            const value = (await editorActions.getValue()) as any;

            expect(value).to.be.an('object');
            expect(value.content).to.be.of.length(2);
            expect(value.content[0].type).to.be.eq('mediaGroup');
            expect(value.content[0].content[0].type).to.be.eq('media');
            expect(value.content[0].content[0].attrs.id).to.be.eq(
              testTempFileId,
            );
          });

          it('should resolve after processing status', async () => {
            const provider = await mediaProvider;
            await provider.uploadContext;
            await provider.viewContext;
            const mediaPluginState = getMediaPluginState(editorView);

            const evts: Array<(state: MediaState) => void> = [];
            mediaPluginState.insertFile({ id: testTempFileId }, evt =>
              evts.push(evt),
            );

            // To simulate async behavior, trigger ready on next tick
            window.setTimeout(() => {
              evts.forEach(cb =>
                cb({
                  status: 'ready',
                  id: testTempFileId,
                  publicId: testTempFileId,
                }),
              );
            }, 0);

            const value = (await editorActions.getValue()) as any;

            expect(value).to.be.an('object');
            expect(value.content).to.be.of.length(2);
            expect(value.content[0].type).to.be.eq('mediaGroup');
            expect(value.content[0].content[0].type).to.be.eq('media');
            expect(value.content[0].content[0].attrs.id).to.be.eq(
              testTempFileId,
            );
          });
        });
      });

      describe('#replaceDocument', () => {
        const newDoc = doc(p('some new content'))(defaultSchema);
        beforeEach(() => {
          const tr = editorView.state.tr;
          tr.insertText('some text', 1);
          editorView.dispatch(tr);
        });

        it('should update the document using the transformer when a transformer is set', () => {
          editorActions._privateRegisterEditor(
            editorView,
            new EventDispatcher(),
            dummyTransformer,
          );

          const wasSuccessful = editorActions.replaceDocument('Hello World!');
          expect(wasSuccessful).to.equal(true);
          const actual = editorView.state.doc;
          const expected = doc(blockquote(p('Hello World!')));
          expect(actual).to.deep.equal(expected);
        });

        it('should accept JSON version of a prosemirror node', async () => {
          editorActions.replaceDocument(newDoc.toJSON());
          const val = await editorActions.getValue();
          expect(val).to.deep.equal(toJSON(newDoc));
        });

        it('should accept stringified JSON version of a prosemirror node', async () => {
          editorActions.replaceDocument(JSON.stringify(newDoc.toJSON()));
          const val = await editorActions.getValue();
          expect(val).to.deep.equal(toJSON(newDoc));
        });

        it('should accept atlassian document format', async () => {
          const atlassianDoc = jsonTransformer.encode(newDoc);
          editorActions.replaceDocument(atlassianDoc);
          const val = await editorActions.getValue();
          expect(val).to.deep.equal(toJSON(newDoc));
        });

        it('should accept atlassian document format from a string', async () => {
          const atlassianDoc = jsonTransformer.encode(newDoc);
          editorActions.replaceDocument(JSON.stringify(atlassianDoc));
          const val = await editorActions.getValue();
          expect(val).to.deep.equal(toJSON(newDoc));
        });
      });

      describe('#appendText', () => {
        it('should append text to a document', async () => {
          const newDoc = doc(p('some text'))(defaultSchema).toJSON();
          const expected = doc(p('some text appended'))(defaultSchema);
          editorActions.replaceDocument(newDoc);
          editorActions.appendText(' appended');
          const val = await editorActions.getValue();
          expect(val).to.deep.equal(toJSON(expected));
        });

        it('should append text to a complex document', async () => {
          const newDoc = doc(
            p('some text'),
            blockquote(p('some quote')),
            p(''),
          )(defaultSchema);
          const expected = doc(
            p('some text'),
            blockquote(p('some quote')),
            p(' appended'),
          )(defaultSchema);
          editorActions.replaceDocument(newDoc.toJSON());
          editorActions.appendText(' appended');
          const val = await editorActions.getValue();
          expect(val).to.deep.equal(toJSON(expected));
        });

        it(`should return false if the last node of a document isn't a paragraph`, async () => {
          const newDoc = doc(
            p('some text'),
            blockquote(p('some quote')),
            decisionList({})(decisionItem({})()),
          )(defaultSchema);
          editorActions.replaceDocument(newDoc.toJSON());
          expect(editorActions.appendText(' appended')).to.equal(false);
        });
      });
    });

    describe('with waitForMediaUpload === false', () => {
      const createEditor = createEditorFactory();

      it('should resolve even when media operations are pending', async () => {
        const { editorView } = createEditor({
          editorPlugins: [mediaPlugin()],
          editorProps: {
            mediaProvider,
            waitForMediaUpload: false,
          },
          providerFactory,
        });
        const editorActions = new EditorActions();
        editorActions._privateRegisterEditor(editorView, new EventDispatcher());
        editorActions.focus();

        const mediaPluginState = getMediaPluginState(editorView);

        const provider = await mediaProvider;
        await provider.uploadContext;

        mediaPluginState.insertFile({ id: testTempFileId }, () => {});

        const value = (await editorActions.getValue()) as any;

        expect(value).to.be.an('object');
        expect(value.content).to.be.of.length(2);
        expect(value.content[0].type).to.be.eq('mediaGroup');
        expect(value.content[0].content[0].type).to.be.eq('media');
        expect(value.content[0].content[0].attrs.id).to.be.eq(testTempFileId);
      });
    });

    describe('#replaceSelection', () => {
      const createEditor = createEditorFactory();
      const newDoc = doc(p('some new {<>}content'));
      let editorActions: EditorActions;
      let editorView: EditorView;

      it('should accept JSON version of a prosemirror node', () => {
        const editor = createEditor({ doc: newDoc });
        editorView = editor.editorView;
        editorActions = new EditorActions();
        editorActions._privateRegisterEditor(editorView, new EventDispatcher());

        editorActions.replaceSelection(
          blockquote(p('text'))(defaultSchema).toJSON(),
        );
        expect(editorView.state.doc).to.deep.equal(
          doc(p('some new content'), blockquote(p('text'))),
        );
      });

      it('should accept stringified JSON version of a prosemirror node', () => {
        const editor = createEditor({ doc: newDoc });
        editorView = editor.editorView;
        editorActions = new EditorActions();
        editorActions._privateRegisterEditor(editorView, new EventDispatcher());

        editorActions.replaceSelection(
          JSON.stringify(blockquote(p('text'))(defaultSchema).toJSON()),
        );
        expect(editorView.state.doc).to.deep.equal(
          doc(p('some new content'), blockquote(p('text'))),
        );
      });

      it('should delete selection if passed an empty string', () => {
        const editor = createEditor({
          doc: doc(p('some new {<} hello {>}content')),
        });
        const editorView = editor.editorView;
        const editorActions = new EditorActions();
        editorActions._privateRegisterEditor(editorView, new EventDispatcher());
        editorActions.replaceSelection('');
        expect(editorView.state.doc).to.deep.equal(doc(p('some new content')));
      });

      it('should find a correct place in the document if inserting node is not allowed at the cursor position', () => {
        const attrs = {
          extensionType: 'com.atlassian.confluence.macro.core',
          extensionKey: 'expand',
        };
        const editor = createEditor({
          editorPlugins: [extensionPlugin],
          doc: doc(bodiedExtension(attrs)(p('{<>}'))),
        });
        const editorView = editor.editorView;
        const editorActions = new EditorActions();
        editorActions._privateRegisterEditor(editorView, new EventDispatcher());
        editorActions.replaceSelection(
          bodiedExtension(attrs)(p('hello'))(defaultSchema).toJSON(),
        );
        expect(editorView.state.doc).to.deep.equal(
          doc(
            bodiedExtension(attrs)(p('')),
            bodiedExtension(attrs)(p('hello')),
          ),
        );
      });
    });
  });
});
