import { Node as PMNode } from 'prosemirror-model';
import { NodeEncoder, NodeEncoderOpts } from '..';

export const mention: NodeEncoder = (
  node: PMNode,
  { context }: NodeEncoderOpts = {},
): string => {
  const content =
    context &&
    context.mentionConversion &&
    context.mentionConversion[node.attrs.id]
      ? context.mentionConversion[node.attrs.id]
      : node.attrs.id;
  return `[~${content}]`;
};
