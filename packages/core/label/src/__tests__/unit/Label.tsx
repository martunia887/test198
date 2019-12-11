import React from 'react';
import { render } from '@testing-library/react';
import Label from '../../';

describe('Label', () => {
  it('should render children', () => {
    const { getByTestId } = render(
      <Label htmlFor="test" testId="myLabel">
        Hello World
      </Label>,
    );

    expect(getByTestId('myLabel').innerHTML).toMatchSnapshot();
  });

  it('should render with required indicator', () => {
    const { getByTestId } = render(
      <Label htmlFor="test" testId="myLabel" isRequired>
        Hello World
      </Label>,
    );

    expect(getByTestId('myLabel').innerText).toEqual('Hello World*');
  });
});
