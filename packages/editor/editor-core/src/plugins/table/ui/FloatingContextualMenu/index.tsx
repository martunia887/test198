import * as React from 'react';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import {
  findDomRefAtPos,
  getSelectionRect,
  findCellRectClosestToPos,
  isCellSelection,
} from 'prosemirror-utils';
import {
  Popup,
  akEditorFloatingOverlapPanelZIndex,
} from '@atlaskit/editor-common';
import ContextualMenu from './ContextualMenu';
import {
  contextualMenuDropdownWidth,
  contextualMenuTriggerSize,
  tablePopupStyles,
} from '../styles';
import { pluginKey } from '../../pm-plugins/main';
import { PluginConfig } from '../../types';

const MenuWrapper = styled.div`
  ${tablePopupStyles}
`;

// offset of the contextual menu dropdown
const calculateOffset = (targetCellRef: HTMLElement, state: EditorState) => {
  const { tableRef } = pluginKey.getState(state);
  let top = -contextualMenuTriggerSize;

  if (tableRef && targetCellRef) {
    const targetOffset = targetCellRef.getBoundingClientRect();
    const tableOffset = tableRef.getBoundingClientRect();
    let topDiff = targetOffset.top - tableOffset.top;
    if (topDiff < 200) {
      top -= topDiff + 2;
    }
  }
  return [contextualMenuTriggerSize / 2, top];
};

export interface Props {
  editorView: EditorView;
  isOpen: boolean;
  targetCellPosition?: number;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
  pluginConfig?: PluginConfig;
}

const FloatingContextualMenu = ({
  mountPoint,
  boundariesElement,
  scrollableElement,
  editorView,
  isOpen,
  targetCellPosition,
  pluginConfig,
}: Props) => {
  if (!isOpen || !targetCellPosition) {
    return null;
  }

  const { selection } = editorView.state;
  const selectionRect = isCellSelection(selection)
    ? getSelectionRect(selection)!
    : findCellRectClosestToPos(selection.$from);

  if (!selectionRect) {
    return null;
  }
  const domAtPos = editorView.domAtPos.bind(editorView);
  const targetCellRef = findDomRefAtPos(targetCellPosition, domAtPos);
  if (!targetCellRef) {
    return null;
  }

  return (
    <Popup
      alignX="right"
      alignY="top"
      target={targetCellRef as HTMLElement}
      mountTo={mountPoint}
      boundariesElement={boundariesElement}
      scrollableElement={scrollableElement}
      fitHeight={188}
      fitWidth={contextualMenuDropdownWidth}
      // z-index value below is to ensure that this menu is above other floating menu
      // in table, but below floating dialogs like typeaheads, pickers, etc.
      zIndex={akEditorFloatingOverlapPanelZIndex}
      forcePlacement={true}
    >
      <MenuWrapper>
        <ContextualMenu
          editorView={editorView}
          offset={calculateOffset(
            targetCellRef as HTMLElement,
            editorView.state,
          )}
          isOpen={isOpen}
          targetCellPosition={targetCellPosition}
          allowMergeCells={pluginConfig!.allowMergeCells}
          allowBackgroundColor={pluginConfig!.allowBackgroundColor}
          selectionRect={selectionRect}
        />
      </MenuWrapper>
    </Popup>
  );
};

export default FloatingContextualMenu;
