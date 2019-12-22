import { Component } from 'react';
import { CardDimensions, CardAppearance } from '..';

import { defaultImageCardDimensions } from './cardDimensions';
import { containsPixelUnit } from './containsPixelUnit';
import { ElementDimension, getElementDimension } from './getElementDimension';
import { isRetina } from './isRetina';
import { isValidPercentageUnit } from './isValidPercentageUnit';

export type getDataURIDimensionOptions = {
  component: Component;
  dimensions?: CardDimensions;
  appearance?: CardAppearance;
};

export const getDataURIDimension = (
  dimension: ElementDimension,
  options: getDataURIDimensionOptions,
): number => {
  const retinaFactor = isRetina() ? 2 : 1;
  const dimensionValue =
    (options.dimensions && options.dimensions[dimension]) || '';

  if (isValidPercentageUnit(dimensionValue)) {
    return getElementDimension(options.component, dimension) * retinaFactor;
  }

  if (typeof dimensionValue === 'number') {
    return dimensionValue * retinaFactor;
  }

  if (containsPixelUnit(`${dimensionValue}`)) {
    return parseInt(`${dimensionValue}`, 10) * retinaFactor;
  }

  return defaultImageCardDimensions[dimension] * retinaFactor;
};
