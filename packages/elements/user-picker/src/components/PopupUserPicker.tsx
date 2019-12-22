import * as React from 'react';
import { PopupSelect } from '@atlaskit/select';

import { PopupUserPickerProps } from '../types';

import { BaseUserPicker } from './BaseUserPicker';
import { getPopupComponents } from './components';
import { getPopupProps } from './popup';
import { getPopupStyles } from './styles';

interface State {
  flipped: boolean;
}

export class PopupUserPicker extends React.Component<
  PopupUserPickerProps,
  State
> {
  static defaultProps = {
    width: 300,
  };
  state = {
    flipped: false,
  };

  handleFlipStyle = (data: { flipped: boolean; styles: any; popper: any }) => {
    const {
      flipped,
      styles: { transform },
      popper: { height },
    } = data;
    this.setState({ flipped });
    if (!flipped) {
      return data;
    }

    data.styles.transform =
      transform + `translate(0, ${height}px) translate(0, -100%)`;
    return data;
  };

  render() {
    const { target, popupTitle, boundariesElement } = this.props;
    const { flipped } = this.state;
    const width = this.props.width as string | number;
    const styles = getPopupStyles(width, flipped);

    return (
      <BaseUserPicker
        {...this.props}
        SelectComponent={PopupSelect}
        width={width}
        styles={styles}
        components={getPopupComponents(!!popupTitle)}
        pickerProps={getPopupProps(
          width,
          target,
          this.handleFlipStyle,
          popupTitle,
          boundariesElement,
        )}
      />
    );
  }
}
