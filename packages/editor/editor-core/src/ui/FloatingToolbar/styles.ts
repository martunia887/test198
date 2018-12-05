import styled, { css } from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';
import { borderRadius } from '@atlaskit/theme';
import { dropShadow } from '../styles';

export const Container: ComponentClass<
  HTMLAttributes<{}> & { height?: number; innerRef?: any }
> = styled.div`
  border-radius: ${borderRadius()}px;
  ${dropShadow} display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 4px 8px;
  background-color: hotpink;
  ${({ height }: { height: number | undefined }) =>
    height
      ? css`
          height: ${height}px;
        `
      : ''};
`;
