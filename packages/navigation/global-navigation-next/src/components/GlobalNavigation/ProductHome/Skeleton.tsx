import React, { FC } from 'react';
import { Outer, IconSkeleton, WordmarkSkeleton } from './styled';

export const ProductHomeSkeleton: FC = () => {
  return (
    <Outer>
      <IconSkeleton />
      <WordmarkSkeleton />
    </Outer>
  );
};
