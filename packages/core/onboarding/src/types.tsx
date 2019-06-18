import { ReactNode } from 'react';

export type ActionsType = Array<{
  onClick?: (event: React.ChangeEvent) => void;
  key?: string;
  text?: ReactNode;
}>;
