import React from 'react';
import {
  ButtonItem,
  LinkItem,
  CustomItem,
  HeadingItem,
  SkeletonItem,
  SkeletonHeadingItem,
} from '@atlaskit/menu';

import { Link } from 'gatsby';

type Props = {
  text: string;
  href?: string;
  type?: 'heading';
  to?: string;
};

const NavItem = ({ text, href, to, type }: Props) => {
  return (
    <CustomItem
      component={({ href, ...rest }) => <Link to={href} {...rest} />}
    />
  );

  if (type === 'heading') {
    return (
      <li>
        <h3>{text}</h3>
      </li>
    );
  } else if (href) {
    return (
      <li>
        <a href={href}>{text}</a>
      </li>
    );
  } else if (to) {
    return (
      <li>
        <Link to={to}>{text}</Link>
      </li>
    );
  }
  console.error('incompatible item passed to side nav');
  return <li>{text}</li>;
};

export default NavItem;
