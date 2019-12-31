import { render } from '@testing-library/react';
import { G300 } from '@atlaskit/theme/colors';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import React from 'react';

import Flag from '../../Flag';

describe('Flag should be found by data-testid', () => {
  test('Using getByTestId()', async () => {
    const { getByTestId } = render(
      <Flag
        actions={[
          { content: 'Show me', onClick: () => {} },
          { content: 'No thanks', onClick: () => {} },
        ]}
        icon={<SuccessIcon primaryColor={G300} label="Info" />}
        description="We got fun an games. We got everything you want honey, we know the names."
        id="1"
        key="1"
        title="Welcome to the jungle"
        testId="MyFlagTestId"
      />,
    );
    expect(getByTestId('MyFlagTestId')).toBeTruthy();
  });
});
describe('Flag actions should be found by data-testid', () => {
  test('Using getByTestId()', async () => {
    const { getByTestId } = render(
      <Flag
        actions={[
          {
            content: 'Show me',
            onClick: () => {},
            testId: 'MyFlagActionTestId',
          },
          { content: 'No thanks', onClick: () => {} },
        ]}
        icon={<SuccessIcon primaryColor={G300} label="Info" />}
        description="We got fun an games. We got everything you want honey, we know the names."
        id="1"
        key="1"
        title="Welcome to the jungle"
      />,
    );
    expect(getByTestId('MyFlagActionTestId')).toBeTruthy();
  });
});
