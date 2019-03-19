import { EventDispatcher } from '../../event-dispatcher';
import { BucketArray, Bucket } from './Bucket';
import { Portal, RenderFunction, Portals } from './types';

const MAX_BUCKET_SIZE = 10;

export default class PortalProviderAPI extends EventDispatcher {
  portals: Portals = new Map();
  context: any;
  buckets: BucketArray<Portal> = new BucketArray<Portal>(MAX_BUCKET_SIZE);

  setContext = (context: any) => {
    this.context = context;
  };

  getBucketById(bucketId: string): Bucket<Portal> | undefined {
    return this.buckets.get(bucketId);
  }

  render = (renderFn: RenderFunction, container: HTMLElement, id: string) => {
    const portal = {
      id,
      render: renderFn,
      container,
    };

    const originalBucketsSize = this.buckets.size;
    const bucket = this.buckets.add(id, portal);

    // Do a better implementation
    if (this.buckets.size > originalBucketsSize) {
      this.emit('new:bucket', bucket.id);
    }

    if (bucket) {
      this.emit(`update:bucket:${bucket.id}`, bucket.toArray());
    }
    console.log(this.buckets);
  };

  // TODO: until https://product-fabric.atlassian.net/browse/ED-5013
  // we (unfortunately) need to re-render to pass down any updated context.
  // selectively do this for nodeviews that opt-in via `hasReactContext`
  forceUpdate() {
    // TODO: legacu
  }

  remove = (container: HTMLElement, id: string) => {
    const bucket = this.buckets.delete(id);
    if (bucket) {
      this.emit(`update:bucket:${bucket.id}`, bucket.toArray());
    }
  };
}
