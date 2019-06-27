import * as React from 'react';

import { deepMapAcronyms } from '../../utils';
import Inline from './inline';

export default function Paragraph({ children }: React.Props<{}>) {
  return (
    <p>
      <Inline>{deepMapAcronyms(children)}</Inline>
    </p>
  );
}
