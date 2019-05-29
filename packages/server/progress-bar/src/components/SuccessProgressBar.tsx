import * as React from 'react';
import { G300 } from '@atlaskit/theme/colors';
import ProgressBar from './ProgressBar';
import { CustomProgressBarProps } from '../types';

export default class extends React.PureComponent<CustomProgressBarProps> {
  static defaultProps = {
    value: 0,
    isIndeterminate: false,
  };

  render() {
    return (
      <ProgressBar
        {...this.props}
        theme={(currentTheme, props) => {
          const theme = currentTheme(props);
          const { value, isIndeterminate } = this.props;
          if (value < 1 || isIndeterminate) {
            return theme;
          }
          return {
            ...theme,
            bar: {
              ...theme.bar,
              background: G300,
            },
          };
        }}
      />
    );
  }
}
