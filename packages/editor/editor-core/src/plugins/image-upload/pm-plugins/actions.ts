import { Transaction } from 'prosemirror-state';
import { ImageUploadPluginAction } from '../types';
import { stateKey } from './main';

const imageUploadAction = (
  tr: Transaction,
  action: ImageUploadPluginAction,
): Transaction => {
  return tr.setMeta(stateKey, action);
};

export const startUpload = (event: any) => (tr: Transaction) =>
  imageUploadAction(tr, {
    name: 'START_UPLOAD',
    event,
  });
