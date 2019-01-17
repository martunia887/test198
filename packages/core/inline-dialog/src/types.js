// @flow
import { type Node } from 'react';

export type Placement =
  | 'auto-start'
  | 'auto'
  | 'auto-end'
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-end'
  | 'bottom'
  | 'bottom-start'
  | 'left-end'
  | 'left'
  | 'left-start';

export type Props = {
  /** The elements that the InlineDialog will be positioned relative to. */
  children: Node,
  /** The elements to be displayed within the InlineDialog. */
  content: Node,
  /** Sets whether to show or hide the dialog. */
  isOpen: boolean,
  /** Function called when you lose focus on the object. */
  onContentBlur: () => void,
  /** Function called when you click on the open dialog. */
  onContentClick: () => void,
  /** Function called when you focus on the open dialog. */
  onContentFocus: () => void,
  /** Function called when the dialog is open and a click occurs anywhere outside
   the dialog. */
  onClose: ({ isOpen: false, event: any }) => void,
  /** Where the dialog should appear, relative to the contents of the children. */
  placement: Placement,
  /** Formatted like "0, 8px" — how far to offset the dialog from the Reference. Changes automatically based on the placement */
  offset: number | string | typeof undefined,
};
