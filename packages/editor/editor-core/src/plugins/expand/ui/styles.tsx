import styled from 'styled-components';
import { colors, borderRadius } from '@atlaskit/theme';

export const Container = styled.div`
  padding: 10px;
  border: 1px solid ${colors.N40};
  border-radius: ${borderRadius()}px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.div`
  cursor: pointer;
  display: flex;
`;

export const Input = styled.input`
  padding-left: 5px;
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
  padding: 0 0 0 30px;
`;
