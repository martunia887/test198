import { NodeEncoder } from '..';
import { Node as PMNode } from 'prosemirror-model';

import { mapping } from '../emoji-unicode-mapping';

import { unknown } from './unknown';

export const emoji: NodeEncoder = (node: PMNode): string => {
  const value = mapping[node.attrs.id];
  if (value) {
    return value;
  }
  return unknown(node);
};
