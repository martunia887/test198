import { ComponentType } from 'react';

export type ProductProps = {
  /** The product icon. Expected to be an Icon from the Atlaskit Logo package. Visible on smaller screen sizes */
  icon: ComponentType<{
    size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  }>;
  /** The product wordmark, visible on larger screen sizes */
  wordmark: ComponentType<{}>;
};
