import {
  GapCursorSelection,
  GapCursorSide,
  setTextSelection,
} from '@atlaskit/editor-core/test-utils';
import { Schema } from 'prosemirror-model';
import { NodeSelection } from 'prosemirror-state';
import { CellSelection } from 'prosemirror-tables';
import { findCellClosestToPos } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';

import { Refs, RefsNode } from '../schema-builder';

const positionExists = (position: number | undefined): boolean =>
  typeof position === 'number';

export function setSelection(
  doc?: (schema: Schema) => RefsNode,
  editorView?: EditorView,
): Refs | undefined {
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
      if (positionExists(refs['<>'])) {
        setTextSelection(editorView!, refs['<>']);
        // Expanded selection
      } else if (positionExists(refs['<']) || positionExists(refs['>'])) {
        if (!positionExists(refs['<'])) {
          throw new Error('A `<` ref must complement a `>` ref.');
        }
        if (!positionExists(refs['>'])) {
          throw new Error('A `>` ref must complement a `<` ref.');
        }
        setTextSelection(editorView!, refs['<'], refs['>']);
      }
      // CellSelection
      else if (positionExists(refs['<cell']) && positionExists(refs['cell>'])) {
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
      else if (positionExists(refs['<node>'])) {
        dispatch(tr.setSelection(NodeSelection.create(doc, refs['<node>'])));
      }
      // GapCursor right
      // This may look the wrong way around here, but looks correct in the tests. Eg:
      // doc(hr(), '{<|gap>}') = Horizontal rule with a gap cursor on its right
      // The | denotes the gap cursor's side, based on the node on the side of the |.
      else if (positionExists(refs['<|gap>'])) {
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
      else if (positionExists(refs['<gap|>'])) {
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
