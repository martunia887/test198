import { ADFEntity } from '../types';
import { traverse, EntityParent } from './traverse';

export function reduce<T = any>(
  adf: ADFEntity,
  callback: (accunulator: T, node: ADFEntity, parent: EntityParent) => T,
  initial: T,
): T {
  let result = initial;

  traverse(adf, {
    any: (node, parent) => {
      result = callback(result, node, parent);
    },
  });

  return result;
}
