/** @jsx jsx */
import { jsx } from '@emotion/core';
import { SectionProps, MenuGroupProps } from '../types';
import { menuGroupCSS, sectionCSS } from './styles';

export const MenuGroup = ({ maxHeight, ...rest }: MenuGroupProps) => (
  <div css={menuGroupCSS(maxHeight)} {...rest} />
);
export const Section = ({
  isScrollable,
  hasSeparator,
  ...rest
}: SectionProps) => (
  <div css={sectionCSS(isScrollable, hasSeparator)} {...rest} />
);
