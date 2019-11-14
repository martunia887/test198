import React, {
  forwardRef,
  FunctionComponent,
  Ref,
  useEffect,
  useState,
} from 'react';
import Popup from '@atlaskit/popup';

import PremiumIcon from '@atlaskit/icon/glyph/premium';
import Button, { ButtonProps } from '@atlaskit/button';
import Tooltip from '@atlaskit/tooltip';
import { FeatureCard } from './feature-card';
import {
  LastFeatureResponse,
  WhatIsNewProvider,
} from '../clients/what-is-new-from-json';

const wrapperCSS = {
  width: 380,
  maxHeight: 'calc(100vh - 200px)',
  overflow: 'scroll',
  padding: '18px',
};

const NotificationsContent: FunctionComponent<Pick<
  WhatIsNewProps,
  'whatIsNewProvider'
>> = ({ whatIsNewProvider }) => {
  const [response, setResponse] = useState<LastFeatureResponse | null>(null);

  useEffect(() => {
    async function getFeatures() {
      setResponse(await whatIsNewProvider.getLastFeatures());
    }
    getFeatures();
  }, [whatIsNewProvider]);

  if (!response) {
    return null;
  }

  const { features, lastSeen } = response;

  return (
    <div style={wrapperCSS}>
      {features.map(feature => {
        return (
          <FeatureCard
            feature={feature}
            key={feature.id}
            seen={lastSeen ? feature.date < lastSeen : false}
          />
        );
      })}
    </div>
  );
};

export const WhatIsNewButton = forwardRef(
  (props: ButtonProps & { newItems?: boolean }, ref: Ref<any>) => {
    return (
      <Tooltip content="What is new?" hideTooltipOnClick position="top">
        <Button
          appearance={props.newItems ? 'primary' : 'default'}
          iconBefore={<PremiumIcon label="What is new?" />}
          ref={ref}
          {...props}
        />
      </Tooltip>
    );
  },
);

interface WhatIsNewProps {
  whatIsNewProvider: WhatIsNewProvider;
}

export const WhatIsNew: FunctionComponent<WhatIsNewProps> = ({
  whatIsNewProvider,
}) => {
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
      content={() => (
        <NotificationsContent whatIsNewProvider={whatIsNewProvider} />
      )}
      isOpen={isOpen}
      onClose={onClose}
      trigger={triggerProps => (
        <WhatIsNewButton onClick={onClick} {...triggerProps} />
      )}
    />
  );
};
