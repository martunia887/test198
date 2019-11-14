import { Feature } from '../types';

export interface LastFeatureResponse {
  features: Feature[];
  lastSeen: number | null;
}

export interface WhatIsNewProvider {
  getLastFeatures: () => Promise<LastFeatureResponse>;
}

const uniqueKey = 'what-is-new-in-unkifrltbgfvf';

export function createWhatIsNewProviderFromJson(
  features: Feature[],
): WhatIsNewProvider {
  return {
    async getLastFeatures() {
      const lastSeenStorage = localStorage.getItem(uniqueKey);
      const lastSeen = lastSeenStorage
        ? Number.parseInt(lastSeenStorage, 10)
        : null;
      // update the storage
      localStorage.setItem(uniqueKey, Date.now().toString(10));

      return {
        features,
        lastSeen,
      };
    },
  };
}
