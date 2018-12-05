import * as React from 'react';
import { Component } from 'react';
import FieldRange from '@atlaskit/range';
import ScaleLargeIcon from '@atlaskit/icon/glyph/media-services/scale-large';
import ScaleSmallIcon from '@atlaskit/icon/glyph/media-services/scale-small';
import { SliderWrapper } from './styled';

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const defaultProps = {
  value: 0,
};

export class Slider extends Component<SliderProps, {}> {
  static defaultProps = defaultProps;

  render() {
    const { value } = this.props;
    return (
      <SliderWrapper>
        <ScaleSmallIcon label="scale-small-icon" />
        <FieldRange value={value} onChange={this.props.onChange} />
        <ScaleLargeIcon label="scale-large-icon" />
      </SliderWrapper>
    );
  }
}
