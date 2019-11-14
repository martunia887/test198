import React, { FunctionComponent } from 'react';
import PremiumIcon from '@atlaskit/icon/glyph/premium';
import Button from '@atlaskit/button';

export const WhatIsNew: FunctionComponent = () => {
  return <Button iconAfter={<PremiumIcon label="What is new?" />} />;
};
