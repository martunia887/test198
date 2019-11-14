import styled from 'styled-components';
import React from 'react';
import { N900, N20, N40 } from '@atlaskit/theme/colors';
import { Feature } from '../types';

export type FeatureCardProps = {
  feature: Feature;
  seen: boolean;
};

const CardWrapper: React.ComponentClass<React.HTMLAttributes<{}> &
  Pick<FeatureCardProps, 'seen'>> = styled.div`
  background-color: ${props => (props.seen ? N40 : N20)};;
  transition: background-color 0.2s;

  color: ${N900}
  font-weight: 400;
  min-height: 40px;
  padding: 12px 8px;
  margin-bottom: 8px;
  border-radius: 4px;

  :hover {
    background-color: ${N40};
  }
`;

export const FeatureCard = (props: FeatureCardProps) => {
  return (
    <CardWrapper seen={props.seen}>
      <h5>{props.feature.title}</h5>
      <p>{props.feature.description}</p>
      <a href={props.feature.link}>Learn more...</a>
    </CardWrapper>
  );
};
