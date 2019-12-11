import { Node as PMNode } from 'prosemirror-model';
import { NodeEncoder, NodeEncoderOpts } from '..';
import { PREFIX_MENTION } from '../../char';

// adds PREFIX_MENTION prefix if does not exist yet
const addPrefix = (text: string) =>
  text.match(new RegExp(`^${PREFIX_MENTION}`)) ? text : PREFIX_MENTION + text;

export const mention: NodeEncoder = (
  node: PMNode,
  { context }: NodeEncoderOpts = {},
): string => {
  const content =
    context &&
    context.mentionConversion &&
    context.mentionConversion[node.attrs.id]
      ? context.mentionConversion[node.attrs.id]
      : addPrefix(node.attrs.id);
  return `[~${content}]`;
};
