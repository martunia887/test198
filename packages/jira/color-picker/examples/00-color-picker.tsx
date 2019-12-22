import * as React from 'react';
import { colors } from '@atlaskit/theme';

import { simplePalette } from '../mock-data';
import ColorPicker from '../src';

class ColorPickerExample extends React.Component<{}, { color: string }> {
  state = {
    color: colors.P200,
  };

  render() {
    return (
      <ColorPicker
        label="Change color"
        palette={simplePalette}
        selectedColor={this.state.color}
        onChange={(newColor: string) => this.setState({ color: newColor })}
      />
    );
  }
}

export default () => <ColorPickerExample />;
