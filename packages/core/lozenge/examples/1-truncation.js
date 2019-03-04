// @flow
import React from 'react';
import Lozenge from '../';

export default () => (
  <div>
    <p>
      <Lozenge appearance="success">
        very very very wide text which truncates
      </Lozenge>
    </p>
    <p>
      <Lozenge appearance="success" isBold>
        very very very wide text which truncates
      </Lozenge>
    </p>
  </div>
);
