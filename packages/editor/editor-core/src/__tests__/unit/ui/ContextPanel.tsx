import { mount } from 'enzyme';
import * as React from 'react';
import ContextPanel, { Content, Panel } from '../../../ui/ContextPanel';

describe('ContextPanel', () => {
  const Component: React.FC = jest.fn(() => null);

  it('renders children', async () => {
    const wrapper = mount(
      <ContextPanel>
        <Component></Component>
      </ContextPanel>,
    );
    expect(wrapper.find(Component).length).toBe(1);
    wrapper.unmount();
  });

  it('passes through width prop', () => {
    const wrapper = mount(
      <ContextPanel width={69}>
        <Component></Component>
      </ContextPanel>,
    );
    const panel = wrapper.find(Panel);
    const content = wrapper.find(Content);

    expect(getComputedStyle(panel.getDOMNode()).width).toEqual('69px');
    expect(getComputedStyle(content.getDOMNode()).width).toEqual('69px');
    wrapper.unmount();
  });

  // ContextPanel animates by doing a CSS transition on the container's width,
  // and inside the container, sliding the content off screen.
  //
  // The container clips content to avoid scroll and overlaying with any elements
  // that might be on the right.

  describe('container', () => {
    it('displays content when visible is true', () => {
      const wrapper = mount(<ContextPanel width={69} visible></ContextPanel>);
      const panel = wrapper.find(Panel);
      expect(getComputedStyle(panel.getDOMNode()).width).toEqual('69px');
      wrapper.unmount();
    });

    it('displays content when visible is undefined', () => {
      const wrapper = mount(<ContextPanel width={69}></ContextPanel>);
      const panel = wrapper.find(Panel);
      expect(getComputedStyle(panel.getDOMNode()).width).toEqual('69px');
      wrapper.unmount();
    });

    it('hides content when visible is false', () => {
      const wrapper = mount(
        <ContextPanel width={69} visible={false}></ContextPanel>,
      );
      const panel = wrapper.find(Panel);
      expect(getComputedStyle(panel.getDOMNode()).width).toEqual('0px');
      wrapper.unmount();
    });

    it('clips content using the container', () => {
      const wrapper = mount(<ContextPanel />);
      const style = getComputedStyle(wrapper.find(Panel).getDOMNode());
      expect(style.overflow).toEqual('hidden');
      wrapper.unmount();
    });
  });

  describe('content', () => {
    it('is scrollable up/down', () => {
      const wrapper = mount(<ContextPanel />);
      const style = getComputedStyle(wrapper.find(Content).getDOMNode());
      expect(style.overflowX).toEqual('scroll');
      wrapper.unmount();
    });
  });
});
