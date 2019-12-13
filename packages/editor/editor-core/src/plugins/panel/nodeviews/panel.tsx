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
import { getPanelTextColorForCustomBackground } from '../../../../../editor-common/src/styles/shared/panel';
import { PanelOptions } from '../pm-plugins/main';

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
    this.renderIcon(node.attrs.panelType as PanelType, {
      emoji: node.attrs.panelIcon,
      color: node.attrs.panelColor,
    });

    if (node.attrs.panelColor) {
      const style = `background-color: ${node.attrs.panelColor};
      color: ${getPanelTextColorForCustomBackground(node.attrs.panelColor)};
      align-items: center;
      position: relative;`;

      this.dom.setAttribute('style', style);
    }
  }

  private renderIcon(panelType: PanelType, options: PanelOptions) {
    if (options.emoji) {
      const emojiService = getEmojiRepository();
      const emojiShortName = emojiService.findByShortName(options.emoji);
      ReactDOM.render(
        <span
          style={{
            top: '10px',
            position: 'absolute',
          }}
        >
          <Emoji
            fitToHeight={20}
            key={1}
            emoji={emojiShortName}
            showTooltip={true}
          />
        </span>,
        this.icon,
      );
    } else {
      const Icon = panelIcons[panelType];
      const textColor = options.color
        ? getPanelTextColorForCustomBackground(options.color)
        : undefined;
      ReactDOM.render(
        <Icon label={`Panel ${panelType}`} primaryColor={textColor} />,
        this.icon,
      );
    }
  }
}

export const panelNodeView = () => (node: any): NodeView => {
  return new PanelNodeView(node);
};
