/** @jsx jsx */
import { jsx } from '@emotion/core';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import Hero from '../components/hero';
import ComponentContent from '../content/component-content';
import { titleify } from './../utilities/titleify';

const ContentGrid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 2fr minmax(auto, 1fr);
  grid-template-areas:
    'hero hero'
    'content nav';
`;

const Main = styled.div`
  grid-area: content;
  padding: 80px;
`;

const Nav = styled.nav`
  grid-area: nav;
`;

export default ({ data }) => {
  const { name, docsDisplayName, description } = data.workspaceInfo;
  return (
    <Layout title={`${titleify(docsDisplayName)} - ${name}`}>
      <ContentGrid>
        <Hero
          css={{ gridArea: 'hero' }}
          headline={titleify(docsDisplayName)}
          description={description}
        />
        <Main>
          <ComponentContent mdxNodes={data.allMdx.nodes} />
        </Main>
      </ContentGrid>
    </Layout>
  );
};

export const query = graphql`
  query($name: String!, $mdxPath: String) {
    workspaceInfo(name: { eq: $name }) {
      name
      docsDisplayName
      description
    }
    allMdx(filter: { fileAbsolutePath: { glob: $mdxPath } }) {
      nodes {
        parent {
          ... on File {
            absolutePath
            name
            dir
          }
        }
        id
        body
      }
    }
  }
`;
