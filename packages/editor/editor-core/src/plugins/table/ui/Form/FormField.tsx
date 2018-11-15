import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { removeColumnAt } from 'prosemirror-utils';
import Button from '@atlaskit/button';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import { TableCssClassName as ClassName } from '../../types';

export interface FormFieldProps {
  columnIndex: number;
  label: string;
  editorView: EditorView;
}

export default class FormField extends React.Component<FormFieldProps, {}> {
  render() {
    const { label } = this.props;

    return (
      <>
        {label && <div className={ClassName.FORM_INPUT_LABEL}>{label}</div>}
        <div className={ClassName.FORM_COLUMN_FIELD_WRAPPER}>
          {this.props.children}
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

  private handleRemove = () => {
    const { state, dispatch } = this.props.editorView;
    dispatch(removeColumnAt(this.props.columnIndex)(state.tr));
    return true;
  };
}
