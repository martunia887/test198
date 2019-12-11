import React, { Component, RefObject, SyntheticEvent } from 'react';
import { Button } from '../../../../../../core/button/src/components/Button';
import MoreIcon from '@atlaskit/icon/glyph/editor/more';
import { changePanelType } from '../actions';

import { EditorView } from 'prosemirror-view';
import { emoji } from '@atlaskit/util-data-test';
import Popup from '../../../../../editor-common/src/ui/Popup';
import EmojiPicker, {
  EmojiId,
  OptionalEmojiDescription,
  Emoji,
} from '../../../../../../elements/emoji/src';
import { pluginKey as panelPluginKey } from '../pm-plugins/main';
import { getEmojiRepository } from '../../../../../../elements/util-data-test/src/emoji/story-data';

const { getEmojiResource } = emoji.storyData;

export type Props = {
  view?: EditorView<any>;
  idx?: any;
};

export type State = {
  popupIsOpened?: Boolean;
  activeIcon?: string;
};

export default class EmojiPickerButton extends Component<Props, State> {
  buttonRef: RefObject<Button>;
  state = {
    popupIsOpened: false,
    activeIcon: '',
  };

  constructor(props: any) {
    super(props);
    this.buttonRef = React.createRef();
  }

  togglePopup = () => {
    this.setState({ popupIsOpened: !this.state.popupIsOpened });
  };

  componentDidMount() {
    const editorView = this.props.view as EditorView<any>;
    const panelPluginState = panelPluginKey.getState(editorView.state);
    if (panelPluginState.activePanelIcon) {
      this.setState({ activeIcon: panelPluginState.activePanelIcon });
    }
  }

  render() {
    let icon = <MoreIcon label="Select Icon"></MoreIcon>;

    if (this.state.activeIcon) {
      const emojiService = getEmojiRepository();
      const emojiShortName = emojiService.findByShortName(
        this.state.activeIcon,
      );

      icon = <Emoji key={1} emoji={emojiShortName} showTooltip={true} />;
    }
    return (
      <React.Fragment>
        <Button
          spacing="compact"
          style={{ padding: 0, display: 'flex', background: 'none' }}
          onClick={this.togglePopup}
          ref={this.buttonRef}
        >
          {icon}
        </Button>
        {this.renderPopup()}
      </React.Fragment>
    );
  }

  private updateEmoji = (emoji: EmojiId) => {
    const editorView = this.props.view as EditorView<any>;
    this.setState({
      activeIcon: emoji.shortName,
      popupIsOpened: !this.state.popupIsOpened,
    });
    changePanelType('emoji', {
      emoji: emoji,
    })(editorView.state, editorView.dispatch);
  };

  private renderPopup() {
    let target;
    if (this.buttonRef.current && this.buttonRef.current.button) {
      target = (this.buttonRef.current.button as RefObject<HTMLButtonElement>)
        .current as HTMLButtonElement | undefined;
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
        <EmojiPicker
          emojiProvider={emojiProvider}
          onSelection={(emojiId: EmojiId) => {
            this.updateEmoji(emojiId);
          }}
          onPickerRef={() => {}}
        />
      </Popup>
    );
  }
}
