import { ReactNode } from 'react';

export type ActionsType = Array<{
  onClick?: (arg0: any) => void;
  key?: string;
  text?: ReactNode;
}>;
