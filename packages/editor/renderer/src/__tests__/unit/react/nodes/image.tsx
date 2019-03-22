import React from 'react';
import { mount } from 'enzyme';
import Image from '../../../../react/nodes/image';

describe('Renderer - React/Nodes/Image', () => {
  const image = mount(<Image src="https://example.com/image.jpg" />);

  it('should render a <img>-tag', () => {
    expect(image.getDOMNode().tagName).toEqual('IMG');
  });
});
