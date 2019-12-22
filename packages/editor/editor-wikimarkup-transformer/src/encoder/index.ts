import { Node as PMNode } from 'prosemirror-model';

import { Context } from '../interfaces';

import { blockCard } from './nodes/block-card';
import { blockquote } from './nodes/blockquote';
import { bulletList } from './nodes/bullet-list';
import { codeBlock } from './nodes/code-block';
import { doc } from './nodes/doc';
import { heading } from './nodes/heading';
import { mediaGroup } from './nodes/media-group';
import { orderedList } from './nodes/ordered-list';
import { panel } from './nodes/panel';
import { paragraph } from './nodes/paragraph';
import { rule } from './nodes/rule';
import { table } from './nodes/table';
import { unknown } from './nodes/unknown';

export type MarkEncoder = (text: string, attrs: any) => string;
export type NodeEncoder = (node: PMNode, opts?: NodeEncoderOpts) => string;
export type NodeEncoderOpts = {
  parent?: PMNode;
  context?: Context;
};

const nodeEncoderMapping: { [key: string]: NodeEncoder } = {
  blockquote,
  bulletList,
  codeBlock,
  doc,
  heading,
  mediaGroup,
  mediaSingle: mediaGroup,
  orderedList,
  panel,
  paragraph,
  rule,
  table,
  blockCard,
};

export function encode(node: PMNode, context?: Context): string {
  const encoder = nodeEncoderMapping[node.type.name];
  try {
    if (encoder) {
      return encoder(node, { context });
    }
    return unknown(node);
  } catch (err) {
    return unknown(node);
  }
}
