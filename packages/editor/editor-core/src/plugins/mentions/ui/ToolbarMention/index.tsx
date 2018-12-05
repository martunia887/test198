import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import MentionIcon from '@atlaskit/icon/glyph/editor/mention';
import { withAnalytics } from '../../../../analytics';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { insertMentionQuery } from '../../commands/insert-mention-query';

export interface Props {
  editorView?: EditorView;
  isDisabled?: boolean;
}

export interface State {
  disabled: boolean;
}

const handleInsertMention = withAnalytics(
  'atlassian.fabric.mention.picker.trigger.button',
  (props: Props): boolean => {
    if (!props.editorView) {
      return false;
    }
    insertMentionQuery()(props.editorView.state, props.editorView.dispatch);
    return true;
  },
);

export default function ToolbarMention(props: Props) {
  return (
    <ToolbarButton
      spacing="none"
      onClick={() => handleInsertMention(props)}
      disabled={props.isDisabled}
      title="Mention @"
      iconBefore={<MentionIcon label="Mention" />}
    />
  );
}
