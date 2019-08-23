import { JiraSoftwareIcon, JiraSoftwareWordmark } from '@atlaskit/logo';
import React from 'react';
import { ProductHome, ProductHomeProps } from '../src';

export const JiraSoftwareHome = (props: ProductHomeProps) => (
  <ProductHome
    {...props}
    icon={JiraSoftwareIcon}
    wordmark={JiraSoftwareWordmark}
  />
);
