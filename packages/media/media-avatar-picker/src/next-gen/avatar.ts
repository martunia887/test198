export interface Avatar {
  dataURI: string;
}

export interface AvatarProps {
  avatars: Array<Avatar>;
  selectedAvatar?: Avatar;
  onAvatarSelected?: (avatar: Avatar) => void;
}

export const defaultAvatarProps = {
  avatars: [],
};

export interface AvatarImageProps {
  isSelected: boolean;
}
