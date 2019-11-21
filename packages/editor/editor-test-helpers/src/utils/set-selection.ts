import { Refs, RefsNode } from '../schema-builder';
import { EditorView } from 'prosemirror-view';
import {
  GapCursorSelection,
  GapCursorSide,
  setTextSelection,
} from '@atlaskit/editor-core/test-utils';
import { findCellClosestToPos } from 'prosemirror-utils';
import { CellSelection } from 'prosemirror-tables';
import { NodeSelection } from 'prosemirror-state';
import { Schema } from 'prosemirror-model';

export function setSelection(
  doc?: (schema: Schema) => RefsNode,
  editorView?: EditorView,
) {
  let refs: Refs | undefined;

  if (doc && editorView) {
    const { dispatch } = editorView;
    const defaultDoc = doc(editorView.state.schema);
    const tr = editorView!.state.tr.replaceWith(
      0,
      editorView!.state.doc.nodeSize - 2,
      defaultDoc.content,
    );

    tr.setMeta('addToHistory', false);
    editorView!.dispatch(tr);

    refs = defaultDoc.refs;
    if (refs) {
      const { doc, tr } = editorView.state;
      // Collapsed selection.
      if ('<>' in refs) {
        setTextSelection(editorView!, refs['<>']);
        // Expanded selection
      } else if ('<' in refs || '>' in refs) {
        if ('<' in refs === false) {
          throw new Error('A `<` ref must complement a `>` ref.');
        }
        if ('>' in refs === false) {
          throw new Error('A `>` ref must complement a `<` ref.');
        }
        setTextSelection(editorView!, refs['<'], refs['>']);
      }
      // CellSelection
      else if (refs['<cell'] && refs['cell>']) {
        const anchorCell = findCellClosestToPos(doc.resolve(refs['<cell']));
        const headCell = findCellClosestToPos(doc.resolve(refs['cell>']));
        if (anchorCell && headCell) {
          dispatch(
            tr.setSelection(
              new CellSelection(
                doc.resolve(anchorCell.pos),
                doc.resolve(headCell.pos),
              ) as any,
            ),
          );
        }
      }
      // NodeSelection
      else if (refs['<node>']) {
        dispatch(tr.setSelection(NodeSelection.create(doc, refs['<node>'])));
      }
      // GapCursor right
      // This may look the wrong way around here, but looks correct in the tests. Eg:
      // doc(hr(), '{<|gap>}') = Horizontal rule with a gap cursor on its right
      // The | denotes the gap cursor's side, based on the node on the side of the |.
      else if (refs['<|gap>']) {
        dispatch(
          tr.setSelection(
            new GapCursorSelection(
              doc.resolve(refs['<|gap>']),
              GapCursorSide.RIGHT,
            ),
          ),
        );
      }
      // GapCursor left
      else if (refs['<gap|>']) {
        dispatch(
          tr.setSelection(
            new GapCursorSelection(
              doc.resolve(refs['<gap|>']),
              GapCursorSide.LEFT,
            ),
          ),
        );
      }
    }
  }

  return refs;
}
