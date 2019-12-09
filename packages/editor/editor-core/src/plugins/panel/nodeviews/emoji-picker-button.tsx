import React, { Component, RefObject } from 'react';
import { Button } from '../../../../../../core/button/src/components/Button';
import EmojiIcon from '@atlaskit/icon/glyph/editor/emoji';
import MoreIcon from '@atlaskit/icon/glyph/editor/more';
import { openEmojiPicker } from '../actions';

import { Emoji } from '../../../../../../elements/emoji/src/element';
import { EditorView } from 'prosemirror-view';
import { emoji } from '@atlaskit/util-data-test';
import Popup from '../../../../../editor-common/src/ui/Popup';
import EmojiPicker from '../../../../../../elements/emoji/src';

const { getEmojiResource } = emoji.storyData;

export type Props = {
  view?: EditorView<any>;
  idx?: any;
};

export type State = {
  popupIsOpened?: Boolean;
};

export default class EmojiPickerButton extends Component<Props, State> {
  buttonRef: RefObject<Button>;
  state = {
    popupIsOpened: false,
  };

  constructor(props: any) {
    super(props);
    this.buttonRef = React.createRef();
    console.log(props);
  }

  togglePopup = () => {
    this.setState({ popupIsOpened: !this.state.popupIsOpened });
  };

  render() {
    return (
      <React.Fragment>
        <Button
          spacing="compact"
          style={{ padding: 0, display: 'flex' }}
          onClick={this.togglePopup}
          ref={this.buttonRef}
        >
          <MoreIcon label="Select Icon"></MoreIcon>
          {/* this component could be used to display selected emoji
                <Emoji key={1} emoji={grimacing} showTooltip={true}/> */}
        </Button>
        {this.renderPopup()}
      </React.Fragment>
    );
  }

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
          onSelection={() => {}}
          onPickerRef={() => {}}
        />
      </Popup>
    );
  }
}
