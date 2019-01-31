import { Selection, NodeSelection, Transaction } from 'prosemirror-state';
import { StatusType } from './types';

export const mayGetStatusNodeAt = (selection: Selection): StatusType | null => {
  if (selection && selection instanceof NodeSelection) {
    const nodeSelection = selection as NodeSelection;
    if (nodeSelection.node.type.name === 'status') {
      return selection.node.attrs as StatusType;
    }
  }
  return null;
};

export const isEmptyStatus = (node: StatusType): boolean =>
  node && ((node.text && node.text.trim().length === 0) || node.text === '');

export const setSelectionNearPos = (
  tr: Transaction,
  pos: number,
): Transaction =>
  tr.setSelection(Selection.near(tr.doc.resolve(tr.mapping.map(pos))));

export const removeEmptyStatusesFromDoc = (tr: Transaction): boolean => {
  let changed = false;
  tr.doc.descendants((node, pos) => {
    if (node.type.name === 'status') {
      const otherStatus = node.attrs as StatusType;
      if (isEmptyStatus(otherStatus)) {
        tr.delete(tr.mapping.map(pos), tr.mapping.map(pos + 1));
        changed = true;
      }
      return false;
    } else {
      return true;
    }
  });
  return changed;
};
