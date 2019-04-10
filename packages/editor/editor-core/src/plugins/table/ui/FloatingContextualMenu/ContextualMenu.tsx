import * as React from 'react';
import { Component } from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import { EditorView } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import { Selection } from 'prosemirror-state';
import { splitCell, Rect, TableMap } from 'prosemirror-tables';
import {
  hasParentNodeOfType,
  findTable,
  getCellsInRow,
} from 'prosemirror-utils';
import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';

import { colors } from '@atlaskit/theme';
import {
  tableBackgroundColorPalette,
  tableBackgroundBorderColors,
  TableSort,
} from '@atlaskit/adf-schema';
import { canMergeCells } from '../../transforms';
import { getPluginState } from '../../pm-plugins/main';
import {
  hoverColumns,
  hoverRows,
  clearHoverSelection,
  toggleContextualMenu,
  toggleReferenceMenu,
  toggleFormattingMenu,
  toggleFilterMenu,
} from '../../actions';
import { TableCssClassName as ClassName } from '../../types';
import { contextualMenuDropdownWidth } from '../styles';
import { Shortcut } from '../../../../ui/styles';
import DropdownMenu from '../../../../ui/DropdownMenu';
import ColorPalette from '../../../../ui/ColorPalette';
import tableMessages from '../messages';
import { INPUT_METHOD } from '../../../analytics';
import {
  setColorWithAnalytics,
  deleteRowsWithAnalytics,
  deleteColumnsWithAnalytics,
  insertRowWithAnalytics,
  mergeCellsWithAnalytics,
  splitCellWithAnalytics,
  emptyMultipleCellsWithAnalytics,
  insertColumnWithAnalytics,
} from '../../actions-with-analytics';
import { closestElement } from '../../../../utils';
import { getCellValue } from '../../utils';

export const messages = defineMessages({
  cellBackground: {
    id: 'fabric.editor.cellBackground',
    defaultMessage: 'Cell background',
    description: 'Change the background color of a table cell.',
  },
  mergeCells: {
    id: 'fabric.editor.mergeCells',
    defaultMessage: 'Merge cells',
    description: 'Merge tables cells together.',
  },
  splitCell: {
    id: 'fabric.editor.splitCell',
    defaultMessage: 'Split cell',
    description: 'Split a merged table cell.',
  },
  clearCells: {
    id: 'fabric.editor.clearCells',
    defaultMessage: 'Clear {0, plural, one {cell} other {cells}}',
    description:
      'Clears the contents of the selected cells (this does not delete the cells themselves).',
  },
});

export interface Props {
  editorView: EditorView;
  isOpen: boolean;
  selectionRect: Rect;
  targetCellPosition?: number;
  mountPoint?: HTMLElement;
  allowMergeCells?: boolean;
  allowBackgroundColor?: boolean;
  boundariesElement?: HTMLElement;
  offset?: Array<number>;
}

export interface State {
  isBackgroundMenuOpen: boolean;
  isSortMenuOpen: boolean;
  sort: TableSort | null;
}

class ContextualMenu extends Component<Props & InjectedIntlProps, State> {
  state: State = {
    isBackgroundMenuOpen: false,
    isSortMenuOpen: false,
    sort: null,
  };

  static defaultProps = {
    boundariesElement: document.body,
  };

  // getting tableHeader cell sort
  componentDidUpdate(nextProps: Props, nextState: State) {
    const { targetCellPosition, editorView, isOpen } = nextProps;
    const { isSortMenuOpen } = nextState;
    const { state } = editorView;

    if (
      targetCellPosition &&
      (isSortMenuOpen !== this.state.isSortMenuOpen ||
        isOpen !== this.props.isOpen)
    ) {
      const cell = state.doc.nodeAt(targetCellPosition);
      if (!cell) {
        return;
      }
      const { sort } = cell.attrs;
      if (sort && sort !== this.state.sort) {
        this.setState(() => ({
          ...this.state,
          sort,
        }));
      }
    }
  }

