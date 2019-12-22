import { MediaClient } from '@atlaskit/media-client';
import { applyMiddleware, createStore, Store, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { PopupUploadEventEmitter } from '../components/types';
import appConfig from '../config';
import defaultState from '../popup/default_state';
import { State } from '../popup/domain';
import analyticsProcessing from '../popup/middleware/analyticsProcessing';
import cancelUpload from '../popup/middleware/cancelUpload';
import changeAccount from '../popup/middleware/changeAccount';
import { changeCloudAccountFolderMiddleware } from '../popup/middleware/changeCloudAccountFolder';
import { changeService } from '../popup/middleware/changeService';
import { editRemoteImageMiddleware } from '../popup/middleware/editRemoteImage';
import { fetchNextCloudFilesPageMiddleware } from '../popup/middleware/fetchNextCloudFilesPage';
import finalizeUploadMiddleware from '../popup/middleware/finalizeUpload';
import { getConnectedRemoteAccounts } from '../popup/middleware/getConnectedRemoteAccounts';
import { getFilesInRecents } from '../popup/middleware/getFilesInRecents';
import getPreviewMiddleware from '../popup/middleware/getPreview';
import { handleCloudFetchingEvent } from '../popup/middleware/handleCloudFetchingEvent';
import hidePopupMiddleware from '../popup/middleware/hidePopup';
import { importFilesMiddleware } from '../popup/middleware/importFiles';
import { proxyUploadEvents } from '../popup/middleware/proxyUploadEvents';
import { removeFileFromRecents } from '../popup/middleware/removeFileFromRecents';
import searchGiphy from '../popup/middleware/searchGiphy';
import sendUploadEventMiddleware from '../popup/middleware/sendUploadEvent';
import startAppMiddleware from '../popup/middleware/startApp';
import { startCloudAccountOAuthFlow } from '../popup/middleware/startAuth';
import unlinkCloudAccount from '../popup/middleware/unlinkCloudAccount';
import reducers from '../popup/reducers/reducers';
import { CloudService } from '../popup/services/cloud-service';
import { MediaApiFetcher } from '../popup/tools/fetcher/fetcher';
import { WsProvider } from '../popup/tools/websocket/wsProvider';
import { PopupConfig } from '../types';

export default (
  eventEmitter: PopupUploadEventEmitter,
  tenantMediaClient: MediaClient,
  userMediaClient: MediaClient,
  config: Partial<PopupConfig>,
): Store<State> => {
  const userAuthProvider = userMediaClient.config.authProvider;
  const redirectUrl = appConfig.html.redirectUrl;
  const fetcher = new MediaApiFetcher();
  const wsProvider = new WsProvider();
  const cloudService = new CloudService(userAuthProvider);
  const partialState: State = {
    ...defaultState,
    redirectUrl,
    tenantMediaClient,
    userMediaClient,
    config,
  };
  return createStore(
    reducers,
    partialState,
    composeWithDevTools(
      applyMiddleware(
        analyticsProcessing as Middleware,
        startAppMiddleware() as Middleware,
        getFilesInRecents() as Middleware,
        changeService as Middleware,
        changeAccount as Middleware,
        changeCloudAccountFolderMiddleware(fetcher) as Middleware,
        fetchNextCloudFilesPageMiddleware(fetcher) as Middleware,
        startCloudAccountOAuthFlow(fetcher, cloudService) as Middleware,
        unlinkCloudAccount(fetcher) as Middleware,
        getConnectedRemoteAccounts(fetcher) as Middleware,
        cancelUpload as Middleware,
        importFilesMiddleware(eventEmitter, wsProvider),
        editRemoteImageMiddleware() as Middleware,
        getPreviewMiddleware(),
        finalizeUploadMiddleware(),
        proxyUploadEvents as Middleware,
        handleCloudFetchingEvent as Middleware,
        searchGiphy(fetcher) as Middleware,
        hidePopupMiddleware(eventEmitter) as Middleware,
        sendUploadEventMiddleware(eventEmitter),
        removeFileFromRecents as Middleware,
      ),
    ),
  );
};
