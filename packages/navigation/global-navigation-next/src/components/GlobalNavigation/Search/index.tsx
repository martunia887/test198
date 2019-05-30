import React, { Component } from 'react';
import { colors } from '@atlaskit/theme';
import SearchIcon from '@atlaskit/icon/glyph/search';
import { SearchProps } from './types';
import { CREATE_BREAKPOINT } from '../../../common/constants';
import Item from '../../Item';
import { SearchInput, SearchWrapper, IconWrapper } from './styled';

type Props = SearchProps & {
  width?: number;
};

const SearchComponent = ({ className, onClick, text }: any) => (
  <SearchWrapper>
    <IconWrapper>
      <SearchIcon label={text} primaryColor={colors.B50} />
    </IconWrapper>
    <SearchInput placeholder={text} onClick={onClick} />
  </SearchWrapper>
);

export default class Search extends Component<Props> {
  render() {
    const {
      isOpen,
      onClick,
      onClose,
      onDrawerCloseComplete,
      drawerContent,
      dropdownContent,
      width,
      text,
    } = this.props;
    const fullWidth = width && width > CREATE_BREAKPOINT;

    return (
      <Item
        appearance="secondary"
        onClick={onClick}
        isOpen={isOpen}
        onClose={onClose}
        onDrawerCloseComplete={onDrawerCloseComplete}
        drawerContent={drawerContent}
        dropdownContent={dropdownContent}
        text={fullWidth ? text : <SearchIcon label={text} />}
        component={fullWidth ? SearchComponent : undefined}
      />
    );
  }
}
