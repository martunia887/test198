/** @jsx jsx */
import Avatar from '@atlaskit/avatar';
import { jsx } from '@emotion/core';
import Item from '../../Item';
import { AccountProps } from './types';

const Account = (props: AccountProps) => {
  const { imgSrc, ...otherProps } = props;
  return (
    <Item appearance="account" text={<Avatar src={imgSrc} />} {...otherProps} />
  );
};

export default Account;
