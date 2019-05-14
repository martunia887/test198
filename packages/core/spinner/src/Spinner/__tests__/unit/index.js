// @flow

import React from 'react';
import { mount } from 'enzyme';
import * as colors from '@atlaskit/theme/colors';

import sinon from 'sinon';
import Spinner from '../..';
import Container, { getContainerAnimation } from '../../styledContainer';
import Svg, { svgStyles, getStrokeColor } from '../../styledSvg';

beforeEach(() => {
  sinon.stub(console, 'error');
});

afterEach(() => {
  console.error.restore(); // eslint-disable-line no-console
});

describe('Spinner', () => {
  it('should be possible to create a component', () => {
    const wrapper = mount(<Spinner />);
    expect(wrapper).not.toBe(undefined);
  });

  it('should be active by default', () => {
    const wrapper = mount(<Spinner />);
    expect(wrapper.prop('isCompleting')).toBe(true);
  });

  it('should not use the inverted color scheme by default', () => {
    const wrapper = mount(<Spinner />);
    wrapper.setState({ phase: 'ON' });
    expect(wrapper.prop('invertColor')).toBe(false);
    expect(wrapper.find(Svg).prop('invertColor')).toBe(false);
  });

  it('should start in the OFF phase by default', () => {
    const wrapper = mount(<Spinner />);
    expect(wrapper.state().phase).toBe('OFF');
  });

  it('should leave the DELAY state after some time', () => {
    const wrapper = mount(<Spinner />);
    wrapper.setState({ phase: 'ON' });
    setTimeout(() =>
      expect(wrapper.find(Container).prop('phase')).not.toBe('OFF'),
    );
  });

  describe('delay prop', () => {
    it('should be reflected to the OFF phase animation', () => {
      const delayProp = 1234;
      const wrapper = mount(<Spinner delay={delayProp} />);
      const { delay } = wrapper.props();
      const animation = getContainerAnimation({ delay, phase: 'OFF' });
      const animationDelay = parseFloat(animation[1]);
      expect(animationDelay).toBe(delayProp);
    });
  });

  describe('isCompleting prop', () => {
    it('should add a spinner container when not set', () => {
      const wrapper = mount(<Spinner />);
      wrapper.setState({ phase: 'ON' });
      expect(wrapper.find(Container).length).toBe(1);
    });

    it('should remove the spinner container when set to true', () => {
      const wrapper = mount(<Spinner isCompleting />);
      // wrapper.setState({ phase: 'ON' });
      expect(wrapper.find(Container).length).toBe(0);
    });
  });

  describe('onComplete prop', () => {
    // it('should be called after isCompleting prop is set', () => {
    //   const spy = jest.fn();
    //   const wrapper = mount(<Spinner delay={0} onComplete={spy} />);
    //   const transitionContainerNode = wrapper.find(Container).getDOMNode();

    //   wrapper.setProps({ isCompleting: true });
    //   transitionContainerNode.dispatchEvent(new Event('animationend'));

    //   expect(spy).toHaveBeenCalledTimes(1);
    // });

    it('should not be called if isCompleting is not set', () => {
      const spy = jest.fn();
      const wrapper = mount(<Spinner delay={0} onComplete={spy} />);
      wrapper.setState({ phase: 'ON' });
      const transitionContainerNode = wrapper.find(Container).getDOMNode();

      transitionContainerNode.dispatchEvent(new Event('animationend'));

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('size prop', () => {
    it('should render the spinner with the default size if no value is provided', () => {
      const wrapper = mount(<Spinner />);
      wrapper.setState({ phase: 'ON' });
      expect(wrapper.find(Svg).prop('height')).toBe(24);
      expect(wrapper.find(Svg).prop('width')).toBe(24);
    });

    it('should render tee-shirt sizes with the proper heights/widths', () => {
      const xsmall = mount(<Spinner size="xsmall" />);
      const small = mount(<Spinner size="small" />);
      const medium = mount(<Spinner size="medium" />);
      const large = mount(<Spinner size="large" />);
      const xlarge = mount(<Spinner size="xlarge" />);

      xsmall.setState({ phase: 'ON' });
      expect(xsmall.find(Svg).prop('height')).toBe(8);
      expect(xsmall.find(Svg).prop('width')).toBe(8);

      small.setState({ phase: 'ON' });
      expect(small.find(Svg).prop('height')).toBe(16);
      expect(small.find(Svg).prop('width')).toBe(16);

      medium.setState({ phase: 'ON' });
      expect(medium.find(Svg).prop('height')).toBe(24);
      expect(medium.find(Svg).prop('width')).toBe(24);

      large.setState({ phase: 'ON' });
      expect(large.find(Svg).prop('height')).toBe(48);
      expect(large.find(Svg).prop('height')).toBe(48);

      xlarge.setState({ phase: 'ON' });
      expect(xlarge.find(Svg).prop('width')).toBe(96);
      expect(xlarge.find(Svg).prop('width')).toBe(96);
    });

    it('should render the spinner with a custom size', () => {
      const wrapper = mount(<Spinner size={72} />);
      wrapper.setState({ phase: 'ON' });

      expect(wrapper.find(Svg).prop('height')).toBe(72);
      expect(wrapper.find(Svg).prop('width')).toBe(72);
    });
  });

  describe('invertColor prop', () => {
    it('should set the invertColor prop on Svg when set to true', () => {
      const wrapper = mount(<Spinner invertColor />);
      wrapper.setState({ phase: 'ON' });
      expect(wrapper.find(Svg).prop('invertColor')).toBe(true);
    });

    it('should be colors.N500 by default', () => {
      expect(getStrokeColor({})).toBe(colors.N500);
      expect(getStrokeColor({ invertColor: false })).toBe(colors.N500);
    });

    it('should be colors.N0 when set to true', () => {
      expect(getStrokeColor({ invertColor: true })).toBe(colors.N0);
    });
  });

  describe('svg', () => {
    let styles;

    beforeEach(() => {
      const wrapper = mount(<Spinner />);
      wrapper.setState({ phase: 'ON' });
      const svg = wrapper.find(Svg);
      const svgInterpolatedStyles: Object => Array<string> = (svgStyles[1]: any);
      styles = svgInterpolatedStyles(svg.props()).join('');
    });

    it('should have expected svg stroke keys', () => {
      expect(/stroke-dashoffset/.test(styles)).toBe(true);
      expect(/stroke-dasharray/.test(styles)).toBe(true);
    });

    it('should have strokeDashoffset in px with no space before', () => {
      const dashOffsetMatch = styles.match(/stroke-dashoffset: [0-9.]+px;/);
      expect(dashOffsetMatch).not.toBe(null);
    });
  });
});
