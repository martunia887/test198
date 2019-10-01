import React from 'react';
import { Skeleton } from '@atlaskit/navigation';
import { RouteComponentProps } from 'react-router-dom';

const SkeletonNav = ({ location }: RouteComponentProps) => {
  const isContainerNavOpen = location ? location.pathname === '/' : true;
  // The theme appearance for skeleton should always be global.
  const globalAppearance = 'global';
  return <Skeleton isCollapsed={isContainerNavOpen} theme={globalAppearance} />;
};

const DesktopNav = React.lazy(() => import('./DesktopNav'));

export default (props: RouteComponentProps) => (
  <React.Suspense fallback={<SkeletonNav {...props} />}>
    <DesktopNav {...props} />
  </React.Suspense>
);
