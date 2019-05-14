import * as React from 'react';
import { Component } from 'react';
import { Dispatch, Store } from 'redux';
import { connect, Provider } from 'react-redux';
import { IntlShape } from 'react-intl';
import { Context, ContextFactory } from '@atlaskit/media-core';
import ModalDialog, { ModalTransition } from '@atlaskit/modal-dialog';
import {
  UIAnalyticsEventHandlerSignature,
  ObjectType,
} from '@atlaskit/analytics-next';

import { ServiceName, State } from '../domain';

import { BrowserImpl as MpBrowser } from '../../components/browser';
import { UploadParams, PopupConfig } from '../..';

/* Components */
import Footer from './footer/footer';
import Sidebar from './sidebar/sidebar';
import UploadView from './views/upload/upload';
import GiphyView from './views/giphy/giphyView';
import Browser from './views/browser/browser';
import { Dropzone } from './dropzone/dropzone';
import MainEditorView from './views/editor/mainEditorView';

/* Configs */
import { RECENTS_COLLECTION } from '../config';

/* actions */
import { startApp, StartAppActionPayload } from '../actions/startApp';
import { hidePopup } from '../actions/hidePopup';
import { fileUploadsStart } from '../actions/fileUploadsStart';
import { fileUploadPreviewUpdate } from '../actions/fileUploadPreviewUpdate';
import { fileUploadProgress } from '../actions/fileUploadProgress';
import { fileUploadProcessingStart } from '../actions/fileUploadProcessingStart';
import { fileUploadEnd } from '../actions/fileUploadEnd';
import { fileUploadError } from '../actions/fileUploadError';
import { dropzoneDropIn } from '../actions/dropzoneDropIn';
import { dropzoneDragIn } from '../actions/dropzoneDragIn';
import { dropzoneDragOut } from '../actions/dropzoneDragOut';
import PassContext from './passContext';
import {
  UploadsStartEventPayload,
  UploadPreviewUpdateEventPayload,
  UploadStatusUpdateEventPayload,
  UploadProcessingEventPayload,
  UploadEndEventPayload,
  UploadErrorEventPayload,
} from '../../domain/uploadEvent';
import { MediaPickerPopupWrapper, SidebarWrapper, ViewWrapper } from './styled';
import {
  DropzoneDragEnterEventPayload,
  DropzoneDragLeaveEventPayload,
  DropzoneConfig,
} from '../../components/types';
import { DropzoneReact } from '../../components/dropzoneReact';
import { LocalUploadComponent } from '../../components/localUpload';

export interface AppStateProps {
  readonly selectedServiceName: ServiceName;
  readonly isVisible: boolean;
  readonly tenantContext: Context;
  readonly userContext: Context;
  readonly config?: Partial<PopupConfig>;
}

export interface AppDispatchProps {
  readonly onStartApp: (payload: StartAppActionPayload) => void;
  readonly onClose: () => void;
  readonly onUploadsStart: (payload: UploadsStartEventPayload) => void;
  readonly onUploadPreviewUpdate: (
    payload: UploadPreviewUpdateEventPayload,
  ) => void;
  readonly onUploadStatusUpdate: (
    payload: UploadStatusUpdateEventPayload,
  ) => void;
  readonly onUploadProcessing: (payload: UploadProcessingEventPayload) => void;
  readonly onUploadEnd: (payload: UploadEndEventPayload) => void;
  readonly onUploadError: (payload: UploadErrorEventPayload) => void;
  readonly onDropzoneDragIn: (fileCount: number) => void;
  readonly onDropzoneDragOut: (fileCount: number) => void;
  readonly onDropzoneDropIn: (fileCount: number) => void;
}

export interface AppProxyReactContext {
  getAtlaskitAnalyticsEventHandlers: () => UIAnalyticsEventHandlerSignature[];
  getAtlaskitAnalyticsContext?: () => ObjectType[];
  intl?: IntlShape;
}

export interface AppOwnProps {
  store: Store<State>;
  tenantUploadParams: UploadParams;
  proxyReactContext?: AppProxyReactContext;
}

