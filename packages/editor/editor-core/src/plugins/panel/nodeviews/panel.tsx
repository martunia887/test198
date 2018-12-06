import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { colors, themed } from '@atlaskit/theme';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import SuccessIcon from '@atlaskit/icon/glyph/editor/success';
import NoteIcon from '@atlaskit/icon/glyph/editor/note';
import WarningIcon from '@atlaskit/icon/glyph/editor/warning';
import ErrorIcon from '@atlaskit/icon/glyph/editor/error';
import TipIcon from '@atlaskit/icon/glyph/editor/hint';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { PanelType } from '../../../../../editor-common';
import styled from 'styled-components';

const lightPanelColor = {
  info: colors.B50,
  note: colors.P50,
  tip: colors.G50,
  success: colors.G50,
  warning: colors.Y50,
  error: colors.R50,
};

const darkPanelColor = {
  info: colors.B500,
  note: colors.P500,
  tip: colors.G500,
  success: colors.G500,
  warning: colors.Y500,
  error: colors.R500,
};

const lightIconColor = {
  info: colors.B400,
  note: colors.P400,
  tip: colors.G400,
  success: colors.G400,
  warning: colors.Y400,
  error: colors.R400,
};

const darkIconColor = {
  info: colors.B400,
  note: colors.P400,
  tip: colors.G400,
  success: colors.G400,
  warning: colors.Y400,
  error: colors.R400,
};

const iconColor = (color: PanelType, props: PanelComponentProps) => {
  return themed({ light: lightIconColor[color], dark: darkIconColor[color] })(
    props,
  );
};

const panelIcons = {
  info: InfoIcon,
  success: SuccessIcon,
  note: NoteIcon,
  tip: TipIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
}

export type PanelComponentProps = {
  panelType: PanelType;
  forwardRef: (ref: HTMLElement) => void;
};

type PanelWrapperProps = React.HTMLProps<HTMLDivElement> & {
  panelType: PanelType;
};

export const PanelWrapper = styled.div`
  ${(props: PanelWrapperProps) => {
    // Hexadecimal RGBA
    // https://stackoverflow.com/questions/7015302/css-hexadecimal-rgba
    // Addind the 0xA3 on the end as that is 163, which is 163/256 ~= 0.64, 64% opacity
    const transparency = 'A3';
    const light = lightPanelColor[props.panelType];
    const dark = darkPanelColor[props.panelType] + transparency;
    const background = themed({ light, dark })(props);
    return `
      background: ${background};
    `;
  }};
` as React.ComponentType<PanelWrapperProps>;

class PanelComponent extends React.Component<PanelComponentProps> {
  shouldComponentUpdate(nextProps) {
    return this.props.panelType !== nextProps.panelType;
  }

  render() {
    const { panelType, forwardRef } = this.props;
    const Icon = panelIcons[panelType];

    return (
      <PanelWrapper panelType={panelType} className="ak-editor-panel">
        <span
          style={{ color: iconColor(panelType, this.props) }}
          className="ak-editor-panel__icon"
        >
          <Icon label={`Panel ${panelType}`} />
        </span>
        <div className="ak-editor-panel__content" ref={forwardRef as any} />
      </PanelWrapper>
    );
  }
}

class Panel extends ReactNodeView {
  createDomRef() {
    const domRef = document.createElement('div');
    domRef.setAttribute('data-panel-type', this.node.attrs.panelType);
    return domRef;
  }

  getContentDOM() {
    const dom = document.createElement('div');
    dom.className = 'panel-content-dom';
    return { dom };
  }

  render(props, forwardRef) {
    const { panelType } = this.node.attrs;
    return <PanelComponent panelType={panelType} forwardRef={forwardRef} />;
  }

  update(node, decorations) {
    return super.update(
      node,
      decorations,
      (currentNode, newNode) =>
        currentNode.attrs.panelType === newNode.attrs.panelType,
    );
  }
}

export const panelNodeView = (portalProviderAPI: PortalProviderAPI) => (
  node: any,
  view: any,
  getPos: () => number,
): NodeView => {
  return new Panel(node, view, getPos, portalProviderAPI).init();
};
