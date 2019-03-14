// @flow

import React from 'react';
import HeaderSection from '../../index';

<HeaderSection>
  {({ className }) => <div css={className}>Header</div>}
</HeaderSection>;

<HeaderSection id="foo" parentId="bar">
  {({ className }) => <div css={className}>Header</div>}
</HeaderSection>;

// $ExpectError - missing children prop
<HeaderSection />;
// $ExpectError - children should be function
<HeaderSection>Foo</HeaderSection>;
