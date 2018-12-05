import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { EditorView } from 'prosemirror-view';
import TaskIcon from '@atlaskit/icon/glyph/editor/task';
import { withAnalytics } from '../../../../analytics';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { insertTaskDecision } from '../../commands';
import { messages } from '../../../insert-block/ui/ToolbarInsertBlock';

export interface Props {
  editorView?: EditorView;
  isDisabled?: boolean;
  isReducedSpacing?: boolean;
}

export interface State {
  disabled: boolean;
}

const handleInsertTask = withAnalytics(
  'atlassian.fabric.action.trigger.button',
  (props: Props): boolean => {
    const { editorView } = props;
    if (!editorView) {
      return false;
    }
    insertTaskDecision(editorView, 'taskList');
    return true;
  },
);

export function ToolbarTask(props: Props & InjectedIntlProps) {
  const {
    isDisabled,
    isReducedSpacing,
    intl: { formatMessage },
  } = props;

  const label = formatMessage(messages.action);

  return (
    <ToolbarButton
      onClick={() => handleInsertTask(props)}
      disabled={isDisabled}
      spacing={isReducedSpacing ? 'none' : 'default'}
      title={`${label} []`}
      iconBefore={<TaskIcon label={label} />}
    />
  );
}

export default injectIntl(ToolbarTask);
