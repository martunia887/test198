import React, { FC, Fragment } from 'react';
import { CreateButtonSkeleton, CreateIconSkeleton } from './styles';

export const CreateSkeleton: FC = () => (
  <Fragment>
    <CreateButtonSkeleton />
    <CreateIconSkeleton />
  </Fragment>
);
