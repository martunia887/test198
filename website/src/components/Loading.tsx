import * as React from 'react';
import styled from '@emotion/styled';
import Spinner from '@atlaskit/spinner';
import { SpinnerProps } from '../types';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;
`;

const Loading: React.StatelessComponent<SpinnerProps> = ({ size, ...rest }) => (
  <Container>
    <Spinner size={size || 'large'} {...rest} />
  </Container>
);

export default Loading;
