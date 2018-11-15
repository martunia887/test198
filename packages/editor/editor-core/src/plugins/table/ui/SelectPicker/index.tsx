import * as React from 'react';
import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
import { findDomRefAtPos, findChildrenByType } from 'prosemirror-utils';
import {
  Popup,
  akEditorFloatingOverlapPanelZIndex,
} from '@atlaskit/editor-common';
import { Radio } from '@atlaskit/radio';
import { CheckboxIcon } from '@atlaskit/checkbox';
import DropdownMenu from '../../../../ui/DropdownMenu';
import { Cell } from '../../types';
import { pluginKey } from '../../pm-plugins/column-types';
import { TableCssClassName as ClassName } from '../../types';

export interface Props {
  editorView: EditorView;
  clickedCell?: Cell;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
}

export default class SelectPicker extends Component<Props> {
  render() {
    const { clickedCell, editorView } = this.props;

    const items = this.createItems();
    if (!clickedCell || !items) {
      return null;
    }
    const domAtPos = editorView.domAtPos.bind(editorView);
    const target = findDomRefAtPos(
      clickedCell.pos + 2,
      domAtPos,
    ) as HTMLElement;
    if (!target) {
      return null;
    }

    return (
      <Popup
        alignX="left"
        alignY="bottom"
        offset={[0, 0]}
        target={target}
        mountTo={this.props.mountPoint}
        boundariesElement={this.props.boundariesElement}
        scrollableElement={this.props.scrollableElement}
        fitHeight={100}
        fitWidth={150}
        zIndex={akEditorFloatingOverlapPanelZIndex}
      >
        <DropdownMenu
          items={items}
          mountTo={this.props.mountPoint}
          isOpen={true}
          onItemActivated={this.onMenuItemActivated}
          fitHeight={188}
          fitWidth={150}
          offset={[0, 0]}
        />
      </Popup>
    );
  }

  private createItems = () => {
    const { schema } = this.props.editorView.state;
    const { clickedCell } = this.props;
    if (!clickedCell) {
      return null;
    }
    const maybeSingleSelect = findChildrenByType(
      clickedCell.node,
      schema.nodes.singleSelect,
    );
    if (!maybeSingleSelect.length) {
      return null;
    }
    const selectOptions = findChildrenByType(
      clickedCell.node,
      schema.nodes.selectOption,
    );
    if (!selectOptions.length) {
      return null;
    }
    const { cellType } = clickedCell.node.attrs;
    const { node } = maybeSingleSelect[0];
    const items: any[] = [];

    selectOptions.forEach(option => {
      const { textContent } = option.node;
      const itemProps: any = {
        content:
          cellType === 'status-select' ? (
            <div
              className={ClassName.STATUS_LOZENGE}
              style={{ background: option.node.attrs.color }}
            >
              {textContent}
            </div>
          ) : (
            textContent
          ),
        value: { name: textContent, color: option.node.attrs.color },
        isActive:
          cellType === 'single-select' && node.attrs.value === textContent,
      };
      if (cellType === 'multi-select') {
        const { value } = node.attrs;
        const isChecked = value && value.split(',').indexOf(textContent) > -1;
        itemProps.elemBefore = (
          <CheckboxIcon value={textContent} isChecked={isChecked} />
        );
      }
      if (cellType === 'radio-select') {
        const { value } = node.attrs;
        const isChecked = value && value.split(',').indexOf(textContent) > -1;
        itemProps.elemBefore = (
          <Radio value={textContent} isChecked={isChecked} />
        );
      }
      items.push(itemProps);
    });

    items.push({
      className: ClassName.SINGLE_SELECT_DEFAULT_OPTION,
      content: 'Reset',
      value: { name: 'Reset' },
      isActive: false,
    });

    return items.length ? [{ items }] : null;
  };

  private onMenuItemActivated = ({ item }) => {
    const { dispatch, state } = this.props.editorView;
    const { schema } = this.props.editorView.state;
    const { clickedCell } = this.props;
    if (!clickedCell) {
      return null;
    }
    const maybeSingleSelect = findChildrenByType(
      clickedCell.node,
      schema.nodes.singleSelect,
    );
    if (!maybeSingleSelect.length) {
      return null;
    }
    const { node } = maybeSingleSelect[0];
    const { cellType } = clickedCell.node.attrs;

    const value = this.getValue(cellType, node.attrs.value, item.value.name);

    const attrs: any = {
      ...node.attrs,
      value,
    };
    if (cellType === 'status-select') {
      attrs.color = item.value.color;
    }
    const newCell = clickedCell.node.type.create(
      clickedCell.node.attrs,
      state.schema.nodes.singleSelect.createChecked(attrs, node.content),
    );

    let { tr } = state;
    tr = tr.replaceWith(
      state.tr.mapping.map(clickedCell.pos),
      state.tr.mapping.map(clickedCell.pos + clickedCell.node.nodeSize),
      newCell,
    );

    // dismiss the dropdown
    if (
      clickedCell.node.attrs.cellType === 'single-select' ||
      clickedCell.node.attrs.cellType === 'status-select' ||
      item.content === 'Reset'
    ) {
      tr = tr.setMeta(pluginKey, {
        clickedCell: undefined,
      });
    } else {
      tr = tr.setMeta(pluginKey, {
        clickedCell: { ...clickedCell, node: tr.doc.nodeAt(clickedCell.pos) },
      });
    }
    dispatch(tr);
  };

  private getValue = (cellType, currentValue, newValue) => {
    let value = newValue;
    if (cellType === 'multi-select' && currentValue) {
      const values = currentValue.split(',');

      if (values.indexOf(value) === -1) {
        values.push(value);
        value = values.join(',');
      } else {
        value = values.filter(val => val !== value).join(',');
      }
    }

    return newValue === 'Reset' ? null : value;
  };
}
