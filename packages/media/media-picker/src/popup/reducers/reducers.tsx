import accountChange from './accountChange';
import accountUnlink from './accountUnlink';
import deselectItem from './deselectItem';
import editorClose from './editorClose';
import editorShowError from './editorShowError';
import editorShowImage from './editorShowImage';
import editorShowLoading from './editorShowLoading';
import fetchNextCloudFilesPage from './fetchNextCloudFilesPage';
import fileClick from './fileClick';
import fileListUpdate from './fileListUpdate';
import filePreviewUpdate from './filePreviewUpdate';
import fileUploadEnd from './fileUploadEnd';
import fileUploadProcessingStart from './fileUploadProcessingStart';
import fileUploadProgress from './fileUploadProgress';
import fileUploadsAdd from './fileUploadsAdd';
import {
  getRecentFilesStarted,
  getRecentFilesFullfilled,
  getRecentFilesFailed,
} from './getFilesInRecents';
import hidePopup from './hidePopup';
import isUploading from './isUploading';
import pathChangeRequest from './pathChangeRequest';
import remoteUploadStart from './remoteUploadStart';
import removeEventProxy from './removeEventProxy';
import removeFileFromRecents from './removeFileFromRecents';
import resetView from './resetView';
import saveCollectionItemsSubscription from './saveCollectionItemsSubscription';
import {
  giphySearchStarted,
  giphySearchFullfilled,
  giphySearchFailed,
} from './searchGiphy';
import serviceConnect from './serviceConnect';
import serviceListUpdate from './serviceListUpdate';
import setEventProxy from './setEventProxy';
import showPopup from './showPopup';
import startApp from './startApp';
import updatePopupUrls from './updatePopupUrls';

const reducers = combineReducers([
  fileClick,
  fileListUpdate,
  pathChangeRequest,
  fetchNextCloudFilesPage,
  serviceListUpdate,
  accountChange,
  serviceConnect,
  accountUnlink,
  getRecentFilesStarted,
  getRecentFilesFullfilled,
  getRecentFilesFailed,
  updatePopupUrls,
  fileUploadsAdd,
  filePreviewUpdate,
  fileUploadProgress,
  fileUploadProcessingStart,
  fileUploadEnd,
  setEventProxy,
  removeEventProxy,
  removeFileFromRecents,
  resetView,
  editorClose,
  editorShowError,
  editorShowImage,
  editorShowLoading,
  deselectItem,
  isUploading,
  remoteUploadStart,
  giphySearchStarted,
  giphySearchFullfilled,
  giphySearchFailed,
  showPopup,
  hidePopup,
  startApp,
  saveCollectionItemsSubscription,
]);

function combineReducers(reducers: any) {
  return (state: any, action: any) => {
    return reducers.reduce(
      (oldState: any, reducer: any) => {
        return reducer(oldState, action);
      },
      { ...state },
    );
  };
}

export default reducers;
