import {
  GasCorePayload,
  GasScreenEventPayload,
  UI_EVENT_TYPE,
  EventType,
} from '@atlaskit/analytics-gas-types';
import { Action, MiddlewareAPI } from 'redux';

import { State } from '../../domain';

import changeServiceHandler from './changeServiceHandler';
import editRemoteImageHandler from './editRemoteImageHandler';
import editorCloseHandler from './editorCloseHandler';
import editorShowImageHandler from './editorShowImageHandler';
import failureErrorLoggerHandler from './failureErrorLoggerHandler';
import fileListUpdateHandler from './fileListUpdateHandler';
import handleCloudFetchingEventHandler from './handleCloudFetchingEventHandler';
import hidePopupHandler from './hidePopupHandler';
import searchGiphyHandler from './searchGiphyHandler';
import showPopupHandler from './showPopupHandler';
import startAuthHandler from './startAuthHandler';
import startFileBrowserHandler from './startFileBrowserHandler';
export type BasePayload = GasCorePayload | GasScreenEventPayload;
export type Payload = { action?: string } & BasePayload;
export type HandlerResult = Payload[] | void;
export const buttonClickPayload: GasCorePayload & { action: string } = {
  action: 'clicked',
  actionSubject: 'button',
  eventType: UI_EVENT_TYPE as EventType,
};

export default [
  handleCloudFetchingEventHandler,
  editorCloseHandler,
  editRemoteImageHandler,
  changeServiceHandler,
  hidePopupHandler,
  startAuthHandler,
  startFileBrowserHandler,
  fileListUpdateHandler,
  searchGiphyHandler,
  editorShowImageHandler,
  showPopupHandler,
  failureErrorLoggerHandler,
] as Array<(action: Action, store: MiddlewareAPI<State>) => HandlerResult>;
