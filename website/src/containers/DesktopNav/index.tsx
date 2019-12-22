import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Skeleton, presetThemes } from '@atlaskit/navigation';

const SkeletonNav = ({ location }: RouteComponentProps) => {
  const isContainerNavOpen = location ? location.pathname === '/' : true;
  return (
    <Skeleton
      isCollapsed={isContainerNavOpen}
      containerTheme={presetThemes.global}
    />
  );
};

const DesktopNav = React.lazy(() => import('./DesktopNav'));

export default (props: RouteComponentProps) => (
  <React.Suspense fallback={<SkeletonNav {...props} />}>
    <DesktopNav {...props} />
  </React.Suspense>
);
