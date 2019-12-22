import * as React from 'react';
import { MouseEvent } from 'react';
import classNames from 'classnames';

import { EmojiDescription } from '../../types';
import { leftClick } from '../../util/mouse';

import Emoji from './Emoji';
import * as styles from './styles';

export interface Props {
  emoji: EmojiDescription;
  onSelected?: () => void;
  selectOnHover?: boolean;
}

const handleMouseDown = (props: Props, event: MouseEvent<any>) => {
  const { onSelected } = props;
  event.preventDefault();
  if (onSelected && leftClick(event)) {
    onSelected();
  }
};

export const EmojiButton = (props: Props) => {
  const { emoji, selectOnHover } = props;

  const classes = [styles.emojiButton];

  return (
    <button
      className={classNames(classes)}
      onMouseDown={event => {
        handleMouseDown(props, event);
      }}
    >
      <Emoji emoji={emoji} selectOnHover={selectOnHover} />
    </button>
  );
};

export default EmojiButton;
