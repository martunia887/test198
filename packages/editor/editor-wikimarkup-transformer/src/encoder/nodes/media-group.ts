import { NodeEncoder, NodeEncoderOpts } from '..';
import { Node as PMNode } from 'prosemirror-model';
import { media } from './media';

export const mediaGroup: NodeEncoder = (
  node: PMNode,
  { context }: NodeEncoderOpts = {},
): string => {
  const result: string[] = [];
  node.forEach(n => {
    result.push(media(n, { context }));
  });

  return result.join('\n');
};
