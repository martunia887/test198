// @flow

import React from 'react';
import Avatar from '@atlaskit/avatar';
import StarIcon from '@atlaskit/icon/glyph/star';
import CreateIcon from '@atlaskit/icon/glyph/add';
import SearchIcon from '@atlaskit/icon/glyph/search';
import HelpIcon from '@atlaskit/icon/glyph/question-circle';
import { AtlassianIcon } from '@atlaskit/logo';

import { HorizontalGlobalNav } from '../src';

const Row = props => (
  <div css={{ display: 'flex', flexDirection: 'row' }} {...props} />
);
const Variation = props => (
  <div
    css={{ display: 'flex', flexDirection: 'column', padding: '40px 0' }}
    {...props}
  />
);
const Title = props => (
  <div
    css={{
      fontWeight: 'bold',
      marginRight: 20,
      paddingTop: 20,
      textAlign: 'right',
      width: 80,
    }}
    {...props}
  />
);

const HorizontalGlobalNavWithItems = () => (
  <HorizontalGlobalNav
    primaryItems={[
      {
        icon: () => <AtlassianIcon label="Atlassian" size="medium" />,
        id: 'logo',
        tooltip: 'Atlassian',
        onClick: () => console.log('Logo item clicked'),
      },
      {
        icon: StarIcon,
        id: 'star',
        tooltip: 'Starred and recent',
        onClick: () => console.log('Search item clicked'),
      },
      {
        icon: SearchIcon,
        id: 'search',
        tooltip: 'Search',
        onClick: () => console.log('Search item clicked'),
      },
      {
        icon: CreateIcon,
        id: 'create',
        tooltip: 'Create',
        onClick: () => console.log('Create item clicked'),
      },
    ]}
    secondaryItems={[
      {
        icon: HelpIcon,
        id: 'help',
        onClick: () => console.log('Help item clicked'),
        tooltip: 'Help',
      },
      {
        component: ({ className, onClick }: *) => (
          <span className={className}>
            <Avatar
              borderColor="transparent"
              isActive={false}
              isHover={false}
              size="small"
              onClick={onClick}
            />
          </span>
        ),
        icon: null,
        id: 'profile',
        onClick: () => console.log('Profile item clicked'),
        tooltip: 'Profile',
      },
    ]}
  />
);

export default () => (
  <Row>
    <Variation>
      <Title>Regular items:</Title>
      <HorizontalGlobalNavWithItems />
    </Variation>
    {/* <Variation>
      <Title>Opening a dropdown:</Title>
      <GlobalNavWithDropdowns />
    </Variation>
    <Variation>
      <Title>Opening modals and drawers</Title>
      <GlobalNavWithModalsAndDrawers />
    </Variation>
    <Variation>
      <Title>Global nav skeleton</Title>
      <GlobalNavigationSkeleton />
    </Variation>
    <Variation>
      <Title>Global nav skeleton with theming</Title>

      <ThemeProvider
        theme={theme => ({ ...theme, mode: customMode, context: 'product' })}
      >
        <GlobalNavigationSkeleton />
      </ThemeProvider>
    </Variation> */}
  </Row>
);
