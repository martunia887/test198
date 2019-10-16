import { CollabEditProvider } from '@atlaskit/editor-common';
import createSynchronyProvider from './synchrony-provider';
import { createMockCollabEditProvider } from './mock-collab-provider';

export { createMockCollabEditProvider };

interface Options {
  userId?: string;
  defaultDoc?: string;
  docId?: string;
}

export async function createCollabEditProvider({
  userId,
  defaultDoc,
  docId,
}: Options = {}): Promise<CollabEditProvider> {
  if (SYNCHRONY_URL) {
    const synchronyProvider = await createSynchronyProvider(
      SYNCHRONY_URL,
      docId,
    );
    if (synchronyProvider) {
      return synchronyProvider;
    }
  }

  return createMockCollabEditProvider(userId, defaultDoc);
}
