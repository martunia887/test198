// @flow
import React from 'react';
import { mount } from 'enzyme';
import SizeDetector from '../..';
import { name } from '../../../package.json';

describe(name, () => {
  const createChildWithSpy = spy => args => spy(args);

  // mock the container on so that we can explicitly change the offset dimensions.
  // This will allow shouldComponentUpdate to correctly filter which changes
  // should update the component.
  const container = { offsetWidth: 0, offsetHeight: 0 };
  const updateOffsets = size => {
    if (!size) {
      return;
    }
    container.offsetWidth = size.width;
    container.offsetHeight = size.height;
  };
  const sizeTester = wrapper => size => {
    updateOffsets(size);
    wrapper.instance().handleResize();
    requestAnimationFrame.step();
  };

  beforeAll(() => {
    requestAnimationFrame.reset();
  });

  afterEach(() => {
    requestAnimationFrame.reset();
    container.offsetWidth = 0;
    container.offsetHeight = 0;
  });

  it('should pass width and height to child function', () => {
    const spy = jest.fn();
    mount(<SizeDetector>{createChildWithSpy(spy)}</SizeDetector>);
    requestAnimationFrame.step();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ height: 0, width: 0 });
  });

  it('should use requestAnimationFrame to queue resize measurements', () => {
    const spy = jest.fn();
    mount(<SizeDetector>{createChildWithSpy(spy)}</SizeDetector>);
    expect(spy).not.toHaveBeenCalled();
    requestAnimationFrame.step();
    expect(spy).toHaveBeenCalled();
  });

  it('should call cancelAnimationFrame when unmounted', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <SizeDetector>{createChildWithSpy(spy)}</SizeDetector>,
    );
    // initial frame is queued
    expect(spy).not.toHaveBeenCalled();
    wrapper.unmount();
    requestAnimationFrame.flush();
    expect(spy).not.toHaveBeenCalled();
  });

  // NOTE: enzyme doesn't fully mock object.contentDocument, so we cannot simulate
  // a resize event in the normal way. Triggering the called function is the alternative.
  it('should pass updated size measurements to the child function on resize after an animationFrame', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <SizeDetector>{createChildWithSpy(spy)}</SizeDetector>,
    );

    wrapper.instance().container = container;
    const testWithSize = sizeTester(wrapper);

    // it's called once for the initial render
    requestAnimationFrame.step();
    expect(spy).toHaveBeenCalledTimes(1);

    // without updating the offsets don't expect an increase in call count
    testWithSize();
    expect(spy).toHaveBeenCalledTimes(1);

    testWithSize({ width: 1, height: 1 });
    expect(spy).toHaveBeenCalledTimes(2);

    // if only one of the dimensions has changed still expect an update
    testWithSize({ width: 0, height: 1 });
    testWithSize({ width: 1, height: 0 });
    expect(spy).toHaveBeenCalledTimes(4);
  });

  // NOTE: Enzyme does not seem to support offsetWidth/offsetHeight on elements, so we cannot
  // reliably simulate detection of width/height changes for now. Since we only care about the
  // correct *values* being passed down, we can mock the HTML Element as an object that provides
  // the values that we care about (offsetHeight and offsetWidth).
  it('should call the child function with updated width and height on resize', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <SizeDetector>{createChildWithSpy(spy)}</SizeDetector>,
    );
    wrapper.instance().container = container;

    const testWithSize = sizeTester(wrapper);

    let size = { width: 10, height: 20 };
    testWithSize(size);
    expect(spy).toHaveBeenCalledWith(size);
    size = { width: 100, height: 200 };
    testWithSize(size);
    expect(spy).toHaveBeenCalledWith(size);
  });
});
