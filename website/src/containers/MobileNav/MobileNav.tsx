import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import MobileHeader from '@atlaskit/mobile-header';
import Navigation, { AkContainerTitle } from '@atlaskit/navigation';
import Tooltip from '@atlaskit/tooltip';

import { AtlaskitIcon } from '../../components/AtlaskitIcon';
import { externalPackages as packages, docs, patterns } from '../../site';

import Groups from './Groups';

export function Nav({
  closeNav,
}: RouteComponentProps & { closeNav: () => void }) {
  const groups = (
    <Groups
      onClick={closeNav}
      docs={docs}
      packages={packages}
      patterns={patterns}
    />
  );

  return (
    <Navigation
      isResizeable={false}
      globalPrimaryItemHref={'/'}
      globalPrimaryIcon={
        <Tooltip content="Home" position="right">
          <AtlaskitIcon />
        </Tooltip>
      }
      containerHeaderComponent={() => (
        <AkContainerTitle
          icon={<AtlaskitIcon monochrome />}
          text={'Atlaskit'}
          href={'/'}
        />
      )}
    >
      {groups}
    </Navigation>
  );
}

export default function MobileNav({ props }: { props: RouteComponentProps }) {
  const [drawerState, setDrawerState] = React.useState<string>('none');

  return (
    <MobileHeader
      navigation={(isOpen: boolean) =>
        isOpen && <Nav closeNav={() => setDrawerState('none')} {...props} />
      }
      menuIconLabel="Open navigation"
      drawerState={drawerState}
      onNavigationOpen={() => setDrawerState('navigation')}
      onDrawerClose={() => setDrawerState('none')}
    />
  );
}
