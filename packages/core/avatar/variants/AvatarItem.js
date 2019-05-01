// @flow
import React from 'react';
import Avatar, { AvatarItem } from '../src';
import { RANDOM_USERS, getAdorableAvatar } from '../examples-util/data';

export default () => {
  const data = RANDOM_USERS.slice(0, 10).map(user => ({
    ...user,
    src: getAdorableAvatar(user.email),
  }));

  return (
    <div style={{ maxWidth: 270 }}>
      {data.map(user => (
        <AvatarItem
          avatar={<Avatar src={user.src} />}
          key={user.email}
          onClick={() => {}}
          primaryText={user.name}
          secondaryText={user.email}
        />
      ))}
    </div>
  );
};
