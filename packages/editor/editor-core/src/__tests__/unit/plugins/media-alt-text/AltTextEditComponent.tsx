const mockCloseMediaAltTextMenu = jest.fn();
const mockUpdateAltText = jest.fn(() => jest.fn());

jest.mock('../../../../plugins/media/pm-plugins/alt-text/commands', () => ({
  closeMediaAltTextMenu: mockCloseMediaAltTextMenu,
  updateAltText: mockUpdateAltText,
}));

const mockPmHistory = {
  undo: jest.fn(() => () => {}),
  redo: jest.fn(() => () => {}),
};
jest.mock('prosemirror-history', () => mockPmHistory);

import React from 'react';
import { mountWithIntl } from '@atlaskit/editor-test-helpers';
import { EditorView } from 'prosemirror-view';
import AltTextEdit, {
  AltTextEditComponent,
  AltTextEditComponentState,
  MAX_ALT_TEXT_LENGTH,
} from '../../../../plugins/media/pm-plugins/alt-text/ui/AltTextEdit';
import { InjectedIntl, InjectedIntlProps } from 'react-intl';
import {
  EVENT_TYPE,
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
} from '../../../../plugins/analytics';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import { ReactWrapper } from 'enzyme';
import PanelTextInput from '../../../../ui/PanelTextInput';

const undoInputRuleMock = jest.fn();
jest.mock('prosemirror-inputrules', () => ({
  ...jest.requireActual('prosemirror-inputrules'),
  undoInputRule: (state: any, dispatch: any) =>
    undoInputRuleMock(state, dispatch),
}));

