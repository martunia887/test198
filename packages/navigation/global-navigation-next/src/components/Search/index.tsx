import SearchIcon from '@atlaskit/icon/glyph/search';
import { colors } from '@atlaskit/theme';
import React from 'react';

import { CREATE_BREAKPOINT } from '../../common/constants';
import Item from '../Item';

import { SearchInput, SearchWrapper, IconWrapper } from './styled';
import { SearchProps } from './types';

type Props = SearchProps & {
  width?: number;
};

const SearchComponent = ({ onClick, text }: SearchProps) => {
  const onChange = () => {
    onClick && onClick();
  };
  return (
    <SearchWrapper>
      <IconWrapper>
        <SearchIcon label={text} primaryColor={colors.B50} />
      </IconWrapper>
      <SearchInput
        placeholder={text}
        onChange={onChange}
        onClick={onClick}
        value=""
      />
    </SearchWrapper>
  );
};

export const Search = (props: Props) => {
  const {
    isOpen,
    onClick,
    onClose,
    onDrawerCloseComplete,
    drawerContent,
    dropdownContent,
    width,
    text,
  } = props;
  const fullWidth = width && width > CREATE_BREAKPOINT;

  return (
    <Item
      appearance="secondary"
      component={fullWidth ? SearchComponent : undefined}
      drawerContent={drawerContent}
      dropdownContent={dropdownContent}
      isOpen={isOpen}
      onClick={onClick}
      onClose={onClose}
      onDrawerCloseComplete={onDrawerCloseComplete}
      text={fullWidth ? text : <SearchIcon label={text} />}
    />
  );
};

export default Search;
