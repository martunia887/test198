import * as React from 'react';
import styled from 'styled-components';
import { borderRadius, colors } from '@atlaskit/theme';
import { fontSize } from '@atlaskit/theme';

const InlineNode = styled.span`
  align-items: center;
  background: hotpink;
  border: 1px dashed hotpink;
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
    background: hotpink;
    outline: none;
  }
`;

export default function UnsupportedInlineNode() {
  return <InlineNode>Unsupported content</InlineNode>;
}
