import { createContext } from 'react';
import { MediaClientConfig } from '.';

const defaultValue: MediaClientConfig = {
  authProvider: () => Promise.reject("AuthProvider hasn't been defined"),
};

export const MediaClientConfigContext = createContext<
  MediaClientConfig | undefined
>(defaultValue);
