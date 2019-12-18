import { ReactNode } from 'react';

export type OverflowProviderProps = {
  children: ReactNode;
  isVisible: boolean;
  setCloseOnBodyClick(arg0: boolean): void;
};
