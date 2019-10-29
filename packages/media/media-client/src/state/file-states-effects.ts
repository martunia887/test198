import { Observable } from 'rxjs/Observable';
import { filter, map, mergeMap, tap } from 'rxjs/operators';

import { Action } from './file-states-actions';
import * as actions from './file-states-actions';
import { FileStatesStoreEffect } from './file-states-store';
import { FileState } from '../models/file-state';

export function createDownloadFileStreamEffect(
  createDownloadFileStream: (
    id: string,
    collectionName?: string,
  ) => Observable<FileState>,
): FileStatesStoreEffect {
  return (actions$: Observable<Action>) =>
    actions$.pipe(
      filter(action => action.type === actions.RESOLVE_FILE_STATE_ACTION),
      mergeMap((action: Action) =>
        createDownloadFileStream(
          action.payload.id,
          action.payload.collectionName,
        ).pipe(
          tap(fileState => console.log('Got fileState:', fileState)),
          map(
            fileState =>
              new actions.ResolveFileStateSuccessAction({ fileState }),
          ),
        ),
      ),
    );
}
