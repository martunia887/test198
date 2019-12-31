import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { jsx } from '@emotion/core';
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
  key: string | number;
}) => (
  <NavItem
    isSelected={`/components/${docsDisplayName}` === location.pathname}
    text={docsDisplayName}
    to={`/components/${docsDisplayName}`}
  />
);

const ComponentNav = ({ components, mdx }) => (
  // BC: location is undefined in SSR calls, so we are defaulting it to an empty object
  <Location>
    {({ location = {} }) => {
      let key = 0;
      return (
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
            {components.map(({ docsDisplayName, id, dir }) => {
              key++;
              const subItems = mdx.filter(node => {
                const mdxPath = node.parent.absolutePath;
                // if it's part of this package
                if (mdxPath.indexOf(`${dir}/`) !== -1) {
                  // if its in the index folder or an index.mdx in the root folder, skip
                  let str = mdxPath.split(`${dir}/`)[1].split('/')[1];
                  return str.includes('index') ? false : true;
                }
              });

              if (subItems.length > 0) {
                let folders = {};

                return (
                  <React.Fragment key={id}>
                    <ComponentNavItem
                      key={id}
                      docsDisplayName={docsDisplayName}
                      location={location}
                    />

                    <NavSection key={key} css={{ marginLeft: '20px' }}>
                      {subItems.map(item => {
                        const { name, absolutePath } = item.parent;
                        // get the mdx path relative to the current package
                        const mdxPath = absolutePath.split(`${dir}/`)[1];
                        // get everything after the docsFolder (usually after constellation/)
                        const path = mdxPath.slice(mdxPath.indexOf('/') + 1);
                        // if it's part of a tabbed page

                        if (path.includes('/')) {
                          const folderName = path.split('/')[0];

                          if (!folders[folderName]) {
                            folders[folderName] = folderName;
                            return (
                              <NavItem
                                isSelected={
                                  `/components/${docsDisplayName}/${folderName}` ===
                                  location.pathname
                                }
                                key={item.id}
                                text={folderName}
                                to={`/components/${docsDisplayName}/${folderName}`}
                              />
                            );
                          }
                        } else {
                          return (
                            <NavItem
                              isSelected={
                                `/components/${docsDisplayName}/${name}` ===
                                location.pathname
                              }
                              key={item.id}
                              text={name}
                              to={`/components/${docsDisplayName}/${name}`}
                            />
                          );
                        }
                      })}
                    </NavSection>
                  </React.Fragment>
                );
              }
              return (
                <ComponentNavItem
                  key={id}
                  docsDisplayName={docsDisplayName}
                  location={location}
                />
              );
            })}
          </NavSection>
        </>
      );
    }}
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
            dir
          }
        }
        allMdx {
          nodes {
            id
            parent {
              ... on File {
                absolutePath
                name
                dir
              }
            }
          }
        }
      }
    `}
    render={data => (
      <ComponentNav
        mdx={data.allMdx.nodes}
        components={data.allWorkspaceInfo.nodes}
      />
    )}
  />
);
