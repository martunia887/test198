/** @jsx jsx */
import SearchIcon from '@atlaskit/icon/glyph/search';
import { colors } from '@atlaskit/theme';
import { jsx } from '@emotion/core';
import { Fragment } from 'react';

import Item from '../Item';

import { SearchInput, SearchWrapper, IconWrapper } from './styled';
import { searchIconStyles, searchInputStyles } from './styles';
import { SearchProps } from './types';

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

export const Search = (props: SearchProps) => {
  const {
    isOpen,
    onClick,
    onClose,
    onDrawerCloseComplete,
    drawerContent,
    dropdownContent,
    text,
  } = props;

  return (
    <Fragment>
      <div css={searchInputStyles}>
        <Item
          appearance="secondary"
          component={SearchComponent}
          drawerContent={drawerContent}
          dropdownContent={dropdownContent}
          isOpen={isOpen}
          onClick={onClick}
          onClose={onClose}
          onDrawerCloseComplete={onDrawerCloseComplete}
          text={text}
        />
      </div>
      <div css={searchIconStyles}>
        <Item
          appearance="secondary"
          drawerContent={drawerContent}
          dropdownContent={dropdownContent}
          isOpen={isOpen}
          onClick={onClick}
          onClose={onClose}
          onDrawerCloseComplete={onDrawerCloseComplete}
          text={<SearchIcon label={text} />}
        />
      </div>
    </Fragment>
  );
};
