import { NodeEncoder } from '..';
import { Node as PMNode } from 'prosemirror-model';
import { inlines } from './inlines';

export const heading: NodeEncoder = (node: PMNode): string => {
  let result = '';

  node.forEach(n => {
    result += inlines(n);
  });

  return `h${node.attrs.level}. ${result}`;
};
