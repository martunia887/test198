/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { CustomItem } from '@atlaskit/menu';
import { N800, N30, N20, B200 } from '@atlaskit/theme/src/colors';

import { Link } from 'gatsby';

type Props = {
  text: string;
  href?: string;
  type?: 'heading';
  to?: string;
  isSelected: boolean;
  isSubItem?: boolean;
};

// Todo: transition isn't working
const navLinkCss = css`
  height: 32px;
  color: ${N800};
  display: flex !important;
  transition: all 0.03s ease;
  position: relative;
  &:hover {
    background-color: ${N20};
  }
  &:after {
    content: '';
    position: absolute;
    height: 100%;
    width: 4px;
    left: 0;
    top: 0;
    background-color: ${B200};
  }
`;

// Todo: add auth styles
const NavItem = ({ text, href, to, isSelected = false, isSubItem }: Props) => {
  return (
    <CustomItem
      isSelected={isSelected}
      component={({ wrapperClass, ...rest }) => {
        return (
          <Link
            css={css`
          ${navLinkCss}
          padding-left: ${isSubItem ? '48px' : '32px'} !important;
          &:after {
            ${isSelected ? 'opacity: 1' : 'opacity: 0'}
          }
          background-color: ${isSelected ? N30 + ' !important' : 'none'};
          `}
            className={wrapperClass}
            to={href || to}
            {...rest}
          />
        );
      }}
    >
      {text}
    </CustomItem>
  );
};

export default NavItem;
