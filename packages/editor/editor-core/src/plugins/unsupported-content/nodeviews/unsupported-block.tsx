import * as React from 'react';
import styled from 'styled-components';
import { borderRadius, colors } from '@atlaskit/theme';
import { fontSize } from '@atlaskit/theme';

const BlockNode = styled.div`
  align-items: center;
  background: hotpink;
  border: 1px dashed hotpink;
  border-radius: ${borderRadius()}px;
  box-sizing: border-box;
  cursor: default;
  display: block;
  font-size: ${fontSize()}px;
  margin: 10px 0;
  min-height: 24px;
  padding: 10px;
  text-align: center;
  user-select: all;
  min-width: 120px;

  &.ProseMirror-selectednode {
    background: hotpink;
    outline: none;
  }
`;

export default function UnsupportedBlockNode() {
  return <BlockNode>Unsupported content</BlockNode>;
}
