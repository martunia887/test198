import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { FileStates } from './file-state';

export function getFileState(id: string) {
  return (fileStates$: Observable<FileStates>) =>
    fileStates$.pipe(
      map(fileStates => fileStates[id]),
      distinctUntilChanged(),
    );
}
