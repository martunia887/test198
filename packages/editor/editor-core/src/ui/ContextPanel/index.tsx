import * as React from 'react';
import styled from 'styled-components';
import { colors } from '@atlaskit/theme';

export type Props = {
  visible?: boolean;
  width?: number;
};

const ANIM_SPEED = '0.2s';
const DEFAULT_WIDTH = 300;

type StyleProps = {
  panelWidth: number;
};

export const Panel = styled.div<StyleProps>`
  &.hidden {
    width: 0px;
  }

  &.visible {
    width: ${p => p.panelWidth}px;
  }

  height: 100%;
  transition: width ${ANIM_SPEED};
  overflow: hidden;
`;

export const Content = styled.div<StyleProps>`
  box-sizing: border-box;
  padding: 16px 24px 16px 24px;
  border-left: 1px solid ${colors.N40};
  width: ${p => p.panelWidth}px;
  height: 100%;
  overflow-x: scroll;
`;

export default class ContextPanel extends React.Component<Props> {
  state = {
    mounted: false,
  };

  componentDidMount() {
    // use this to trigger an animation
    this.setState({
      mounted: true,
    });
  }

  render() {
    const width = this.props.width || DEFAULT_WIDTH;

    return (
      <Panel
        panelWidth={width}
        className={
          this.state.mounted
            ? this.props.visible || typeof this.props.visible === 'undefined'
              ? 'visible'
              : 'hidden'
            : ''
        }
      >
        <Content panelWidth={width}>{this.props.children}</Content>
      </Panel>
    );
  }
}
