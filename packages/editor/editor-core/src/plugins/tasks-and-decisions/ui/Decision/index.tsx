import * as React from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import { DecisionItem } from '@atlaskit/task-decision';

const messages = defineMessages({
  placeholder: {
    id: 'fabric.editor.decisionPlaceholder',
    defaultMessage: 'Add a decision…',
    description: 'Placeholder description for an empty decision in the editor',
  },
});

interface Props {
  contentRef: any;
  showPlaceholder?: boolean;
}

export function Decision(props: Props & InjectedIntlProps) {
  const {
    contentRef,
    showPlaceholder,
    intl: { formatMessage },
  } = props;

  return (
    <DecisionItem
      contentRef={contentRef}
      placeholder={formatMessage(messages.placeholder)}
      showPlaceholder={showPlaceholder}
    />
  );
}

export default injectIntl(Decision);