  render() {
    const { isOpen, mountPoint, offset, boundariesElement } = this.props;
    const items = this.createItems();
    if (!items) {
      return null;
    }

    return (
      <div onMouseLeave={this.closeSubmenu}>
        <DropdownMenu
          mountTo={mountPoint}
          items={items}
          isOpen={isOpen}
          onOpenChange={this.handleOpenChange}
          onItemActivated={this.onMenuItemActivated}
          onMouseEnter={this.handleItemMouseEnter}
          onMouseLeave={this.handleItemMouseLeave}
          fitHeight={188}
          fitWidth={contextualMenuDropdownWidth}
          boundariesElement={boundariesElement}
          offset={offset}
        />
      </div>
    );
  }

  private handleSubMenuRef = (ref: HTMLDivElement | null) => {
    const parent = closestElement(
      this.props.editorView.dom as HTMLElement,
      '.fabric-editor-popup-scroll-parent',
    );
    if (!(parent && ref)) {
      return;
    }
    const boundariesRect = parent.getBoundingClientRect();
    const rect = ref.getBoundingClientRect();
    if (rect.left + rect.width > boundariesRect.width) {
      ref.style.left = `-${rect.width}px`;
    }
  };

  private createSortItems = () => {
    const items: any[] = [];

    items.push({
      content: 'Sort A → Z',
      value: { name: 'a-z' },
      elemAfter:
        this.state.sort !== 'a-z' ? null : (
          <EditorDoneIcon
            primaryColor={colors.B400}
            size="small"
            label="test question"
          />
        ),
    });

    items.push({
      content: 'Sort Z → A',
      value: { name: 'z-a' },
      elemAfter:
        this.state.sort !== 'z-a' ? null : (
          <EditorDoneIcon
            primaryColor={colors.B400}
            size="small"
            label="test question"
          />
        ),
    });

    return [{ items }];
  };

  private createItems = () => {
    const {
      allowMergeCells,
      allowBackgroundColor,
      editorView: { state },
      targetCellPosition,
      isOpen,
      boundariesElement,
      mountPoint,
      selectionRect,
      intl: { formatMessage },
    } = this.props;
    const { isBackgroundMenuOpen, isSortMenuOpen } = this.state;
    const items: any[] = [];

    if (hasParentNodeOfType(state.schema.nodes.tableHeader)(state.selection)) {
      items.push({
        content: formatMessage(tableMessages.reference),
        value: { name: 'reference' },
      });

      items.push({
        content: formatMessage(tableMessages.filter),
        value: { name: 'filter' },
      });

      items.push({
        content: formatMessage(tableMessages.formatting),
        value: { name: 'formatting' },
      });

      items.push({
        content: formatMessage(tableMessages.sort),
        value: { name: 'sort' },
        elemAfter: (
          <div className={ClassName.SORT_SUBMENU} ref={this.handleSubMenuRef}>
            <div className={ClassName.SORT_SUBMENU_LABEL}>
              {this.getSortLabel()}
            </div>
            {isSortMenuOpen && (
              <div>
                <DropdownMenu
                  mountTo={mountPoint}
                  items={this.createSortItems()}
                  isOpen={true}
                  onOpenChange={this.handleOpenChange}
                  onItemActivated={this.onSortMenuItemActivated}
                  onMouseEnter={this.handleItemMouseEnter}
                  onMouseLeave={this.handleItemMouseLeave}
                  fitHeight={100}
                  offset={[12, -23]}
                  fitWidth={contextualMenuDropdownWidth}
                  boundariesElement={boundariesElement}
                />
              </div>
            )}
          </div>
        ),
      });
    }

    if (allowBackgroundColor) {
      const node =
        isOpen && targetCellPosition
          ? state.doc.nodeAt(targetCellPosition)
          : null;
      const background =
        node && node.attrs.background ? node.attrs.background : '#ffffff';
      items.push({
        content: formatMessage(messages.cellBackground),
        value: { name: 'background' },
        elemAfter: (
          <div>
            <div
              className={ClassName.CONTEXTUAL_MENU_ICON}
              style={{ background }}
            />
            {isBackgroundMenuOpen && (
              <div
                className={ClassName.CONTEXTUAL_SUBMENU}
                ref={this.handleSubMenuRef}
              >
                <ColorPalette
                  palette={tableBackgroundColorPalette}
                  borderColors={tableBackgroundBorderColors}
                  onClick={this.setColor}
                  selectedColor={background}
                  checkMarkColor={colors.N500}
                />
              </div>
            )}
          </div>
        ),
      });
    }

    items.push({
      content: formatMessage(tableMessages.insertColumn),
      value: { name: 'insert_column' },
      elemAfter: <Shortcut>⌃⌥→</Shortcut>,
    });

    items.push({
      content: formatMessage(tableMessages.insertRow),
      value: { name: 'insert_row' },
      elemAfter: <Shortcut>⌃⌥↓</Shortcut>,
    });

    const { top, bottom, right, left } = selectionRect;
    const noOfColumns = right - left;
    const noOfRows = bottom - top;

    items.push({
      content: formatMessage(tableMessages.removeColumns, {
        0: noOfColumns,
      }),
      value: { name: 'delete_column' },
    });

    items.push({
      content: formatMessage(tableMessages.removeRows, {
        0: noOfRows,
      }),
      value: { name: 'delete_row' },
    });

    if (allowMergeCells) {
      items.push({
        content: formatMessage(messages.mergeCells),
        value: { name: 'merge' },
        isDisabled: !canMergeCells(state.tr),
      });
      items.push({
        content: formatMessage(messages.splitCell),
        value: { name: 'split' },
        isDisabled: !splitCell(state),
      });
    }

    items.push({
      content: formatMessage(messages.clearCells, {
        0: Math.max(noOfColumns, noOfRows),
      }),
      value: { name: 'clear' },
      elemAfter: <Shortcut>⌫</Shortcut>,
    });

    return items.length ? [{ items }] : null;
  };

