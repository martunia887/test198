import * as React from 'react';
import { Component } from 'react';
import { Dispatch, Store } from 'redux';
import { connect, Provider } from 'react-redux';
import { IntlShape } from 'react-intl';
import ModalDialog, { ModalTransition } from '@atlaskit/modal-dialog';
import { MediaClient } from '@atlaskit/media-client';
import {
  UIAnalyticsEventHandlerSignature,
  ObjectType,
} from '@atlaskit/analytics-next';

import { ServiceName, State } from '../domain';
import { UploadParams, PopupConfig } from '../..';

/* Components */
import Footer from './footer/footer';
import Sidebar from './sidebar/sidebar';
import UploadView from './views/upload/upload';
import GiphyView from './views/giphy/giphyView';
import Browser from './views/browser/browser';
import { Dropzone as DropzonePlaceholder } from './dropzone/dropzone';
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
  ClipboardConfig,
  DropzoneConfig,
} from '../../components/types';

import { Clipboard } from '../../components/clipboard/clipboard';
import { Dropzone } from '../../components/dropzone/dropzone';
import { Browser as BrowserComponent } from '../../components/browser/browser';

export interface AppStateProps {
  readonly selectedServiceName: ServiceName;
  readonly isVisible: boolean;
  readonly tenantMediaClient: MediaClient;
  readonly userMediaClient: MediaClient;
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
  readonly modalDialogContainer?: HTMLElement;
}

export class App extends Component<AppProps, AppState> {
  private readonly componentMediaClient: MediaClient;
  private browserRef = React.createRef<BrowserComponent>();
  private dropzoneRef = React.createRef<Dropzone>();

  constructor(props: AppProps) {
    super(props);
    const { onStartApp, tenantMediaClient, userMediaClient } = props;

    this.state = {
      isDropzoneActive: false,
    };

    // Context that has both auth providers defined explicitly using to provided contexts.
    // Each of the local components using this context will upload first to user's recents
    // and then copy to a tenant's collection.
    const mediaClient = new MediaClient({
      authProvider: tenantMediaClient.config.authProvider,
      userAuthProvider: userMediaClient.config.authProvider,
      cacheSize: tenantMediaClient.config.cacheSize,
    });

    this.componentMediaClient = mediaClient;

    onStartApp({
      onCancelUpload: uploadId => {
        this.browserRef &&
          this.browserRef.current &&
          this.browserRef.current.cancel(uploadId);
        this.dropzoneRef &&
          this.dropzoneRef.current &&
          this.dropzoneRef.current.cancel(uploadId);
        // this.localUploader.cancel(uploadId);
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

  saveDropzoneContainer = (instance: HTMLElement) => {
    this.setState({
      modalDialogContainer: instance,
    });
  };

  render() {
    const {
      selectedServiceName,
      isVisible,
      onClose,
      store,
      proxyReactContext,
    } = this.props;
    const { isDropzoneActive, modalDialogContainer } = this.state;

    return (
      <ModalTransition>
        {isVisible && (
          <Provider store={store}>
            <ModalDialog onClose={onClose} width="x-large" isChromeless={true}>
              <PassContext store={store} proxyReactContext={proxyReactContext}>
                <MediaPickerPopupWrapper innerRef={this.saveDropzoneContainer}>
                  <SidebarWrapper>
                    <Sidebar />
                  </SidebarWrapper>
                  <ViewWrapper>
                    {this.renderCurrentView(selectedServiceName)}
                    <Footer />
                  </ViewWrapper>
                  <DropzonePlaceholder isActive={isDropzoneActive} />
                  <MainEditorView localUploader={this.localUploader} />
                </MediaPickerPopupWrapper>
                {this.renderClipboard()}
                {modalDialogContainer && this.renderDropZone()}
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
      const { userMediaClient } = this.props;
      return (
        <UploadView
          browserRef={this.browserRef}
          mediaClient={userMediaClient}
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

  private renderClipboard = () => {
    const {
      onUploadPreviewUpdate,
      onUploadStatusUpdate,
      onUploadProcessing,
      onUploadEnd,
      onUploadError,
      tenantUploadParams,
    } = this.props;

    const config: ClipboardConfig = {
      uploadParams: tenantUploadParams,
      shouldCopyFileToRecents: false,
    };

    return (
      <Clipboard
        mediaClient={this.componentMediaClient}
        config={config}
        onUploadsStart={this.onDrop}
        onPreviewUpdate={onUploadPreviewUpdate}
        onStatusUpdate={onUploadStatusUpdate}
        onProcessing={onUploadProcessing}
        onEnd={onUploadEnd}
        onError={onUploadError}
      />
    );
  };

  private renderDropZone = () => {
    const {
      onUploadPreviewUpdate,
      onUploadStatusUpdate,
      onUploadProcessing,
      onUploadEnd,
      onUploadError,
      tenantUploadParams,
    } = this.props;

    const { modalDialogContainer } = this.state;

    if (!modalDialogContainer) {
      return null;
    }

    const config: DropzoneConfig = {
      uploadParams: tenantUploadParams,
      shouldCopyFileToRecents: false,
      container: modalDialogContainer,
    };

    return (
      <Dropzone
        ref={this.dropzoneRef}
        mediaClient={this.componentMediaClient}
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
}

const mapStateToProps = ({
  view,
  tenantMediaClient,
  userMediaClient,
  config,
}: State): AppStateProps => ({
  selectedServiceName: view.service.name,
  isVisible: view.isVisible,
  config,
  tenantMediaClient,
  userMediaClient,
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
