import { NodeEncoder } from '..';
import { Node as PMNode } from 'prosemirror-model';

export const rule: NodeEncoder = (_node: PMNode): string => {
  return '----';
};
