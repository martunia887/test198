import React from 'react';
import Avatar from '@atlaskit/avatar';
import { Editor } from '@atlaskit/editor-core';

import { CommentLayout } from '../src';

import avatarImg from './utils/sample-avatar.png';

export default () => (
  <CommentLayout
    avatar={<Avatar src={avatarImg} label="User avatar" size="medium" />}
    content={<Editor appearance="comment" />}
  />
);
