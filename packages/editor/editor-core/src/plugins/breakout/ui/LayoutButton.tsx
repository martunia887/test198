import * as React from 'react';

import { colors } from '@atlaskit/theme';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { EditorView } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import { findParentDomRefOfType } from 'prosemirror-utils';
import { Popup } from '@atlaskit/editor-common';
import CollapseIcon from '@atlaskit/icon/glyph/editor/collapse';
import ExpandIcon from '@atlaskit/icon/glyph/editor/expand';
import ToolbarButton from '../../../ui/ToolbarButton';
import styled from 'styled-components';
import { getBreakoutMode } from '../utils/get-breakout-mode';
import { setBreakoutMode, BreakoutMode } from '../commands/set-breakout-mode';
import { removeBreakout } from '../commands/remove-breakout';
import { getPluginState } from '../index';
import commonMessages from '../../../messages';
import { BreakoutCssClassName } from '../constants';
import { isBreakoutMarkAllowed } from '../utils/is-breakout-mark-allowed';
import { CommandDispatch } from '../../../types';
import { EditorState } from 'prosemirror-state';

const { B300, N300, N20A } = colors;

const Wrapper = styled.div`
  button {
    background: ${N20A};
    color: ${N300};
    :hover {
      background: ${B300};
      color: white !important;
    }
  }
`;

interface Props {
  editorView: EditorView;
  mountPoint?: HTMLElement;
  node: PMNode | null;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
  handleClick?: Function;
}

const BREAKOUT_MODE: Record<string, BreakoutMode> = {
  FULL_WIDTH: 'full-width',
  CENTER: 'center',
  WIDE: 'wide',
};

const getNextBreakoutMode = (currentMode?: BreakoutMode): BreakoutMode => {
  if (currentMode === BREAKOUT_MODE.FULL_WIDTH) {
    return BREAKOUT_MODE.CENTER;
  } else if (currentMode === BREAKOUT_MODE.WIDE) {
    return BREAKOUT_MODE.FULL_WIDTH;
  }

  return BREAKOUT_MODE.WIDE;
};

const getTitle = (layout?: BreakoutMode) => {
  switch (layout) {
    case BREAKOUT_MODE.FULL_WIDTH:
      return commonMessages.layoutFixedWidth;
    case BREAKOUT_MODE.WIDE:
      return commonMessages.layoutFullWidth;
    default:
      return commonMessages.layoutWide;
  }
};

class LayoutButton extends React.Component<Props & InjectedIntlProps, {}> {
  private handleClick = (
    state: EditorState,
    dispatch: CommandDispatch,
    breakoutMode: BreakoutMode,
  ) => () => {
    if (
      [BREAKOUT_MODE.WIDE, BREAKOUT_MODE.FULL_WIDTH].indexOf(breakoutMode) !==
      -1
    ) {
      setBreakoutMode(breakoutMode)(state, dispatch);
    } else {
      removeBreakout()(state, dispatch);
    }
  };

  render() {
    const {
      intl: { formatMessage },
      mountPoint,
      boundariesElement,
      scrollableElement,
      editorView,
      node,
    } = this.props;

    const { state, dispatch } = editorView;

    if (!node || !isBreakoutMarkAllowed(state)) {
      return null;
    }

    const breakoutMode = getBreakoutMode(editorView.state);
    const title = formatMessage(getTitle(breakoutMode));
    const nextBreakoutMode = getNextBreakoutMode(breakoutMode);
    const { selection } = state;

    let pluginState = getPluginState(state);

    let element = findParentDomRefOfType(
      pluginState.breakoutNode.type,
      editorView.domAtPos.bind(editorView),
    )(selection) as HTMLElement;

    let closestEl = element.querySelector(
      `.${BreakoutCssClassName.BREAKOUT_MARK_DOM}`,
    ) as HTMLElement;

    if (closestEl && closestEl.firstChild) {
      element = closestEl.firstChild as HTMLElement;
    }

    return (
      <Popup
        ariaLabel={title}
        target={element}
        offset={[-5, 0]}
        alignY="start"
        alignX="end"
        mountTo={mountPoint}
        boundariesElement={boundariesElement}
        scrollableElement={scrollableElement}
        stick={true}
        forcePlacement={true}
      >
        <Wrapper>
          <ToolbarButton
            title={title}
            onClick={this.handleClick(state, dispatch, nextBreakoutMode)}
            iconBefore={
              breakoutMode === BREAKOUT_MODE.FULL_WIDTH ? (
                <CollapseIcon label={title} />
              ) : (
                <ExpandIcon label={title} />
              )
            }
          />
        </Wrapper>
      </Popup>
    );
  }
}

export default injectIntl(LayoutButton);
