import React, { forwardRef, FunctionComponent, Ref, useState } from 'react';
import Popup from '@atlaskit/popup';

import PremiumIcon from '@atlaskit/icon/glyph/premium';
import Button, { ButtonProps } from '@atlaskit/button';
import { Feature } from '../types';
import { FeatureCard } from './feature-card';

const wrapperCSS = {
  width: 540,
  height: 'calc(100vh - 200px)',
  paddingTop: 18,
  paddingLeft: 18,
  display: 'flex',
};

const NotificationsContent: FunctionComponent<Pick<
  WhatIsNewProps,
  'features'
>> = ({ features }) => (
  <div style={wrapperCSS}>
    {features.map(feature => {
      return <FeatureCard feature={feature} key={feature.id} />;
    })}
  </div>
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

interface WhatIsNewProps {
  features: Feature[];
}

export const WhatIsNew: FunctionComponent<WhatIsNewProps> = ({ features }) => {
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
      content={() => <NotificationsContent features={features} />}
      isOpen={isOpen}
      onClose={onClose}
      trigger={triggerProps => (
        <WhatIsNewButton onClick={onClick} {...triggerProps} />
      )}
    />
  );
};
