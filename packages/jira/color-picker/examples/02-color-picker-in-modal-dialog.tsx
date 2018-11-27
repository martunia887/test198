import * as React from 'react';
import ColorPicker from '../src';
import { simplePalette } from '../mock-data';
import { colors } from '@atlaskit/theme';
import Modal from '@atlaskit/modal-dialog';

class ColorPickerExample extends React.Component<{}, { color: string }> {
  state = {
    color: colors.P200,
  };

  render() {
    return (
      <Modal>
        <div style={{ height: 400 }}>
          <ColorPicker
            label="Change color"
            palette={simplePalette}
            selectedColor={this.state.color}
            popperProps={{
              positionFixed: true,
              modifiers: {
                offset: {
                  offset: '-10 5',
                },
              },
            }}
            cols={3}
            onChange={newColor => this.setState({ color: newColor })}
          />
        </div>
      </Modal>
    );
  }
}

export default () => <ColorPickerExample />;
