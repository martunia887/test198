/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { gridSize, math } from '@atlaskit/theme';
import titleize from 'sentence-case';

import Page, { Grid, GridColumn } from '@atlaskit/page';
import { Title } from '../website/src/components/Page';
import MetaData from '../website/src/pages/package/MetaData';

export default function PackagePage({ examples, pkg, navigation }) {
  const title = titleize(pkg.name);

  return (
    <Page navigation={navigation}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Grid layout="fixed">
        <GridColumn medium={2} />
        <GridColumn medium={8}>
          <div style={{ paddingTop: '3rem' }}>
            <Title>{title}</Title>
            <MetaData packageName={pkg.name} packageSrc="#" />
            <Sep />
            <h2 style={{ marginBottom: '2rem' }}>Examples</h2>
            {examples.map(Example => {
              return (
                <div
                  style={{
                    backgroundColor: 'rgb(244, 245, 247)',
                    boxSizing: 'border-box',
                    color: 'rgb(52, 69, 99)',
                    marginTop: 20,
                    maxWidth: 'calc(100vw - 4rem)',
                    borderRadius: 5,
                    padding: '0px 8px 8px',
                  }}
                  key={Example.toString()}
                >
                  <h3 style={{ padding: '.5rem 0' }}>Example</h3>
                  <div
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px',
                      borderRadius: 3,
                      background: 'white',
                      padding: '.5rem',
                    }}
                  >
                    <Example />
                  </div>
                </div>
              );
            })}
          </div>
        </GridColumn>
      </Grid>
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
