import React from 'react';
import styled from '@emotion/styled';
import { N10, N30 } from '@atlaskit/theme/src/colors';

const Divider = styled.hr`
  height: 1px;
  background-color: ${N30};
  border: none;
  box-shadow: 0 0 0 1px ${N10};
  margin-left: 32px;
  margin-right: 32px;
  margin-bottom: 16px;
`;

export default Divider;
