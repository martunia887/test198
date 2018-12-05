import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { EditorView } from 'prosemirror-view';
import { findTable } from 'prosemirror-utils';
import { Popup, TableLayout, tableMarginTop } from '@atlaskit/editor-common';
import ExpandIcon from '@atlaskit/icon/glyph/editor/expand';
import CollapseIcon from '@atlaskit/icon/glyph/editor/collapse';

import commonMessages from '../../../../messages';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { TableCssClassName as ClassName } from '../../types';
import { toggleTableLayout } from '../../actions';
import { layoutButtonSize } from '../styles';

export interface Props {
  editorView: EditorView;
  targetRef?: HTMLElement;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
}

const POPUP_OFFSET = [
  -layoutButtonSize - 5,
  -layoutButtonSize - tableMarginTop + 2,
];

const getTitle = (layout: TableLayout) => {
  switch (layout) {
    case 'default':
      return commonMessages.layoutWide;
    case 'wide':
      return commonMessages.layoutFullWidth;
    default:
      return commonMessages.layoutFixedWidth;
  }
};

function LayoutButton(props: Props & InjectedIntlProps) {
  const {
    intl: { formatMessage },
    mountPoint,
    boundariesElement,
    scrollableElement,
    targetRef,
    editorView,
  } = props;
  if (!targetRef) {
    return null;
  }
  const table = findTable(editorView.state.selection);
  if (!table) {
    return null;
  }
  const { layout } = table.node.attrs;
  const title = formatMessage(getTitle(layout));

  return (
    <Popup
      ariaLabel={title}
      offset={POPUP_OFFSET}
      target={targetRef}
      alignY="top"
      alignX="right"
      stickToBottom={true}
      mountTo={mountPoint}
      boundariesElement={boundariesElement}
      scrollableElement={scrollableElement}
    >
      <div className={ClassName.LAYOUT_BUTTON}>
        <ToolbarButton
          title={title}
          onClick={evt => handleClick(evt, props)}
          iconBefore={
            layout === 'full-width' ? (
              <CollapseIcon label={title} />
            ) : (
              <ExpandIcon label={title} />
            )
          }
        />
      </div>
    </Popup>
  );
}

function handleClick(evt, props: Props) {
  const { state, dispatch } = props.editorView;
  toggleTableLayout(state, dispatch);
}

export default injectIntl(LayoutButton);
