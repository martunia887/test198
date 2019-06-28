import { MediaClient } from '@atlaskit/media-client';
import { Store } from 'redux';
import * as React from 'react';
import * as exenv from 'exenv';
import App, { AppProxyReactContext } from '../../popup/components/app';
import { cancelUpload } from '../../popup/actions/cancelUpload';
import { showPopup } from '../../popup/actions/showPopup';
import { resetView } from '../../popup/actions/resetView';
import { getFilesInRecents } from '../../popup/actions/getFilesInRecents';
import { State } from '../../popup/domain';
import { hidePopup } from '../../popup/actions/hidePopup';
import { createStore } from '../../store';

import { defaultUploadParams } from '../../domain/uploadParams';
import { UploadParams } from '../../domain/config';
import { PopupUploadEventPayloadMap, PopupConfig } from '../types';
import {
  LocalUploadComponentReact,
  LocalUploadComponentBaseProps,
} from '../localUploadReact';
import ReactDOM from 'react-dom';

export type PopupProps = LocalUploadComponentBaseProps & {
  config: PopupConfig;
  isOpen: boolean;
  onCancelFn: (
    cancel: (uniqueIdentifier?: string | Promise<string>) => Promise<void>,
  ) => void;
};

export class Popup extends LocalUploadComponentReact<
  PopupProps,
  PopupUploadEventPayloadMap
> {
  private readonly store: Store<State>;
  private tenantUploadParams: UploadParams;
  private proxyReactContext?: AppProxyReactContext;

  constructor(props: PopupProps) {
    super(props);
    const {
      mediaClient: tenantMediaClient,
      config: {
        uploadParams, // tenant
        proxyReactContext,
        singleSelect,
      },
    } = props;

    this.proxyReactContext = proxyReactContext;

    const { userAuthProvider, cacheSize } = tenantMediaClient.config;
    if (!userAuthProvider) {
      throw new Error(
        'When using Popup media picker userAuthProvider must be provided in the context',
      );
    }

    const userMediaClient = new MediaClient({
      cacheSize,
      authProvider: userAuthProvider,
    });
    const tenantUploadParams = {
      ...defaultUploadParams,
      ...uploadParams,
    };

    this.store = createStore(
      this.uploadComponent,
      tenantMediaClient,
      userMediaClient,
      {
        proxyReactContext,
        singleSelect,
        uploadParams: tenantUploadParams,
      },
    );

    this.tenantUploadParams = tenantUploadParams;
  }

  componentDidMount() {
    const { onCancelFn } = this.props;

    if (onCancelFn) {
      onCancelFn(async uniqueIdentifier => {
        if (!uniqueIdentifier) {
          return;
        }

        this.store.dispatch(
          cancelUpload({ tenantUploadId: await uniqueIdentifier }),
        );
      });
    }
  }

  componentWillReceiveProps(nextProps: PopupProps) {
    const { dispatch } = this.store;
    if (nextProps.isOpen && !this.props.isOpen) {
      dispatch(resetView());
      dispatch(getFilesInRecents());
      dispatch(showPopup());
    } else if (!nextProps.isOpen && this.props.isOpen) {
      dispatch(hidePopup());
    }
  }

  render() {
    const {
      config: { container = exenv.canUseDOM ? document.body : undefined },
    } = this.props;

    if (!container) {
      return null;
    }

    return ReactDOM.createPortal(
      <App
        store={this.store}
        proxyReactContext={this.proxyReactContext}
        tenantUploadParams={this.tenantUploadParams}
        {...this.props}
      />,
      container,
    );
  }
}
