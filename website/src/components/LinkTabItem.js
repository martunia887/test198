// @flow

import React from 'react';
import Tabs, { TabItem } from '@atlaskit/tabs';
import { Link } from './WrappedLink';

/** This custom component makes the tab items function as react router links */
const LinkItem = ({
  elementProps,
  // We're opting out of default keyboard navigation so we don't need innerRef
  innerRef,
  ...tabItemProps
}: *) => {
  // We also remove the onKeyDown handler and tabIndex attribute
  // from elementProps to opt out of default keyboard navigation
  const { onKeyDown, tabIndex, ...requiredElementProps } = elementProps;
  return (
    <Link
      // We add the rest of the elementProps to our <Link>...
      {...requiredElementProps}
      to={tabItemProps.data.to}
      style={{ textDecoration: 'none' }}
    >
      {/* ...then pass the data and state params on to the TabItem */}
      <TabItem {...tabItemProps} />
    </Link>
  );
};

export default LinkItem;
