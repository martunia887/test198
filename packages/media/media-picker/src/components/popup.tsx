import { MediaClient } from '@atlaskit/media-client';
import { Store } from 'redux';
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import * as exenv from 'exenv';
import {
  AuthProvider,
  ClientBasedAuth,
  AuthContext,
} from '@atlaskit/media-core';
import App, { AppProxyReactContext } from '../popup/components/app';
import { cancelUpload } from '../popup/actions/cancelUpload';
import { showPopup } from '../popup/actions/showPopup';
import { getFilesInRecents } from '../popup/actions/getFilesInRecents';
import { State } from '../popup/domain';
import { hidePopup } from '../popup/actions/hidePopup';
import { failureErrorLogger } from '../popup/actions/failureErrorLogger';
import { createStore } from '../store';
import { UploadComponent } from './component';

import { defaultUploadParams } from '../domain/uploadParams';
import {
  UploadParams,
  PopupUploadEventPayloadMap,
  Popup,
  PopupConfig,
} from '../types';
import { PopupUploadEventEmitter } from './types';

export interface EdgeData {
  data: {
    clientId: string;
    token: string;
    baseUrl: string;
    expiresIn: number;
    iat: number;
  };
}

export class PopupImpl extends UploadComponent<PopupUploadEventPayloadMap>
  implements PopupUploadEventEmitter, Popup {
  private readonly container?: HTMLElement;
  private readonly store: Store<State>;
  private tenantUploadParams: UploadParams;
  private proxyReactContext?: AppProxyReactContext;

  constructor(
    readonly tenantMediaClient: MediaClient,
    {
      container = exenv.canUseDOM ? document.body : undefined,
      uploadParams, // tenant
      proxyReactContext,
      singleSelect,
    }: PopupConfig,
  ) {
    super();
    this.proxyReactContext = proxyReactContext;

    // TODO: move this into external method
    const userAuthProvider: AuthProvider = async (context?: AuthContext) => {
      try {
        // TODO: use current location.host instead
        const { data }: EdgeData = await (await fetch(
          'https://api-private.stg.atlassian.com/media/auth/smartedge/auth/edge',
          { credentials: 'include' },
        )).json();
        // TODO: handle token expiry
        // TODO: cache token hehehe
        const auth: ClientBasedAuth = {
          clientId: data.clientId,
          token: data.token,
          baseUrl: data.baseUrl,
        };

        return auth;
      } catch (e) {
        const { userAuthProvider } = tenantMediaClient.config;
        if (!userAuthProvider) {
          throw new Error(
            'When using Popup media picker userAuthProvider must be provided in the context',
          );
        }

        return userAuthProvider(context);
      }
    };

    const userMediaClient = new MediaClient({
      authProvider: userAuthProvider,
    });
    const tenantUploadParams = {
      ...defaultUploadParams,
      ...uploadParams,
    };

    this.store = createStore(this, tenantMediaClient, userMediaClient, {
      proxyReactContext,
      singleSelect,
      uploadParams: tenantUploadParams,
    });

    this.tenantUploadParams = tenantUploadParams;

    const popup = this.renderPopup();
    if (!popup) {
      return;
    }

    this.container = popup;
    if (container) {
      container.appendChild(popup);
    }
  }

  public async show(): Promise<void> {
    const { dispatch } = this.store;

    dispatch(getFilesInRecents());
    dispatch(showPopup());
  }

  public async cancel(
    uniqueIdentifier?: string | Promise<string>,
  ): Promise<void> {
    if (!uniqueIdentifier) {
      return;
    }

    this.store.dispatch(
      cancelUpload({ tenantUploadId: await uniqueIdentifier }),
    );
  }

  public teardown(): void {
    if (!this.container) {
      return;
    }

    try {
      unmountComponentAtNode(this.container);
      this.container.remove();
    } catch (error) {
      const { dispatch } = this.store;
      dispatch(
        failureErrorLogger({
          error,
          info: '`ChildNode#remove()` polyfill is not available in client',
        }),
      );
    }
  }

  public hide(): void {
    this.store.dispatch(hidePopup());
  }

  public setUploadParams(uploadParams: UploadParams): void {
    this.tenantUploadParams = {
      ...defaultUploadParams,
      ...uploadParams,
    };
  }

  public emitClosed(): void {
    this.emit('closed', undefined);
  }

  private renderPopup(): HTMLElement | undefined {
    if (!exenv.canUseDOM) {
      return;
    }
    const container = document.createElement('div');

    render(
      <App
        store={this.store}
        proxyReactContext={this.proxyReactContext}
        tenantUploadParams={this.tenantUploadParams}
      />,
      container,
    );
    return container;
  }
}
