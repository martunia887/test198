import * as React from 'react';
import uuid from 'uuid';
import {
  findDomRefAtPos,
  findTable,
  findParentNodeOfTypeClosestToPos,
} from 'prosemirror-utils';
import { TableMap } from 'prosemirror-tables';
import { EditorView } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import { Status } from '@atlaskit/status';
import {
  Popup,
  akEditorFloatingOverlapPanelZIndex,
  akEditorTableToolbarSize,
} from '@atlaskit/editor-common';
import Button from '@atlaskit/button';
import FieldText from '@atlaskit/field-text';
import FieldRange from '@atlaskit/field-range';
import { CheckboxSelect } from '@atlaskit/select';
import { TableCssClassName as ClassName } from '../../types';
import { toggleFilterMenu } from '../../actions';
import withOuterListeners from '../../../../ui/with-outer-listeners';
import { closestElement } from '../../../../utils';
import { contextualMenuTriggerSize } from '../styles';
import { getCellValue } from '../../utils';

const DROPDOWN_WIDTH = 250;
const PopupWithOutsideListeners = withOuterListeners(Popup);

const getDefaultState = () => ({
  filter: [],
  editing: false,
});

const doesCellValueMatchTheFilter = (
  filter: Array<string | number> | null,
  cellValue: string,
) => {
  if (!filter) {
    return false;
  }
  let isFiltered = filter.length ? true : false;
  filter.forEach(filterValue => {
    if (
      (typeof filterValue === 'string' &&
        cellValue.indexOf(filterValue) > -1) ||
      (typeof filterValue === 'number' && Number(cellValue) >= filterValue)
    ) {
      isFiltered = false;
    }
  });
  return isFiltered;
};

export interface FilterMenuProps {
  editorView: EditorView;
  isOpen: boolean;
  targetCellPosition?: number;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
}

export interface FilterMenuState {
  filter: string[];
  editing: boolean;
}

export interface Item {
  label: string | React.ReactNode;
  value: string;
  isSelected: boolean;
}

export default class FilterMenu extends React.Component<
  FilterMenuProps,
  FilterMenuState
