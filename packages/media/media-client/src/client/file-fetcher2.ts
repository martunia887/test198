import { Observable } from 'rxjs/Observable';

import { MediaStore, FileState, GetFileOptions } from '..';

import { FileFetcherImpl } from './file-fetcher';
import { ResolveFileStateAction } from '../state/file-states-actions';
import { createDownloadFileStreamEffect } from '../state/file-states-effects';
import { FileStatesStore } from '../state/file-states-store';
import { getFileState } from '../models/file-states-selectors';

export class FileFetcherImpl2 extends FileFetcherImpl {
  private fileStatesStore$: FileStatesStore;

  constructor(private readonly mediaStore2: MediaStore) {
    super(mediaStore2);

    this.fileStatesStore$ = new FileStatesStore(
      createDownloadFileStreamEffect(this.createDownloadFileStream),
    );
  }

  public getFileState(
    id: string,
    options?: GetFileOptions,
  ): Observable<FileState> {
    this.fileStatesStore$.next(
      new ResolveFileStateAction({
        id,
        collectionName: options && options.collectionName,
      }),
    );

    return this.fileStatesStore$.select(getFileState(id));
  }
}
