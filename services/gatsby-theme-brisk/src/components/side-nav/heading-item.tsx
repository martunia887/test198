import React from 'react';
import styled from '@emotion/styled';

const Heading = styled.div`
  text-transform: uppercase;
  padding-left: 32px;
  display: flex;
  height: 32px;
  align-items: center;
  &:first-child {
    margin-top: 32px;
  }
`;

export const HeadingItem = ({ children }: { children: React.ReactNode }) => (
  <Heading className="headline3">{children}</Heading>
);
