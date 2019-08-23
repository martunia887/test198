import Item from '../Item';

type RequiredItemProps = JSX.LibraryManagedAttributes<
  typeof Item,
  Item['props']
>;

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type AppSwitcherProps = Omit<RequiredItemProps, 'appearance'> & {
  text?: Item['props']['text'];
};
