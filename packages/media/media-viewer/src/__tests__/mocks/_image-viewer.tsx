import * as React from 'react';
import { MediaClient, ProcessedFileState } from '@atlaskit/media-client';
import {
  AnalyticViewerProps,
  AnalyticsViewerLoadPayload,
} from '../../../src/newgen/analytics/item-viewer';

let _payload: AnalyticsViewerLoadPayload = { status: 'success' };
export const setAnalyticsViewerPayload = (
  payload: AnalyticsViewerLoadPayload,
) => {
  _payload = payload;
};

export type ImageViewerProps = AnalyticViewerProps & {
  mediaClient: MediaClient;
  item: ProcessedFileState;
  collectionName?: string;
  onClose?: () => void;
};

export class ImageViewer extends React.Component<ImageViewerProps, {}> {
  componentDidMount() {
    this.props.onLoad(_payload);
  }

  render() {
    return <div>so empty</div>;
  }
}
