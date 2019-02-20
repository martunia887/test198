import { LocalUploadComponent } from './localUpload';
import { MediaClient } from '@atlaskit/media-client';
import { BinaryUploader, BinaryConfig } from './types';

export class BinaryUploaderImpl extends LocalUploadComponent
  implements BinaryUploader {
  constructor(mediaClient: MediaClient, config: BinaryConfig) {
    super(mediaClient, config);
  }

  public upload(base64: string, name: string): void {
    const filename = name || 'file';
    const file = this._urltoFile(base64, filename);
    this.uploadService.addFiles([file]);
  }

  private _urltoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const matches = arr[0].match(/:(.*?);/);

    if (!matches || matches.length < 2) {
      throw new Error('Failed to retrieve file from data URL');
    }

    const mime = matches[1];
    const bstr = atob(arr[1]);

    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const file = new Blob([u8arr], { type: mime }) as any;
    file.name = filename;
    return file;
  }
}
