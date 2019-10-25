import { isRetina } from './isRetina';
import { CardDimensions, CardAppearance } from '..';
import { getElementDimensions } from './getElementDimension';
import { defaultImageCardDimensions } from './cardDimensions';
import { isValidPercentageUnit } from './isValidPercentageUnit';
import { isFullPercentageBased } from './dimensionComparer';
import { containsPixelUnit } from './containsPixelUnit';

export type ResolveDimensionsOptions = {
  element: Element;
  dimensions?: CardDimensions;
  appearance?: CardAppearance;
};

export type Dimensions = {
  width: number;
  height: number;
};

export const getRetinaValue = ({ width, height }: Dimensions): Dimensions => {
  const retinaFactor = isRetina() ? 2 : 1;
  return {
    width: width * retinaFactor,
    height: height * retinaFactor,
  };
};

const getComponentDimension = (
  dimensions: CardDimensions,
  dimensionName: keyof CardDimensions,
  element: Element,
) => {
  const dimensionValue = dimensions[dimensionName];
  if (typeof dimensionValue === 'number') {
    return dimensionValue;
  }
  if (isValidPercentageUnit(dimensionValue || '')) {
    return getElementDimensions(element)[dimensionName];
  }
  if (containsPixelUnit(`${dimensionValue}`)) {
    return parseInt(`${dimensionValue}`, 10);
  }
  return defaultImageCardDimensions[dimensionName];
};

export const getComponentDimensions = (
  options: ResolveDimensionsOptions,
): Dimensions => {
  const { element, dimensions } = options;
  if (!dimensions) {
    return defaultImageCardDimensions;
  } else if (isFullPercentageBased(dimensions)) {
    return getElementDimensions(element);
  } else {
    return {
      width: getComponentDimension(dimensions, 'width', element),
      height: getComponentDimension(dimensions, 'height', element),
    };
  }
};
