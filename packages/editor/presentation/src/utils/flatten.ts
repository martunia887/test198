import { ADFEntity, reduce } from '@atlaskit/adf-utils';
import { EntityParent } from '../../../adf-utils/src/traverse/traverse';

function hasValidParent(parent: EntityParent, validTypes: string[]): boolean {
  if (!parent.node) {
    return false;
  }
  if (validTypes.indexOf(parent.node.type) !== -1) {
    return true;
  }

  return parent.parent ? hasValidParent(parent.parent, validTypes) : false;
}

function flatten(adf: ADFEntity, validTypes: string[]): ADFEntity[] {
  return reduce<ADFEntity[]>(
    adf,
    (acc, adf, parent) => {
      if (validTypes.indexOf(adf.type) === -1) {
        return acc;
      }

      if (hasValidParent(parent, validTypes)) {
        return acc;
      }

      return [...acc, adf];
    },
    [] as ADFEntity[],
  );
}

export default flatten;
