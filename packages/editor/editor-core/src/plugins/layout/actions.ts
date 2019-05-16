import { safeInsert } from 'prosemirror-utils';
import { Node, Fragment, Slice, Schema } from 'prosemirror-model';
import { Command } from '../../types';
import { pluginKey, LayoutState } from './pm-plugins/main';
import { EditorState, Transaction, TextSelection } from 'prosemirror-state';
import { mapChildren, flatmap } from '../../utils/slice';
import { isEmptyDocument, getStepRange } from '../../utils';
import { addAnalytics, ACTION, ACTION_SUBJECT, EVENT_TYPE } from '../analytics';
import { LAYOUT_TYPE } from '../analytics/types/node-events';

export type PresetLayout =
  | 'two_equal'
  | 'three_equal'
  | 'two_right_sidebar'
  | 'two_left_sidebar'
  | 'three_with_sidebars';

export const TWO_COL_LAYOUTS: PresetLayout[] = [
  'two_equal',
  'two_left_sidebar',
  'two_right_sidebar',
];
export const THREE_COL_LAYOUTS: PresetLayout[] = [
  'three_equal',
  'three_with_sidebars',
];

const getWidthsForPreset = (presetLayout: PresetLayout): number[] => {
  switch (presetLayout) {
    case 'two_equal':
      return [50, 50];
    case 'three_equal':
      return [33.33, 33.33, 33.33];
    case 'two_left_sidebar':
      return [33.33, 66.66];
    case 'two_right_sidebar':
      return [66.66, 33.33];
    case 'three_with_sidebars':
      return [25, 50, 25];
  }
};

/**
 * Finds layout preset based on the width attrs of all the layoutColumn nodes
 * inside the layoutSection node
 */
export const getPresetLayout = (section: Node): PresetLayout | undefined => {
  const widths = mapChildren(section, column => column.attrs.width).join(',');

  switch (widths) {
    case '33.33,33.33,33.33':
      return 'three_equal';
    case '25,50,25':
      return 'three_with_sidebars';
    case '50,50':
      return 'two_equal';
    case '33.33,66.66':
      return 'two_left_sidebar';
    case '66.66,33.33':
      return 'two_right_sidebar';
  }
  return;
};

export const createDefaultLayoutSection = (state: EditorState) => {
  const { layoutSection, layoutColumn } = state.schema.nodes;

  // create a 50-50 layout by default
  const columns = Fragment.fromArray([
    layoutColumn.createAndFill({ width: 50 }) as Node,
    layoutColumn.createAndFill({ width: 50 }) as Node,
  ]);

  return layoutSection.createAndFill(undefined, columns) as Node;
};

export const insertLayoutColumns: Command = (state, dispatch) => {
  if (dispatch) {
    dispatch(safeInsert(createDefaultLayoutSection(state))(state.tr));
  }
  return true;
};

/**
 * Handles switching from 2 -> 3 cols, or 3 -> 2 cols
 * Switching from 2 -> 3 just adds a new one at the end
 * Switching from 3 -> 2 moves all the content of the third col inside the second before
 * removing it
 */
function forceColumnStructure(
  state: EditorState,
  node: Node,
  pos: number,
  presetLayout: PresetLayout,
): Transaction {
  const tr = state.tr;
  const insideRightEdgeOfLayoutSection = pos + node.nodeSize - 1;
  const numCols = node.childCount;

  if (TWO_COL_LAYOUTS.indexOf(presetLayout) >= 0 && numCols === 3) {
    const thirdColumn = node.content.child(2);
    const thirdColumnPos =
      insideRightEdgeOfLayoutSection - thirdColumn.nodeSize;
    if (isEmptyDocument(thirdColumn)) {
      tr.replaceRange(
        // end pos of second column
        tr.mapping.map(thirdColumnPos - 1),
        tr.mapping.map(insideRightEdgeOfLayoutSection),
        Slice.empty,
      );
    } else {
      tr.replaceRange(
        // end pos of second column
        tr.mapping.map(thirdColumnPos - 1),
        // start pos of third column
        tr.mapping.map(thirdColumnPos + 1),
        Slice.empty,
      );
    }
  } else if (THREE_COL_LAYOUTS.indexOf(presetLayout) >= 0 && numCols === 2) {
    tr.replaceWith(
      tr.mapping.map(insideRightEdgeOfLayoutSection),
      tr.mapping.map(insideRightEdgeOfLayoutSection),
      state.schema.nodes.layoutColumn.createAndFill() as Node,
    );
  }

  return tr;
}

