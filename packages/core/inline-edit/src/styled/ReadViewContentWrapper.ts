import styled from 'styled-components';
import { borderRadius } from '@atlaskit/theme/constants';
import { N30 } from '@atlaskit/theme/colors';

interface Props {
  readViewFitContainerWidth?: boolean;
}

const ReadViewContentWrapper = styled.div<Props>`
  display: inline-block;
  box-sizing: border-box;
  border: 2px solid transparent;
  border-radius: ${borderRadius()}px;
  &:hover {
    background: ${N30};
  }
  width: ${({ readViewFitContainerWidth }) =>
    readViewFitContainerWidth ? '100%' : 'auto'};
  transition: background 0.2s;
`;

ReadViewContentWrapper.displayName = 'ReadViewContentWrapper';

export default ReadViewContentWrapper;
