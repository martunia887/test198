import { Color as ColorType } from '@atlaskit/status';
import { Selection } from 'prosemirror-state';

export type StatusType = {
  color: ColorType;
  text: string;
  localId?: string;
};

export type StatusState = {
  isNew: boolean;
  showStatusPickerAt: number | null;
  selectionChanges: SelectionChange;
  selectedStatus: StatusType | null;
  undo?: boolean;
  emptyCurrentNode?: boolean;
};

export type SelectionChangeHandler = (
  newSelection: Selection,
  prevSelection: Selection,
) => any;

export class SelectionChange {
  private changeHandlers: SelectionChangeHandler[] = [];

  constructor() {
    this.changeHandlers = [];
  }

  subscribe(cb: SelectionChangeHandler) {
    this.changeHandlers.push(cb);
  }

  unsubscribe(cb: SelectionChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  notifyNewSelection(newSelection: Selection, prevSelection: Selection) {
    this.changeHandlers.forEach(cb => cb(newSelection, prevSelection));
  }
}
