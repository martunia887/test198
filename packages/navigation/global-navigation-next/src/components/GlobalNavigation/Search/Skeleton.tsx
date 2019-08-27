import React, { FC } from 'react';
import { SearchInputSkeleton, SearchWrapper, IconWrapper } from './styled';

export const SearchSkeleton: FC = () => (
  <SearchWrapper>
    <IconWrapper />
    <SearchInputSkeleton />
  </SearchWrapper>
);
