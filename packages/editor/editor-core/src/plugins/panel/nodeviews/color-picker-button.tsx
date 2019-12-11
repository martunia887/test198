import TextColorIcon from '@atlaskit/icon/glyph/editor/text-color';

import React, { Component, RefObject } from 'react';
import EmojiIcon from '@atlaskit/icon/glyph/editor/emoji';
import MoreIcon from '@atlaskit/icon/glyph/editor/more';

import { EditorView } from 'prosemirror-view';
import { emoji } from '@atlaskit/util-data-test';
import Popup from '../../../../../editor-common/src/ui/Popup';
import ColorPicker from './../../../../../../jira/color-picker/src/components/ColorPicker';
import { Button } from '../../../../../../core/button/src/components/Button';

const { getEmojiResource } = emoji.storyData;

import { colors } from '@atlaskit/theme';
import ToolbarTextColor from '../../text-color/ui/ToolbarTextColor';
import { PanelState } from '../pm-plugins/main';
import {
  TextColorPluginState,
  pluginKey as textColorPluginKey,
} from '../../../../src/plugins/text-color/pm-plugins/main';
import { pluginKey as panelPluginKey } from '../pm-plugins/main';
import { changePanelType } from '../actions';
import { PanelType } from '../../../../../adf-schema/src';

const simplePalette = [
  {
    label: 'Purple',
    value: colors.P200,
  },
  {
    label: 'Blue',
    value: colors.B200,
  },
  {
    label: 'Green',
    value: colors.G200,
  },
  {
    label: 'Teal',
    value: colors.T200,
  },
  {
    label: 'Yellow',
    value: colors.Y200,
  },
  {
    label: 'Red',
    value: colors.R200,
  },
];

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
    if (this.buttonRef.current && this.buttonRef.current.button) {
      target = (this.buttonRef.current.button as RefObject<HTMLButtonElement>)
        .current as HTMLButtonElement;
    }
    const editorView = this.props.view as EditorView<any>;

    const textColorPluginState = textColorPluginKey.getState(editorView.state);
    return (
      <React.Fragment>
        {/* <Button spacing="compact" onClick={this.togglePopup} ref={this.buttonRef}> </Button> */}
        {/* <TextColorIcon label='color'></TextColorIcon> */}

        {/* <ToolbarTextColor
            pluginState={textColorPluginState}
            isReducedSpacing={true}
            editorView={editorView}
            popupsMountPoint={target}
            popupsBoundariesElement={document.body}
            popupsScrollableElement={document.body}
        ></ToolbarTextColor> */}

        <ColorPicker
          style={{ height: '24px' }}
          label="Change color"
          palette={simplePalette}
          selectedColor={this.state.selectedColor}
          onChange={(newColor: string) => {
            this.setState({ selectedColor: newColor });
            this.updateColor(newColor);
          }}
        />

        {/* {this.renderPopup()} */}
      </React.Fragment>
    );
  }

  private updateColor = (color: string) => {
    const editorView = this.props.view as EditorView<any>;

    changePanelType(undefined, {
      color: color,
    })(editorView.state, editorView.dispatch);
  };

  private renderPopup() {
    let target;
    if (this.buttonRef.current && this.buttonRef.current.button) {
      target = (this.buttonRef.current.button as RefObject<HTMLButtonElement>)
        .current as HTMLButtonElement;
    }
    const emojiProvider = getEmojiResource();
    if (!this.state.popupIsOpened || !emojiProvider) {
      return null;
    }

    return (
      <Popup
        target={target}
        fitHeight={350}
        fitWidth={350}
        offset={[0, 3]}
        mountTo={document.body}
        boundariesElement={document.body}
        scrollableElement={document.body}
      >
        {/* color picker could be here */}
      </Popup>
    );
  }
}
