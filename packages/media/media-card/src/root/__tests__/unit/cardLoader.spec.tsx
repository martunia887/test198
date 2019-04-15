import * as React from 'react';
import { shallow } from 'enzyme';
import { CardLoader } from '../../card/cardLoader';
import { CardLoading } from '../../../utils/lightCards';

describe('CardLoader', () => {
  it('should pass dimensions to the loading component', () => {
    const dimensions = {
      width: 10,
      height: 10,
    };
    const identifier = {} as any;
    const component = shallow(
      <CardLoader identifier={identifier} dimensions={dimensions} />,
    );

    expect(component.find(CardLoading).prop('dimensions')).toEqual(dimensions);
  });
});
