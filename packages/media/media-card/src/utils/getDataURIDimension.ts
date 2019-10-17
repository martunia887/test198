import { Component } from 'react';
import { isRetina } from './isRetina';
import { CardDimensions, CardAppearance } from '..';
import { getElementDimensions } from './getElementDimension';
import { defaultImageCardDimensions } from './cardDimensions';
import { isValidPercentageUnit } from './isValidPercentageUnit';
import { isFullPercentageBased } from './dimensionComparer';
import { containsPixelUnit } from './containsPixelUnit';

export type getDataURIDimensionOptions = {
  component: Component;
  dimensions?: CardDimensions;
  appearance?: CardAppearance;
};

const timesRetinaFactor = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  const retinaFactor = isRetina() ? 2 : 1;
  return {
    width: width * retinaFactor,
    height: height * retinaFactor,
  };
};

const getDataURIDimension = (
  dimensions: CardDimensions,
  dimensionName: keyof CardDimensions,
  component: Component,
) => {
  const dimensionValue = dimensions[dimensionName];
  if (typeof dimensionValue === 'number') {
    return dimensionValue;
  }
  if (isValidPercentageUnit(dimensionValue || '')) {
    return getElementDimensions(component)[dimensionName];
  }
  if (containsPixelUnit(`${dimensionValue}`)) {
    return parseInt(`${dimensionValue}`, 10);
  }
  return defaultImageCardDimensions[dimensionName];
};

export const getDataURIDimensions = (options: getDataURIDimensionOptions) => {
  const { component, dimensions } = options;
  if (!dimensions) {
    return timesRetinaFactor(defaultImageCardDimensions);
  } else if (isFullPercentageBased(dimensions)) {
    const elementDimensions = getElementDimensions(component);
    return timesRetinaFactor(elementDimensions);
  } else {
    const individualDimensions = {
      width: getDataURIDimension(dimensions, 'width', component),
      height: getDataURIDimension(dimensions, 'height', component),
    };
    return timesRetinaFactor(individualDimensions);
  }
};
