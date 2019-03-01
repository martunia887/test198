// @flow

import styled from '@emotion/styled';

export default styled.div`
  ${({ shouldFitContainer }) =>
    shouldFitContainer ? '' : 'max-width: 300px;'};
`;
