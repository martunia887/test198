import { CollabEditProvider } from '@atlaskit/editor-common';
import { createMockCollabEditProvider } from './mock-collab-provider';
import createSynchronyProvider from './synchrony-provider';

export { createMockCollabEditProvider };

export interface CreateCollabProviderOptions {
  userId?: string;
  defaultDoc?: string;
  docId?: string;
}

export async function createCollabEditProvider(
  options?: CreateCollabProviderOptions,
): Promise<CollabEditProvider> {
  const { userId, defaultDoc } = options || {};
  if (SYNCHRONY_URL) {
    const synchronyProvider = await createSynchronyProvider(SYNCHRONY_URL);
    if (synchronyProvider) {
      return synchronyProvider;
    }
  }

  return createMockCollabEditProvider(userId, defaultDoc);
}