  private getSortLabel = () => {
    const { targetCellPosition, editorView } = this.props;
    if (targetCellPosition) {
      const cell = editorView.state.doc.nodeAt(targetCellPosition);
      if (cell) {
        const { sort } = cell.attrs;

        if (sort === 'a-z') {
          return 'A → Z';
        }
        if (sort === 'z-a') {
          return 'Z → A';
        }
      }
    }

    return null;
  };

  private onSortMenuItemActivated = ({ item }: { item: any }) => {
    const { editorView } = this.props;
    const { state, dispatch } = editorView;
    const table = findTable(state.selection);
    const { targetCellPosition } = this.props;
    if (!targetCellPosition || !table) {
      return null;
    }
    const headerCell = state.doc.nodeAt(targetCellPosition);
    if (!headerCell) {
      return null;
    }
    const { tr } = state;
    const map = TableMap.get(table.node);
    const rect = map.findCell(targetCellPosition - table.start);
    const sort = item.value.name === this.state.sort ? null : item.value.name;

    if (sort) {
      const rows: PMNode[] = [];
      for (let i = 1; i < table.node.childCount; i++) {
        const row = table.node.child(i);
        rows.push(row);
      }
      rows.sort((rowA, rowB) => {
        const cellA = rowA.child(rect.left);
        const cellB = rowB.child(rect.left);
        let valueA = getCellValue(cellA);
        let valueB = getCellValue(cellB);
        const isColumnOfNumbers = Number(valueA) && Number(valueB);
        if (isColumnOfNumbers) {
          valueA = Number(valueA);
          valueB = Number(valueB);
        }
        if (sort === 'a-z') {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });

      // header row
      rows.unshift(table.node.child(0));

      tr.replaceWith(
        table.pos,
        table.pos + table.node.nodeSize,
        table.node.type.createChecked(table.node.attrs, rows, table.node.marks),
      );
    }

    // update sort attr for all header cells (remove sort for all columns except the current one)
    const columns = getCellsInRow(0)(state.selection);
    if (columns) {
      columns.forEach((cell, columnIndex) => {
        tr.setNodeMarkup(cell.pos, cell.node.type, {
          ...cell.node.attrs,
          sort: columnIndex === rect.left ? sort : null,
        });
      });
    }

    const sel = Selection.findFrom(
      state.doc.resolve(targetCellPosition),
      1,
      true,
    );
    if (sel) {
      tr.setSelection(sel);
    }
    dispatch(tr);
    this.setState({ isSortMenuOpen: false, sort });
  };

  private onMenuItemActivated = ({ item }: { item: any }) => {
    const { editorView, selectionRect, targetCellPosition } = this.props;
    const { state, dispatch } = editorView;

    switch (item.value.name) {
      case 'reference':
        toggleReferenceMenu(state, dispatch);
        break;
      case 'formatting':
        toggleFormattingMenu(state, dispatch);
        break;
      case 'filter':
        toggleFilterMenu(state, dispatch);
        break;
      case 'merge':
        mergeCellsWithAnalytics()(state, dispatch);
        this.toggleOpen();
        break;
      case 'split':
        splitCellWithAnalytics()(state, dispatch);
        this.toggleOpen();
        break;
      case 'clear':
        emptyMultipleCellsWithAnalytics(
          INPUT_METHOD.CONTEXT_MENU,
          targetCellPosition,
        )(state, dispatch);
        this.toggleOpen();
        break;
      case 'insert_column':
        insertColumnWithAnalytics(
          INPUT_METHOD.CONTEXT_MENU,
          selectionRect.right,
        )(state, dispatch);
        this.toggleOpen();
        break;
      case 'insert_row':
        insertRowWithAnalytics(INPUT_METHOD.CONTEXT_MENU, selectionRect.bottom)(
          state,
          dispatch,
        );
        this.toggleOpen();
        break;
      case 'delete_column':
        deleteColumnsWithAnalytics(INPUT_METHOD.CONTEXT_MENU, selectionRect)(
          state,
          dispatch,
        );
        this.toggleOpen();
        break;
      case 'delete_row':
        const {
          pluginConfig: { isHeaderRowRequired },
        } = getPluginState(state);

        deleteRowsWithAnalytics(
          INPUT_METHOD.CONTEXT_MENU,
          selectionRect,
          isHeaderRowRequired,
        )(state, dispatch);
        this.toggleOpen();
        break;
    }
  };

  private toggleOpen = () => {
    const {
      isOpen,
      editorView: { state, dispatch },
    } = this.props;
    toggleContextualMenu(state, dispatch);
    if (!isOpen) {
      this.setState({
        isBackgroundMenuOpen: false,
      });
    }
  };

  private handleOpenChange = () => {
    const {
      editorView: { state, dispatch },
    } = this.props;
    toggleContextualMenu(state, dispatch);
    this.setState({ isBackgroundMenuOpen: false });
  };

  private handleItemMouseEnter = ({ item }: { item: any }) => {
    const {
      editorView: { state, dispatch },
      selectionRect,
    } = this.props;

    if (item.value.name === 'background') {
      if (!this.state.isBackgroundMenuOpen) {
        this.setState({ isBackgroundMenuOpen: true });
      }
    }

    if (item.value.name === 'sort') {
      if (!this.state.isSortMenuOpen) {
        this.setState({ isSortMenuOpen: true });
      }
    }

    if (item.value.name === 'delete_column') {
      hoverColumns(getSelectedColumnIndexes(selectionRect), true)(
        state,
        dispatch,
      );
    }
    if (item.value.name === 'delete_row') {
      hoverRows(getSelectedRowIndexes(selectionRect), true)(state, dispatch);
    }
  };

  private handleItemMouseLeave = ({ item }: { item: any }) => {
    const { state, dispatch } = this.props.editorView;
    if (item.value.name === 'background' || item.value.name === 'sort') {
      this.closeSubmenu();
    }
    if (
      item.value.name === 'delete_column' ||
      item.value.name === 'delete_row'
    ) {
      clearHoverSelection(state, dispatch);
    }
  };

  private closeSubmenu = () => {
    if (this.state.isBackgroundMenuOpen || this.state.isSortMenuOpen) {
      this.setState({ isBackgroundMenuOpen: false, isSortMenuOpen: false });
    }
  };

  private setColor = (color: string) => {
    const { targetCellPosition, editorView } = this.props;
    const { state, dispatch } = editorView;
    setColorWithAnalytics(color, targetCellPosition)(state, dispatch);
    this.toggleOpen();
  };
}

export const getSelectedColumnIndexes = (selectionRect: Rect): number[] => {
  const columnIndexes: number[] = [];
  for (let i = selectionRect.left; i < selectionRect.right; i++) {
    columnIndexes.push(i);
  }
  return columnIndexes;
};

export const getSelectedRowIndexes = (selectionRect: Rect): number[] => {
  const rowIndexes: number[] = [];
  for (let i = selectionRect.top; i < selectionRect.bottom; i++) {
    rowIndexes.push(i);
  }
  return rowIndexes;
};

export default injectIntl(ContextualMenu);
