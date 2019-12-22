// @flow
import React, { Component, type Element, type ChildrenArray } from 'react';
import { HeadersContainer } from '../styled';
import Header from './Header';

type Props = {
  children: ChildrenArray<Element<typeof Header>>,
};

export default class Headers extends Component<Props> {
  render() {
    return (
      <HeadersContainer role="row">
        {React.Children.map(this.props.children, (header, index) =>
          // eslint-disable-next-line react/no-array-index-key
          React.cloneElement(header, { key: index, columnIndex: index }),
        )}
      </HeadersContainer>
    );
  }
}
