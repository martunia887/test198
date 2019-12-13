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
  { label: 'Squid ink', value: colors.N800 },
  { label: 'Chore coat', value: colors.B500 },
  { label: 'Shabby chic', value: colors.T500 },
  { label: 'Keen green', value: colors.G500 },
  { label: 'Debrito', value: colors.Y500 },
  { label: "Dragon's blood", value: colors.R500 },
  { label: 'Prince', value: colors.P500 },

  { label: 'Spooky ghost', value: colors.N80 },
  { label: 'Arvo breeze', value: colors.B100 },
  { label: 'Tamarama', value: colors.T300 },
  { label: 'Fine pine', value: colors.G300 },
  { label: 'Pub mix', value: colors.Y200 },
  { label: 'Poppy surprise', value: colors.R300 },
  { label: "Da' juice", value: colors.P300 },

  { label: 'Doctor', value: colors.N0 },
  { label: 'Schwag', value: colors.B75 },
  { label: 'Arctic chill', value: colors.T75 },
  { label: 'Mintie', value: colors.G75 },
  { label: 'Dandelion whisper', value: colors.Y75 },
  { label: 'Bondi sunburn', value: colors.R75 },
  { label: 'Lavender secret', value: colors.P50 },
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
