import * as React from 'react';
import { Component } from 'react';
import { Avatar, AvatarProps, defaultAvatarProps } from './common';
import { ShowMoreButton } from './showMoreButton';
import {
  SmallAvatarImage,
  AvatarViewSmallWrapper,
  AvatarViewSmallDisabled,
} from './styled';

const MAX_VISIBLE = 5;

export interface AvatarViewSmallProps extends AvatarProps {
  isDisabled: boolean;
  onShowMore: () => void;
}

export class AvatarViewSmall extends Component<AvatarViewSmallProps, {}> {
  static defaultProps = {
    ...defaultAvatarProps,
    isDisabled: false,
  };

  getVisibleAvatars(): Array<Avatar> {
    const visibleAvatars: Array<Avatar> = [];
    const { avatars, selectedAvatar } = this.props;
    if (avatars && selectedAvatar) {
      const selectedIndex = avatars.indexOf(selectedAvatar);
      if (selectedIndex >= MAX_VISIBLE) {
        visibleAvatars.splice(1, 0, ...avatars.slice(0, MAX_VISIBLE - 1));
        visibleAvatars.push(selectedAvatar);
      } else {
        visibleAvatars.splice(0, 0, ...avatars.slice(0, MAX_VISIBLE));
      }
    } else {
      if (avatars) {
        visibleAvatars.splice(0, 0, ...avatars.slice(0, MAX_VISIBLE));
      }
    }
    return visibleAvatars;
  }

  clickHandler = (avatar: Avatar) => () => {
    const { onAvatarSelected } = this.props;
    if (onAvatarSelected) {
      onAvatarSelected(avatar);
    }
  };

  render() {
    const { avatars, selectedAvatar, isDisabled, onShowMore } = this.props;

    if (!avatars) {
      return null;
    }

    const visibleAvatars = this.getVisibleAvatars();
    const icons: Array<JSX.Element> = visibleAvatars.map(
      (avatar: Avatar, i: number) => (
        <SmallAvatarImage
          key={`small-avatar-${i}`}
          isSelected={avatar === selectedAvatar}
          src={avatar.dataURI}
          onClick={this.clickHandler(avatar)}
        />
      ),
    );

    return (
      <AvatarViewSmallWrapper>
        {icons}
        <ShowMoreButton onClick={onShowMore} />
        {isDisabled ? <AvatarViewSmallDisabled /> : null}
      </AvatarViewSmallWrapper>
    );
  }
}
