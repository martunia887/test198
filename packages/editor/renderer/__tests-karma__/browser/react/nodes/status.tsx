import * as React from 'react';
import { shallow } from 'enzyme';
import { Status } from '@atlaskit/status';
import StatusNode from '../../../../src/react/nodes/status';

describe('Renderer - React/Nodes/Status', () => {
  const status = shallow(<StatusNode text="In progess" color="blue" />);

  it('should render using status component', () => {
    expect(status.find(Status).length).toEqual(1);
  });
});
