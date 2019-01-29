import { mount } from 'enzyme';
import * as React from 'react';
import SearchInputWithLabels from '../../SearchInputWithLabels';

describe('Search', () => {
  const labels = [
    {
      label: 'My Label',
      value: 'my-label',
    },
  ];

  const isInputFocused = wrapper =>
    wrapper.find('input').getDOMNode() === document.activeElement;

  it('should auto focus on mount', () => {
    const wrapper = mount(
      <SearchInputWithLabels labels={labels} placeholder={'my-placeholder'} />,
    );

    expect(isInputFocused(wrapper)).toBe(true);
  });

  it('should render the placeholder with labels', () => {
    const wrapper = mount(
      <SearchInputWithLabels labels={labels} placeholder={'my-placeholder'} />,
    );

    expect(wrapper.find('input').prop('placeholder')).toBe('my-placeholder');
  });

  it('should call onUpdate when updated', () => {
    const updateFn = jest.fn();
    const wrapper = mount(
      <SearchInputWithLabels
        labels={labels}
        onInput={updateFn}
        placeholder={'my-placeholder'}
      />,
    );

    wrapper.find('input').simulate('change', { target: { value: 'Hello' } });

    expect(updateFn.mock.calls[0][0].target.value).toEqual('Hello');
  });
});
