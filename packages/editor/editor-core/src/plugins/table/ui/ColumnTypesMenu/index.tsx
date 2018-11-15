import * as React from 'react';
import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
import { findTable } from 'prosemirror-utils';
import {
  Popup,
  akEditorFloatingOverlapPanelZIndex,
} from '@atlaskit/editor-common';

import EditorTextStyleIcon from '@atlaskit/icon/glyph/editor/text-style';
import EditorMentionIcon from '@atlaskit/icon/glyph/editor/mention';
import EditorTaskIcon from '@atlaskit/icon/glyph/editor/task';
import EditorEmojiIcon from '@atlaskit/icon/glyph/editor/emoji';
import DecisionIcon from '@atlaskit/icon/glyph/editor/decision';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import Date from '../../icons/Date';
import Number from '../../icons/Number';
import Slider from '../../icons/Slider';
import Currency from '../../icons/Currency';
import EditorAlignLeftIcon from '@atlaskit/icon/glyph/editor/align-left';
import RadioIcon from '@atlaskit/icon/glyph/radio';
import EditorWarningIcon from '@atlaskit/icon/glyph/editor/warning';
import MultiSelect from '../../icons/MultiSelect';

import DropdownMenu from '../../../../ui/DropdownMenu';
import withOuterListeners from '../../../../ui/with-outer-listeners';
import {
  pluginKey,
  getColumnTypesButtonRef,
  setColumnType,
} from '../../pm-plugins/column-types';

const PopupWithListeners = withOuterListeners(Popup);

export interface Props {
  editorView: EditorView;
  columnIndex: number;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
  isOpen?: boolean;
}

export default class ColumnTypesMenu extends Component<Props> {
  render() {
    const {
      columnIndex,
      mountPoint,
      boundariesElement,
      scrollableElement,
      isOpen,
      editorView,
    } = this.props;
    const items = this.createItems();
    if (!isOpen || !items) {
      return null;
    }
    const target = getColumnTypesButtonRef(columnIndex)(editorView);
    if (!target) {
      return null;
    }

    return (
      <PopupWithListeners
        alignX="left"
        alignY="top"
        offset={[14, -12]}
        target={target}
        mountTo={mountPoint}
        boundariesElement={boundariesElement}
        scrollableElement={scrollableElement}
        fitHeight={100}
        fitWidth={200}
        zIndex={akEditorFloatingOverlapPanelZIndex}
        handleClickOutside={this.dismiss}
      >
        <DropdownMenu
          items={items}
          mountTo={this.props.mountPoint}
          isOpen={true}
          onItemActivated={this.onMenuItemActivated}
          fitHeight={188}
          fitWidth={180}
          offset={[13, -20]}
        />
      </PopupWithListeners>
    );
  }

  private dismiss = () => {
    const { dispatch, state } = this.props.editorView;
    dispatch(
      state.tr.setMeta(pluginKey, {
        columnIndex: undefined,
        isMenuOpen: false,
        selectMenuType: undefined,
      }),
    );
  };

  private createItems = () => {
    const items: any[] = [];

    items.push({
      content: 'Normal text',
      value: { name: 'text' },
      elemBefore: <EditorTextStyleIcon label="Normal text" />,
    });

    items.push({
      content: 'Long text',
      value: { name: 'long-text' },
      elemBefore: <EditorAlignLeftIcon label="Long text" />,
    });

    items.push({
      content: 'Date',
      value: { name: 'date' },
      elemBefore: <Date label="Date" />,
    });

    items.push({
      content: 'Person',
      value: { name: 'mention' },
      elemBefore: <EditorMentionIcon label="Person" />,
    });

    items.push({
      content: 'Single select',
      value: { name: 'single-select' },
      elemBefore: <ExpandIcon label="Single select" />,
    });

    items.push({
      content: 'Multiple select',
      value: { name: 'multi-select' },
      elemBefore: <MultiSelect label="Multiple select" />,
    });

    items.push({
      content: 'Radio',
      value: { name: 'radio-select' },
      elemBefore: <RadioIcon label="Radio" />,
    });

    items.push({
      content: 'Status',
      value: { name: 'status-select' },
      elemBefore: <EditorWarningIcon label="Status" />,
    });

    items.push({
      content: 'Checkbox',
      value: { name: 'checkbox' },
      elemBefore: <EditorTaskIcon label="Checkbox" />,
    });

    items.push({
      content: 'Slider',
      value: { name: 'slider' },
      elemBefore: <Slider label="Slider" />,
    });

    items.push({
      content: 'Emoji',
      value: { name: 'emoji' },
      elemBefore: <EditorEmojiIcon label="Emoji" />,
    });

    items.push({
      content: 'Decision',
      value: { name: 'decision' },
      elemBefore: <DecisionIcon label="Decision" />,
    });

    items.push({
      content: 'Number',
      value: { name: 'number' },
      elemBefore: <Number label="Number" />,
    });

    items.push({
      content: 'Currency',
      value: { name: 'currency' },
      elemBefore: <Currency label="Currency" />,
    });

    return items.length ? [{ items }] : null;
  };

  private onMenuItemActivated = ({ item }) => {
    const { editorView, columnIndex } = this.props;
    const { state, dispatch } = editorView;
    const table = findTable(state.selection);
    if (!table || columnIndex === null) {
      return;
    }
    const cellType = item.value.name;
    if (cellType.indexOf('-select') > -1) {
      dispatch(
        state.tr.setMeta(pluginKey, {
          isMenuOpen: false,
          selectMenuType: cellType,
        }),
      );
      return;
    }

    const { slider, paragraph, decisionList } = state.schema.nodes;

    let content;
    if (cellType === 'decision') {
      content = decisionList.createAndFill();
    } else if (cellType === 'slider') {
      content = paragraph.create({}, slider.createChecked());
    } else {
      content = paragraph.createAndFill();
    }

    setColumnType(columnIndex, cellType, content)(state, dispatch);

    this.dismiss();
  };
}
