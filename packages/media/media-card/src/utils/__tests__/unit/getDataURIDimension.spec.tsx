jest.mock('../../isRetina');
jest.mock('../../getElementDimension');

import * as React from 'react';
import { Component } from 'react';
import { shallow } from 'enzyme';
import {
  getComponentDimensions,
  getRetinaValue,
} from '../../getDataURIDimension';
import { isRetina } from '../../isRetina';
import { getElementDimensions } from '../../getElementDimension';

describe('getComponentDimensions()', () => {
  class SomeComponent extends Component<any, any> {
    render() {
      return <div />;
    }
  }

  const setup = () => {
    const component = shallow(<SomeComponent />) as any;

    return {
      component,
    };
  };

  it('should use passed dimensions', () => {
    const { component } = setup();
    const dimensions = {
      width: 100,
      height: 50,
    };
    const { width, height } = getComponentDimensions({
      component,
      dimensions,
    });

    expect(width).toEqual(100);
    expect(height).toEqual(50);
  });

  it('should use default dimensions', () => {
    const { component } = setup();
    const {
      width: noAppearanceWidth,
      height: noAppearanceHeight,
    } = getComponentDimensions({
      component,
    });
    const {
      width: appearanceWidth,
      height: appearanceHeight,
    } = getComponentDimensions({
      component,
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
    const { component } = setup();
    const { width } = getComponentDimensions({
      component,
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
