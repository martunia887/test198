import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import NavItem from './nav/nav-item';
import NavSection from './nav/nav-section';

const ComponentNav = ({ components }) => (
  <NavSection>
    {components.map(({ docsDisplayName }) => (
      <NavItem
        key={docsDisplayName}
        text={docsDisplayName}
        to={`/components/${docsDisplayName}`}
      />
    ))}
  </NavSection>
);

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allWorkspaceInfo {
          nodes {
            docsDisplayName
          }
        }
      }
    `}
    render={data => <ComponentNav components={data.allWorkspaceInfo.nodes} />}
  />
);
