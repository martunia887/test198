import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { removeColumnAt, getCellsInColumn } from 'prosemirror-utils';
import Button from '@atlaskit/button';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import { CellType } from '@atlaskit/editor-common';
import { TableCssClassName as ClassName } from '../../types';
import {
  getCellTypeIcon,
  pluginKey as columnTypesPluginKey,
} from '../../pm-plugins/column-types';

export interface FormFieldProps {
  columnIndex: number;
  label: string;
  editorView: EditorView;
  type: CellType;
}

export default class FormField extends React.Component<FormFieldProps, {}> {
  render() {
    const { label } = this.props;

    return (
      <>
        {label && <div className={ClassName.FORM_INPUT_LABEL}>{label}</div>}
        <div className={ClassName.FORM_COLUMN_FIELD_WRAPPER}>
          {this.props.children}
          <div className={ClassName.CELL_NODEVIEW_COLUMN_TYPES_BUTTON}>
            <Button
              appearance="subtle"
              iconBefore={getCellTypeIcon(this.props.type)}
              spacing="none"
              onClick={this.toggleCellTypeMenu}
            />
          </div>
          <Button
            className={ClassName.FORM_REMOVE_FIELD_BUTTON}
            onClick={this.handleRemove}
            spacing="compact"
          >
            <EditorCloseIcon size="small" label="Remove field" />
          </Button>
        </div>
      </>
    );
  }

  private toggleCellTypeMenu = (event: MouseEvent) => {
    const { columnIndex, editorView } = this.props;
    const { dispatch, state } = editorView;
    const cells = getCellsInColumn(columnIndex)(state.selection);

    if (cells) {
      dispatch(
        state.tr.setMeta(columnTypesPluginKey, {
          isMenuOpen: true,
          targetCellPosition: cells[0].pos,
          columnIndex,
        }),
      );
    }
  };

  private handleRemove = () => {
    const { state, dispatch } = this.props.editorView;
    dispatch(removeColumnAt(this.props.columnIndex)(state.tr));
    return true;
  };
}
