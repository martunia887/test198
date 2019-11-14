import styled from 'styled-components';
import React, { FunctionComponent, useState } from 'react';
import { N900, N20, N40 } from '@atlaskit/theme/colors';
import StarFilledIcon from '@atlaskit/icon/glyph/star-filled';
import Button from '@atlaskit/Button';
import { Feature } from '../types';

export type FeatureCardProps = {
  feature: Feature;
  seen: boolean;
};

const CardWrapper: React.ComponentClass<React.HTMLAttributes<{}> & {
  isOpen: boolean;
}> = styled.div`
  background-color: ${N20};
  transition: background-color 0.2s;
  color: ${N900};
  font-weight: 400;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;

  :hover {
    background-color: ${N40};
  }
`;

const Title = styled.button`
  width: 100%;
  font-size: 1em;
  font-weight: 600;
  color: ${N900};
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  margin: 0px;
  padding: 8px 0px;
`;

export const FeatureCard: FunctionComponent<FeatureCardProps> = (
  props: FeatureCardProps,
) => {
  const [isOpen, setIsOpen] = useState(!props.seen);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CardWrapper isOpen={isOpen}>
      <Title onClick={onClick}>
        {props.feature.title}
        {!props.seen && (
          <span
            style={{
              float: 'right',
              overflow: 'hidden',
            }}
          >
            <StarFilledIcon label="" />
          </span>
        )}
      </Title>

      {isOpen && (
        <>
          <p>{props.feature.description}</p>
          <a href={props.feature.link}>Learn more...</a>
        </>
      )}
    </CardWrapper>
  );
};
