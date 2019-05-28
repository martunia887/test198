/** @jsx jsx */
import SignInIcon from '@atlaskit/icon/glyph/sign-in';
import { jsx } from '@emotion/core';
import Item from '../../Item';
import { ProfileProps } from './types';

const Profile = (props: ProfileProps) => {
  // If the user is not signed in, there's nothing to show them.
  if (!props.dropdownContent && !props.drawerContent) {
    return (
      <Item
        appearance="secondary"
        href="/login"
        text={<SignInIcon label="Log in" />}
      />
    );
  }
  return <Item appearance="profile" {...props} />;
};

export default Profile;
