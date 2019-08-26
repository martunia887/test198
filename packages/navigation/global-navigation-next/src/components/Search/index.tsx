/** @jsx jsx */
import SearchIcon from '@atlaskit/icon/glyph/search';
import { colors } from '@atlaskit/theme';
import { jsx } from '@emotion/core';
import { Fragment } from 'react';

import { IconButton } from '../IconButton';
import { TriggerManager } from '../TriggerManager';

import { SearchInput, SearchWrapper, IconWrapper } from './styled';
import { searchIconStyles, searchInputStyles } from './styles';
import { SearchProps } from './types';

const SearchComponent = ({ onClick, text, ...props }: SearchProps) => {
  const onChange = () => {
    onClick && onClick();
  };
  return (
    <SearchWrapper {...props}>
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
  const { text, ...triggerManagerProps } = props;

  return (
    <TriggerManager {...triggerManagerProps}>
      {({ onTriggerClick }) => (
        <Fragment>
          <SearchComponent
            css={searchInputStyles}
            onClick={onTriggerClick}
            text={text}
          />
          <IconButton
            css={searchIconStyles}
            icon={<SearchIcon label={text} />}
            onClick={onTriggerClick}
            tooltip={text}
          />
        </Fragment>
      )}
    </TriggerManager>
  );
};
