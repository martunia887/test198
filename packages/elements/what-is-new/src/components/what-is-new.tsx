import React, { forwardRef, FunctionComponent, Ref, useState } from 'react';
import Popup from '@atlaskit/popup';

import PremiumIcon from '@atlaskit/icon/glyph/premium';
import Button, { ButtonProps } from '@atlaskit/button';
import Tooltip from '@atlaskit/tooltip';
import { Feature } from '../types';
import { FeatureCard } from './feature-card';

const wrapperCSS = {
  width: 380,
  'max-height': 'calc(100vh - 200px)',
  overflow: 'scroll',
  padding: '18px',
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
      <Tooltip content="What is new?" hideTooltipOnClick position="top">
        <Button
          appearance="primary"
          iconBefore={<PremiumIcon label="What is new?" />}
          ref={ref}
          {...props}
        />
      </Tooltip>
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
