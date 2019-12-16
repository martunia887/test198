import { findTable } from 'prosemirror-utils';
import {
  doc,
  p,
  createEditorFactory,
  table,
  tr,
  th,
  tdEmpty,
  tdCursor,
  thEmpty,
  sendKeyToPm,
} from '@atlaskit/editor-test-helpers';
import { TablePluginState } from '../../../../../plugins/table/types';
import { pluginKey } from '../../../../../plugins/table/pm-plugins/main';
import {
  toggleHeaderColumn,
  toggleHeaderRow,
} from '../../../../../plugins/table/commands/toggle';
import {
  containsHeaderColumn,
  containsHeaderRow,
} from '../../../../../plugins/table/utils/nodes';

describe('table utils', () => {
  const createEditor = createEditorFactory<TablePluginState>();

  const editor = (doc: any) =>
    createEditor({
      doc,
      editorProps: { allowTables: true },
      pluginKey,
    });

  describe('#containsHeaderColumn', () => {
    it('should return true when first col is all tableHeaders', () => {
      const { editorView } = editor(
        doc(
          table()(
            tr(thEmpty, tdCursor, tdEmpty),
            tr(thEmpty, tdEmpty, tdEmpty),
            tr(thEmpty, tdEmpty, tdEmpty),
          ),
        ),
      );

      const TableWithPos = findTable(editorView.state.selection)!;
      expect(containsHeaderColumn(TableWithPos.node)).toEqual(true);
    });

    it('should return true when first col has a rowspan', () => {
      const { editorView } = editor(
        doc(
          table()(
            tr(thEmpty, tdCursor, tdEmpty),
            tr(th({ rowspan: 2 })(p()), tdEmpty, tdEmpty),
            tr(tdEmpty, tdEmpty),
          ),
        ),
      );

      const TableWithPos = findTable(editorView.state.selection)!;
      expect(containsHeaderColumn(TableWithPos.node)).toEqual(true);
    });

    describe('when undo header column', () => {
      it('should return false', () => {
        const { editorView } = editor(
          doc(
            table()(
              tr(tdEmpty, tdEmpty, tdEmpty),
              tr(tdEmpty, tdCursor, tdEmpty),
              tr(tdEmpty, tdEmpty),
            ),
          ),
        );

        toggleHeaderColumn(editorView.state, editorView.dispatch);
        sendKeyToPm(editorView, 'Mod-z');

        const TableWithPos = findTable(editorView.state.selection)!;
        expect(containsHeaderColumn(TableWithPos.node)).toEqual(false);
      });
    });
  });

  describe('#containsHeaderRow', () => {
    describe('when undo header row', () => {
      it('should return false', () => {
        const { editorView } = editor(
          doc(
            table()(
              tr(tdEmpty, tdEmpty, tdEmpty),
              tr(tdEmpty, tdCursor, tdEmpty),
              tr(tdEmpty, tdEmpty),
            ),
          ),
        );

        toggleHeaderRow(editorView.state, editorView.dispatch);
        sendKeyToPm(editorView, 'Mod-z');

        const TableWithPos = findTable(editorView.state.selection)!;
        expect(containsHeaderRow(TableWithPos.node)).toEqual(false);
      });
    });
  });
});
