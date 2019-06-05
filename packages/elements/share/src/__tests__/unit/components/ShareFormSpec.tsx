import Button from '@atlaskit/button';
import Form, { FormFooter, FormSection, HelperMessage } from '@atlaskit/form';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Tooltip from '@atlaskit/tooltip';
import { shallow } from 'enzyme';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { CommentField } from '../../../components/CommentField';
import CopyLinkButton from '../../../components/CopyLinkButton';
import { ShareForm } from '../../../components/ShareForm';
import { ShareHeader } from '../../../components/ShareHeader';
import { UserPickerField } from '../../../components/UserPickerField';
import { messages } from '../../../i18n';
import { ConfigResponse, DialogContentState, ShareError } from '../../../types';
import { renderProp } from '../_testUtils';

describe('ShareForm', () => {
  const mockLink = 'some-link';
  function getCopyLink() {
    return Promise.resolve(mockLink);
  }
  const loadOptions = jest.fn();

  it.each`
    allowComment | submitButtonLabel
    ${true}      | ${undefined}
    ${false}     | ${undefined}
    ${true}      | ${'Invite'}
  `(
    'should render From with fields (allowComment $allowComment, submitButton $submitButtonLabel)',
    ({ allowComment, submitButtonLabel }) => {
      const onShareClick = jest.fn();
      const config: ConfigResponse = {
        mode: 'EXISTING_USERS_ONLY',
        allowComment,
      };
      const component = shallow(
        <ShareForm
          getCopyLink={getCopyLink}
          loadOptions={loadOptions}
          onShareClick={onShareClick}
          title="some title"
          config={config}
          submitButtonLabel={submitButtonLabel}
        />,
      );

      const akForm = component.find<any>(Form);
      expect(akForm).toHaveLength(1);
      expect(akForm.prop('onSubmit')).toBe(onShareClick);

      const formProps = {};
      const form = renderProp(akForm, 'children', { formProps })
        .dive()
        .dive()
        .find('form');
      expect(form).toHaveLength(1);
      expect(form.find(ShareHeader).prop('title')).toEqual('some title');

      const formSection = form.find(FormSection);
      expect(formSection).toHaveLength(1);
      const userPickerField = formSection.find(UserPickerField);
      expect(userPickerField).toHaveLength(1);
      expect(userPickerField.props()).toMatchObject({
        loadOptions,
        config,
      });
      expect(formSection.find(CommentField)).toHaveLength(allowComment ? 1 : 0);

      const footer = form.find(FormFooter);
      expect(footer).toHaveLength(1);
      const button = footer.find(Button);
      expect(button).toHaveLength(1);
      expect(button.props()).toMatchObject({
        appearance: 'primary',
        type: 'submit',
        isLoading: false,
        children: (
          <>
            {submitButtonLabel || <FormattedMessage {...messages.formSend} />}
          </>
        ),
      });
      const copyLinkButton = footer.find(CopyLinkButton).dive();
      expect(copyLinkButton.length).toBe(1);
      expect(copyLinkButton.prop('getCopyLink')).toEqual(getCopyLink);

      const helperMessage = form.find(HelperMessage);
      expect(helperMessage).toHaveLength(0);
    },
  );

  describe('isSharing prop', () => {
    it('should set isLoading prop to true to the Send button', () => {
      const wrapper = shallow(
        <ShareForm
          getCopyLink={getCopyLink}
          loadOptions={loadOptions}
          isSharing
        />,
      );

      const akForm = wrapper.find<any>(Form);
      const form = renderProp(akForm, 'children', { formProps: {} })
        .dive()
        .dive()
        .find('form');
      const footer = form.find(FormFooter);
      expect(footer.find(Button).prop('isLoading')).toBeTruthy();
    });

    it('should set appearance prop to "primary" and isLoading prop to true to the Send button, and hide the tooltip', () => {
      const mockShareError: ShareError = { message: 'error' };
      const wrapper = shallow(
        <ShareForm
          getCopyLink={getCopyLink}
          loadOptions={loadOptions}
          shareError={mockShareError}
          isSharing
        />,
      );

      const akForm = wrapper.find<any>(Form);
      const form = renderProp(akForm, 'children', { formProps: {} })
        .dive()
        .dive()
        .find('form');
      const footer = form.find(FormFooter);
      expect(footer.find(Tooltip)).toHaveLength(0);
      expect(footer.find(Button).prop('isLoading')).toBeTruthy();
      expect(footer.find(Button).prop('appearance')).toEqual('primary');
    });
  });

  describe('isFetchingConfig prop', () => {
    it('should set isLoading prop to true to the UserPickerField', () => {
      const wrapper = shallow(
        <ShareForm
          getCopyLink={getCopyLink}
          loadOptions={loadOptions}
          isFetchingConfig
        />,
      );

      const akForm = wrapper.find<any>(Form);
      const form = renderProp(akForm, 'children', { formProps: {} })
        .dive()
        .dive()
        .find('form');
      const userPickerField = form.find(UserPickerField);
      expect(userPickerField.prop('isLoading')).toBeTruthy();
    });
  });

  describe('shareError prop', () => {
    it('should render Retry button with an ErrorIcon and Tooltip', () => {
      const mockShareError: ShareError = { message: 'error' };
      const wrapper = shallow(
        <ShareForm
          getCopyLink={getCopyLink}
          loadOptions={loadOptions}
          shareError={mockShareError}
        />,
      );

      const akForm = wrapper.find<any>(Form);
      const form = renderProp(akForm, 'children', { formProps: {} })
        .dive()
        .dive()
        .find('form');
      const footer = form.find(FormFooter);
      const button = footer.find(Button);
      expect(button).toHaveLength(1);
      expect(button.prop('appearance')).toEqual('warning');

      const buttonLabel = button.find('strong').find(FormattedMessage);
      expect(buttonLabel).toHaveLength(1);
      expect(buttonLabel.props()).toMatchObject(messages.formRetry);

      const tooltip = form.find(Tooltip);
      expect(tooltip).toHaveLength(1);
      expect(tooltip.prop('content')).toEqual(
        <FormattedMessage {...messages.shareFailureMessage} />,
      );

      const errorIcon = tooltip.find(ErrorIcon);
      expect(errorIcon).toHaveLength(1);
    });
  });

  it('should set defaultValue', () => {
    const defaultValue: DialogContentState = {
      users: [],
      comment: {
        format: 'plain_text',
        value: 'some comment',
      },
    };
    const config: ConfigResponse = {
      mode: 'EXISTING_USERS_ONLY',
      allowComment: true,
    };
    const component = shallow(
      <ShareForm
        getCopyLink={getCopyLink}
        loadOptions={loadOptions}
        title="some title"
        defaultValue={defaultValue}
        config={config}
      />,
    );
    const formProps = {};
    const akForm = component.find<any>(Form);
    const form = renderProp(akForm, 'children', { formProps })
      .dive()
      .dive();

    expect(form.find(UserPickerField).prop('defaultValue')).toBe(
      defaultValue.users,
    );
    expect(form.find(CommentField).prop('defaultValue')).toBe(
      defaultValue.comment,
    );
  });
});
