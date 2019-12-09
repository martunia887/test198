import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import { colors } from '@atlaskit/theme';

export type Props = {
  visible?: boolean;
  width?: number;
};

const Content = styled.div`
  width: 300px;
  height: 100%;
  box-sizing: border-box;
  padding: 16px 24px 16px 24px;
  border-left: 1px solid ${colors.N40};
`;

export default class ContextPanel extends React.Component<Props> {
  render() {
    return !!this.props.visible ? (
      <Content>{this.props.children}</Content>
    ) : null;
  }
}
