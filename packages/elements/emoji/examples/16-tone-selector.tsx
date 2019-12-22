import * as React from 'react';

import { onToneSelected, getEmojis } from '../example-helpers';
import ToneSelector from '../src/components/common/ToneSelector';
import filters from '../src/util/filters';

const toneEmoji = filters.toneEmoji(getEmojis());

export default function Example() {
  return <ToneSelector emoji={toneEmoji} onToneSelected={onToneSelected} />;
}
