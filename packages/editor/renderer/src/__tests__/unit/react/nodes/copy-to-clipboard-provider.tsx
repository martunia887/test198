import React from 'react';
import {
  CopyTextContext,
  CopyTextConsumer,
} from '../../../../react/nodes/copy-text-provider';
import { mount } from 'enzyme';

describe('Renderer - clipboard utils', () => {
  it('copyTextToClipboard is called correctly when provided', () => {
    const mockCopyFunc = jest.fn();
    const wrapper = mount(
      <CopyTextContext.Provider
        value={{
          copyTextToClipboard: mockCopyFunc,
        }}
      >
        <CopyTextConsumer>
          {({ copyTextToClipboard }) => (
            <button onClick={() => copyTextToClipboard('test')}>click</button>
          )}
        </CopyTextConsumer>
      </CopyTextContext.Provider>,
    );

    wrapper.find('button').simulate('click');

    expect(mockCopyFunc).toHaveBeenCalled();
  });
});
