// @flow

export type CreateProps = {
  text: string;
  /** A handler which will be called when create is clicked. */
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};
