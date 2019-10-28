import styled, { css } from 'styled-components';
import { colors, gridSize, fontSize } from '@atlaskit/theme';
import {
  blockNodesVerticalMargin,
  akEditorExpandLayoutOffset,
} from '@atlaskit/editor-common';

const titleStyles = css`
  font-size: ${fontSize}px;
  line-height: 1.714;
  font-weight: normal;
  color: ${colors.N200};
  background: transparent;
  display: flex;
  flex: 1;
  padding: 0 0 0 ${gridSize() / 2}px;
  cursor: text;
  white-space: nowrap;

  > span {
    opacity: 0.6;
  }
`;

export const Title = styled.div`
  ${titleStyles}
`;

export const Input = styled.input<{ width: number }>`
  ${titleStyles}
  outline: none;
  border: none;
  background: white;
  width: ${props => props.width}px;

  &::placeholder {
    opacity: 0.6;
  }
`;

export const Content = styled.div`
  cursor: text;
`;

export const expandStyles = css`
  .expandView-content-wrap,
  .nestedExpandView-content-wrap {
    margin-top: ${blockNodesVerticalMargin}rem;
  }

  .ProseMirror > .expandView-content-wrap {
    margin-left: -${akEditorExpandLayoutOffset}px;
    margin-right: -${akEditorExpandLayoutOffset}px;
  }
`;
