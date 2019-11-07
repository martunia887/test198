import { AsapBasedAuth, Auth, AuthProvider, ClientBasedAuth } from './types';

export {
  AsapBasedAuth,
  Auth,
  AuthProvider,
  ClientBasedAuth,
  MediaClientConfig,
  AuthContext,
} from './types'; // Re export to prevent breaking

export interface ClientAltBasedAuth {
  readonly id: string;
  readonly token: string;
  readonly baseUrl: string;
}

export function isClientBasedAuth(auth: Auth): auth is ClientBasedAuth {
  return !!(auth as ClientBasedAuth).clientId;
}

export function isAsapBasedAuth(auth: Auth): auth is AsapBasedAuth {
  return !!(auth as AsapBasedAuth).asapIssuer;
}

export const authToOwner = (auth: Auth): ClientAltBasedAuth | AsapBasedAuth => {
  if (isAsapBasedAuth(auth)) {
    return auth;
  }

  const clientAuth: ClientAltBasedAuth = {
    id: auth.clientId,
    baseUrl: auth.baseUrl,
    token: auth.token,
  };

  return clientAuth;
};

export type MediaApiConfig = {
  authProvider: AuthProvider;
};
