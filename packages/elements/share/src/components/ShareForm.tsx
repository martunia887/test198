import Button from '@atlaskit/button';
import Form, { FormFooter, FormSection } from '@atlaskit/form';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { colors, typography } from '@atlaskit/theme';
import Tooltip from '@atlaskit/tooltip';
import { LoadOptions, OptionData } from '@atlaskit/user-picker';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { messages } from '../i18n';
import {
  Comment,
  ConfigResponse,
  DialogContentState,
  FormChildrenArgs,
} from '../types';
import { CommentField } from './CommentField';
import { CopyLinkButton } from './CopyLinkButton';
import { ShareHeader } from './ShareHeader';
import { UserPickerField } from './UserPickerField';

const SubmitButtonWrapper = styled.div`
  display: flex;
  margin-left: auto;
`;

const CenterAlignedIconWrapper = styled.div`
  display: flex;
  align-self: center;
  padding: 0 10px;

  > div {
    line-height: 1;
  }
`;

export const FromWrapper = styled.div`
  [class^='FormHeader__FormHeaderWrapper'] {
    h1 {
      ${typography.h500()}
      
      > span {
        /* jira has a class override font settings on h1 > span in gh-custom-field-pickers.css */
        font-size: inherit !important;
        line-height: inherit !important;
        letter-spacing: inherit !important;
      }
    }
  }

  [class^='FormSection__FormSectionWrapper'] {
    margin-top: 0px;
  }

  [class^='FormFooter__FormFooterWrapper'] {
    justify-content: space-between;
    margin-top: 12px;
    margin-bottom: 24px;
  }

  [class^='Field__FieldWrapper']:not(:first-child) {
    margin-top: 12px;
  }
`;

type ShareError = {
  message: string;
} | null;

export type ShareData = {
  users: OptionData[];
  comment: Comment;
};

export type Props = {
  capabilitiesInfoMessage?: React.ReactNode;
  config?: ConfigResponse;
  copyLink: string;
  isSharing?: boolean;
  loadOptions?: LoadOptions;
  onLinkCopy?: (link: string) => void;
  onShareClick?: (data: ShareData) => void;
  shareError?: ShareError;
  submitButtonLabel?: React.ReactNode;
  title?: React.ReactNode;
  onDismiss?: (data: ShareData) => void;
  defaultValue?: DialogContentState;
};

export type InternalFormProps = FormChildrenArgs<ShareData> & Props;

class InternalForm extends React.PureComponent<InternalFormProps> {
  componentWillUnmount() {
    const { onDismiss, getValues } = this.props;
    if (onDismiss) {
      onDismiss(getValues());
    }
  }

  renderSubmitButton = () => {
    const { isSharing, shareError, submitButtonLabel } = this.props;
    const shouldShowWarning = shareError && !isSharing;
    const buttonAppearance = !shouldShowWarning ? 'primary' : 'warning';
    const buttonLabel = shareError ? messages.formRetry : messages.formSend;
    const ButtonLabelWrapper =
      buttonAppearance === 'warning' ? 'strong' : React.Fragment;

    return (
      <SubmitButtonWrapper>
        <CenterAlignedIconWrapper>
          {shouldShowWarning && (
            <Tooltip
              content={<FormattedMessage {...messages.shareFailureMessage} />}
              position="top"
            >
              <ErrorIcon label="errorIcon" primaryColor={colors.R400} />
            </Tooltip>
          )}
        </CenterAlignedIconWrapper>
        <Button
          appearance={buttonAppearance}
          type="submit"
          isLoading={isSharing}
        >
          <ButtonLabelWrapper>
            {submitButtonLabel || <FormattedMessage {...buttonLabel} />}
          </ButtonLabelWrapper>
        </Button>
      </SubmitButtonWrapper>
    );
  };

  render() {
    const {
      formProps,
      title,
      loadOptions,
      capabilitiesInfoMessage,
      onLinkCopy,
      copyLink,
      defaultValue,
      config,
    } = this.props;
    return (
      <FromWrapper>
        <form {...formProps}>
          <ShareHeader title={title} />
          <FormSection>
            <UserPickerField
              loadOptions={loadOptions}
              defaultValue={defaultValue && defaultValue.users}
              capabilitiesInfoMessage={capabilitiesInfoMessage}
              config={config}
            />
            {config && config.allowComment && (
              <CommentField
                defaultValue={defaultValue && defaultValue.comment}
              />
            )}
          </FormSection>
          <FormFooter>
            <CopyLinkButton onLinkCopy={onLinkCopy} link={copyLink} />
            {this.renderSubmitButton()}
          </FormFooter>
        </form>
      </FromWrapper>
    );
  }
}

export const ShareForm: React.StatelessComponent<Props> = props => (
  <Form onSubmit={props.onShareClick}>
    {({ formProps, getValues }: FormChildrenArgs<ShareData>) => (
      <InternalForm {...props} formProps={formProps} getValues={getValues} />
    )}
  </Form>
);

ShareForm.defaultProps = {
  isSharing: false,
  onShareClick: () => {},
};
