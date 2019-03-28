import * as React from 'react';

import { colors } from '@atlaskit/theme';
import { ModalSpinner } from '@atlaskit/media-ui';
import { MediaViewerProps } from './media-viewer';
import {
  withMediaClient,
  WithOptionalMediaClientProps,
} from '@atlaskit/media-client';
import { BaseMediaViewerProps } from './types';

interface State {
  MediaViewer?: React.ComponentType<MediaViewerProps>;
}

export type Props = BaseMediaViewerProps & WithOptionalMediaClientProps;

export class AsyncMediaViewer extends React.PureComponent<Props, State> {
  static displayName = 'AsyncMediaViewer';
  static MediaViewer?: React.ComponentType<MediaViewerProps>;

  state = {
    // Set state value to equal to current static value of this class.
    MediaViewer: AsyncMediaViewer.MediaViewer,
  };

  async componentWillMount() {
    if (!this.state.MediaViewer) {
      const module = await import(/* webpackChunkName:"@atlaskit-internal_media-viewer" */
      './media-viewer');
      AsyncMediaViewer.MediaViewer = module.MediaViewer;
      this.setState({ MediaViewer: module.MediaViewer });
    }
  }

  render() {
    const { mediaClient } = this.props;
    if (!this.state.MediaViewer || !mediaClient) {
      return (
        <ModalSpinner blankedColor={colors.DN30} invertSpinnerColor={true} />
      );
    }

    return <this.state.MediaViewer {...this.props} mediaClient={mediaClient} />;
  }
}

export default withMediaClient(AsyncMediaViewer);
