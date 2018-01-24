import React from 'react';
import Heading from '../Heading';
import { mount } from 'enzyme';

const id = wrapper => wrapper.children(0).prop('id');

test('children', () => {
  const wrapper1 = mount(<Heading />);
  const wrapper2 = mount(<Heading>testing content</Heading>);

  expect(wrapper1.text()).toBe('');
  expect(wrapper2.text()).toBe('testing content');
});

test('id', () => {
  const wrapper1 = mount(<Heading>test</Heading>);
  const wrapper2 = mount(<Heading>test some more</Heading>);
  const wrapper3 = mount(<Heading>way-cool @)(*U()#*$(#$U* heading</Heading>);

  expect(id(wrapper1)).toBe('test');
  expect(id(wrapper2)).toBe('test-some-more');
  expect(id(wrapper3)).toBe('way-cool-u-u-heading');
});

test('anchor - hidden', () => {
  const wrapper = mount(<Heading>test content</Heading>);
  expect(wrapper.find('a')).toHaveLength(0);
});

test('anchor - shown', () => {
  const wrapper = mount(<Heading>test content</Heading>);
  const heading = wrapper.children(0);

  heading.simulate('mouseenter');
  wrapper.update();

  const a = wrapper.find('a');
  expect(a.text()).toBe('#');
  expect(a.prop('href')).toBe(`#${heading.prop('id')}`);
});
