import { Router } from 'kakapo';
import { MediaDatabaseSchema, userAuthProvider } from '../database';

export function createMediaPlaygroundRouter() {
  const router = new Router<MediaDatabaseSchema>(
    {
      host: 'https://api-private.dev.atlassian.com',
      requestDelay: 10,
    },
    { strategies: ['fetch'] },
  );

  router.get(
    '/media-playground/api/token/user/impersonation',
    userAuthProvider,
  );

  return router;
}
