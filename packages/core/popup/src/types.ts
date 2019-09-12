import { Dispatch, SetStateAction, FC } from 'react';
import { Placement } from '@atlaskit/popper';

export type ReactRef = React.Ref<HTMLElement> | HTMLElement | null;

type TriggerProps = {
  ref: any;
  'aria-controls'?: string;
  'aria-expanded': boolean;
  'aria-haspopup': boolean;
};

type ContentProps = {
  scheduleUpdate(): void;
  isOpen: boolean;
  onClose: (() => void) | undefined;
  setInitialFocusRef: Dispatch<SetStateAction<HTMLElement | undefined>>;
};

export type PopupProps = {
  /** Value passed to the Layer component to determine when to reposition the droplist */
  boundariesElement?: 'viewport' | 'window' | 'scrollParent';
  /** HTML Id for testing etc */
  id?: string;
  /** Positioning string of the Popup. See the documentation of @atlaskit/popper for more details. */
  placement?: Placement;
  /** Allows the Popup to be placed on the opposite side of its trigger if it does not
   * fit in the viewport. */
  shouldFlip?: boolean;
  /** testId maps to data-testid for testing in your application */
  testId?: string;
  /** Content to display in the Popup */
  content: FC<ContentProps>;
  /** Callback function when the Popup is opened */
  onOpen?(): void;
  /** Callback function when the Popup is closed */
  onClose?(): void;
  /** Open State of the Dialog */
  isOpen: boolean;
  /** Component used to anchor the popup to your content. Usually a button used to open the popup */
  trigger: FC<TriggerProps>;
  /** Whether to lock the scrolling behavior of the page while the popup is open */
  lockBodyScroll?: boolean;
  /** The container displayed in the portal that wrapps the content. Use to override the default white background with rounded corners */
  popupComponent?: FC<WrapperContainerProps>;
  /** Optional override for the z-index for the react portal */
  zIndex?: number;
};

export type FocusManagerHook = {
  popupRef: HTMLDivElement | undefined;
  initialFocusRef: HTMLElement | undefined;
  isOpen: boolean;
  onClose?(): void;
};

export type RepositionOnUpdateProps = {
  scheduleUpdate(): void;
};

export type WrapperContainerProps = {
  id?: string;
  'data-testid'?: string;
  ref: any;
  style?: object;
  'data-placement': Placement;
  tabIndex: number;
};
