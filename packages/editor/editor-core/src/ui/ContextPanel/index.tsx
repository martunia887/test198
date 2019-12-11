import * as React from 'react';
import styled, { withTheme } from 'styled-components';
import { colors } from '@atlaskit/theme';

export type Props = {
  visible?: boolean;
  width?: number;
};

const animSpeed = '0.2s;';
const width = '300px';

const Panel = styled.div`
  &.hidden {
    width: 0px;
  }

  &.visible {
    width: ${width};
  }

  height: 100%;
  transition: width ${animSpeed};
`;

const Content = styled.div`
  box-sizing: border-box;
  padding: 16px 24px 16px 24px;
  border-left: 1px solid ${colors.N40};
  width: ${width};
  height: 100%;

  &.hidden {
    transform: translateX(${width});
  }

  &.visible {
    transform: translateX(0px);
  }
  transition: transform ${animSpeed};
  overflow-x: scroll;
`;

class ContextPanelWithTheme extends React.Component<Props & { theme: any }> {
  state = {
    mounted: false,
  };

  componentDidMount() {
    this.setState({
      mounted: true,
    });
  }

  render() {
    // console.log('theme', this.props.theme);
    return (
      <Panel
        className={
          this.state.mounted
            ? this.props.visible || typeof this.props.visible === 'undefined'
              ? 'visible'
              : 'hidden'
            : ''
        }
      >
        <Content>{this.props.children}</Content>
      </Panel>
    );
  }
}

export default withTheme(ContextPanelWithTheme);
