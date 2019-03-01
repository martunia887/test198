// @flow
import styled from '@emotion/styled';

export default styled.div`
  [data-role='droplistContent'] {
    ${({ maxHeight }) => (maxHeight ? `max-height: ${maxHeight}px` : '')};
  }
`;