> {
  constructor(props: FilterMenuProps) {
    super(props);
    this.state = getDefaultState();
  }

  // getting tableHeader cell filter
  componentDidUpdate(nextProps: FilterMenuProps) {
    const { targetCellPosition, isOpen, editorView } = nextProps;
    const { state } = editorView;
    if (targetCellPosition && isOpen !== this.props.isOpen) {
      const cell = state.doc.nodeAt(targetCellPosition);
      if (!cell) {
        return;
      }
      const { filter } = cell.attrs;
      if (filter) {
        this.setState({
          ...this.state,
          filter,
        });
      } else {
        this.setState(getDefaultState());
      }
    }
  }

  render() {
    const {
      mountPoint,
      boundariesElement,
      scrollableElement,
      editorView,
      isOpen,
      targetCellPosition,
    } = this.props;

    if (!isOpen || !targetCellPosition) {
      return null;
    }

    const domAtPos = editorView.domAtPos.bind(editorView);
    const targetCellRef = findDomRefAtPos(
      targetCellPosition,
      domAtPos,
    ) as HTMLElement;
    if (!targetCellRef) {
      return null;
    }

    const options = this.getOptions();
    if (!options) {
      return null;
    }
    const isColumnOfNumbers = !!options.filter(option =>
      Number(option.value) ? true : false,
    ).length;

    const min = Math.min(...options.map(option => Number(option.value)));
    const max = Math.max(...options.map(option => Number(option.value)));

    console.log({ min, max });

    return (
      <PopupWithOutsideListeners
        alignX="right"
        alignY="top"
        target={targetCellRef}
        mountTo={mountPoint}
        offset={[-contextualMenuTriggerSize / 2, akEditorTableToolbarSize - 1]}
        fitHeight={200}
        fitWidth={DROPDOWN_WIDTH}
        boundariesElement={boundariesElement}
        scrollableElement={scrollableElement}
        zIndex={akEditorFloatingOverlapPanelZIndex}
        handleClickOutside={this.handleClickOutside}
        handleEscapeKeydown={this.handleClickOutside}
        forcePlacement={true}
      >
        <div
          className={`${ClassName.MENU_WRAP} ${ClassName.FORMATTING_MENU_WRAP}`}
          style={{ width: DROPDOWN_WIDTH }}
        >
          {isColumnOfNumbers ? (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <FieldText
                  autoFocus
                  placeholder="Search"
                  isLabelHidden
                  shouldFitContainer
                  onChange={this.handleRangeOnChange}
                />
              </div>
              <div className={`${ClassName.FILTER_RANGE_WRAP}`}>
                <div>Range</div>
                <Button onClick={this.handleOnEdit}>Edit</Button>
              </div>
              <div>
                <FieldRange
                  value={this.getRangeValue() || min}
                  min={min}
                  max={max}
                  step={10}
                  onChange={this.handleOnSliderChange}
                />
              </div>
              <div className={`${ClassName.FILTER_RANGE_MINMAX_WRAP}`}>
                <div>{min}</div>
                <div>{max}</div>
              </div>
            </div>
          ) : (
            <CheckboxSelect
              className="checkbox-select"
              classNamePrefix="filter"
              options={options}
              defaultValue={options.filter(option => !option.isSelected)}
              placeholder="Search"
              onChange={this.handleOnChange}
              autoFocus
              menuIsOpen
            />
          )}
        </div>
      </PopupWithOutsideListeners>
    );
  }

  private dismiss = () => {
    const { state, dispatch } = this.props.editorView;
    toggleFilterMenu(state, dispatch);
    this.setState(getDefaultState());
  };

  private handleClickOutside = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLElement;
    if (
      closestElement(target, `.${ClassName.MENU_WRAP}`) ||
      target.getAttribute('role') === 'option' ||
      !document.contains(target)
    ) {
      event.preventDefault();
      return false;
    }
    this.dismiss();
  };

  private getOptions = (): Item[] | null => {
    const { state } = this.props.editorView;
    const table = findTable(state.selection);
    const { targetCellPosition } = this.props;
    if (!targetCellPosition || !table) {
      return null;
    }

    const map = TableMap.get(table.node);
    const headerCell = state.doc.nodeAt(targetCellPosition);
    if (!headerCell) {
      return null;
    }
    const rect = map.findCell(targetCellPosition - table.start);
    const cells = map.cellsInRect({
      left: rect.left,
      right: rect.left + 1,
      top: 1,
      bottom: map.height,
    });
    const nodes: PMNode[] = [];

    // getting content of each cell
    cells.forEach(cellPos => {
      const cell = state.doc.nodeAt(cellPos + table.start);
      if (!cell) {
        return;
      }
      nodes.push(((cell.firstChild!.content as any).content || [null])[0]);
    });

    return nodes.map((node: PMNode) => {
      let label;
      let value;
      switch (node.type.name) {
        case 'text':
          label = value = node.textContent;
          break;
        case 'status':
          label = (
            <Status
              text={node.attrs.text}
              color={node.attrs.color}
              localId={uuid()}
            />
          );
          value = node.attrs.text;
          break;
        default:
          label = value = node.textContent;
          break;
      }
      return {
        label,
        value,
        isSelected: doesCellValueMatchTheFilter(headerCell.attrs.filter, value),
      };
    });
  };

  private handleOnChange = (selectedItems: Item[]) => {
    const filter = selectedItems.map(item => item.value);
    this.applyFilter(filter);
  };

  private applyFilter = (filter: Array<string | number>) => {
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
    const cells = map.cellsInRect({
      left: rect.left,
      right: rect.left + 1,
      top: 1,
      bottom: map.height,
    });
    cells.forEach(pos => {
      const cellPos = pos + table.start;
      const cell = state.doc.nodeAt(cellPos);
      if (!cell) {
        return;
      }
      const cellValue = getCellValue(cell);
      const row = findParentNodeOfTypeClosestToPos(
        tr.doc.resolve(cellPos),
        state.schema.nodes.tableRow,
      );
      if (row) {
        tr.setNodeMarkup(row.pos, row.node.type, {
          ...row.node.attrs,
          isFiltered: doesCellValueMatchTheFilter(filter, cellValue),
        });
      }
    });

    dispatch(
      tr.setNodeMarkup(targetCellPosition, headerCell.type, {
        ...headerCell.attrs,
        filter,
      }),
    );
  };

  private handleOnEdit = () => {
    this.setState({ editing: !this.state.editing });
  };

  private handleOnSliderChange = (value: number) => {
    this.applyFilter([value]);
  };

  private handleRangeOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = Number((event.target as HTMLInputElement).value);
    this.applyFilter([value]);
  };

  private getRangeValue = (): number | null => {
    const { editorView } = this.props;
    const { state } = editorView;
    const table = findTable(state.selection);
    const { targetCellPosition } = this.props;
    if (!targetCellPosition || !table) {
      return null;
    }
    const headerCell = state.doc.nodeAt(targetCellPosition);
    if (!headerCell) {
      return null;
    }
    return headerCell.attrs.filter ? Number(headerCell.attrs.filter[0]) : null;
  };
}
