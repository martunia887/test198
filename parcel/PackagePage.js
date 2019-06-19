/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { gridSize, math } from '@atlaskit/theme';
import titleize from 'sentence-case';

import Page, { Title } from '../website/src/components/Page';
import MetaData from '../website/src/pages/package/MetaData';

export default function PackagePage({ doc, pkg }) {
  const title = titleize(pkg.name);

  return (
    <Page>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Title>{title}</Title>
      <MetaData packageName={pkg.name} packageSrc="#" />
      <Sep />
      {doc}
    </Page>
  );
}

export const Sep = styled.hr`
  border: none;
  border-top: 2px solid #ebecf0;
  margin-bottom: ${math.multiply(gridSize, 1.5)}px;
  margin-top: ${math.multiply(gridSize, 1.5)}px;

  @media (min-width: 780px) {
    margin-bottom: ${math.multiply(gridSize, 3)}px;
    margin-top: ${math.multiply(gridSize, 3)}px;
  }
`;
