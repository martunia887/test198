import { isEmptyFile } from '../../../../newgen/analytics/item-viewer';

describe('Item Viewer Analytics', () => {
  it('should not detect empty file when no filestate given', () => {
    expect(isEmptyFile(undefined)).toBeFalsy();
  });

  it('should detect empty file when given empty processing filestate', () => {
    expect(
      isEmptyFile({
        status: 'processing',
      } as any),
    ).toBeTruthy();
  });

  it('should not detect empty file when given empty but non-processing filestate', () => {
    expect(
      isEmptyFile({
        status: 'processed',
      } as any),
    ).toBeFalsy();
  });
});
