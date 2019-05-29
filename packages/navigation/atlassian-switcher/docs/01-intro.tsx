import * as React from 'react';
import { md } from '@atlaskit/docs';
import { Y75, Y200 } from '@atlaskit/theme/colors';

const Warning = (p: { children: React.ReactNode }) => (
  <div
    style={{
      backgroundColor: Y75,
      boxShadow: `-4px 0 0 ${Y200}`,
      marginBottom: '1.4em',
      padding: '1em 1.2em',
    }}
    {...p}
  />
);
export default md`
${(
  <Warning>
    <p>
      <strong>
        Note: @atlaskit/atlassian-switcher is currently a developer preview.
      </strong>
    </p>
    <p>
      Please experiment with and test this package, but be aware that the API
      may change at any time. Use at your own risk, preferrably not in
      production.
    </p>
  </Warning>
)}
`;
