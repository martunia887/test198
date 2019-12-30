import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import NavItem from './side-nav/nav-item';
import NavSection from './side-nav/nav-section';
import { HeadingItem } from './side-nav/heading-item';

import { Location } from '@reach/router';

const ComponentNavItem = ({
  docsDisplayName,
  location,
}: {
  docsDisplayName: string;
  location: { pathname?: string };
}) => (
  <NavItem
    isSelected={`/components/${docsDisplayName}` === location.pathname}
    key={docsDisplayName}
    text={docsDisplayName}
    to={`/components/${docsDisplayName}`}
  />
);

const ComponentNav = ({ components }) => (
  // BC: location is undefined in SSR calls, so we are defaulting it to an empty object
  <Location>
    {({ location = {} }) => (
      <>
        <HeadingItem>Components</HeadingItem>
        <NavSection>
          <NavItem
            isSelected={`/components/overview` === location.pathname}
            text="Overview"
            to={`/components/overview`}
          />
          <NavItem
            isSelected={`/components/getting-started` === location.pathname}
            text="Getting Started"
            to={`/components/getting-started`}
          />
          <NavItem
            isSelected={`/components/component-status` === location.pathname}
            text="Component Status"
            to={`/components/component-status`}
          />
        </NavSection>

        <HeadingItem>Core</HeadingItem>
        <NavSection>
          {components.map(({ docsDisplayName, id }) => (
            <ComponentNavItem
              key={id}
              docsDisplayName={docsDisplayName}
              location={location}
            />
            /*
              Hi friends, BC here, I am about to do some very hackery stuff so I can
              get sub-items to be rendering correctly. This is not the intended pattern
              and shouldn't be taken as such 😅
            */
            // docsDisplayName === 'avatar' ? (
            //   <>
            //     <ComponentNavItem
            //       docsDisplayName={docsDisplayName}
            //       location={location}
            //     />
            //     <NavSection>
            //       <NavItem
            //         isSelected={
            //           `/components/${docsDisplayName}/avatar-item` ===
            //           location.pathname
            //         }
            //         key={docsDisplayName}
            //         text="avatar item"
            //         to={`/components/${docsDisplayName}/avatar-item`}
            //       />
            //       <NavItem
            //         isSelected={
            //           `/components/${docsDisplayName}/presence` ===
            //           location.pathname
            //         }
            //         key={docsDisplayName}
            //         text="presence"
            //         to={`/components/${docsDisplayName}/presence`}
            //       />
            //       <NavItem
            //         isSelected={
            //           `/components/${docsDisplayName}/status` ===
            //           location.pathname
            //         }
            //         key={docsDisplayName}
            //         text="status"
            //         to={`/components/${docsDisplayName}/status`}
            //       />
            //       <NavItem
            //         isSelected={
            //           `/components/${docsDisplayName}/skeleton` ===
            //           location.pathname
            //         }
            //         key={docsDisplayName}
            //         text="skeleton"
            //         to={`/components/${docsDisplayName}/skeleton`}
            //       />
            //     </NavSection>
            //   </>
            // ) : (
            //   <ComponentNavItem
            //     key={id}
            //     docsDisplayName={docsDisplayName}
            //     location={location}
            //   />
            // ),
          ))}
        </NavSection>
      </>
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
            id
          }
        }
      }
    `}
    render={data => <ComponentNav components={data.allWorkspaceInfo.nodes} />}
  />
);
