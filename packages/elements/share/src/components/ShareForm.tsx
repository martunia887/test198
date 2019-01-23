import Button from '@atlaskit/button';
import Form, { FormFooter, FormSection } from '@atlaskit/form';
import { LoadOptions } from '@atlaskit/user-picker';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { messages } from '../i18n';
import { CommentField } from './CommentField';
import { ShareHeader } from './ShareHeader';
import { UserPickerField } from './UserPickerField';
import { CopyLinkButton } from './CopyLinkButton';

const LeftAlignmentContainer = styled.div`
  margin-right: auto;
`;

export type Props = {
  capabilitiesInfoMessage?: React.ReactNode;
  copyLink: string;
  loadOptions: LoadOptions;
  onCommentChange?: (event: Event) => void;
  onLinkCopy?: (link: string) => void;
  onShareClick?: Function;
  shouldShowCommentField?: boolean;
  submitButtonLabel?: React.ReactNode;
  title?: React.ReactNode;
};

export const ShareForm: React.StatelessComponent<Props> = props => (
  <Form onSubmit={props.onShareClick}>
    {({ formProps }) => (
      <form {...formProps}>
        <ShareHeader title={props.title} />
        <FormSection>
          <UserPickerField loadOptions={props.loadOptions} />
          {props.shouldShowCommentField && (
            <CommentField onChange={props.onCommentChange} />
          )}
        </FormSection>
        <FormFooter>
          <LeftAlignmentContainer>
            <CopyLinkButton
              onLinkCopy={props.onLinkCopy}
              link={props.copyLink}
            />
          </LeftAlignmentContainer>
          <Button appearance="primary" type="submit">
            {props.submitButtonLabel || (
              <FormattedMessage {...messages.formSend} />
            )}
          </Button>
        </FormFooter>
      </form>
    )}
  </Form>
);

ShareForm.defaultProps = {
  onShareClick: () => {},
  // It is false by default because we want the integrater
  // to raise the awareness of turning it on, i.e. in Atlassian we have to check if the sites are in evaluation.
  shouldShowCommentField: false,
};
