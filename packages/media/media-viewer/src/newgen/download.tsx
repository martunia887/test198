import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import {
  WithMediaClientProps,
  FileState,
  isErrorFileState,
  MediaClient,
  FileIdentifier,
} from '@atlaskit/media-client';
import Button from '@atlaskit/button';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import { DownloadButtonWrapper } from './styled';
import {
  downloadButtonEvent,
  downloadErrorButtonEvent,
} from './analytics/download';
import { channel } from './analytics';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
import { MediaViewerError } from './error';

const downloadIcon = <DownloadIcon label="Download" />;

// TODO: MS-1556
export const DownloadButton: any = withAnalyticsEvents({
  onClick: (createEvent: CreateUIAnalyticsEventSignature, props: any) => {
    const ev = createEvent(props.analyticsPayload);
    ev.fire(channel);
  },
})(Button);

export const createItemDownloader = (
  file: FileState,
  mediaClient: MediaClient,
  collectionName?: string,
) => () => {
  const id = file.id;
  const name = !isErrorFileState(file) ? file.name : undefined;
  return mediaClient.file.downloadBinary(id, name, collectionName);
};

export type ErrorViewDownloadButtonProps = {
  state: FileState;
  err: MediaViewerError;
  collectionName?: string;
} & WithMediaClientProps;

export const ErrorViewDownloadButton = (
  props: ErrorViewDownloadButtonProps,
) => {
  const downloadEvent = downloadErrorButtonEvent(props.state, props.err);
  return (
    <DownloadButtonWrapper>
      <DownloadButton
        analyticsPayload={downloadEvent}
        appearance="primary"
        onClick={createItemDownloader(
          props.state,
          props.mediaClient,
          props.collectionName,
        )}
      >
        <FormattedMessage {...messages.download} />
      </DownloadButton>
    </DownloadButtonWrapper>
  );
};

export type ToolbarDownloadButtonProps = Readonly<{
  state: FileState;
  identifier: FileIdentifier;
}> &
  WithMediaClientProps;

export const ToolbarDownloadButton = (props: ToolbarDownloadButtonProps) => {
  const downloadEvent = downloadButtonEvent(props.state);
  return (
    <DownloadButton
      analyticsPayload={downloadEvent}
      appearance={'toolbar' as any}
      onClick={createItemDownloader(
        props.state,
        props.mediaClient,
        props.identifier.collectionName,
      )}
      iconBefore={downloadIcon}
    />
  );
};

export const DisabledToolbarDownloadButton = (
  <Button
    appearance={'toolbar' as any}
    isDisabled={true}
    iconBefore={downloadIcon}
  />
);
