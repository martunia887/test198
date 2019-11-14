import styled from 'styled-components';
import React from 'react';
import { colors } from '@atlaskit/theme';
import { Feature } from '../types';

export type FeatureCardProps = {
  feature: Feature;
};

const CardWrapper = styled.div`
  background-color: ${colors.N20};
  transition: background-color 0.2s;

  color: ${colors.N900};
  font-weight: 400;
  min-height: 40px;
  padding: 12px 8px;
  margin-top: 8px;
  border-radius: 4px;

  :hover {
    background-color: ${colors.N40};
    transition: background-color 0.1s;
  }
`;

export const FeatureCard = (props: FeatureCardProps) => {
  return (
    <CardWrapper>
      <h5>{props.feature.title}</h5>
      <p>{props.feature.description}</p>
      <a href={props.feature.link}>Learn more...</a>
    </CardWrapper>
  );
};
