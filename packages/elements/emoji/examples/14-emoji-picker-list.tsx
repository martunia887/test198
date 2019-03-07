import * as React from 'react';
import * as classNames from 'classnames';
import { getEmojis } from '../example-helpers';
import EmojiPickerList from '../components/picker/EmojiPickerList';

import * as styles from '../components/picker/styles';

export default function Example() {
  return (
    <div className={classNames([styles.emojiPicker])}>
      <EmojiPickerList emojis={getEmojis()} />
    </div>
  );
}
