import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import {
  findDomRefAtPos,
  getCellsInColumn,
  findCellRectClosestToPos,
} from 'prosemirror-utils';
import {
  Popup,
  akEditorFloatingOverlapPanelZIndex,
} from '@atlaskit/editor-common';
import Select from '@atlaskit/select';
import Button from '@atlaskit/button';
import { TableCssClassName as ClassName } from '../../types';
import { pluginKey } from '../../pm-plugins/main';
import { toggleReferenceMenu } from '../../actions';
import withOuterListeners from '../../../../ui/with-outer-listeners';
import { closestElement } from '../../../../utils';
import { ReferenceProvider } from '../../../refs/provider';

const PopupWithOutsideListeners = withOuterListeners(Popup);

const toSelectItems = arr =>
  arr.map(item => ({
    label: item.title,
    value: item.id,
  }));

const calculateOffset = (targetCellRef, state) => {
  const { tableRef } = pluginKey.getState(state);
  let top = -6;

  if (tableRef && targetCellRef) {
    const targetOffset = targetCellRef.getBoundingClientRect();
    const tableOffset = tableRef.getBoundingClientRect();
    let topDiff = targetOffset.top - tableOffset.top;
    if (topDiff < 100) {
      top -= topDiff + 4;
    }
  }
  return [-6, -top];
};

export interface RefsMenuProps {
  editorView: EditorView;
  isOpen: boolean;
  targetCellPosition?: number;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
  provider: ReferenceProvider;
}

type ReferenceItem = { id: string; title: string };

export interface RefsMenuState {
  // tables that can be referenced
  tables: { id: string; title: string; columns: ReferenceItem[] }[] | null;
  selectedTableId?: string;
  selectedColumnId?: string;
}

export default class RefsMenu extends React.Component<
  RefsMenuProps,
  RefsMenuState
> {
  constructor(props) {
    super(props);

    this.state = {
      tables: null,
    };

    props.provider.getReferences().then(references => {
      this.setState({
        tables: references,
      });
    });
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

    return (
      <PopupWithOutsideListeners
        alignX="right"
        alignY="top"
        target={targetCellRef}
        mountTo={mountPoint}
        offset={calculateOffset(targetCellRef, editorView.state)}
        fitHeight={100}
        fitWidth={200}
        boundariesElement={boundariesElement}
        scrollableElement={scrollableElement}
        zIndex={akEditorFloatingOverlapPanelZIndex}
        handleClickOutside={this.handleClickOutside}
        handleEscapeKeydown={this.handleClickOutside}
      >
        <div className={`${ClassName.REFERENCE_MENU_WRAP}`}>
          <div className={`${ClassName.REFERENCE_MENU_TITLE}`}>
            Link to Table
          </div>
          {this.state.tables ? (
            <>
              <div className={`${ClassName.REFERENCE_MENU_DESCRIPTION}`}>
                Choose the table to link records from
              </div>
              <div className={`${ClassName.REFERENCE_SELECT}`}>
                <Select
                  options={toSelectItems(this.state.tables)}
                  placeholder="Choose a table"
                  onChange={this.handleSelectTable}
                />
              </div>
            </>
          ) : (
            'loading...'
          )}
          {this.state.tables && this.state.selectedTableId && (
            <>
              <div className={`${ClassName.REFERENCE_MENU_DESCRIPTION}`}>
                Choose the column on the {`"${this.getSelectedTable().title}"`}{' '}
                table that you’d like to look up
              </div>
              <div className={`${ClassName.REFERENCE_SELECT}`}>
                <Select
                  options={this.getColumns()}
                  placeholder="Choose a column"
                  onChange={this.handleSelectColumn}
                />
              </div>
            </>
          )}
          <div className={`${ClassName.REFERENCE_BUTTONS}`}>
            <Button onClick={this.dismiss}>Cancel</Button>
            <Button appearance="primary" onClick={this.handleSave}>
              Save
            </Button>
          </div>
        </div>
      </PopupWithOutsideListeners>
    );
  }

  private dismiss = () => {
    const { state, dispatch } = this.props.editorView;
    toggleReferenceMenu(state, dispatch);

    this.setState({
      selectedTableId: undefined,
      selectedColumnId: undefined,
    });
  };

  private handleClickOutside = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLElement;
    if (
      closestElement(target, `.${ClassName.REFERENCE_MENU_WRAP}`) ||
      target.getAttribute('role') === 'option'
    ) {
      event.preventDefault();
      return false;
    }
    this.dismiss();
  };

  private handleSave = () => {
    const { state, dispatch } = this.props.editorView;
    const { selection } = state;
    const rect = findCellRectClosestToPos(selection.$from);
    if (!rect) {
      return false;
    }
    const cells = getCellsInColumn(rect.left)(selection);
    if (!cells) {
      return false;
    }
    const { node, pos } = cells[0];
    const { selectedTableId, selectedColumnId } = this.state;

    dispatch(
      state.tr.setNodeMarkup(pos, node.type, {
        ...node.attrs,
        reference: `${selectedTableId}:${selectedColumnId}`,
      }),
    );

    this.dismiss();

    return true;
  };

  private getColumns = () => {
    if (!this.state.tables) {
      return [];
    }
    return toSelectItems(this.getSelectedTable().columns);
  };

  private getSelectedTable = () => {
    return (this.state.tables || []).filter(
      table => table.id === this.state.selectedTableId,
    )[0];
  };

  private handleSelectTable = ({ label, value }) => {
    this.setState({
      selectedTableId: value,
    });
  };

  private handleSelectColumn = ({ label, value }) => {
    this.setState({
      selectedColumnId: value,
    });
  };
}
