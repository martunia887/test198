import Button from '@atlaskit/button';
import { ReactNode } from 'react';

type RequiredButtonProps = JSX.LibraryManagedAttributes<
  typeof Button,
  Button['props']
>;

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type IconButtonProps = Omit<
  RequiredButtonProps,
  'appearance' | 'iconAfter' | 'iconBefore' | 'theme'
> & {
  icon: ReactNode;
  testId?: string;
  tooltip: string;
};
