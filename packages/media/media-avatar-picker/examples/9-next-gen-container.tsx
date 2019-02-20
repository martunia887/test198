import * as React from 'react';
import { AvatarPickerExample } from '../example-helpers/stateful-avatar-picker-example';
import { Avatar } from '../src/next-gen';
import { generateAvatars } from '../example-helpers';

const avatars: Array<Avatar> = generateAvatars(30);

export default () => (
  <AvatarPickerExample
    mode="container"
    containerWidth={200}
    containerHeight={200}
    avatars={avatars}
    selectedAvatar={avatars[0]}
  />
);
