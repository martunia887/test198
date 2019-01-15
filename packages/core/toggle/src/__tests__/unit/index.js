// @flow
import React from 'react';
import { mount } from 'enzyme';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import CheckIcon from '@atlaskit/icon/glyph/check';
import Toggle from '../../Toggle';
import ToggleStateless from '../../ToggleStateless';
import { Input } from '../../styled';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

describe('Toggle', () => {
  describe('properties', () => {
    it('should set the correct icons when checked', () => {
      const wrapper = mount(<Toggle isDefaultChecked />);
      expect(wrapper.find('input').prop('checked')).toBe(true);
      expect(wrapper.find(CheckIcon).exists()).toBe(true);
      expect(wrapper.find(CrossIcon).exists()).toBe(false);
    });

    it('should set the correct icons when not checked', () => {
      const wrapper = mount(<Toggle />);
      expect(wrapper.find('input').prop('checked')).toBe(false);
      expect(wrapper.find(CheckIcon).exists()).toBe(false);
      expect(wrapper.find(CrossIcon).exists()).toBe(true);
    });

    it('should disable the input when disabled', () => {
      const wrapper = mount(<Toggle isDisabled />);
      expect(wrapper.find(Input).prop('disabled')).toBe(true);
    });

    it('should not disabled the input when not disabled', () => {
      const wrapper = mount(<Toggle />);
      expect(wrapper.find(Input).prop('disabled')).toBe(false);
    });

    describe('input events handlers', () => {
      ['change', 'focus', 'blur'].forEach((eventName: string) => {
        it(`should trigger event handlers for ${eventName}`, () => {
          const spy = jest.fn();
          const props = { [`on${capitalize(eventName)}`]: spy };
          const wrapper = mount(<Toggle {...props} />);
          wrapper.find(Input).simulate(eventName);
          expect(spy).toHaveBeenCalled();
        });
      });

      ['focus', 'blur'].forEach((eventName: string) => {
        it('should fire input focus related input handler when disabled', () => {
          const spy = jest.fn();
          const props = { [`on${capitalize(eventName)}`]: spy };
          const wrapper = mount(<Toggle isDisabled {...props} />);

          wrapper.find(Input).simulate(eventName);

          expect(spy).toHaveBeenCalled();
        });
      });

      it('should not fire change events when disabled', () => {
        const spy = jest.fn();
        const props = { onChange: spy };
        const wrapper = mount(<Toggle isDisabled {...props} />);

        wrapper.find(Input).simulate('change');

        expect(spy).not.toHaveBeenCalled();
      });
    });
  });
});

describe('ToggleStateless', () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'warn');
    jest.spyOn(global.console, 'error');
  });
  afterEach(() => {
    global.console.warn.mockRestore();
    global.console.error.mockRestore();
  });

  it('should mount without errors', () => {
    mount(<ToggleStateless isChecked />);
    /* eslint-disable no-console */
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
    /* eslint-enable no-console */
  });
});
