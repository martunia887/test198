import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme/constants';
import { h200 } from '@atlaskit/theme/typography';
import { R400 } from '@atlaskit/theme/colors';

export interface LabelProps {
  id?: string;
  htmlFor: string;
  children: ReactNode;
  isRequired?: boolean;
  testId?: string;
}

const LabelInner = styled.label`
  ${h200()} display: inline-block;
  margin-bottom: ${gridSize() * 0.5}px;
  margin-top: 0;
`;

export const RequiredIndicator = styled.span`
  color: ${R400};
  padding-left: ${gridSize() * 0.25}px;
`;

const Label: FC<LabelProps> = ({
  id,
  htmlFor,
  children,
  isRequired,
  testId,
}) => (
  <LabelInner id={id} htmlFor={htmlFor} data-testid={testId}>
    {children}
    {isRequired && <RequiredIndicator aria-hidden="true">*</RequiredIndicator>}
  </LabelInner>
);

export default Label;
