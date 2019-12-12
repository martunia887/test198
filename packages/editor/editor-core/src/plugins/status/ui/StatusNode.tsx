import React, { FunctionComponent } from 'react';
import { Node as ProsemirrorNode } from 'prosemirror-model';
import { Status } from '@atlaskit/status/element';
import { messages, StyledStatus } from '../nodeviews/status';
import { StatusDefinition } from '@atlaskit/adf-schema';

interface StatusNodeProps {
  node: ProsemirrorNode;
}

function handleOnclick(event: React.SyntheticEvent<any>) {
  if (event.nativeEvent.stopImmediatePropagation) {
    event.nativeEvent.stopImmediatePropagation();
  }
  // handling of popup is done in plugin.apply on selection change.
}

export const StatusNode: FunctionComponent<StatusNodeProps> = ({ node }) => {
  const {
    text,
    color,
    localId,
    style,
  } = node.attrs as StatusDefinition['attrs'];

  return (
    <StyledStatus placeholderStyle={!text}>
      <Status
        text={text ? text : messages.placeholder.defaultMessage}
        color={color}
        localId={localId}
        style={style as any}
        onClick={handleOnclick}
      />
    </StyledStatus>
  );
};
