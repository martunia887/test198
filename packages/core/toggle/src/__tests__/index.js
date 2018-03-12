// @flow
import React from 'react';
import { mount, shallow } from 'enzyme';
import {
  AnalyticsListener,
  AnalyticsContext,
  UIAnalyticsEvent,
} from '@atlaskit/analytics-next';
import CloseIcon from '@atlaskit/icon/glyph/cross';
import ConfirmIcon from '@atlaskit/icon/glyph/check';
import {
  name as packageName,
  version as packageVersion,
} from '../../package.json';
import { Input } from '../../src/styled';

import ToggleWithAnalytics, { ToggleStateless } from '../ToggleStateless';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

describe('ToggleStateless', () => {
  describe('properties', () => {
    it('should set the correct icons when checked', () => {
      const wrapper = mount(<ToggleStateless isChecked />);
      expect(wrapper.find(Input).prop('checked')).toBe(true);
      expect(wrapper.find(ConfirmIcon).exists()).toBe(true);
      expect(wrapper.find(CloseIcon).exists()).toBe(false);
    });

    it('should set the correct icons when not checked', () => {
      const wrapper = mount(<ToggleStateless />);
      expect(wrapper.find(Input).prop('checked')).toBe(false);
      expect(wrapper.find(ConfirmIcon).exists()).toBe(false);
      expect(wrapper.find(CloseIcon).exists()).toBe(true);
    });

    it('should disable the input when disabled', () => {
      const wrapper = mount(<ToggleStateless isDisabled />);
      expect(wrapper.find(Input).prop('disabled')).toBe(true);
    });

    it('should not disabled the input when not disabled', () => {
      const wrapper = mount(<ToggleStateless />);
      expect(wrapper.find(Input).prop('disabled')).toBe(false);
    });

    describe('input events handlers', () => {
      ['change', 'focus', 'blur'].forEach((eventName: string) => {
        it(`should trigger event handlers for ${eventName}`, () => {
          const spy = jest.fn();
          const props = { [`on${capitalize(eventName)}`]: spy };
          const wrapper = mount(<ToggleStateless {...props} />);
          wrapper.find(Input).simulate(eventName);
          expect(spy).toHaveBeenCalled();
        });
      });

      ['focus', 'blur'].forEach((eventName: string) => {
        it('should fire input focus related input handler when disabled', () => {
          const spy = jest.fn();
          const props = { [`on${capitalize(eventName)}`]: spy };
          const wrapper = mount(<ToggleStateless isDisabled {...props} />);

          wrapper.find(Input).simulate(eventName);

          expect(spy).toHaveBeenCalled();
        });
      });

      it('should not fire change events when disabled', () => {
        const spy = jest.fn();
        const props = { onChange: spy };
        const wrapper = mount(<ToggleStateless isDisabled {...props} />);

        wrapper.find(Input).simulate('change');

        expect(spy).not.toHaveBeenCalled();
      });
    });
  });
});
describe('analytics - Toggle', () => {});