export type AppProps = AppStateProps & AppOwnProps & AppDispatchProps;

export interface AppState {
  readonly isDropzoneActive: boolean;
}

export class App extends Component<AppProps, AppState> {
  private readonly mpBrowser: MpBrowser;
  private readonly localUploader: LocalUploadComponent;
  private componentContext: Context;

  constructor(props: AppProps) {
    super(props);
    const {
      onStartApp,
      onUploadsStart,
      onUploadPreviewUpdate,
      onUploadStatusUpdate,
      onUploadProcessing,
      onUploadEnd,
      onUploadError,
      tenantContext,
      userContext,
      tenantUploadParams,
    } = props;

    this.state = {
      isDropzoneActive: false,
    };

    // Context that has both auth providers defined explicitly using to provided contexts.
    // Each of the local components using this context will upload first to user's recents
    // and then copy to a tenant's collection.
    const context = ContextFactory.create({
      authProvider: tenantContext.config.authProvider,
      userAuthProvider: userContext.config.authProvider,
      cacheSize: tenantContext.config.cacheSize,
    });

    this.localUploader = new LocalUploadComponent(context, {
      uploadParams: tenantUploadParams,
      shouldCopyFileToRecents: false,
    });

    this.localUploader.on('uploads-start', onUploadsStart);
    this.localUploader.on('upload-preview-update', onUploadPreviewUpdate);
    this.localUploader.on('upload-status-update', onUploadStatusUpdate);
    this.localUploader.on('upload-processing', onUploadProcessing);
    this.localUploader.on('upload-end', onUploadEnd);
    this.localUploader.on('upload-error', onUploadError);

    this.mpBrowser = new MpBrowser(context, {
      uploadParams: tenantUploadParams,
      shouldCopyFileToRecents: false,
      multiple: true,
    });

    this.mpBrowser.on('uploads-start', onUploadsStart);
    this.mpBrowser.on('upload-preview-update', onUploadPreviewUpdate);
    this.mpBrowser.on('upload-status-update', onUploadStatusUpdate);
    this.mpBrowser.on('upload-processing', onUploadProcessing);
    this.mpBrowser.on('upload-end', onUploadEnd);
    this.mpBrowser.on('upload-error', onUploadError);

    this.mpBrowser.on('uploads-start', onUploadsStart);
    this.mpBrowser.on('upload-preview-update', onUploadPreviewUpdate);
    this.mpBrowser.on('upload-status-update', onUploadStatusUpdate);
    this.mpBrowser.on('upload-processing', onUploadProcessing);
    this.mpBrowser.on('upload-end', onUploadEnd);
    this.mpBrowser.on('upload-error', onUploadError);

    this.componentContext = context;

    onStartApp({
      onCancelUpload: uploadId => {
        this.mpBrowser.cancel(uploadId);
        this.localUploader.cancel(uploadId);
      },
    });
  }

  onDragLeave = (payload: DropzoneDragLeaveEventPayload): void => {
    const { onDropzoneDragOut } = this.props;
    onDropzoneDragOut(payload.length);
    this.setDropzoneActive(false);
  };

  onDragEnter = (payload: DropzoneDragEnterEventPayload): void => {
    const { onDropzoneDragIn } = this.props;
    onDropzoneDragIn(payload.length);
    this.setDropzoneActive(true);
  };

  onDrop = (payload: UploadsStartEventPayload): void => {
    const { onDropzoneDropIn, onUploadsStart } = this.props;
    onDropzoneDropIn(payload.files.length);
    onUploadsStart(payload);
  };

  /* componentWillReceiveProps({ isVisible }: Readonly<AppProps>): void {
    if (isVisible !== this.props.isVisible) {
      if (isVisible) {
        this.mpClipboard.activate();
      } else {
        this.mpClipboard.deactivate();
      }
    }
  } */

  componentWillUnmount(): void {
    this.mpBrowser.teardown();
  }

