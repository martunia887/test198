import { ReplaySubject } from 'rxjs/ReplaySubject';
import { FileState, createFileStateSubject } from '@atlaskit/media-client';

export const baseFileState: FileState = {
  id: '',
  status: 'processing',
  mediaType: 'image',
  mimeType: '',
  name: '',
  size: 0,
};

export const createTestFileStateSubject = (
  initialState?: Partial<FileState>,
): ReplaySubject<FileState> => {
  return createFileStateSubject({
    ...baseFileState,
    ...initialState,
  } as FileState);
};
