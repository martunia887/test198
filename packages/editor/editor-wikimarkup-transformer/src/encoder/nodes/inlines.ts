import { NodeEncoder, NodeEncoderOpts } from '..';
import { Node as PMNode } from 'prosemirror-model';

import { emoji } from './emoji';
import { hardBreak } from './hard-break';
import { inlineCard } from './inline-card';
import { mention } from './mention';
import { text } from './text';
import { unknown } from './unknown';

const inlinesEncoderMapping: { [key: string]: NodeEncoder } = {
  emoji,
  hardBreak,
  mention,
  text,
  inlineCard,
};

export const inlines: NodeEncoder = (
  node: PMNode,
  opts?: NodeEncoderOpts,
): string => {
  const encoder = inlinesEncoderMapping[node.type.name];
  if (encoder) {
    return encoder(node, opts);
  }
  return unknown(node);
};