  renderDropZone = () => {
    const {
      onUploadPreviewUpdate,
      onUploadStatusUpdate,
      onUploadProcessing,
      onUploadEnd,
      onUploadError,
      tenantUploadParams,
    } = this.props;

    const config: DropzoneConfig = {
      uploadParams: tenantUploadParams,
      shouldCopyFileToRecents: false,
    };

    return (
      <DropzoneReact
        context={this.componentContext}
        config={config}
        onUploadsStart={this.onDrop}
        onPreviewUpdate={onUploadPreviewUpdate}
        onStatusUpdate={onUploadStatusUpdate}
        onProcessing={onUploadProcessing}
        onEnd={onUploadEnd}
        onError={onUploadError}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
      />
    );
  };

  render() {
    const {
      selectedServiceName,
      isVisible,
      onClose,
      store,
      proxyReactContext,
    } = this.props;
    const { isDropzoneActive } = this.state;

    return (
      <ModalTransition>
        {isVisible && (
          <Provider store={store}>
            <ModalDialog onClose={onClose} width="x-large" isChromeless={true}>
              <PassContext store={store} proxyReactContext={proxyReactContext}>
                <MediaPickerPopupWrapper>
                  <SidebarWrapper>
                    <Sidebar />
                  </SidebarWrapper>
                  <ViewWrapper>
                    {this.renderCurrentView(selectedServiceName)}
                    <Footer />
                  </ViewWrapper>
                  <Dropzone isActive={isDropzoneActive} />
                  <MainEditorView localUploader={this.localUploader} />
                </MediaPickerPopupWrapper>
                {this.renderDropZone()}
              </PassContext>
            </ModalDialog>
          </Provider>
        )}
      </ModalTransition>
    );
  }

  private renderCurrentView(selectedServiceName: ServiceName): JSX.Element {
    if (selectedServiceName === 'upload') {
      // We need to create a new context since Cards in recents view need user auth
      const { userContext } = this.props;
      return (
        <UploadView
          mpBrowser={this.mpBrowser}
          context={userContext}
          recentsCollection={RECENTS_COLLECTION}
        />
      );
    } else if (selectedServiceName === 'giphy') {
      return <GiphyView />;
    } else {
      return <Browser />;
    }
  }

  private setDropzoneActive = (isDropzoneActive: boolean) => {
    this.setState({
      isDropzoneActive,
    });
  };
}

const mapStateToProps = ({
  view,
  tenantContext,
  userContext,
  config,
}: State): AppStateProps => ({
  selectedServiceName: view.service.name,
  isVisible: view.isVisible,
  config,
  tenantContext,
  userContext,
});

const mapDispatchToProps = (dispatch: Dispatch<State>): AppDispatchProps => ({
  onStartApp: (payload: StartAppActionPayload) => dispatch(startApp(payload)),
  onUploadsStart: (payload: UploadsStartEventPayload) =>
    dispatch(fileUploadsStart(payload)),
  onClose: () => dispatch(hidePopup()),
  onUploadPreviewUpdate: (payload: UploadPreviewUpdateEventPayload) =>
    dispatch(fileUploadPreviewUpdate(payload)),
  onUploadStatusUpdate: (payload: UploadStatusUpdateEventPayload) =>
    dispatch(fileUploadProgress(payload)),
  onUploadProcessing: (payload: UploadProcessingEventPayload) =>
    dispatch(fileUploadProcessingStart(payload)),
  onUploadEnd: (payload: UploadEndEventPayload) =>
    dispatch(fileUploadEnd(payload)),
  onUploadError: (payload: UploadErrorEventPayload) =>
    dispatch(fileUploadError(payload)),
  onDropzoneDragIn: (fileCount: number) => dispatch(dropzoneDragIn(fileCount)),
  onDropzoneDragOut: (fileCount: number) =>
    dispatch(dropzoneDragOut(fileCount)),
  onDropzoneDropIn: (fileCount: number) => dispatch(dropzoneDropIn(fileCount)),
});

export default connect<AppStateProps, AppDispatchProps, AppOwnProps, State>(
  mapStateToProps,
  mapDispatchToProps,
)(App);
