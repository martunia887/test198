import * as React from 'react';
import ToneSelector from '../components/common/ToneSelector';
import filters from '../util/filters';
import { onToneSelected, getEmojis } from '../example-helpers';

const toneEmoji = filters.toneEmoji(getEmojis());

export default function Example() {
  return <ToneSelector emoji={toneEmoji} onToneSelected={onToneSelected} />;
}
