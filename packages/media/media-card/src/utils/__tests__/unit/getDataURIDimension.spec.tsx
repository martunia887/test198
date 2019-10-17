jest.mock('../../isRetina');
jest.mock('../../getElementDimension');

import * as React from 'react';
import { Component } from 'react';
import { shallow } from 'enzyme';
import { getDataURIDimensions } from '../../getDataURIDimension';
import { isRetina } from '../../isRetina';
import { getElementDimensions } from '../../getElementDimension';

describe('getDataURIDimension()', () => {
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
    const { width, height } = getDataURIDimensions({
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
    } = getDataURIDimensions({
      component,
    });
    const {
      width: appearanceWidth,
      height: appearanceHeight,
    } = getDataURIDimensions({
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
    const { width } = getDataURIDimensions({
      component,
      dimensions: {
        width: '25%',
      },
    });
    expect(width).toEqual(50);
  });

  it('should return double size dimensions when is retina factor', () => {
    (isRetina as any).mockReturnValue(true);
    const { component } = setup();

    const { width, height } = getDataURIDimensions({
      component,
      dimensions: {
        width: 10,
        height: 20,
      },
    });

    expect(width).toEqual(20);
    expect(height).toEqual(40);
  });
});
