import styled from 'styled-components';
import { borderRadius, colors } from '@atlaskit/theme';

interface Props {
  readViewFitContainerWidth?: boolean;
}

const ReadViewContentWrapper = styled.div<Props>`
  display: inline-block;
  box-sizing: border-box;
  border: 2px solid transparent;
  border-radius: ${borderRadius()}px;
  &:hover {
    background: ${colors.N30};
  }
  width: ${({ readViewFitContainerWidth }) =>
    readViewFitContainerWidth ? '100%' : 'auto'};
  transition: background 0.2s;
`;

ReadViewContentWrapper.displayName = 'ReadViewContentWrapper';

export default ReadViewContentWrapper;
