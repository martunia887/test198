import * as React from 'react';
import classNames from 'classnames';
import { getEmojis } from '../example-helpers';
import EmojiPickerList from '../src';

import * as styles from '../src';

export default function Example() {
  return (
    <div className={classNames([styles.emojiPicker])}>
      <EmojiPickerList emojis={getEmojis()} />
    </div>
  );
}
