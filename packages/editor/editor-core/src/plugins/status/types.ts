import { Color as ColorType } from '@atlaskit/status';
import { Selection } from 'prosemirror-state';

export type StatusType = {
  color: ColorType;
  text: string;
  localId?: string;
};

export type StatusState = {
  isNew: boolean;
  selectionChanges: SelectionChangeType;
  selectedStatus: StatusType | null;
  emptyCurrentNode?: boolean;
};

export type SelectionChangeHandler = (
  newSelection: Selection,
  prevSelection: Selection,
) => any;

export interface SelectionChangeType {
  subscribe(cb: SelectionChangeHandler): void;
  unsubscribe(cb: SelectionChangeHandler): void;
  notifyNewSelection(newSelection: Selection, prevSelection: Selection): void;
}
