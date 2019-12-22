import { NodeEncoder, NodeEncoderOpts } from '..';
import { Node as PMNode } from 'prosemirror-model';

export const mention: NodeEncoder = (
  node: PMNode,
  { context }: NodeEncoderOpts = {},
): string => {
  const content =
    context &&
    context.conversion &&
    context.conversion.mentionConversion &&
    context.conversion.mentionConversion[node.attrs.id]
      ? context.conversion.mentionConversion[node.attrs.id]
      : node.attrs.id;
  return `[~${content}]`;
};
