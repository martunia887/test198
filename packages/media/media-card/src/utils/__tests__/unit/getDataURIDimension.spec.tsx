jest.mock('../../isRetina');
jest.mock('../../getElementDimension');

import {
  getComponentDimensions,
  getRetinaValue,
} from '../../getDataURIDimension';
import { isRetina } from '../../isRetina';
import { getElementDimensions } from '../../getElementDimension';

describe('getComponentDimensions()', () => {
  const element = document.createElement('div');

  it('should use passed dimensions', () => {
    const dimensions = {
      width: 100,
      height: 50,
    };
    const { width, height } = getComponentDimensions({
      element,
      dimensions,
    });

    expect(width).toEqual(100);
    expect(height).toEqual(50);
  });

  it('should use default dimensions', () => {
    const {
      width: noAppearanceWidth,
      height: noAppearanceHeight,
    } = getComponentDimensions({
      element,
    });
    const {
      width: appearanceWidth,
      height: appearanceHeight,
    } = getComponentDimensions({
      element,
      appearance: 'horizontal',
    });

    expect(noAppearanceWidth).toEqual(156);
    expect(appearanceWidth).toEqual(156);
    expect(noAppearanceHeight).toEqual(125);
    expect(appearanceHeight).toEqual(125);
  });

  it('should use getElementDimensions when dimension is percentage unit', () => {
    (getElementDimensions as any).mockReturnValueOnce({
      width: 50,
      height: 50,
    });
    const { width } = getComponentDimensions({
      element,
      dimensions: {
        width: '25%',
      },
    });
    expect(width).toEqual(50);
  });
});

it('should return double size dimensions when is retina factor', () => {
  (isRetina as any).mockReturnValue(true);
  expect(
    getRetinaValue({
      width: 10,
      height: 20,
    }),
  ).toEqual({
    width: 20,
    height: 40,
  });

  (isRetina as any).mockReturnValue(false);
  expect(
    getRetinaValue({
      width: 15,
      height: 35,
    }),
  ).toEqual({
    width: 15,
    height: 35,
  });
});
