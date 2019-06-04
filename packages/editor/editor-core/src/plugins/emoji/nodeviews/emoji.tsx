import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import { ReactNodeView, getPosHandler } from '../../../nodeviews';
import { createMobileInlineDomRef } from '../../../ui/InlineNodeWrapper';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { EditorAppearance } from '../../../types';
import { SpriteRepresentation } from '../../../../../../elements/emoji';

export interface Props {
  providerFactory: ProviderFactory;
  editorAppearance?: EditorAppearance;
}

function calculateStyles(emoji) {
  const representation = emoji.representation as SpriteRepresentation;
  const sprite = representation.sprite;
  const sizing = {
    width: `16px`,
    height: `16px`,
  };

  const xPositionInPercent =
    (100 / (sprite.column - 1)) * (representation.xIndex - 0);
  const yPositionInPercent =
    (100 / (sprite.row - 1)) * (representation.yIndex - 0);
  const style = {
    backgroundImage: `url(${sprite.url})`,
    backgroundPosition: `${xPositionInPercent}% ${yPositionInPercent}%`,
    backgroundSize: `${sprite.column * 100}% ${sprite.row * 100}%`,
    ...sizing,
  };

  return style;
}

export class EmojiNodeViewNew {
  node: Node;
  dom: HTMLElement;

  constructor(node: Node, providerFactory) {
    this.dom = document.createElement('img');
    this.dom.style.width = '16px';
    this.dom.style.height = '16px';
    this.dom.className = 'new-emoji-stan';
    this.dom.setAttribute(
      'src',
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA73',
    );

    providerFactory.subscribe('emojiProvider', (name, provider) => {
      if (name != 'emojiProvider') {
        return;
      }

      provider.then(emojiProvider => {
        const foundEmoji = emojiProvider.findByEmojiId({
          shortName: node.attrs.shortName,
          id: node.attrs.id,
          fallback: node.attrs.fallback,
        });
        if (foundEmoji.then) {
          foundEmoji.then(emoji => {
            let styles = {};
            if (!!(emoji.representation && emoji.representation.sprite)) {
              styles = calculateStyles(emoji);
              this.dom.style.backgroundImage = styles.backgroundImage;
              this.dom.style.backgroundPosition = styles.backgroundPosition;
              this.dom.style.backgroundSize = styles.backgroundSize;
            }
          });
        } else {
          this.dom.setAttribute(
            'src',
            foundEmoji.representation.imagePath ||
              foundEmoji.representation.mediaPath,
          );
        }
      });
    });
  }
}

export class EmojiNodeView extends ReactNodeView {
  createDomRef() {
    if (this.reactComponentProps.editorAppearance === 'mobile') {
      return createMobileInlineDomRef();
    }

    return super.createDomRef();
  }

  render(props: Props) {
    const { providerFactory } = props;
    const { shortName, id, text } = this.node.attrs;

    return (
      <NewEmoji
        providers={providerFactory}
        id={id}
        shortName={shortName}
        fallback={text}
      />
    );
  }
}

export default function emojiNodeView(
  portalProviderAPI: PortalProviderAPI,
  providerFactory: ProviderFactory,
  editorAppearance?: EditorAppearance,
) {
  return (node: PMNode, view: EditorView, getPos: getPosHandler): NodeView =>
    new EmojiNodeViewNew(node, providerFactory);
}
