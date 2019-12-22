import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TableBodyRow } from '../../../styled/TableRow';

describe('TableRow', () => {
  let shallowWrapper: ShallowWrapper;

  describe('on rendering with highlighted prop', () => {
    beforeEach(() => {
      shallowWrapper = shallow(<TableBodyRow isHighlighted={true} />);
    });

    it('should render with required background color', () => {
      expect(shallowWrapper).toMatchSnapshot();
    });
  });

  describe('on rendering without highlighted prop', () => {
    beforeEach(() => {
      shallowWrapper = shallow(<TableBodyRow isHighlighted={false} />);
    });

    it('should render without background color', () => {
      expect(shallowWrapper).toMatchSnapshot();
    });
  });
});
