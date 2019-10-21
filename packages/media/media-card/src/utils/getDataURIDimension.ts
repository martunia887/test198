import { Component } from 'react';
import { isRetina } from './isRetina';
import { CardDimensions, CardAppearance } from '..';
import { getElementDimensions } from './getElementDimension';
import { defaultImageCardDimensions } from './cardDimensions';
import { isValidPercentageUnit } from './isValidPercentageUnit';
import { isFullPercentageBased } from './dimensionComparer';
import { containsPixelUnit } from './containsPixelUnit';

export type ResolveDimensionsOptions = {
  component: Component;
  dimensions?: CardDimensions;
  appearance?: CardAppearance;
};

export type Dimensions = {
  width: number;
  height: number;
};

export const timesRetinaFactor = ({ width, height }: Dimensions) => {
  const retinaFactor = isRetina() ? 2 : 1;
  return {
    width: width * retinaFactor,
    height: height * retinaFactor,
  };
};

const resolveDimension = (
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

export const resolveDimensions = (
  options: ResolveDimensionsOptions,
): Dimensions => {
  const { component, dimensions } = options;
  if (!dimensions) {
    return defaultImageCardDimensions;
  } else if (isFullPercentageBased(dimensions)) {
    return getElementDimensions(component);
  } else {
    return {
      width: resolveDimension(dimensions, 'width', component),
      height: resolveDimension(dimensions, 'height', component),
    };
  }
};
