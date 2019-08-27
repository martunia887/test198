import React, { FC } from 'react';
import { CREATE_BREAKPOINT } from '../../../common/constants';
import { CreateButtonSkeleton, CreateIconSkeleton } from './styles';

type Props = {
  width?: number;
};

export const CreateSkeleton: FC<Props> = ({ width }) => {
  const fullWidth = width && width > CREATE_BREAKPOINT;
  return fullWidth ? <CreateButtonSkeleton /> : <CreateIconSkeleton />;
};
