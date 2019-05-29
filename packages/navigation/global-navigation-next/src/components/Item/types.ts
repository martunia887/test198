import { ComponentType, ReactNode } from 'react';

export type Dataset = { [name: string]: string | typeof undefined };

export type ItemProps = {
  /** Whether the item should look like a primary or secondary item. Profile is a variant of secondary. */
  appearance: 'primary' | 'secondary' | 'profile';
  /** A custom component to render instead of the default wrapper component.
   * Could used to render a router Link, for example. The component will be
   * provided with a className, children and onClick props, which should be passed on to the
   * element you render. */
  component?: ComponentType<ItemRenderComponentProps>;
  /** A map of data attributes applied to the rendered item. */
  dataset?: Dataset;
  /** Content to render in a drawer */
  drawerContent?: ComponentType<{}>;
  /** Content to render in a dropdown */
  dropdownContent?: ComponentType<{ closeDropdown?: () => void }>;
  /** An href which this Item links to. If this prop is provided the Item will
   * render as an <a>. */
  href?: string;
  /** A unique identifier for the item. Used for analytics. */
  id?: string;
  /** Whether this drawer/dropdown should be open or not */
  isOpen?: boolean;
  /** Whether this Item should display as being selected. */
  isSelected: boolean;
  /** A handler which will be called when the Item is clicked. */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** A handler which will be called when the drawer/dropdown is closed. */
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  /** The HTML target attribute. Will only be used if href is also set. */
  target?: string;
  /** A string or Node to render as the main content of the Item. */
  text: ReactNode;
  /** A string to render as a tooltip */
  tooltip?: string;
};

export type ItemRenderComponentProps = ItemProps & {
  children: Node;
  className: string;
};
