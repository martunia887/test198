import React, { forwardRef, FunctionComponent, Ref, useState } from 'react';
import Popup from '@atlaskit/popup';

import PremiumIcon from '@atlaskit/icon/glyph/premium';
import Button, { ButtonProps } from '@atlaskit/button';

const wrapperCSS = {
  width: 540,
  height: 'calc(100vh - 200px)',
  paddingTop: 18,
  paddingLeft: 18,
  display: 'flex',
};

const NotificationsContent = () => (
  <div style={wrapperCSS}>Here goes sam cards</div>
);

export const WhatIsNewButton = forwardRef(
  (props: ButtonProps, ref: Ref<any>) => {
    return (
      <Button
        appearance="primary"
        iconBefore={<PremiumIcon label="What is new?" />}
        ref={ref}
        {...props}
      />
    );
  },
);

export const WhatIsNew: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Popup
      placement="bottom-start"
      content={NotificationsContent}
      isOpen={isOpen}
      onClose={onClose}
      trigger={triggerProps => (
        <WhatIsNewButton onClick={onClick} {...triggerProps} />
      )}
    />
  );
};
