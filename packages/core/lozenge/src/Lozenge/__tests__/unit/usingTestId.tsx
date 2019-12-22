import React from 'react';
import { render } from '@testing-library/react';
import Lozenge from '../../..';

describe('Lozenge should be found by data-testid', () => {
  test('Using getByTestId()', async () => {
    const lozengeTestId = 'the-lozenge';
    const { getByTestId } = render(<Lozenge testId={lozengeTestId} />);
    expect(getByTestId(lozengeTestId)).toBeTruthy();
  });
});
