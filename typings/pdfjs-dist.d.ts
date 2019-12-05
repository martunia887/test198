declare module 'pdfjs-dist/*';

declare type PDFDocumentProxy = {
  readonly loadingTask?: PDFLoadingTask;
  readonly destroy: () => void;
};

declare type PDFLoadingTask = {
  onProgress?: (progress: { loaded: number; total: number }) => void;
  readonly destroyed: boolean;
  readonly promise: Promise<PDFDocumentProxy>;
};
