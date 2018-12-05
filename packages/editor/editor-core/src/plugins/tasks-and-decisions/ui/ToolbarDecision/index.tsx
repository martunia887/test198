import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { EditorView } from 'prosemirror-view';
import DecisionIcon from '@atlaskit/icon/glyph/editor/decision';
import { withAnalytics } from '../../../../analytics';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { insertTaskDecision } from '../../commands';
import { messages } from '../../../insert-block/ui/ToolbarInsertBlock';

export interface Props {
  editorView?: EditorView;
  isDisabled?: boolean;
  isReducedSpacing?: boolean;
}

const handleInsertDecision = withAnalytics(
  'atlassian.fabric.decision.trigger.button',
  (props: Props): boolean => {
    const { editorView } = props;
    if (!editorView) {
      return false;
    }
    insertTaskDecision(editorView, 'decisionList');
    return true;
  },
);

export function ToolbarDecision(props: Props & InjectedIntlProps) {
  const {
    isDisabled,
    isReducedSpacing,
    intl: { formatMessage },
  } = props;

  const label = formatMessage(messages.decision);

  return (
    <ToolbarButton
      onClick={() => handleInsertDecision(props)}
      disabled={isDisabled}
      spacing={isReducedSpacing ? 'none' : 'default'}
      title={`${label} asdf <>`}
      iconBefore={<DecisionIcon label={label} />}
    />
  );
}

export default injectIntl(ToolbarDecision);
