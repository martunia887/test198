// @flow
import styled, { css } from 'styled-components';
import { colors } from '@atlaskit/theme';

function defaultToPx(length) {
  const number = +length;
  if (number === 0) {
    return 0;
  }
  if (Number.isNaN(number)) {
    return length;
  }
  return `${number}px`;
}

export const iconColor = colors.N800;

export const TreeRowContainer = styled.div`
  border-bottom: 1px solid ${colors.N30};
  display: flex;
`;

const commonChevronContainer = css`
  margin-left: -24px;
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`;

export const ChevronContainer = styled.span`
  ${commonChevronContainer};
`;

export const LoaderContainer = styled.span`
  ${commonChevronContainer} width: 100%;
  ${props =>
    props.isRoot &&
    css`
      padding-left: 50%;
    `};
`;

const indentWidth = 20;

const commonCell = css`
  color: ${colors.N800};
  box-sizing: border-box;
  padding: 10px ${defaultToPx(indentWidth)};
  min-height: 40px;
  position: relative;
  ${props =>
    props.width &&
    css`
      width: ${defaultToPx(props.width)};
    `};
`;

export const DataCell = styled.div`
  ${commonCell} white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${props =>
    props.indentLevel &&
    css`
      padding-left: ${defaultToPx(indentWidth * props.indentLevel)};
    `};
`;

export const Header = styled.div`
  ${commonCell} font-weight: bold;
  font-size: 12px;
  font-weight: bold;
  line-height: 1.67;
  letter-spacing: -0.1px;
  padding-left: ${defaultToPx(indentWidth)};
  padding-bottom: 8px;
`;

export const TreeTableContainer = styled.div``;
