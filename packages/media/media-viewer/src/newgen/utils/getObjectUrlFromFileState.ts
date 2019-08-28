import { FileState } from '@atlaskit/media-client';

export const getObjectUrlFromFileState = async (
  state: FileState,
): Promise<string | undefined> => {
  if (state.status !== 'error') {
    const { preview } = state;
    if (preview) {
      const value = (await preview).value;
      if (typeof value === 'string') {
        return value;
      }

      return URL.createObjectURL(value);
    }
  }
  return undefined;
};
