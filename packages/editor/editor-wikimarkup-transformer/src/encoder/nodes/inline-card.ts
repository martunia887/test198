import { NodeEncoder } from '..';
import { Node as PMNode } from 'prosemirror-model';

import { INLINE_CARD_FROM_TEXT_STAMP } from '../../parser/tokenize/issue-key';

import { unknown } from './unknown';

export const inlineCard: NodeEncoder = (node: PMNode): string => {
  if (!node.attrs.url) {
    return unknown(node);
  }

  const match = node.attrs.url.match(INLINE_CARD_FROM_TEXT_STAMP);
  if (!match) {
    return `[${node.attrs.url}|${node.attrs.url}|smart-link]`;
  }

  return `[${match[2]}]`;
};
