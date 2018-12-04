import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { findDomRefAtPos } from 'prosemirror-utils';
import {
  Popup,
  akEditorFloatingOverlapPanelZIndex,
} from '@atlaskit/editor-common';
import Select from '@atlaskit/select';
import { TableCssClassName as ClassName } from '../../types';
import { pluginKey } from '../../pm-plugins/main';
import { toggleReferenceMenu } from '../../actions';
import withOuterListeners from '../../../../ui/with-outer-listeners';
import { closestElement } from '../../../../utils';
import { ReferenceProvider } from '../../../refs/provider';

export const calculateOffset = (targetCellRef, state) => {
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

export interface RefsMenuState {
  references: Array<object> | null;
}

const PopupWithOutsideListeners = withOuterListeners(Popup);

export default class RefsMenu extends React.Component<
  RefsMenuProps,
  RefsMenuState
> {
  constructor(props) {
    super(props);
    this.state = {
      references: null,
    };

    props.provider.getReferences().then(references => {
      console.log('~references~', references);

      this.setState({
        references: references.map(item => ({
          label: item.title,
          value: item.id,
        })),
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
        handleClickOutside={this.dismiss}
        handleEscapeKeydown={this.dismiss}
      >
        <div
          className={`${ClassName.REFERENCE_MENU_WRAP}`}
          onMouseDown={this.preventDefault}
          onClick={this.preventDefault}
        >
          <div className={`${ClassName.REFERENCE_MENU_TITLE}`}>
            Link to Table
          </div>
          {this.state.references ? (
            <>
              <div className={`${ClassName.REFERENCE_MENU_DESCRIPTION}`}>
                Choose the table that has the records you want to link to
              </div>
              <Select
                className={`${ClassName.REFERENCE_SELECT}`}
                options={this.state.references}
                placeholder="Choose a table"
                onChange={this.handleChange}
              />
            </>
          ) : (
            'loading...'
          )}
        </div>
      </PopupWithOutsideListeners>
    );
  }

  private preventDefault = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  private dismiss = (event: Event) => {
    const target = event.target as HTMLElement;
    if (
      closestElement(target, `.${ClassName.REFERENCE_MENU_WRAP}`) ||
      target.getAttribute('role') === 'option'
    ) {
      event.preventDefault();
      return false;
    }

    const { state, dispatch } = this.props.editorView;
    toggleReferenceMenu(state, dispatch);
  };

  private handleChange = ({ label, value }) => {
    console.log('~change~');
  };
}
