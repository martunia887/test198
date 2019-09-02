import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Node, DOMSerializer, DOMOutputSpec } from 'prosemirror-model';
import { NodeView } from 'prosemirror-view';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import SuccessIcon from '@atlaskit/icon/glyph/editor/success';
import NoteIcon from '@atlaskit/icon/glyph/editor/note';
import WarningIcon from '@atlaskit/icon/glyph/editor/warning';
import ErrorIcon from '@atlaskit/icon/glyph/editor/error';
import TipIcon from '@atlaskit/icon/glyph/editor/hint';
import { PanelType } from '@atlaskit/adf-schema';
import { css, cssVar } from '@brickss/compiler';
import { gridSize, borderRadius, colors } from '@atlaskit/theme';
import { akEditorTableCellMinWidth } from '@atlaskit/editor-common';

const panelBorderRadius = cssVar('border-radius', `${borderRadius()}px`);
const panelPadding = cssVar('padding', `${gridSize()}px`);
const minWidth = cssVar('min-width', `${akEditorTableCellMinWidth}px`);
const bgInfoColor = cssVar('bgInfoColor', colors.B50);
const iconInfoColor = cssVar('iconInfoColor', colors.B400);
const bgNoteColor = cssVar('bgNoteColor', colors.P50);
const iconNoteColor = cssVar('iconNoteColor', colors.P400);
const bgSuccessColor = cssVar('bgSuccessColor', colors.G50);
const iconSuccessColor = cssVar('iconSuccessColor', colors.G400);
const bgWarningColor = cssVar('bgWarningColor', colors.Y50);
const iconWarningColor = cssVar('iconWarningColor', colors.Y400);
const bgErrorColor = cssVar('bgErrorColor', colors.R50);
const iconErrorColor = cssVar('iconErrorColor', colors.R400);

const style = css({
  borderRadius: panelBorderRadius,
  margin: '18px 0',
  padding: panelPadding,
  minWidth: minWidth,
  display: 'flex',
  alignItems: 'baseline',
  wordBreak: 'break-word',
  backgroundColor: bgInfoColor,
  color: 'inherit',

  '.icon': {
    display: 'block',
    flexShrink: '0',
    height: '24px',
    width: '24px',
    boxSizing: 'content-box',
    paddingRight: '8px',
    color: iconInfoColor,

    '> span': {
      verticalAlign: 'middle',
      display: 'inline',
    },
  },

  '[state|note]': {
    backgroundColor: bgNoteColor,
    '.icon': {
      color: iconNoteColor,
    },
  },

  '[state|tip], [state|success]': {
    backgroundColor: bgSuccessColor,
    '.icon': {
      color: iconSuccessColor,
    },
  },

  '[state|warning]': {
    backgroundColor: bgWarningColor,
    '.icon': {
      color: iconWarningColor,
    },
  },

  '[state|error], [state|danger]': {
    backgroundColor: bgErrorColor,
    '.icon': {
      color: iconErrorColor,
    },
  },

  '.content': {
    margin: '1px 0 1px',
    flex: '1 0 0',
  },
});

export { style as panelStyle };

const panelIcons = {
  info: InfoIcon,
  success: SuccessIcon,
  note: NoteIcon,
  tip: TipIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

const toDOM = (node: Node) => {
  const className = style({
    info: node.attrs.panelType === 'info',
    success: node.attrs.panelType === 'success',
    note: node.attrs.panelType === 'note',
    tip: node.attrs.panelType === 'tip',
    warning: node.attrs.panelType === 'warning',
    error: node.attrs.panelType === 'error',
  });

  return [
    'div',
    {
      class: className,
      'data-panel-type': node.attrs.panelType || 'info',
    },
    ['span', { class: style.icon }],
    ['div', { class: style.content }, 0],
  ] as DOMOutputSpec;
};

class PanelNodeView {
  node: Node;
  dom: HTMLElement;
  contentDOM: HTMLElement;
  icon: HTMLElement;

  constructor(node: Node) {
    const { dom, contentDOM } = DOMSerializer.renderSpec(document, toDOM(node));
    this.node = node;
    this.dom = dom as HTMLElement;
    this.contentDOM = contentDOM as HTMLElement;
    this.icon = this.dom.querySelector('.' + style.icon) as HTMLElement;
    this.renderIcon(node.attrs.panelType as PanelType);
  }

  private renderIcon(panelType: PanelType) {
    const Icon = panelIcons[panelType];
    ReactDOM.render(<Icon label={`Panel ${panelType}`} />, this.icon);
  }
}

export const panelNodeView = () => (node: any): NodeView => {
  return new PanelNodeView(node);
};
