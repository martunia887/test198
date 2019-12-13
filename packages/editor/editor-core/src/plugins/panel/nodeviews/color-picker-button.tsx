import TextColorIcon from '@atlaskit/icon/glyph/editor/text-color';

import React, { Component, RefObject } from 'react';
import styled, { css } from 'styled-components';
import EmojiIcon from '@atlaskit/icon/glyph/editor/emoji';
import MoreIcon from '@atlaskit/icon/glyph/editor/more';

import { EditorView } from 'prosemirror-view';
import { emoji } from '@atlaskit/util-data-test';
import Popup from '../../../../../editor-common/src/ui/Popup';
import ColorPicker from './../../../../../../jira/color-picker/src/components/ColorPicker';
import { Button } from '../../../../../../core/button/src/components/Button';

import { colors } from '@atlaskit/theme';
import { PanelState } from '../pm-plugins/main';
import { pluginKey as panelPluginKey } from '../pm-plugins/main';
import { changePanelType } from '../actions';

const fadedPalette = [
  { label: 'Dark blue', value: colors.N800 },
  { label: 'Blue', value: colors.B500 },
  { label: 'Light blue', value: colors.T500 },
  { label: 'Green', value: colors.G500 },
  { label: 'Orange', value: colors.Y500 },
  { label: 'Red', value: colors.R500 },
  { label: 'Purple', value: colors.P500 },

  { label: 'Grey', value: colors.N80 },
  { label: 'Blue', value: colors.B100 },
  { label: 'Light blue', value: colors.T300 },
  { label: 'Green', value: colors.G300 },
  { label: 'Yellow', value: colors.Y200 },
  { label: 'Red', value: colors.R300 },
  { label: 'Purple', value: colors.P300 },

  { label: 'White', value: colors.N0 },
  { label: 'Blue', value: colors.B75 },
  { label: 'Light blue', value: colors.T75 },
  { label: 'Green', value: colors.G75 },
  { label: 'Yellow', value: colors.Y75 },
  { label: 'Red', value: colors.R75 },
  { label: 'Purple', value: colors.P50 },
];

// Control the size of color picker buttons and preview
const ColorPickerWrapper = styled.div`
  // > ColorCardWrapper > ColorCardButton
  > div > button {
    width: 24px;
    height: 24px;
  }

  // > ColorCardWrapper > ColorCardButton > ColorCardContent
  > div > button > div {
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
  }
`;

export type Props = {
  view?: EditorView<any>;
  idx?: any;
  panelState?: PanelState;
};

export type State = {
  popupIsOpened?: Boolean;
  selectedColor?: string;
};

export default class ColorPickerButton extends Component<Props, State> {
  buttonRef: RefObject<Button>;
  state: State = {
    popupIsOpened: false,
  };

  constructor(props: any) {
    super(props);
    this.buttonRef = React.createRef();
  }

  componentDidMount() {
    const editorView = this.props.view as EditorView<any>;
    const panelPluginState = panelPluginKey.getState(editorView.state);
    if (panelPluginState.activePanelColor) {
      this.setState({ selectedColor: panelPluginState.activePanelColor });
    }
  }

  togglePopup = () => {
    this.setState({ popupIsOpened: !this.state.popupIsOpened });
  };

  render() {
    return (
      <ColorPickerWrapper>
        <ColorPicker
          label="Change color"
          cols={7}
          palette={fadedPalette}
          selectedColor={this.state.selectedColor}
          onChange={(newColor: string) => {
            this.setState({ selectedColor: newColor });
            this.updateColor(newColor);
          }}
        />
      </ColorPickerWrapper>
    );
  }

  private updateColor = (color: string) => {
    const editorView = this.props.view as EditorView<any>;

    changePanelType(undefined, {
      color: color,
    })(editorView.state, editorView.dispatch);
  };
}
