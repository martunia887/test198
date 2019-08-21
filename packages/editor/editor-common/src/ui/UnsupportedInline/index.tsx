import * as React from 'react';
import styled from 'styled-components';
import { borderRadius } from '@atlaskit/theme/constants';
import { N30, N50 } from '@atlaskit/theme/colors';
import { fontSize } from '@atlaskit/theme/constants';

const InlineNode = styled.span`
  align-items: center;
  background: ${N30};
  border: 1px dashed ${N50};
  border-radius: ${borderRadius()}px;
  box-sizing: border-box;
  cursor: default;
  display: inline-flex;
  font-size: ${fontSize()}px;
  margin: 0 2px;
  min-height: 24px;
  padding: 0 10px;
  user-select: all;
  vertical-align: middle;
  white-space: nowrap;

  &.ProseMirror-selectednode {
    background: ${N50};
    outline: none;
  }
`;

export default function UnsupportedInlineNode() {
  return (
    <span>
      <InlineNode>Unsupported content</InlineNode>
    </span>
  );
}
