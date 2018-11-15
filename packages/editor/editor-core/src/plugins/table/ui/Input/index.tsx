import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { findTable } from 'prosemirror-utils';
import {
  Popup,
  akEditorFloatingOverlapPanelZIndex,
} from '@atlaskit/editor-common';
import FieldText from '@atlaskit/field-text';
import { TableCssClassName as ClassName } from '../../types';
import { Command } from '../../../../types';
import { pluginKey } from '../../pm-plugins/column-types';

export interface Props {
  editorView: EditorView;
  target?: HTMLElement;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
}

export default class Input extends React.Component<Props, {}> {
  ref: HTMLElement | null;

  render() {
    const { target } = this.props;
    if (!target) {
      return null;
    }

    return (
      <Popup
        alignX="left"
        alignY="bottom"
        offset={[0, -40]}
        target={target as HTMLElement}
        mountTo={this.props.mountPoint}
        boundariesElement={this.props.boundariesElement}
        scrollableElement={this.props.scrollableElement}
        fitHeight={target.offsetHeight}
        fitWidth={target.offsetWidth}
        zIndex={akEditorFloatingOverlapPanelZIndex}
      >
        <div
          className={ClassName.FAKE_INPUT_POPUP}
          style={{
            width: target.offsetWidth,
            height: target.offsetHeight,
          }}
        >
          <FieldText
            autoFocus
            isLabelHidden
            name="fake-input"
            placeholder={this.getPlaceholder()}
            value={this.getValue()}
            onChange={this.handleOnChange}
            onBlur={() => this.onUpdate()}
            onKeyDown={this.handleKeyDown}
            shouldFitContainer
          />
        </div>
      </Popup>
    );
  }

  private handleKeyDown = event => {
    if (event.key === 'Enter') {
      this.onUpdate();
    }
  };

  private getValue = () => {
    const { target } = this.props;
    const placeholder = this.getPlaceholder();
    return target && target.innerText !== placeholder ? target.innerText : '';
  };

  private getPlaceholder = () => {
    const { target } = this.props;
    if (target) {
      return target.getAttribute('data-placeholder') || undefined;
    }
  };

  private handleOnChange = event => {
    const { target } = this.props;
    if (target) {
      target.innerText = event.target.value || this.getPlaceholder();
    }
  };

  private onUpdate = () => {
    const { target, editorView } = this.props;
    if (!target) {
      return false;
    }
    const { state, dispatch } = editorView;
    const table = findTable(state.selection);
    const fieldName = target.getAttribute('data-name');
    if (!table || !fieldName) {
      return false;
    }
    switch (fieldName) {
      case 'title':
      case 'description':
      case 'submitButtonTitle':
        const value = this.getValue();
        updateFormField(fieldName, value)(state, dispatch);
        return true;
      default:
        return false;
    }
  };
}

export const updateFormField = (fieldName: string, value: any): Command => (
  state,
  dispatch,
) => {
  const table = findTable(state.selection);
  if (!table) {
    return false;
  }
  const newTable = state.schema.nodes.table.createChecked(
    {
      ...table.node.attrs,
      form: {
        ...table.node.attrs.form,
        [fieldName]: value,
      },
    },
    table.node.content,
  );

  dispatch(
    state.tr
      .setMeta(pluginKey, {
        inputRef: undefined,
      })
      .replaceWith(table.pos, table.pos + table.node.nodeSize, newTable),
  );

  return true;
};
