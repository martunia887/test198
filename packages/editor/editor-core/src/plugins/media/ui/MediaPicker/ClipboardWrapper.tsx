import * as React from 'react';
import { Clipboard } from '@atlaskit/media-picker';

import { MediaPluginState } from '../../pm-plugins/main';

import PickerFacadeProvider from './PickerFacadeProvider';

type Props = {
  mediaState: MediaPluginState;
};

export const ClipboardWrapper = ({ mediaState }: Props) => (
  <PickerFacadeProvider mediaState={mediaState} analyticsName="clipboard">
    {({ mediaClientConfig, config, pickerFacadeInstance }) => (
      <Clipboard
        mediaClientConfig={mediaClientConfig}
        config={config}
        onError={pickerFacadeInstance.handleUploadError}
        onPreviewUpdate={pickerFacadeInstance.handleUploadPreviewUpdate}
        onProcessing={pickerFacadeInstance.handleReady}
      />
    )}
  </PickerFacadeProvider>
);
