import * as React from 'react';
import { Component } from 'react';
import { Avatar, AvatarProps, defaultAvatarProps } from './avatar';
import {
  LargeAvatarImage,
  AvatarViewLargeWrapper,
  AvatarViewLargeBottomLine,
} from './styled';

export class AvatarViewLarge extends Component<AvatarProps, {}> {
  static defaultProps = defaultAvatarProps;

  clickHandler = (avatar: Avatar) => () => {
    const { onAvatarSelected } = this.props;
    if (onAvatarSelected) {
      onAvatarSelected(avatar);
    }
  };

  render() {
    const { avatars, selectedAvatar } = this.props;
    const icons: Array<JSX.Element> = avatars.map(
      (avatar: Avatar, i: number) => (
        <LargeAvatarImage
          key={`small-avatar-${i}`}
          src={avatar.dataURI}
          isSelected={avatar === selectedAvatar}
          onClick={this.clickHandler(avatar)}
        />
      ),
    );

    return (
      <>
        <AvatarViewLargeWrapper>{icons}</AvatarViewLargeWrapper>
        <AvatarViewLargeBottomLine />
      </>
    );
  }
}