describe('AltTextEditComponent', () => {
  let createAnalyticsEvent: CreateUIAnalyticsEvent;
  let wrapper: ReactWrapper<InjectedIntlProps, AltTextEditComponentState, any>;
  const mockView = jest.fn(
    () =>
      (({
        state: { plugins: [] },
        dispatch: jest.fn(),
        someProp: jest.fn(),
      } as { state: {}; dispatch: Function }) as EditorView),
  );
  const view = new mockView();
  beforeEach(() => {
    jest.clearAllMocks();
    createAnalyticsEvent = jest.fn().mockReturnValue({ fire() {} });
    wrapper = mountWithIntl(<AltTextEdit view={view} value="test" />);
  });

  afterEach(() => {
    if (wrapper && wrapper.length) {
      wrapper.unmount();
    }
  });

  describe('fires respective alt text analytics events', () => {
    const defaultMediaEvent = {
      action: ACTION.EDITED,
      actionSubject: ACTION_SUBJECT.MEDIA,
      actionSubjectId: ACTION_SUBJECT_ID.ALT_TEXT,
      eventType: EVENT_TYPE.TRACK,
    };

    function setupWrapper(
      value: string,
    ): {
      view: EditorView<any>;
      wrapper: ReactWrapper<
        ReactIntl.InjectedIntlProps,
        AltTextEditComponentState,
        any
      >;
    } {
      const intl = {} as InjectedIntl;
      const wrapper = mountWithIntl<{}, AltTextEditComponentState>(
        <AltTextEditComponent
          view={view}
          value={value}
          intl={intl}
          createAnalyticsEvent={createAnalyticsEvent}
        />,
      );
      return { view, wrapper };
    }

    it('fires closed event after alt text component is removed', () => {
      const { wrapper } = setupWrapper('value');
      wrapper.unmount();
      expect(createAnalyticsEvent).toHaveBeenCalledWith({
        ...defaultMediaEvent,
        action: ACTION.CLOSED,
      });
    });

    it('fires cleared and edited events after clearing value and closing popup editor', () => {
      const { wrapper } = setupWrapper('value');
      // @ts-ignore
      wrapper.setProps({ value: '' });

      wrapper.unmount();
      expect(createAnalyticsEvent).toHaveBeenCalledWith({
        ...defaultMediaEvent,
        action: ACTION.CLEARED,
      });
      expect(createAnalyticsEvent).toHaveBeenCalledWith({
        ...defaultMediaEvent,
        action: ACTION.EDITED,
      });
      expect(createAnalyticsEvent).not.toHaveBeenCalledWith({
        ...defaultMediaEvent,
        action: ACTION.ADDED,
      });
    });

    it('fires edited event after updating value and closing popup editor', () => {
      const { wrapper } = setupWrapper('value');
      // @ts-ignore
      wrapper.setProps({ value: 'test changed' });

      wrapper.unmount();
      expect(createAnalyticsEvent).toHaveBeenCalledWith({
        ...defaultMediaEvent,
        action: ACTION.EDITED,
      });
      expect(createAnalyticsEvent).not.toHaveBeenCalledWith({
        ...defaultMediaEvent,
        action: ACTION.CLEARED,
      });
      expect(createAnalyticsEvent).not.toHaveBeenCalledWith({
        ...defaultMediaEvent,
        action: ACTION.ADDED,
      });
    });

    it('fires added event after updating value and closing popup editor', () => {
      const { wrapper } = setupWrapper('');

      // @ts-ignore
      wrapper.setProps({ value: 'value added' });

      wrapper.unmount();
      expect(createAnalyticsEvent).toHaveBeenCalledWith({
        ...defaultMediaEvent,
        action: ACTION.ADDED,
      });
      expect(createAnalyticsEvent).not.toHaveBeenCalledWith({
        ...defaultMediaEvent,
        action: ACTION.EDITED,
      });
      expect(createAnalyticsEvent).not.toHaveBeenCalledWith({
        ...defaultMediaEvent,
        action: ACTION.CLEARED,
      });
    });
  });

  describe('when the back button is clicked', () => {
    it('should call the closeMediaAltText command', () => {
      expect(wrapper.find('button[aria-label="Back"]').length).toEqual(1);
      wrapper.find('button[aria-label="Back"]').simulate('click');

      expect(mockCloseMediaAltTextMenu).toBeCalledWith(
        view.state,
        view.dispatch,
      );
      expect(mockUpdateAltText).not.toBeCalled();
    });
  });

  describe('when the clear text button is clicked', () => {
    it('should clear alt text and not call the closeMediaAltText command', () => {
      expect(
        wrapper.find('button[aria-label="Clear alt text"]').length,
      ).toEqual(1);
      wrapper.find('button[aria-label="Clear alt text"]').simulate('click');

      expect(mockCloseMediaAltTextMenu).not.toBeCalled();
      expect(mockUpdateAltText).toBeCalledWith(null);
    });
  });

  describe('when the esc key is pressed', () => {
    const KEY_CODE_ESCAPE = 27;

    it('should dispatch a handleKeyDown on the view', () => {
      wrapper.find('input').simulate('keydown', { keyCode: KEY_CODE_ESCAPE });

      expect(view.someProp).toBeCalledWith(
        'handleKeyDown',
        expect.any(Function),
      );
      expect(mockUpdateAltText).not.toBeCalled();
    });
  });

  describe('when onChange is called', () => {
    it('should call updateAltText command with the input text value', () => {
      const input = wrapper.find('input');
      // @ts-ignore
      input.instance().value = 'newvalue';
      input.simulate('change');

      expect(mockUpdateAltText).toBeCalledWith('newvalue');
    });

    describe('when new value is empty string', () => {
      it('should set state showClearTextButton=false', () => {
        const intl = {} as InjectedIntl;
        wrapper = mountWithIntl<{}, AltTextEditComponentState>(
          <AltTextEditComponent view={view} value={'test'} intl={intl} />,
        );
        expect(wrapper.state('showClearTextButton')).toBeTruthy();
        const input = wrapper.find('input');
        // @ts-ignore
        input.instance().value = '';
        input.simulate('change');

        expect(wrapper.state('showClearTextButton')).toBeFalsy();
      });
    });

    describe('when there was an empty string, and new text is nonempty', () => {
      it('should set state showClearTextButton=true', () => {
        const intl = {} as InjectedIntl;
        wrapper = mountWithIntl<{}, AltTextEditComponentState>(
          <AltTextEditComponent view={view} intl={intl} />,
        );
        expect(wrapper.state('showClearTextButton')).toBeFalsy();
        const input = wrapper.find('input');
        // @ts-ignore
        input.instance().value = 'newvalue';
        input.simulate('change');

        expect(wrapper.state('showClearTextButton')).toBeTruthy();
      });
    });
  });

  describe('when max length is set', () => {
    it('should ensure max length prop is passed to input', () => {
      const view = new mockView();
      const intl = {} as InjectedIntl;
      const wrapper = mountWithIntl<{}, AltTextEditComponentState>(
        <AltTextEditComponent view={view} intl={intl} />,
      );
      const input = wrapper.find('input');

      expect(input.prop('maxLength')).toBe(MAX_ALT_TEXT_LENGTH);
    });
  });

  describe('when onBlur is called', () => {
    it('should trim whitespace off the ends of alt-text', () => {
      wrapper = mountWithIntl(
        <AltTextEdit view={view} value="   trim whitespace around me   " />,
      );

      const input = wrapper.find('input');
      input.simulate('blur');

      expect(mockUpdateAltText).toBeCalledWith('trim whitespace around me');
    });
  });

  describe('when submit', () => {
    const KEY_CODE_ENTER = 13;

    it('should call updateAltText command with the input text value', () => {
      wrapper = mountWithIntl(<AltTextEdit view={view} value="test" />);

      wrapper.find('input').simulate('keydown', { keyCode: KEY_CODE_ENTER });

      expect(mockCloseMediaAltTextMenu).toBeCalledWith(
        view.state,
        view.dispatch,
      );
    });
  });

  describe('uses custom undo/redo on text input', () => {
    it('calls prosemirror history undo when PanelTextInput onUndo is called', () => {
      const panelTextInput = wrapper.find(PanelTextInput);
      expect(panelTextInput.length).toBe(1);

      (panelTextInput.prop('onUndo') as Function)();
      expect(panelTextInput.prop('onUndo')).toBeDefined();
      expect(mockPmHistory.undo).toHaveBeenCalledWith(
        view.state,
        view.dispatch,
        undefined,
      );
      expect(undoInputRuleMock).toHaveBeenCalledWith(view.state, view.dispatch);
    });

    it('calls prosemirror history redo when PanelTextInput onRedo is called', () => {
      const panelTextInput = wrapper.find(PanelTextInput);
      expect(panelTextInput.prop('onRedo')).toBeDefined();
      (panelTextInput.prop('onRedo') as Function)();
      expect(mockPmHistory.redo).toHaveBeenCalledWith(
        view.state,
        view.dispatch,
      );
    });
  });
});
