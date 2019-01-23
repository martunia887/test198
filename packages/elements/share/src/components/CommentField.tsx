import FieldTextArea from '@atlaskit/field-text-area';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../i18n';

type Props = {
  onChange?: (event: Event) => void;
};

export const CommentField: React.StatelessComponent<Props> = props => (
  <FormattedMessage {...messages.commentPlaceholder}>
    {placeholder => (
      <FieldTextArea
        minimumRows={3}
        shouldFitContainer
        isLabelHidden
        placeholder={placeholder as string}
        onChange={props.onChange}
      />
    )}
  </FormattedMessage>
);
