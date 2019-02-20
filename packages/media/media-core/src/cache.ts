import { LRUCache } from 'lru-fast';

console.log('mediaState Init');
export const mediaState: any = {
  streams: new LRUCache<string, any>(1000),
  stateDeferreds: new Map<
    string,
    { promise: Promise<any>; resolve: Function; value?: any }
  >(),
};
