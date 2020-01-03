import { UploadEvent } from '../../domain/uploadEvent';

export interface LocalUploadFileMetadata {
  readonly id: string;
  readonly mimeType: string;
  readonly name: string;
  readonly size: number;
  readonly occurrenceKey?: string;
}

export interface LocalUploadFile {
  readonly metadata: LocalUploadFileMetadata; // TODO: is this used?
}

export interface LocalUpload {
  readonly file: LocalUploadFile;
  readonly events: UploadEvent[];
  readonly index: number;
  readonly timeStarted: number;

  progress: number | null;
}

export type LocalUploads = { [uploadId: string]: LocalUpload };
