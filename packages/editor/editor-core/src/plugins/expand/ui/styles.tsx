import styled from 'styled-components';
import { colors, borderRadius, gridSize } from '@atlaskit/theme';

import {
  akEditorSelectedBorder,
  akEditorSelectedBorderBoldSize,
} from '@atlaskit/editor-common';

const padding = gridSize();
const iconSize = 24;

export const Container = styled.div`
  background: white;
  position: relative;
  padding: ${padding}px ${padding}px ${padding}px
    ${padding * 4 + iconSize / 2}px;
  border: 1px solid ${colors.N40};
  border-radius: ${borderRadius()}px;
  cursor: pointer;

  .ProseMirror-selectednode > & {
    border-color: transparent;
    box-shadow: 0 0 0 ${akEditorSelectedBorderBoldSize}px
      ${akEditorSelectedBorder};
  }

  .expandView-content-wrap.danger > &,
  .nestedExpandView-content-wrap.danger > & {
    border-color: transparent;
    box-shadow: 0 0 0 ${akEditorSelectedBorderBoldSize}px ${colors.R300};
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.div`
  margin-left: -${padding * 4}px;
  margin-right: ${padding}px;
  cursor: pointer;
  display: flex;
`;

export const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  line-height: 1.714;
  font-weight: normal;
  color: ${colors.N500};
  display: flex;
  flex: 1;
`;

export const Content = styled.div`
  cursor: text;
`;
