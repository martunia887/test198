import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import NavItem from './nav/nav-item';
import NavSection from './nav/nav-section';

import { Location } from '@reach/router';

const ComponentNav = ({ components }) => (
  <Location>
    {({ location }) => (
      <NavSection>
        {components.map(({ docsDisplayName }) => (
          <NavItem
            isSelected={`/components/${docsDisplayName}` === location.pathname}
            key={docsDisplayName}
            text={docsDisplayName}
            to={`/components/${docsDisplayName}`}
          />
        ))}
      </NavSection>
    )}
  </Location>
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
