declare var global: any;

import {
  mockFileReader,
  mockFileReaderWithError,
  unmockFileReader,
  mockFileReaderError,
} from '../../test-helpers/mockFileReader';

const GlobalFile = global.File;
const GlobalFileCtor = (blobParts: [], filename: string, flags?: {}) =>
  new GlobalFile(blobParts, filename, flags);

global.File = jest.fn().mockImplementation(GlobalFileCtor);

import {
  dataURItoFile,
  fileToArrayBuffer,
  fileToDataURI,
  getFileInfo,
  loadImage,
  isImageRemote,
} from '../../util';

describe('Image Meta Data Util', () => {
  describe('dataURItoFile()', () => {
    const tinyPngFile = dataURItoFile(
      'data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'filename.png',
    );

    afterEach(() => {
      global.File = jest.fn().mockImplementation(GlobalFileCtor);
    });

    it('should preserve mimeType', () => {
      expect(tinyPngFile.type).toEqual('image/png');
    });

    it('should return a blob with right size', () => {
      expect(tinyPngFile.size).toEqual(42);
    });

    it('should preserve filename', () => {
      expect(tinyPngFile.name).toEqual('filename.png');
    });

    it('should use "untitled" filename if none given', () => {
      expect(dataURItoFile('some-data').name).toEqual('untitled');
    });

    it('should still convert malformed dataURI to File', () => {
      expect(() => dataURItoFile('very-bad-data')).not.toThrow();
    });

    it('should throw message on empty dataURI', () => {
      expect(() => dataURItoFile('')).toThrowError('dataURI not found');
    });

    it('should return File on IE11', () => {
      global.File = jest.fn().mockImplementation(() => {
        throw new Error('No constructor for File on IE11!');
      });
      let file: File | undefined;
      expect(() => (file = dataURItoFile('some-data'))).not.toThrow();
      expect(file && (file as File).name).toBe('untitled');
    });
  });

  describe('fileToDataURI()', () => {
    let fileReader: any;

    beforeEach(() => {
      fileReader = mockFileReader('some-result');
    });

    afterEach(() => {
      unmockFileReader();
    });

    it('should convert File to dataURI', async () => {
      const mockFile = new File([], '');
      const dataURI = await fileToDataURI(mockFile);
      expect(fileReader.addEventListener).toHaveBeenCalledTimes(2);
      expect(fileReader.readAsDataURL).toHaveBeenCalledWith(mockFile);
      expect(dataURI).toEqual('some-result');
    });

    it('should reject if error', async () => {
      mockFileReaderWithError();

      const mockFile = new File([], '');
      await expect(fileToDataURI(mockFile)).rejects.toBe(mockFileReaderError);
    });

    it('should still convert invalid File to dataURI', async () => {
      const badFile = new File([], 'filename', { type: 'bad/type' });
      const dataURI = await fileToDataURI(badFile);
      expect(typeof dataURI).toBe('string');
    });
  });

  describe('fileToArrayBuffer()', () => {
    const file = new File([], 'filename.png', { type: 'image/png' });
    let fileReader: any;

    beforeEach(() => {
      fileReader = mockFileReader(new ArrayBuffer(5));
    });

    afterEach(() => {
      unmockFileReader();
    });

    it('should return a Uint8Array with data from a file with data', async () => {
      const array = await fileToArrayBuffer(file);
      expect(fileReader.readAsArrayBuffer).toHaveBeenCalledWith(file);
      expect(array.length).toBeGreaterThan(0);
    });

    it('should return an empty array from an empty file', async () => {
      fileReader.result = new ArrayBuffer(0);
      const emptyFile = new File([], 'some-filename', { type: 'some-type' });
      const array = await fileToArrayBuffer(emptyFile);
      expect(array).toHaveLength(0);
    });
  });

  describe('getFileInfo()', () => {
    const tinyPngFile = new File([], 'filename.png', { type: 'image/png' });

    it('should return a FileInfo structure with src when passed a File', async () => {
      const fileInfo = await getFileInfo(tinyPngFile);
      const dataURI = await fileToDataURI(tinyPngFile);
      expect(fileInfo.file).toEqual(tinyPngFile);
      expect(fileInfo.src).toEqual(dataURI);
    });

    it('should use passed src instead of generating', async () => {
      const fileInfo = await getFileInfo(tinyPngFile, 'some-dataURI');
      expect(fileInfo.file).toEqual(tinyPngFile);
      expect(fileInfo.src).toEqual('some-dataURI');
    });
  });

  describe('loadImage', () => {
    let globalImage: any = global.Image;

    beforeEach(() => {
      class MockImage extends global.Image {
        constructor() {
          super();
          setImmediate(() => this.onload());
        }
      }
      global.Image = MockImage;
    });

    afterEach(() => {
      global.Image = globalImage;
    });

    it('should return an image async', async () => {
      const img = await loadImage('some-src');
      expect(img.src).toEqual('http://localhost/some-src');
    });
  });

  describe('isImageRemote', () => {
    let globalUrl: any = global.URL;

    class MockURLWithoutHost {}
    class MockURLWithHost {
      host: string = 'some-host';
      origin: string = 'some-origin';
    }

    afterEach(() => {
      global.URL = globalUrl;
    });

    it('should detect remote image when no host', () => {
      global.URL = MockURLWithoutHost;
      const isRemote = isImageRemote('/some/url');
      expect(isRemote).toEqual(false);
    });

    it('should detect remote image with host and different origins', () => {
      global.URL = MockURLWithHost;
      expect(isImageRemote('/some/url')).toEqual(true);
      expect(isImageRemote('/some/url', 'some-origin')).toEqual(false);
    });

    it('should detect remote image when URL is not available', () => {
      global.URL = null;
      expect(isImageRemote('/some/url')).toEqual(true);
    });
  });
});
