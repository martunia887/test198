import React from 'react';
import { render } from '@testing-library/react';
import SlideIn, { slideInAnimation } from '../../../entering/slide-in';
import ExitingPersistence from '../../../entering/exiting-persistence';
import { easeOut, easeIn } from '../../../utils/curves';
import { mediumDurationMs } from '../../../utils/durations';
import { Direction, From } from '../../../entering/types';

jest.mock('../../../utils/accessibility');

describe('<SlideIn />', () => {
  it('should default to medium duration', () => {
    const { getByTestId } = render(
      <SlideIn from="left">
        {props => <div data-testid="target" {...props} />}
      </SlideIn>,
    );

    expect(getByTestId('target')).toHaveStyleDeclaration(
      'animation-duration',
      `${mediumDurationMs}ms`,
    );
  });

  it('should override default duration', () => {
    const { getByTestId } = render(
      <SlideIn duration={123} from="left">
        {props => <div data-testid="target" {...props} />}
      </SlideIn>,
    );

    expect(getByTestId('target')).toHaveStyleDeclaration(
      'animation-duration',
      '123ms',
    );
  });

  it('should slide in easing out', () => {
    const { getByTestId } = render(
      <SlideIn from="left">
        {props => <div data-testid="target" {...props} />}
      </SlideIn>,
    );

    expect(getByTestId('target')).toHaveStyleDeclaration(
      'animation-timing-function',
      easeOut,
    );
  });

  it('should slide out easing in', () => {
    const { getByTestId, rerender } = render(
      <ExitingPersistence>
        <SlideIn from="left">
          {props => <div data-testid="target" {...props} />}
        </SlideIn>
      </ExitingPersistence>,
    );

    rerender(<ExitingPersistence>{false}</ExitingPersistence>);

    expect(getByTestId('target')).toHaveStyleDeclaration(
      'animation-timing-function',
      easeIn,
    );
  });

  ['entering', 'exiting'].forEach(direction => {
    ['top', 'right', 'bottom', 'left'].forEach(from => {
      it(`should animate ${direction} from ${from}`, () => {
        expect(
          slideInAnimation(from as From, direction as Direction),
        ).toMatchSnapshot();
      });
    });
  });
});