function columnWidth(node: Node, schema: Schema, widths: number[]): Fragment {
  const { layoutColumn } = schema.nodes;
  const truncatedWidths: number[] = widths.map(w => Number(w.toFixed(2)));

  return flatmap(node.content, (column, idx) =>
    layoutColumn.create(
      {
        ...column.attrs,
        width: truncatedWidths[idx],
      },
      column.content,
      column.marks,
    ),
  );
}

function forceColumnWidths(
  state: EditorState,
  tr: Transaction,
  pos: number,
  presetLayout: PresetLayout,
) {
  const node = tr.doc.nodeAt(pos);
  if (!node) {
    return tr;
  }

  return tr.replaceWith(
    pos + 1,
    pos + node.nodeSize - 1,
    columnWidth(node, state.schema, getWidthsForPreset(presetLayout)),
  );
}

export function forceSectionToPresetLayout(
  state: EditorState,
  node: Node,
  pos: number,
  presetLayout: PresetLayout,
): Transaction {
  let tr = forceColumnStructure(state, node, pos, presetLayout);

  // save the selection here, since forcing column widths causes a change over the
  // entire layoutSection, which remaps selection to the end. not remapping here
  // is safe because the structure is no longer changing.
  const selection = tr.selection;

  tr = forceColumnWidths(state, tr, pos, presetLayout);

  return tr.setSelection(
    new TextSelection(tr.doc.resolve(selection.$from.pos)),
  );
}

export const setPresetLayout = (layout: PresetLayout): Command => (
  state,
  dispatch,
) => {
  const { pos, selectedLayout } = pluginKey.getState(state) as LayoutState;
  if (selectedLayout === layout || pos === null) {
    return false;
  }

  const node = state.doc.nodeAt(pos);
  if (!node) {
    return false;
  }

  let tr = forceSectionToPresetLayout(state, node, pos, layout);
  if (tr) {
    tr = addAnalytics(tr, {
      action: ACTION.CHANGED_LAYOUT,
      actionSubject: ACTION_SUBJECT.LAYOUT,
      attributes: {
        previousLayout: formatLayoutName(<PresetLayout>selectedLayout),
        newLayout: formatLayoutName(layout),
      },
      eventType: EVENT_TYPE.TRACK,
    });
    if (dispatch) {
      dispatch(tr.scrollIntoView());
    }
    return true;
  }

  return false;
};

export const fixColumnSizes = (
  changedTr: Transaction,
  state: EditorState,
  presetLayout: PresetLayout,
) => {
  const { layoutSection } = state.schema.nodes;
  let change;
  const range = getStepRange(changedTr);
  if (!range) {
    return undefined;
  }

  changedTr.doc.nodesBetween(range.from, range.to, (node, pos) => {
    if (node.type === layoutSection) {
      if (presetLayout === getPresetLayout(node)) {
        return false;
      }

      const fixedColumns = columnWidth(
        node,
        state.schema,
        getWidthsForPreset(presetLayout),
      );
      change = {
        from: pos + 1,
        to: pos + node.nodeSize - 1,
        slice: new Slice(fixedColumns, 0, 0),
      };

      return false;
    } else {
      return true;
    }
  });

  return change;
};

export const fixColumnStructure = (state: EditorState) => {
  const { pos, selectedLayout } = pluginKey.getState(state) as LayoutState;
  if (pos !== null && selectedLayout) {
    const node = state.doc.nodeAt(pos);
    if (node && node.childCount !== getWidthsForPreset(selectedLayout).length) {
      return forceSectionToPresetLayout(state, node, pos, selectedLayout);
    }
  }
  return;
};

export const deleteActiveLayoutNode: Command = (state, dispatch) => {
  const { pos, selectedLayout } = pluginKey.getState(state) as LayoutState;
  if (pos !== null) {
    const node = state.doc.nodeAt(pos) as Node;
    if (dispatch) {
      let tr = state.tr.delete(pos, pos + node.nodeSize);
      tr = addAnalytics(tr, {
        action: ACTION.DELETED,
        actionSubject: ACTION_SUBJECT.LAYOUT,
        attributes: { layout: formatLayoutName(<PresetLayout>selectedLayout) },
        eventType: EVENT_TYPE.TRACK,
      });
      dispatch(tr);
    }
    return true;
  }
  return false;
};

const formatLayoutName = (layout: PresetLayout): LAYOUT_TYPE => {
  switch (layout) {
    case 'two_equal':
      return LAYOUT_TYPE.TWO_COLS_EQUAL;
    case 'three_equal':
      return LAYOUT_TYPE.THREE_COLS_EQUAL;
    case 'two_left_sidebar':
      return LAYOUT_TYPE.LEFT_SIDEBAR;
    case 'two_right_sidebar':
      return LAYOUT_TYPE.RIGHT_SIDEBAR;
    case 'three_with_sidebars':
      return LAYOUT_TYPE.THREE_WITH_SIDEBARS;
  }
};
