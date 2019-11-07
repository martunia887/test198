export interface ClientBasedAuth {
  readonly clientId: string;
  readonly token: string;
  readonly baseUrl: string;
}

export interface AsapBasedAuth {
  readonly asapIssuer: string;
  readonly token: string;
  readonly baseUrl: string;
}

export type Auth = ClientBasedAuth | AsapBasedAuth;

export interface MediaClientConfig {
  readonly authProvider: AuthProvider;
  readonly userAuthProvider?: AuthProvider;
  readonly getAuthFromContext?: AuthFromContextProvider;
}

export interface AuthContext {
  readonly collectionName?: string;
}

export type AuthProvider = (context?: AuthContext) => Promise<Auth>;

export type AuthFromContextProvider = (contextId: string) => Promise<Auth>;
