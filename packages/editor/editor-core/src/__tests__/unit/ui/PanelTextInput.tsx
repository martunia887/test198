import { mount } from 'enzyme';
import React from 'react';

import PanelTextInput from '../../../ui/PanelTextInput';

const noop = () => {};

describe('@atlaskit/editor-core/ui/PanelTextInput', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should call onSubmit when ENTER key is pressed', () => {
    const onSubmitHandler = jest.fn();
    const panel = mount(<PanelTextInput onSubmit={onSubmitHandler} />);

    const input = panel.find('input');
    (input.getDOMNode() as any).value = 'http://atlassian.com';
    input.simulate('keydown', { which: 'enter', keyCode: 13 });

    expect(onSubmitHandler).toHaveBeenCalledWith('http://atlassian.com');
    panel.unmount();
  });

  it('should prevent KeyDown event if ENTER key is pressed', () => {
    const onSubmitHandler = jest.fn();
    const preventDefault = jest.fn();
    const panel = mount(<PanelTextInput onSubmit={onSubmitHandler} />);

    const input = panel.find('input');
    input.simulate('keydown', { which: 'enter', keyCode: 13, preventDefault });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    panel.unmount();
  });

  it('should not prevent KeyDown event if any other key is pressed', () => {
    const preventDefault = jest.fn();
    const panel = mount(<PanelTextInput onSubmit={noop} />);

    const input = panel.find('input');
    input.simulate('keydown', { which: 'a', keyCode: 65, preventDefault });

    expect(preventDefault).not.toHaveBeenCalled();
    panel.unmount();
  });

  it('should call onCancel when ESC key is pressed', () => {
    const onCancelHandler = jest.fn();
    const panel = mount(<PanelTextInput onCancel={onCancelHandler} />);

    const input = panel.find('input');
    input.simulate('keydown', { which: 'esc', keyCode: 27 });

    expect(onCancelHandler).toHaveBeenCalled();
    panel.unmount();
  });

  it('should call onKeyDown when a key is pressed', () => {
    const onKeyDownHandler = jest.fn();
    const panel = mount(<PanelTextInput onKeyDown={onKeyDownHandler} />);

    const input = panel.find('input');
    input.simulate('keydown', { which: 'a', keyCode: 65 });

    expect(onKeyDownHandler).toHaveBeenCalled();
    panel.unmount();
  });

  it('should focus input if autoFocus prop set to true', () => {
    const panel = mount(<PanelTextInput autoFocus />);
    const inputNode: any = panel.find('input').instance();
    jest.spyOn(inputNode, 'focus');
    jest.runAllTimers();
    expect(inputNode.focus).toHaveBeenCalled();
  });

  it('should focus input passing through focus options if autoFocus prop set to options', () => {
    const panel = mount(<PanelTextInput autoFocus={{ preventScroll: true }} />);
    const inputNode: any = panel.find('input').instance();
    jest.spyOn(inputNode, 'focus');
    jest.runAllTimers();
    expect(inputNode.focus).toHaveBeenCalledWith({ preventScroll: true });
  });
});
