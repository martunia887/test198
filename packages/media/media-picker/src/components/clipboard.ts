import { Context } from '@atlaskit/media-core';

import { LocalUploadComponent } from './localUpload';
import { whenDomReady } from '../util/documentReady';
import { appendTimestamp } from '../util/appendTimestamp';
import { LocalFileSource, LocalFileWithSource } from '../service/types';
import { Clipboard, ClipboardConfig } from './types';

export const getFilesFromClipboard = (files: FileList) => {
  return Array.from(files).map(file => {
    if (file.type.indexOf('image/') === 0) {
      const name = appendTimestamp(file.name, (file as any).lastModified);
      return new File([file], name, {
        type: file.type,
      });
    } else {
      return file;
    }
  });
};

export class ClipboardImpl extends LocalUploadComponent implements Clipboard {
  static instances: ClipboardImpl[] = [];

  constructor(
    context: Context,
    config: ClipboardConfig = { uploadParams: {} },
  ) {
    super(context, config);
  }

  static get latestInstance(): ClipboardImpl | undefined {
    return ClipboardImpl.instances[ClipboardImpl.instances.length - 1];
  }

  public async activate(): Promise<void> {
    await whenDomReady;

    this.deactivate();
    document.addEventListener('paste', ClipboardImpl.handleEvent);
    ClipboardImpl.instances.push(this);
  }

  public deactivate(): void {
    document.removeEventListener('paste', ClipboardImpl.handleEvent);
    const index = ClipboardImpl.instances.indexOf(this);
    if (index > -1) {
      ClipboardImpl.instances.splice(index, 1);
    }
  }

  public onFilesPasted(files: LocalFileWithSource[]) {
    this.uploadService.addFilesWithSource(files);
  }

  static handleEvent = (event: Event): void => {
    // last in, first served to support multiple instances listening at once
    const instance = ClipboardImpl.latestInstance;
    if (instance) {
      /*
        Browser behaviour for getting files from the clipboard is very inconsistent and buggy.
        @see https://extranet.atlassian.com/display/FIL/RFC+099%3A+Clipboard+browser+inconsistency
      */
      const { clipboardData } = event as ClipboardEvent;

      if (clipboardData && clipboardData.files) {
        const fileSource =
          clipboardData.types.length === 1
            ? LocalFileSource.PastedScreenshot
            : LocalFileSource.PastedFile;
        const filesArray: LocalFileWithSource[] = getFilesFromClipboard(
          clipboardData.files,
        ).map((file: File) => ({ file, source: fileSource }));
        // only the latest instance gets the event
        instance.onFilesPasted.call(instance, filesArray);
      }
    }
  };
}
