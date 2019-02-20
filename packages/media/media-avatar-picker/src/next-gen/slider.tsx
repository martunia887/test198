import * as React from 'react';
import { Component } from 'react';
import FieldRange from '@atlaskit/range';
import ScaleLargeIcon from '@atlaskit/icon/glyph/media-services/scale-large';
import ScaleSmallIcon from '@atlaskit/icon/glyph/media-services/scale-small';
import Button from '@atlaskit/button';
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

  onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const value = parseFloat(e.currentTarget.value);
    onChange(value);
  };

  render() {
    const { value, onChange } = this.props;
    return (
      <SliderWrapper>
        <Button
          iconAfter={<ScaleSmallIcon label="scale-small-icon" />}
          onClick={() => onChange(0)}
          tabIndex={2}
        />
        <FieldRange value={value} onChange={this.onChange} tabIndex={1} />
        <Button
          iconAfter={<ScaleLargeIcon label="scale-large-icon" />}
          onClick={() => onChange(100)}
          tabIndex={3}
        />
      </SliderWrapper>
    );
  }
}
