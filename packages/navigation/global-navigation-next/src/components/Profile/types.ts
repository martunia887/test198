import { ReactNode } from 'react';
import { TriggerManagerProps } from '../TriggerManager/types';

export type ProfileProps = TriggerManagerProps & {
  avatar?: ReactNode;
  tooltip: string;
};
