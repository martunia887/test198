import { NodeEncoder, NodeEncoderOpts } from '..';
import { Node as PMNode } from 'prosemirror-model';
import { listItem } from './listItem';

export const bulletList: NodeEncoder = (
  node: PMNode,
  { context }: NodeEncoderOpts = {},
): string => {
  const result: string[] = [];
  node.forEach(item => {
    result.push(listItem(item, '*', context));
  });
  return result.join('\n');
};
