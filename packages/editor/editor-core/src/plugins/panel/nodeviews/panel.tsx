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
import EmojiIcon from '@atlaskit/icon/glyph/editor/emoji';
import { Emoji } from '../../../../../../elements/emoji/src';
import { getEmojiRepository } from '../../../../../../elements/util-data-test/src/emoji/story-data';

const panelIcons = {
  info: InfoIcon,
  success: SuccessIcon,
  note: NoteIcon,
  tip: TipIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  emoji: EmojiIcon,
};

const toDOM = (node: Node) =>
  [
    'div',
    {
      class: 'ak-editor-panel',
      'data-panel-type': node.attrs.panelType || 'info',
    },
    ['span', { class: 'ak-editor-panel__icon' }],
    ['div', { class: 'ak-editor-panel__content' }, 0],
  ] as DOMOutputSpec;

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
    this.icon = this.dom.querySelector('.ak-editor-panel__icon') as HTMLElement;
    this.renderIcon(node.attrs.panelType as PanelType, node.attrs.panelIcon);

    // set color here depending on panel type
    // node.attrs.panelColor = '#00ff00';
    if (node.attrs.panelColor) {
      this.dom.setAttribute(
        'style',
        `background-color: ${node.attrs.panelColor};`,
      );
    }
  }

  private renderIcon(panelType: PanelType, panelIcon?: string) {
    const Icon = panelIcons[panelType];

    if (panelType === 'emoji' && panelIcon) {
      const emojiService = getEmojiRepository();
      const emojiShortName = emojiService.findByShortName(panelIcon);
      ReactDOM.render(
        <Emoji key={1} emoji={emojiShortName} showTooltip={true} />,
        this.icon,
      );
    } else {
      ReactDOM.render(<Icon label={`Panel ${panelType}`} />, this.icon);
    }
  }
}

export const panelNodeView = () => (node: any): NodeView => {
  return new PanelNodeView(node);
};
