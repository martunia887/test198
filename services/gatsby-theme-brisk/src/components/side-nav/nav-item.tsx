import React from 'react';
import { CustomItem } from '@atlaskit/menu';

import { Link } from 'gatsby';

type Props = {
  text: string;
  href?: string;
  type?: 'heading';
  to?: string;
  isSelected: boolean;
};

const NavItem = ({ text, href, to, isSelected = false }: Props) => {
  return (
    <CustomItem
      isSelected={isSelected}
      component={({ wrapperClass, ...rest }) => {
        return <Link className={wrapperClass} to={href || to} {...rest} />;
      }}
    >
      {text}
    </CustomItem>
  );
};

export default NavItem;
