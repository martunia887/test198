import * as React from 'react';
import { Browser } from '@atlaskit/media-picker';

import { MediaPluginState } from '../../pm-plugins/main';

import PickerFacadeProvider from './PickerFacadeProvider';

type Props = {
  mediaState: MediaPluginState;
  isOpen?: boolean;
  onBrowseFn: (browse: () => void) => void;
};

export const BrowserWrapper = ({ mediaState, isOpen, onBrowseFn }: Props) => (
  <PickerFacadeProvider mediaState={mediaState} analyticsName="browser">
    {({ mediaClientConfig, config, pickerFacadeInstance }) => (
      <Browser
        onBrowseFn={onBrowseFn}
        isOpen={isOpen}
        config={config}
        mediaClientConfig={mediaClientConfig}
        onProcessing={pickerFacadeInstance.handleReady}
        onError={pickerFacadeInstance.handleUploadError}
        onPreviewUpdate={pickerFacadeInstance.handleUploadPreviewUpdate}
      />
    )}
  </PickerFacadeProvider>
);
