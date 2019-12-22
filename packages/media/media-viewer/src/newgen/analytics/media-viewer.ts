import { GasScreenEventPayload } from '@atlaskit/analytics-gas-types';
import { packageAttributes } from './index';

export const mediaViewerModalEvent = (): GasScreenEventPayload => {
  return {
    eventType: 'screen',
    name: 'mediaViewerModal',
    attributes: {
      ...packageAttributes,
    },
  };
};
