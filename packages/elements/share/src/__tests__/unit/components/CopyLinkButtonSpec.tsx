// This works only by calling before importing InlineDialog
import mockPopper from '../_mockPopper';
mockPopper();

import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import InlineDialog from '@atlaskit/inline-dialog';
import { ReactWrapper } from 'enzyme';
import { mountWithIntl } from '@atlaskit/editor-test-helpers';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import CopyLinkButton, {
  AUTO_DISMISS_MS,
  Props,
  State,
  HiddenInput,
  MessageContainer,
} from '../../../components/CopyLinkButton';
import Button from '../../../components/styles';

describe('CopyLinkButton', () => {
  let originalExecCommand: (
    commandId: string,
    showUI?: boolean,
    value?: string,
  ) => boolean;
  let mockLink: string = 'link';
  function getCopyLink() {
    return Promise.resolve(mockLink);
  }
  function clickProcessed() {
    // just for test readability.
    // On click, getCopyLink() (above) is called
    // and click is processed upon resolution.
    return Promise.resolve();
  }

  const spiedExecCommand: jest.Mock = jest.fn();

  beforeAll(() => {
    originalExecCommand = document.execCommand;
    document.execCommand = spiedExecCommand;
  });

  afterEach(() => {
    spiedExecCommand.mockReset();
  });

  afterAll(() => {
    document.execCommand = originalExecCommand;
  });

  it('should render', () => {
    const wrapper: ReactWrapper<
      Props & InjectedIntlProps,
      State,
      any
    > = mountWithIntl<Props, State>(
      <CopyLinkButton getCopyLink={getCopyLink} />,
    );

    const inlineDialog = wrapper.find(InlineDialog);
    expect(inlineDialog).toHaveLength(1);
    expect(inlineDialog.prop('placement')).toEqual('top-start');

    const button = wrapper.find(Button);
    expect(button).toHaveLength(1);
    expect(button.prop('appearance')).toEqual('subtle-link');

    const hiddenInput = wrapper.find(HiddenInput);
    expect(hiddenInput).toHaveLength(1);
    expect(
      // @ts-ignore accessing private property just for testing purpose
      wrapper.instance().inputRef.current instanceof HTMLInputElement,
    ).toBeTruthy();
  });

  describe('componentWillUnmount', () => {
    it('should clear this.autoDismiss', async () => {
      const wrapper: ReactWrapper<
        Props & InjectedIntlProps,
        State,
        any
      > = mountWithIntl<Props, State>(
        <CopyLinkButton getCopyLink={getCopyLink} />,
      );
      wrapper.find(Button).simulate('click');
      await clickProcessed();
      expect(wrapper.instance().autoDismiss).not.toBeUndefined();
      wrapper.instance().componentWillUnmount();
      expect(wrapper.instance().autoDismiss).toBeUndefined();
    });
  });

  describe('shouldShowCopiedMessage state', () => {
    it('should render the "copied to clipboard" message, and dismiss the message when click outside the Inline Dialog', async () => {
      const eventMap: { click: Function } = { click: () => {} };
      window.addEventListener = jest.fn(
        (event: 'click', cb: Function) => (eventMap[event] = cb),
      );

      const wrapper: ReactWrapper<
        Props & InjectedIntlProps,
        State,
        any
      > = mountWithIntl<Props, State>(
        <CopyLinkButton getCopyLink={getCopyLink} />,
      );

      wrapper.find(Button).simulate('click');
      await clickProcessed();
      wrapper.update();

      expect(wrapper.state().shouldShowCopiedMessage).toBeTruthy();
      expect(wrapper.find(MessageContainer)).toHaveLength(1);
      expect(wrapper.find(CheckCircleIcon)).toHaveLength(1);
      expect(wrapper.instance().autoDismiss).toBeDefined();

      const clickEventOutsideMessageContainer: Partial<Event> = {
        target: document.createElement('div'),
        type: 'click',
      };
      eventMap.click(clickEventOutsideMessageContainer);

      wrapper.update();

      expect(wrapper.state().shouldShowCopiedMessage).toBeFalsy();
      expect(wrapper.find(CheckCircleIcon)).toHaveLength(0);
      expect(wrapper.find(MessageContainer)).toHaveLength(0);
      expect(wrapper.instance().autoDismiss).toBeUndefined();
    });
  });

  describe('handleClick', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should copy the text from the HiddenInput and call onCopyLink prop if given when the user clicks on the button', async () => {
      const spiedOnLinkCopy: jest.Mock = jest.fn();
      const wrapper: ReactWrapper<
        Props & InjectedIntlProps,
        State,
        any
      > = mountWithIntl<Props, State>(
        <CopyLinkButton
          onCopyLink={spiedOnLinkCopy}
          getCopyLink={getCopyLink}
        />,
      );
      const spiedInputSelect: jest.SpyInstance = jest.spyOn(
        // @ts-ignore accessing private property just for testing purpose
        wrapper.instance().inputRef.current,
        'select',
      );
      wrapper.find(Button).simulate('click');
      await clickProcessed();
      expect(wrapper.instance().inputRef.current.value).toEqual(mockLink);
      expect(spiedInputSelect).toHaveBeenCalledTimes(1);
      expect(spiedExecCommand).toHaveBeenCalledTimes(1);
      expect(spiedOnLinkCopy).toHaveBeenCalledTimes(1);
      expect(spiedOnLinkCopy.mock.calls[0][0]).toEqual(mockLink);
      expect(wrapper.state().shouldShowCopiedMessage).toBeTruthy();

      jest.runOnlyPendingTimers();
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(
        expect.any(Function),
        AUTO_DISMISS_MS,
      );
      expect(wrapper.state().shouldShowCopiedMessage).toBeFalsy();
    });
  });
});
