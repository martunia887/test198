import { NodeEncoder } from '..';
import { Node as PMNode } from 'prosemirror-model';

export const hardBreak: NodeEncoder = (_node: PMNode): string => {
  return '\n';
};
