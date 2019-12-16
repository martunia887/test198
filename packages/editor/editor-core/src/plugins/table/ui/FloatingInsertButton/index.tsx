import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Node as PmNode } from 'prosemirror-model';
import { findDomRefAtPos, findTable } from 'prosemirror-utils';
import { TableMap, CellSelection } from 'prosemirror-tables';
import { Popup } from '@atlaskit/editor-common';
import { TableCssClassName as ClassName } from '../../types';
import InsertButton from './InsertButton';
import { closestElement } from '../../../../utils';
import { INPUT_METHOD } from '../../../analytics';
import {
  insertColumnWithAnalytics,
  insertRowWithAnalytics,
} from '../../commands-with-analytics';
import getPopupOptions from './getPopupOptions';
import { checkIfNumberColumnEnabled } from '../../utils';

export interface Props {
  editorView: EditorView;
  tableRef?: HTMLElement;
  tableNode?: PmNode;
  insertColumnButtonIndex?: number;
  insertRowButtonIndex?: number;
  isHeaderColumnEnabled?: boolean;
  isHeaderRowEnabled?: boolean;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
}

class FloatingInsertButton extends React.Component<
  Props & InjectedIntlProps,
  any
> {
  constructor(props: Props & InjectedIntlProps) {
    super(props);
    this.insertColumn = this.insertColumn.bind(this);
    this.insertRow = this.insertRow.bind(this);
  }

  render() {
    const {
      tableNode,
      editorView,
      insertColumnButtonIndex,
      insertRowButtonIndex,
      tableRef,
      mountPoint,
      boundariesElement,
      isHeaderColumnEnabled,
      isHeaderRowEnabled,
    } = this.props;

    const type =
      typeof insertColumnButtonIndex !== 'undefined'
        ? 'column'
        : typeof insertRowButtonIndex !== 'undefined'
        ? 'row'
        : null;
    if (!tableNode || !tableRef || !type) {
      return null;
    }

    // We can’t display the insert button for row|colum index 0
    // when the header row|colum is enabled, this feature will be change on the future
    if (
      (type === 'column' &&
        isHeaderColumnEnabled &&
        insertColumnButtonIndex === 0) ||
      (type === 'row' && isHeaderRowEnabled && insertRowButtonIndex === 0)
    ) {
      return null;
    }

    const {
      state: { tr },
    } = editorView;
    if (
      tr.selection instanceof CellSelection &&
      ((tr.selection as CellSelection).isColSelection() ||
        (tr.selection as CellSelection).isRowSelection())
    ) {
      return null;
    }

    const cellPosition = this.getCellPosition(type);
    if (!cellPosition) {
      return null;
    }

    const tablePos = findTable(editorView.state.selection);
    if (!tablePos) {
      return null;
    }

    const domAtPos = editorView.domAtPos.bind(editorView);
    const pos = cellPosition + tablePos.start + 1;
    const target = findDomRefAtPos(pos, domAtPos);
    if (!target || !(target instanceof HTMLElement)) {
      return null;
    }

    const targetCellRef =
      type === 'row'
        ? closestElement(target, 'tr')
        : closestElement(target, 'td, th');

    if (!targetCellRef) {
      return null;
    }

    const tableContainerWrapper = closestElement(
      targetCellRef,
      `.${ClassName.TABLE_CONTAINER}`,
    );
    const tableWrapper = closestElement(
      targetCellRef,
      `.${ClassName.TABLE_NODE_WRAPPER}`,
    );

    const index: number =
      type === 'column' ? insertColumnButtonIndex! : insertRowButtonIndex!;

    const hasNumberedColumns = checkIfNumberColumnEnabled(
      editorView.state.selection,
    );

    return (
      <Popup
        target={targetCellRef}
        mountTo={tableContainerWrapper || mountPoint}
        boundariesElement={tableContainerWrapper || boundariesElement}
        scrollableElement={tableWrapper!}
        forcePlacement={true}
        allowOutOfBounds
        {...getPopupOptions(
          type,
          index,
          hasNumberedColumns,
          tableContainerWrapper,
        )}
      >
        <InsertButton
          type={type}
          tableRef={tableRef}
          onMouseDown={type === 'column' ? this.insertColumn : this.insertRow}
        />
      </Popup>
    );
  }

  private getCellPosition(type: 'column' | 'row'): number | null {
    const {
      tableNode,
      insertColumnButtonIndex,
      insertRowButtonIndex,
    } = this.props;
    const tableMap = TableMap.get(tableNode!);

    if (type === 'column') {
      const columnIndex =
        insertColumnButtonIndex === 0 ? 0 : insertColumnButtonIndex! - 1;

      if (columnIndex > tableMap.width - 1) {
        return null;
      }

      return tableMap.positionAt(0, columnIndex!, tableNode!);
    } else {
      const rowIndex =
        insertRowButtonIndex === 0 ? 0 : insertRowButtonIndex! - 1;

      if (rowIndex > tableMap.height - 1) {
        return null;
      }

      return tableMap.positionAt(rowIndex!, 0, tableNode!);
    }
  }

  private insertRow(event: React.SyntheticEvent) {
    const { editorView, insertRowButtonIndex } = this.props;

    if (typeof insertRowButtonIndex !== 'undefined') {
      event.preventDefault();

      const { state, dispatch } = editorView;
      insertRowWithAnalytics(INPUT_METHOD.BUTTON, insertRowButtonIndex)(
        state,
        dispatch,
      );
    }
  }

  private insertColumn(event: React.SyntheticEvent) {
    const { editorView, insertColumnButtonIndex } = this.props;

    if (typeof insertColumnButtonIndex !== 'undefined') {
      event.preventDefault();

      const { state, dispatch } = editorView;
      insertColumnWithAnalytics(INPUT_METHOD.BUTTON, insertColumnButtonIndex)(
        state,
        dispatch,
      );
    }
  }
}

export default injectIntl(FloatingInsertButton);
