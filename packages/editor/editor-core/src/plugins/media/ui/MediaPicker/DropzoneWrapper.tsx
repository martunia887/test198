import * as React from 'react';
import { Dropzone } from '@atlaskit/media-picker';

import { MediaPluginState } from '../../pm-plugins/main';

import PickerFacadeProvider from './PickerFacadeProvider';

type Props = {
  mediaState: MediaPluginState;
  isActive: boolean;
};

export const DropzoneWrapper = ({ mediaState, isActive }: Props) => (
  <PickerFacadeProvider mediaState={mediaState} analyticsName="dropzone">
    {({ mediaClientConfig, config, pickerFacadeInstance }) => {
      const {
        options: { customDropzoneContainer },
        handleDrag,
      } = mediaState;

      const dropzoneConfig = {
        ...config,
        container: customDropzoneContainer,
      };

      return isActive ? (
        <Dropzone
          mediaClientConfig={mediaClientConfig}
          config={dropzoneConfig}
          onError={pickerFacadeInstance.handleUploadError}
          onPreviewUpdate={pickerFacadeInstance.handleUploadPreviewUpdate}
          onProcessing={pickerFacadeInstance.handleReady}
          onDragEnter={() => handleDrag('enter')}
          onDragLeave={() => handleDrag('leave')}
        />
      ) : null;
    }}
  </PickerFacadeProvider>
);
