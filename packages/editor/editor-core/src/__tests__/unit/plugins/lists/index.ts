import { pluginKey } from '../../../../plugins/lists/pm-plugins/main';
import {
  createEditorFactory,
  sendKeyToPm,
  doc,
  h1,
  ol,
  ul,
  li,
  p,
  panel,
  media,
  mediaSingle,
  randomId,
  br,
  code_block,
  underline,
  simulatePlatform,
  Platforms,
  insertText,
  layoutSection,
  layoutColumn,
  breakout,
} from '@atlaskit/editor-test-helpers';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import {  } from 'prosemirror-view';
import {
  toggleOrderedList,
  toggleBulletList,
} from '../../../../plugins/lists/commands';
import { insertMediaAsMediaSingle } from '../../../../plugins/media/utils/media-single';
import { GapCursorSelection } from '../../../../plugins/gap-cursor';
import { AnalyticsHandler } from '../../../../analytics';
import { INPUT_METHOD } from '../../../../plugins/analytics';

// TODO: Explore node rejection
describe.skip('lists', () => {
  const createEditor = createEditorFactory();
  let createAnalyticsEvent: CreateUIAnalyticsEvent;
  let analyticsHandler: AnalyticsHandler;

  const editor = (doc: any, trackEvent?: () => {}) => {
    createAnalyticsEvent = jest.fn(() => ({ fire() {} }));
    analyticsHandler = trackEvent || jest.fn();
    return createEditor({
      doc,
      editorProps: {
        appearance: 'full-page',
        analyticsHandler: analyticsHandler,
        allowCodeBlocks: true,
        allowAnalyticsGASV3: true,
        allowPanel: true,
        allowLists: true,
        allowBreakout: true,
        allowLayouts: { allowBreakout: true },
        media: { allowMediaSingle: true },
      },
      createAnalyticsEvent,
      pluginKey,
    });
  };

  const testCollectionName = `media-plugin-mock-collection-${randomId()}`;
  const temporaryFileId = `temporary:${randomId()}`;

  describe('keymap', () => {
    let trackEvent: jest.SpyInstance<AnalyticsHandler>;
    beforeEach(() => {
      trackEvent = jest.fn();
    });

    describe('when hit enter', () => {
      it('should split list item', () => {
        const {  } = editor(
          doc(ul(li(p('text{<>}')))),
          trackEvent as any,
        );
        sendKeyToPm(, 'Enter');
        expect(.state.doc).toEqualDocument(
          doc(ul(li(p('text')), li(p()))),
        );
      });
    });

    describe('when hit Tab', () => {
      let : ;
      beforeEach(() => {
        ({  } = editor(doc(ol(li(p('text')), li(p('text{<>}'))))));
        sendKeyToPm(, 'Tab');
      });

      it('should create a sublist', () => {
        expect(.state.doc).toEqualDocument(
          doc(ol(li(p('text'), ol(li(p('text{<>}')))))),
        );
      });

      it('should call indent analytics event', () => {
        expect(analyticsHandler).toHaveBeenCalledWith(
          'atlassian.editor.format.list.indent.keyboard',
        );
      });

      it('should call indent analytics V3 event', () => {
        expect(createAnalyticsEvent).toHaveBeenCalledWith({
          action: 'formatted',
          actionSubject: 'text',
          eventType: 'track',
          actionSubjectId: 'indentation',
          attributes: {
            inputMethod: 'keyboard',
            previousIndentationLevel: 1,
            newIndentLevel: 2,
            direction: 'indent',
            indentType: 'list',
          },
        });
      });
    });

    describe('when hit Backspace', () => {
      const backspaceCheck = (beforeDoc: any, afterDoc: any) => {
        const {  } = editor(beforeDoc);
        sendKeyToPm(, 'Backspace');

        const expectedDoc = afterDoc(.state.schema);
        expect(.state.doc.toJSON()).toEqual(expectedDoc.toJSON());

        const { state } = ;
        if (expectedDoc.refs['<']) {
          expect(state.selection.from).toEqual(expectedDoc.refs['<']);
          expect(state.selection.to).toEqual(expectedDoc.refs['>']);
        } else {
          expect(state.selection.from).toEqual(expectedDoc.refs['<>']);
          expect(state.selection.empty).toBe(true);
        }
      };

      it('should outdent a first level list item to paragraph', () => {
        backspaceCheck(
          doc(ol(li(p('text')), li(p('{<>}')))),
          doc(ol(li(p('text'))), p('{<>}')),
        );
      });

      it('should outdent a first level list item to paragraph, with content', () => {
        backspaceCheck(
          doc(ol(li(p('text')), li(p('{<>}second text')))),
          doc(ol(li(p('text'))), p('{<>}second text')),
        );
      });

      it('should outdent a second level list item to first level', () => {
        backspaceCheck(
          doc(ol(li(p('text'), ol(li(p('{<>}')))))),
          doc(ol(li(p('text')), li(p('{<>}')))),
        );
      });

      it('should outdent a second level list item to first level, with content', () => {
        backspaceCheck(
          doc(ol(li(p('text'), ol(li(p('{<>}subtext')))))),
          doc(ol(li(p('text')), li(p('{<>}subtext')))),
        );
      });

      it('should move paragraph content back to previous (nested) list item', () => {
        backspaceCheck(
          doc(ol(li(p('text'), ol(li(p('text'))))), p('{<>}after')),
          doc(ol(li(p('text'), ol(li(p('text{<>}after')))))),
        );
      });

      it('keeps nodes same level as backspaced list item together in same list', () => {
        backspaceCheck(
          doc(
            ol(li(p('{<>}A'), ol(li(p('B')))), li(p('C'))),

            p('after'),
          ),
          doc(
            p('{<>}A'),
            ol(li(p('B')), li(p('C'))),

            p('after'),
          ),
        );
      });

      it('merges two single-level lists when the middle paragraph is backspaced', () => {
        backspaceCheck(
          doc(
            ol(li(p('A')), li(p('B'))),

            p('{<>}middle'),

            ol(li(p('C')), li(p('D'))),
          ),
          doc(ol(li(p('A')), li(p('B{<>}middle')), li(p('C')), li(p('D')))),
        );
      });

      it('merges two double-level lists when the middle paragraph is backspaced', () => {
        backspaceCheck(
          doc(
            ol(li(p('A'), ol(li(p('B')))), li(p('C'))),

            p('{<>}middle'),

            ol(li(p('D'), ol(li(p('E')))), li(p('F'))),
          ),
          doc(
            ol(
              li(p('A'), ol(li(p('B')))),
              li(p('C{<>}middle')),
              li(p('D'), ol(li(p('E')))),
              li(p('F')),
            ),
          ),
        );
      });

      it('moves directly to previous list item if it was empty', () => {
        backspaceCheck(
          doc(
            ol(li(p('nice')), li(p('')), li(p('{<>}text'))),

            p('after'),
          ),
          doc(
            ol(li(p('nice')), li(p('{<>}text'))),

            p('after'),
          ),
        );
      });

      it('moves directly to previous list item if it was empty, but with two paragraphs', () => {
        backspaceCheck(
          doc(
            ol(li(p('nice')), li(p('')), li(p('{<>}text'), p('double'))),

            p('after'),
          ),
          doc(
            ol(li(p('nice')), li(p('{<>}text'), p('double'))),

            p('after'),
          ),
        );
      });

      it('backspaces paragraphs within a list item rather than the item itself', () => {
        backspaceCheck(
          doc(
            ol(li(p('')), li(p('nice'), p('{<>}two'))),

            p('after'),
          ),
          doc(
            ol(li(p('')), li(p('nice{<>}two'))),

            p('after'),
          ),
        );
      });

      it('backspaces line breaks correctly within list items, with content after', () => {
        backspaceCheck(
          doc(
            ol(li(p('')), li(p('nice'), p('two', br(), '{<>}three'))),

            p('after'),
          ),
          doc(
            ol(li(p('')), li(p('nice'), p('two{<>}three'))),

            p('after'),
          ),
        );
      });

      it('backspaces line breaks correctly within list items, with content before', () => {
        backspaceCheck(
          doc(
            ol(li(p('')), li(p('nice'), p('two', br(), br(), '{<>}'))),

            p('after'),
          ),
          doc(
            ol(li(p('')), li(p('nice'), p('two', br(), '{<>}'))),

            p('after'),
          ),
        );
      });

      it('moves text from after list to below mediaSingle in list item', () => {
        backspaceCheck(
          doc(
            ol(
              li(p('')),
              li(
                p('nice'),
                mediaSingle({ layout: 'center' })(
                  media({
                    id: temporaryFileId,
                    type: 'file',
                    collection: testCollectionName,
                    __fileMimeType: 'image/png',
                  })(),
                ),
                p(''),
              ),
            ),

            p('{<>}after'),
          ),
          doc(
            ol(
              li(p('')),
              li(
                p('nice'),
                mediaSingle({ layout: 'center' })(
                  media({
                    id: temporaryFileId,
                    type: 'file',
                    collection: testCollectionName,
                    __fileMimeType: 'image/png',
                  })(),
                ),
                p('{<>}after'),
              ),
            ),
          ),
        );
      });

      it('selects mediaSingle in list if inside the empty paragraph after', () => {
        backspaceCheck(
          doc(
            ol(
              li(p('')),
              li(
                p('nice'),
                mediaSingle({ layout: 'center' })(
                  media({
                    id: temporaryFileId,
                    type: 'file',
                    collection: testCollectionName,
                    __fileMimeType: 'image/png',
                  })(),
                ),
                p('{<>}'),
              ),
            ),

            p('after'),
          ),
          doc(
            ol(
              li(p('')),
              li(
                p('nice'),
                '{<}',
                mediaSingle({ layout: 'center' })(
                  media({
                    id: temporaryFileId,
                    type: 'file',
                    collection: testCollectionName,
                    __fileMimeType: 'image/png',
                  })(),
                ),
                '{>}',
              ),
            ),
            p('after'),
          ),
        );
      });

      it('backspaces mediaSingle in list if selected', () => {
        backspaceCheck(
          doc(
            ol(
              li(p('')),
              li(
                p('nice{<}'),
                mediaSingle({ layout: 'center' })(
                  media({
                    id: temporaryFileId,
                    type: 'file',
                    collection: testCollectionName,
                    __fileMimeType: 'image/png',
                  })(),
                ),
                '{>}',
              ),
            ),
            p('after'),
          ),
          doc(ol(li(p('')), li(p('nice'))), p('{<>}after')),
        );
      });
    });

    describe('when hit Shift-Tab', () => {
      let : ;
      beforeEach(() => {
        ({  } = editor(
          doc(ol(li(p('One'), ul(li(p('Two{<>}')))))),
          trackEvent as any,
        ));
        sendKeyToPm(, 'Shift-Tab');
      });

      it('should outdent the list', () => {
        expect(.state.doc).toEqualDocument(
          doc(ol(li(p('One')), li(p('Two{<>}')))),
        );
      });

      it('should call outdent analytics event', () => {
        expect(analyticsHandler).toHaveBeenCalledWith(
          'atlassian.editor.format.list.outdent.keyboard',
        );
      });

      it('should call outdent analytics V3 event', () => {
        expect(createAnalyticsEvent).toHaveBeenCalledWith({
          action: 'formatted',
          actionSubject: 'text',
          eventType: 'track',
          actionSubjectId: 'indentation',
          attributes: {
            inputMethod: 'keyboard',
            previousIndentationLevel: 2,
            newIndentLevel: 1,
            direction: 'outdent',
            indentType: 'list',
          },
        });
      });
    });

    describe('when hit Cmd-Shift-7', () => {
      simulatePlatform(Platforms.Mac);

      let : ;
      beforeEach(() => {
        ({  } = editor(doc(p('One{<>}'))));
        sendKeyToPm(, 'Cmd-Shift-7');
      });

      it('should create a list', () => {
        expect(.state.doc).toEqualDocument(doc(ol(li(p('One')))));
      });

      it('should call numbered list analytics event', () => {
        expect(analyticsHandler).toHaveBeenCalledWith(
          'atlassian.editor.format.list.numbered.keyboard',
        );
      });

      it('should call numbered list analytics V3 event', () => {
        expect(createAnalyticsEvent).toHaveBeenCalledWith({
          action: 'formatted',
          actionSubject: 'text',
          eventType: 'track',
          actionSubjectId: 'numberedList',
          attributes: {
            inputMethod: 'keyboard',
          },
        });
      });
    });

    describe('when hit Cmd-Shift-8', () => {
      simulatePlatform(Platforms.Mac);

      let : ;
      beforeEach(() => {
        ({  } = editor(doc(p('One{<>}'))));
        sendKeyToPm(, 'Cmd-Shift-8');
      });

      it('should create a list', () => {
        expect(.state.doc).toEqualDocument(doc(ul(li(p('One')))));
      });

      it('should call numbered list analytics event', () => {
        expect(analyticsHandler).toHaveBeenCalledWith(
          'atlassian.editor.format.list.bullet.keyboard',
        );
      });

      it('should call numbered list analytics V3 event', () => {
        expect(createAnalyticsEvent).toHaveBeenCalledWith({
          action: 'formatted',
          actionSubject: 'text',
          eventType: 'track',
          actionSubjectId: 'bulletedList',
          attributes: {
            inputMethod: 'keyboard',
          },
        });
      });
    });
  });

  describe('quick insert', () => {
    describe('Numbered list', () => {
      let : ;
      let sel: number;

      beforeEach(() => {
        ({ , sel } = editor(doc(p('{<>}'))));

        insertText(, '/Numbered List', sel);
        sendKeyToPm(, 'Enter');
      });

      it('should insert a numbered list', () => {
        expect(.state.doc).toEqualDocument(doc(ol(li(p('{<>}')))));
      });

      it('should fire Analytics GAS V3 events', () => {
        expect(createAnalyticsEvent).toHaveBeenCalledWith({
          action: 'formatted',
          actionSubject: 'text',
          eventType: 'track',
          actionSubjectId: 'numberedList',
          attributes: {
            inputMethod: 'quickInsert',
          },
        });
      });
    });

    describe('Unordered list', () => {
      let : ;
      let sel: number;

      beforeEach(() => {
        ({ , sel } = editor(doc(p('{<>}'))));

        insertText(, '/Unordered List', sel);
        sendKeyToPm(, 'Enter');
      });

      it('should insert an unordered list', () => {
        expect(.state.doc).toEqualDocument(doc(ul(li(p('{<>}')))));
      });

      it('should fire Analytics GAS V3 events when inserting a unordered list', () => {
        expect(createAnalyticsEvent).toHaveBeenCalledWith({
          action: 'formatted',
          actionSubject: 'text',
          eventType: 'track',
          actionSubjectId: 'bulletedList',
          attributes: {
            inputMethod: 'quickInsert',
          },
        });
      });
    });
  });

  describe('API', () => {
    it('should allow toggling between normal text and ordered list', () => {
      const {  } = editor(doc(p('t{a}ex{b}t')));

      toggleOrderedList();
      expect(.state.doc).toEqualDocument(doc(ol(li(p('text')))));
      toggleOrderedList();
      expect(.state.doc).toEqualDocument(doc(p('text')));
    });

    it('should allow toggling between normal text and bullet list', () => {
      const {  } = editor(doc(p('t{<}ex{>}t')));

      toggleBulletList();
      expect(.state.doc).toEqualDocument(doc(ul(li(p('text')))));
      toggleBulletList();
      expect(.state.doc).toEqualDocument(doc(p('text')));
    });

    it('should allow toggling between ordered and bullet list', () => {
      const {  } = editor(doc(ol(li(p('t{<}ex{>}t')))));

      toggleBulletList();
      expect(.state.doc).toEqualDocument(doc(ul(li(p('text')))));
      toggleBulletList();
      expect(.state.doc).toEqualDocument(doc(p('text')));
    });

    it('should make sure that it is enabled when selecting ordered list', () => {
      const { pluginState } = editor(doc(ol(li(p('te{<>}xt')))));

      expect(pluginState).toHaveProperty('orderedListActive', true);
      expect(pluginState).toHaveProperty('orderedListDisabled', false);
      expect(pluginState).toHaveProperty('bulletListActive', false);
      expect(pluginState).toHaveProperty('bulletListDisabled', false);
    });

    it('should be disabled when selecting h1', () => {
      const { pluginState } = editor(doc(h1('te{<>}xt')));

      expect(pluginState).toHaveProperty('orderedListActive', false);
      expect(pluginState).toHaveProperty('orderedListDisabled', true);
      expect(pluginState).toHaveProperty('bulletListActive', false);
      expect(pluginState).toHaveProperty('bulletListDisabled', true);
    });

    describe('toggling a list', () => {
      it("shouldn't affect text selection", () => {
        const {  } = editor(doc(p('hello{<>}')));

        toggleBulletList();
        // If the text is not selected, pressing enter will
        // create a new paragraph. If it is selected the
        // 'hello' text will be removed
        sendKeyToPm(, 'Enter');

        expect(.state.doc).toEqualDocument(
          doc(ul(li(p('hello')), li(p('')))),
        );
      });
    });

    describe('untoggling a list', () => {
      const expectedOutput = doc(
        ol(li(p('One'))),
        p('Two'),
        p('Three'),
        ol(li(p('Four'))),
      );

      it('should allow untoggling part of a list based on selection', () => {
        const {  } = editor(
          doc(
            ol(li(p('One')), li(p('{<}Two')), li(p('Three{>}')), li(p('Four'))),
          ),
        );

        toggleOrderedList();
        expect(.state.doc).toEqualDocument(expectedOutput);
      });

      it('should untoggle empty paragraphs in a list', () => {
        const {  } = editor(
          doc(ol(li(p('{<}One')), li(p('Two')), li(p()), li(p('Three{>}')))),
        );

        toggleOrderedList();
        expect(.state.doc).toEqualDocument(
          doc(p('One'), p('Two'), p(), p('Three')),
        );
      });

      it('should untoggle all list items with different ancestors in selection', () => {
        const {  } = editor(
          doc(
            ol(li(p('One')), li(p('{<}Two')), li(p('Three'))),
            ol(li(p('One{>}')), li(p('Two'))),
          ),
        );

        toggleOrderedList();
        expect(.state.doc).toEqualDocument(
          doc(
            ol(li(p('One'))),
            p('Two'),
            p('Three'),
            p('One'),
            ol(li(p('Two'))),
          ),
        );
      });
    });

    describe('converting a list', () => {
      it('should allow converting part of a list based on selection', () => {
        const expectedOutput = doc(
          ol(li(p('One'))),
          ul(li(p('Two')), li(p('Three'))),
          ol(li(p('Four'))),
        );
        const {  } = editor(
          doc(
            ol(li(p('One')), li(p('{<}Two')), li(p('Three{>}')), li(p('Four'))),
          ),
        );

        toggleBulletList();
        expect(.state.doc).toEqualDocument(expectedOutput);
      });

      it('should convert selection inside panel to list', () => {
        const expectedOutput = doc(panel()(ul(li(p('text')))));
        const {  } = editor(doc(panel()(p('te{<>}xt'))));

        toggleBulletList();
        expect(.state.doc).toEqualDocument(expectedOutput);
      });

      it('should allow converting part of a list based on selection that starts at the end of previous line', () => {
        const expectedOutput = doc(
          ol(li(p('One'))),
          ul(li(p('Two')), li(p('Three'))),
          ol(li(p('Four'))),
        );
        const {  } = editor(
          doc(
            ol(li(p('One{<}')), li(p('Two')), li(p('Three{>}')), li(p('Four'))),
          ),
        ); // When selection starts on previous (empty) node

        toggleBulletList();
        expect(.state.doc).toEqualDocument(expectedOutput);
      });

      it('should convert selection to a list when the selection starts with a paragraph and ends inside a list', () => {
        const expectedOutput = doc(
          ol(li(p('One')), li(p('Two')), li(p('Three')), li(p('Four'))),
        );
        const {  } = editor(
          doc(p('{<}One'), ol(li(p('Two{>}')), li(p('Three')), li(p('Four')))),
        );

        toggleOrderedList();
        expect(.state.doc).toEqualDocument(expectedOutput);
      });

      it('should convert selection to a list when the selection contains a list but starts and end with paragraphs', () => {
        const expectedOutput = doc(
          ol(li(p('One')), li(p('Two')), li(p('Three')), li(p('Four'))),
        );
        const {  } = editor(
          doc(p('{<}One'), ol(li(p('Two')), li(p('Three'))), p('Four{>}')),
        );

        toggleOrderedList();
        expect(.state.doc).toEqualDocument(expectedOutput);
      });

      it('should convert selection to a list when the selection starts inside a list and ends with a paragraph', () => {
        const expectedOutput = doc(
          ol(li(p('One')), li(p('Two')), li(p('Three')), li(p('Four'))),
        );
        const {  } = editor(
          doc(ol(li(p('One')), li(p('{<}Two')), li(p('Three'))), p('Four{>}')),
        );

        toggleOrderedList();
        expect(.state.doc).toEqualDocument(expectedOutput);
      });

      it('should convert selection to a list and keep empty paragraphs', () => {
        const expectedOutput = doc(
          ul(li(p('One')), li(p('Two')), li(p()), li(p('Three'))),
        );
        const {  } = editor(
          doc(ol(li(p('{<}One')), li(p('Two')), li(p()), li(p('Three{>}')))),
        );

        toggleBulletList();
        expect(.state.doc).toEqualDocument(expectedOutput);
      });

      it('should convert selection to list when there is an empty paragraph between non empty two', () => {
        const expectedOutput = doc(ul(li(p('One')), li(p()), li(p('Three'))));
        const {  } = editor(doc(p('{<}One'), p(), p('Three{>}')));

        toggleBulletList();
        expect(.state.doc).toEqualDocument(expectedOutput);
      });

      it('should convert selection to a list when it is a paragraph with supported marks', () => {
        const expectedOutput = doc(
          ul(li(p('One')), li(p(underline('Two'))), li(p('Three'))),
        );
        const {  } = editor(
          doc(p('{<}One'), p(underline('Two')), p('Three{>}')),
        );

        toggleBulletList();
        expect(.state.doc).toEqualDocument(expectedOutput);
      });

      it('should retain breakout marks on ancestor when toggling list within a layout', () => {
        const expectedOutput = doc(
          breakout({ mode: 'wide' })(
            layoutSection(
              layoutColumn({ width: 33.33 })(p('')),
              layoutColumn({ width: 33.33 })(ul(li(p('One')))),
              layoutColumn({ width: 33.33 })(p('')),
            ),
          ),
        );

        const {  } = editor(
          doc(
            breakout({ mode: 'wide' })(
              layoutSection(
                layoutColumn({ width: 33.33 })(p('')),
                layoutColumn({ width: 33.33 })(p('{<}One{>}')),
                layoutColumn({ width: 33.33 })(p('')),
              ),
            ),
          ),
        );

        toggleBulletList();
        expect(.state.doc).toEqualDocument(expectedOutput);
      });
    });

    describe('joining lists', () => {
      const expectedOutputForPreviousList = doc(
        ol(
          li(p('One')),
          li(p('Two')),
          li(p('Three')),
          li(p('Four')),
          li(p('Five')),
        ),
        p('Six'),
      );
      const expectedOutputForNextList = doc(
        p('One'),
        ol(
          li(p('Two')),
          li(p('Three')),
          li(p('Four')),
          li(p('Five')),
          li(p('Six')),
        ),
      );
      const expectedOutputForPreviousAndNextList = doc(
        ol(
          li(p('One')),
          li(p('Two')),
          li(p('Three')),
          li(p('Four')),
          li(p('Five')),
          li(p('Six')),
        ),
      );

      it("should join with previous list if it's of the same type", () => {
        const {  } = editor(
          doc(
            ol(li(p('One')), li(p('Two')), li(p('Three'))),
            p('{<}Four'),
            p('Five{>}'),
            p('Six'),
          ),
        );

        toggleOrderedList();
        expect(.state.doc).toEqualDocument(
          expectedOutputForPreviousList,
        );
      });

      it("should join with previous list if it's of the same type and selection starts at the end of previous line", () => {
        const {  } = editor(
          doc(
            ol(li(p('One')), li(p('Two')), li(p('Three{<}'))),
            p('Four'),
            p('Five{>}'),
            p('Six'),
          ),
        ); // When selection starts on previous (empty) node

        toggleOrderedList();
        expect(.state.doc).toEqualDocument(
          expectedOutputForPreviousList,
        );
      });

      it("should not join with previous list if it's not of the same type", () => {
        const {  } = editor(
          doc(
            ol(li(p('One')), li(p('Two')), li(p('Three'))),
            p('{<}Four'),
            p('Five{>}'),
            p('Six'),
          ),
        );

        toggleBulletList();
        expect(.state.doc).toEqualDocument(
          doc(
            ol(li(p('One')), li(p('Two')), li(p('Three'))),
            ul(li(p('Four')), li(p('Five'))),
            p('Six'),
          ),
        );
      });

      it("should not join with previous list if it's not of the same type and selection starts at the end of previous line", () => {
        const {  } = editor(
          doc(
            ol(li(p('One')), li(p('Two')), li(p('Three{<}'))),
            p('Four'),
            p('Five{>}'),
            p('Six'),
          ),
        ); // When selection starts on previous (empty) node

        toggleBulletList();
        expect(.state.doc).toEqualDocument(
          doc(
            ol(li(p('One')), li(p('Two')), li(p('Three'))),
            ul(li(p('Four')), li(p('Five'))),
            p('Six'),
          ),
        );
      });

      it("should join with next list if it's of the same type", () => {
        const {  } = editor(
          doc(
            p('One'),
            p('{<}Two'),
            p('Three{>}'),
            ol(li(p('Four')), li(p('Five')), li(p('Six'))),
          ),
        );

        toggleOrderedList();
        expect(.state.doc).toEqualDocument(expectedOutputForNextList);
      });

      it("should join with next list if it's of the same type and selection starts at the end of previous line", () => {
        const {  } = editor(
          doc(
            p('One{<}'),
            p('Two'),
            p('Three{>}'),
            ol(li(p('Four')), li(p('Five')), li(p('Six'))),
          ),
        );

        toggleOrderedList();
        expect(.state.doc).toEqualDocument(expectedOutputForNextList);
      });

      it("should not join with next list if it isn't of the same type", () => {
        const {  } = editor(
          doc(
            p('One'),
            p('{<}Two'),
            p('Three{>}'),
            ol(li(p('Four')), li(p('Five')), li(p('Six'))),
          ),
        );

        toggleBulletList();
        expect(.state.doc).toEqualDocument(
          doc(
            p('One'),
            ul(li(p('Two')), li(p('Three'))),
            ol(li(p('Four')), li(p('Five')), li(p('Six'))),
          ),
        );
      });

      it("should not join with next list if it isn't of the same type and selection starts at the end of previous line", () => {
        const {  } = editor(
          doc(
            p('One{<}'),
            p('Two'),
            p('Three{>}'),
            ol(li(p('Four')), li(p('Five')), li(p('Six'))),
          ),
        );

        toggleBulletList();
        expect(.state.doc).toEqualDocument(
          doc(
            p('One'),
            ul(li(p('Two')), li(p('Three'))),
            ol(li(p('Four')), li(p('Five')), li(p('Six'))),
          ),
        );
      });

      it("should join with previous and next list if they're of the same type", () => {
        const {  } = editor(
          doc(
            ol(li(p('One')), li(p('Two'))),
            p('{<}Three'),
            p('Four{>}'),
            ol(li(p('Five')), li(p('Six'))),
          ),
        );

        toggleOrderedList();
        expect(.state.doc).toEqualDocument(
          expectedOutputForPreviousAndNextList,
        );
      });

      it("should join with previous and next list if they're of the same type and selection starts at the end of previous line", () => {
        const {  } = editor(
          doc(
            ol(li(p('One')), li(p('Two{<}'))),
            p('Three'),
            p('Four{>}'),
            ol(li(p('Five')), li(p('Six'))),
          ),
        );

        toggleOrderedList();
        expect(.state.doc).toEqualDocument(
          expectedOutputForPreviousAndNextList,
        );
      });

      it("should not join with previous and next list if they're not of the same type", () => {
        const {  } = editor(
          doc(
            ol(li(p('One')), li(p('Two'))),
            p('{<}Three'),
            p('Four{>}'),
            ol(li(p('Five')), li(p('Six'))),
          ),
        );

        toggleBulletList();
        expect(.state.doc).toEqualDocument(
          doc(
            ol(li(p('One')), li(p('Two'))),
            ul(li(p('Three')), li(p('Four'))),
            ol(li(p('Five')), li(p('Six'))),
          ),
        );
      });

      it("should not join with previous and next list if they're not of the same type and selectoin starts at the end of previous line", () => {
        const {  } = editor(
          doc(
            ol(li(p('One')), li(p('Two{<}'))),
            p('Three'),
            p('Four{>}'),
            ol(li(p('Five')), li(p('Six'))),
          ),
        );

        toggleBulletList();
        expect(.state.doc).toEqualDocument(
          doc(
            ol(li(p('One')), li(p('Two'))),
            ul(li(p('Three')), li(p('Four'))),
            ol(li(p('Five')), li(p('Six'))),
          ),
        );
      });
    });

    describe('Nested Lists', () => {
      describe('When gap cursor is inside listItem before codeBlock', () => {
        it('should increase the depth of list item when Tab key press', () => {
          const {  } = editor(
            doc(ol(li(p('text')), li(code_block()('{<>}text')), li(p('text')))),
          );
          // enable gap cursor
          sendKeyToPm(, 'ArrowLeft');
          expect(.state.selection instanceof GapCursorSelection).toBe(
            true,
          );
          expect(.state.selection.$from.depth).toEqual(2);

          sendKeyToPm(, 'Tab');

          expect(.state.selection.$from.depth).toEqual(4);
        });

        it('should decrease the depth of list item when Shift-Tab key press', () => {
          const {  } = editor(
            doc(
              ol(
                li(p('text'), ol(li(code_block()('{<>}text')))),
                li(p('text')),
              ),
            ),
          );
          // enable gap cursor
          sendKeyToPm(, 'ArrowLeft');
          expect(.state.selection instanceof GapCursorSelection).toBe(
            true,
          );
          expect(.state.selection.$from.depth).toEqual(4);

          sendKeyToPm(, 'Shift-Tab');

          expect(.state.selection.$from.depth).toEqual(2);
        });
      });

      it('should increase the depth of list item when Tab key press', () => {
        const {  } = editor(
          doc(ol(li(p('text')), li(p('te{<>}xt')), li(p('text')))),
        );
        expect(.state.selection.$from.depth).toEqual(3);

        sendKeyToPm(, 'Tab');

        expect(.state.selection.$from.depth).toEqual(5);
      });

      it("shouldn't increase the depth of list item when Tab key press when at 6 levels indentation", () => {
        const {  } = editor(
          doc(
            ol(
              li(
                p('first'),
                ol(
                  li(
                    p('second'),
                    ol(
                      li(
                        p('third'),
                        ol(
                          li(
                            p('fourth'),
                            ol(
                              li(
                                p('fifth'),
                                ol(li(p('sixth'), p('maybe seventh{<>}'))),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        );

        expect(.state.selection.$from.depth).toEqual(13);

        sendKeyToPm(, 'Tab');

        expect(.state.selection.$from.depth).toEqual(13);
      });

      it("shouldn't increase the depth of list item when Tab key press when a child list at 6 levels indentation", () => {
        const {  } = editor(
          doc(
            ol(
              li(
                p('first'),
                ol(
                  li(
                    p('second'),
                    ol(
                      li(
                        p('third'),
                        ol(
                          li(
                            p('fourth'),
                            ol(
                              li(p('fifth')),
                              li(p('{<}fifth{>}'), ol(li(p('sixth')))),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        );

        expect(.state.selection.$from.depth).toEqual(11);

        sendKeyToPm(, 'Tab');

        expect(.state.selection.$from.depth).toEqual(11);
      });

      it('should nest the list item when Tab key press', () => {
        const {  } = editor(
          doc(ol(li(p('text')), li(p('te{<>}xt')), li(p('text')))),
        );

        sendKeyToPm(, 'Tab');

        expect(.state.doc).toEqualDocument(
          doc(ol(li(p('text'), ol(li(p('te{<>}xt')))), li(p('text')))),
        );
      });

      it('should decrease the depth of list item when Shift-Tab key press', () => {
        const {  } = editor(
          doc(ol(li(p('text'), ol(li(p('te{<>}xt')))), li(p('text')))),
        );
        expect(.state.selection.$from.depth).toEqual(5);

        sendKeyToPm(, 'Shift-Tab');

        expect(.state.selection.$from.depth).toEqual(3);
      });

      it('should lift the list item when Shift-Tab key press', () => {
        const {  } = editor(
          doc(ol(li(p('text'), ol(li(p('te{<>}xt')))), li(p('text')))),
        );

        sendKeyToPm(, 'Shift-Tab');

        expect(.state.doc).toEqualDocument(
          doc(ol(li(p('text')), li(p('te{<>}xt')), li(p('text')))),
        );
      });

      it('should lift nested and same level list items correctly', () => {
        const {  } = editor(
          doc(
            ol(li(p('some{<>}text'), ol(li(p('B')))), li(p('C'))),

            p('after'),
          ),
        );

        sendKeyToPm(, 'Shift-Tab');

        expect(.state.doc).toEqualDocument(
          doc(
            p('some{<>}text'),
            ol(li(p('B')), li(p('C'))),

            p('after'),
          ),
        );
      });

      it('should lift the list item when Enter key press is done on empty list-item', () => {
        const {  } = editor(
          doc(ol(li(p('text'), ol(li(p('{<>}')))), li(p('text')))),
        );

        sendKeyToPm(, 'Enter');

        expect(.state.doc).toEqualDocument(
          doc(ol(li(p('text')), li(p('{<>}')), li(p('text')))),
        );
      });
    });

    describe('Enter key-press', () => {
      describe('when Enter key is pressed on empty nested list item', () => {
        it('should create new list item in parent list', () => {
          const {  } = editor(
            doc(ol(li(p('text'), ol(li(p('{<>}')))), li(p('text')))),
          );

          sendKeyToPm(, 'Enter');

          expect(.state.doc).toEqualDocument(
            doc(ol(li(p('text')), li(p('{<>}')), li(p('text')))),
          );
        });
      });

      describe('when Enter key is pressed on non-empty nested list item', () => {
        it('should created new nested list item', () => {
          const {  } = editor(
            doc(ol(li(p('text'), ol(li(p('test{<>}')))), li(p('text')))),
          );

          sendKeyToPm(, 'Enter');

          expect(.state.doc).toEqualDocument(
            doc(
              ol(
                li(p('text'), ol(li(p('test')), li(p('{<>}')))),
                li(p('text')),
              ),
            ),
          );
        });
      });

      describe('when Enter key is pressed on non-empty top level list item', () => {
        it('should created new list item at top level', () => {
          const {  } = editor(
            doc(ol(li(p('text')), li(p('test{<>}')), li(p('text')))),
          );

          sendKeyToPm(, 'Enter');

          expect(.state.doc).toEqualDocument(
            doc(ol(li(p('text')), li(p('test')), li(p('{<>}')), li(p('text')))),
          );
        });
      });

      describe('when Enter key is pressed on non-empty top level list item inside panel', () => {
        it('should created new list item at top level', () => {
          const {  } = editor(
            doc(panel()(ol(li(p('text')), li(p('test{<>}')), li(p('text'))))),
          );

          sendKeyToPm(, 'Enter');

          expect(.state.doc).toEqualDocument(
            doc(
              panel()(
                ol(li(p('text')), li(p('test')), li(p('{<>}')), li(p('text'))),
              ),
            ),
          );
        });
      });

      describe('when Enter key is pressed on empty top level list item', () => {
        it('should create new paragraph outside the list', () => {
          const {  } = editor(
            doc(ol(li(p('text')), li(p('{<>}')), li(p('text')))),
          );

          sendKeyToPm(, 'Enter');

          expect(.state.doc).toEqualDocument(
            doc(ol(li(p('text'))), p('{<>}'), ol(li(p('text')))),
          );
        });
      });

      describe('when Enter key is pressed on empty top level list item inside panel', () => {
        it('should create new paragraph outside the list', () => {
          const {  } = editor(
            doc(panel()(ol(li(p('text')), li(p('{<>}')), li(p('text'))))),
          );

          sendKeyToPm(, 'Enter');

          expect(.state.doc).toEqualDocument(
            doc(panel()(ol(li(p('text'))), p('{<>}'), ol(li(p('text'))))),
          );
        });
      });
    });

    describe('Toggle - nested list scenarios - to lift items out of list', () => {
      it('should be possible to toggle a simple nested list', () => {
        const {  } = editor(
          doc(ol(li(p('text'), ol(li(p('text{<>}')))), li(p('text')))),
        );

        toggleOrderedList();

        expect(.state.doc).toEqualDocument(
          doc(ol(li(p('text'))), p('text{<>}'), ol(li(p('text')))),
        );
      });

      it('should be possible to toggle an empty nested list item', () => {
        const {  } = editor(
          doc(ol(li(p('text'), ol(li(p('{<>}')))), li(p('text')))),
        );

        toggleOrderedList();

        expect(.state.doc).toEqualDocument(
          doc(ol(li(p('text'))), p('{<>}'), ol(li(p('text')))),
        );
      });

      it('should be possible to toggle a selection across different depths in the list', () => {
        const {  } = editor(
          doc(ol(li(p('te{<}xt'), ol(li(p('text{>}')))), li(p('text')))),
        );

        toggleOrderedList();

        expect(.state.doc).toEqualDocument(
          doc(p('te{<}xt'), p('text{>}'), ol(li(p('text')))),
        );
      });

      it('should be possible to toggle a selection across lists with different parent lists', () => {
        const {  } = editor(
          doc(
            ol(li(p('te{<}xt'), ol(li(p('text'))))),
            ol(li(p('te{>}xt'), ol(li(p('text'))))),
          ),
        );

        toggleOrderedList();

        expect(.state.doc).toEqualDocument(
          doc(p('te{<}xt'), p('text'), p('te{>}xt'), ol(li(p('text')))),
        );
      });

      it('should be create a new list for children of lifted list item', () => {
        const {  } = editor(
          doc(
            ol(
              li(p('text'), ol(li(p('te{<>}xt'), ol(li(p('text')))))),
              li(p('text')),
            ),
          ),
        );

        toggleOrderedList();

        expect(.state.doc).toEqualDocument(
          doc(
            ol(li(p('text'))),
            p('te{<>}xt'),
            ol(li(p('text')), li(p('text'))),
          ),
        );
      });

      it('should only change type to bullet list when toggling orderedList to bulletList', () => {
        const {  } = editor(
          doc(
            ol(
              li(p('text'), ol(li(p('text'), ol(li(p('te{<>}xt')))))),
              li(p('text')),
            ),
          ),
        );

        toggleBulletList();

        expect(.state.doc).toEqualDocument(
          doc(
            ol(
              li(p('text'), ol(li(p('text'), ul(li(p('te{<>}xt')))))),
              li(p('text')),
            ),
          ),
        );
      });
    });

    describe('when adding media inside list', () => {
      it('should add media as media single', () => {
        const {  } = editor(
          doc(ul(li(p('Three')), li(p('Four{<>}')))),
        );

        insertMediaAsMediaSingle(
          ,
          media({
            id: temporaryFileId,
            type: 'file',
            collection: testCollectionName,
            __fileMimeType: 'image/png',
          })()(.state.schema),
          INPUT_METHOD.PICKER_CLOUD,
        );

        expect(.state.doc).toEqualDocument(
          doc(
            ul(
              li(p('Three')),
              li(
                p('Four'),
                mediaSingle({ layout: 'center' })(
                  media({
                    id: temporaryFileId,
                    type: 'file',
                    collection: testCollectionName,
                    __fileMimeType: 'image/png',
                  })(),
                ),
                p(),
              ),
            ),
          ),
        );
      });

      it('should not add non images inside lists', () => {
        const {  } = editor(
          doc(ul(li(p('Three')), li(p('Four{<>}')))),
        );

        insertMediaAsMediaSingle(
          ,
          media({
            id: temporaryFileId,
            type: 'file',
            collection: testCollectionName,
            __fileMimeType: 'pdf',
          })()(.state.schema),
          INPUT_METHOD.PICKER_CLOUD,
        );

        expect(.state.doc).toEqualDocument(
          doc(ul(li(p('Three')), li(p('Four{<>}')))),
        );
      });
    });
  });
});
