import * as React from 'react';
import RangeSlider from 'react-rangeslider';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { updateAttributes } from '../../commands';

// TODO: try to replace this crap with https://atlaskit.atlassian.com/packages/core/field-range

export interface Props {
  view: EditorView;
  node: PMNode;
  getPos: () => number;
}

export interface State {
  value: number;
}

export default class Slider extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.node.attrs.value,
    };
  }

  handleChangeStart = (event: MouseEvent) => {
    event.preventDefault();
    return false;
  };

  handleChange = (value: number) => {
    this.setState({
      value: Number(value),
    });
    const { state, dispatch } = this.props.view;
    const pos = this.props.getPos();
    updateAttributes({ value }, pos)(state, dispatch);
  };

  render() {
    const { value } = this.state;
    const { min, max, step } = this.props.node.attrs;

    return (
      <div
        data-value={value}
        className={`slider ${value < 70 ? 'danger' : ''}`}
      >
        <RangeSlider
          min={min}
          max={max}
          step={step}
          value={value}
          onChangeStart={this.handleChangeStart}
          onChange={this.handleChange}
        />
        <div className="slider__value">{value}</div>
      </div>
    );
  }
}
