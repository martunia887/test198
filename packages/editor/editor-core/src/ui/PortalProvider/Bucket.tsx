import uuidv1 from 'uuid/v1';

export class Bucket<T> {
  private MAX_SIZE: number;
  private data: Map<string, T>;
  public id: string;
  public isFull: boolean;

  constructor(size: number) {
    this.id = uuidv1('bucket');
    this.isFull = false;
    this.MAX_SIZE = size;
    this.data = new Map<string, T>();
  }

  add(id: string, data: T): void | Error {
    if (this.data.has(id)) {
      // Updating data
      this.data.set(id, data);
      return;
    }

    if (this.isFull) {
      throw new Error('Bucket is full.');
    }

    this.data.set(id, data);

    if (this.data.size === this.MAX_SIZE) {
      this.isFull = true;
    }
  }

  delete(id: string): boolean {
    if (this.data.has(id)) {
      this.data.delete(id);
      if (this.isFull) {
        this.isFull = false;
      }
      return true;
    }
    return false;
  }

  has(id: string) {
    return this.data.has(id);
  }

  get size(): number {
    return this.data.size;
  }

  toArray(): T[] {
    return Array.from(this.data.values());
  }
}

export class BucketArray<T> {
  private MAX_SIZE: number;
  private buckets: Bucket<T>[];

  constructor(size: number, buckets: Bucket<T>[] = []) {
    this.MAX_SIZE = size;
    this.buckets = buckets;
  }

  private getMostEmptyBucket(): Bucket<T> | null {
    return this.reduce<Bucket<T> | null>((prev, current) => {
      if (!current.isFull) {
        if (!prev || current.size < prev.size) {
          return current;
        }
      }

      return prev;
    });
  }

  getBucketContaining(id: string): Bucket<T> | null {
    return this.reduce<Bucket<T> | null>((prev, current) => {
      if (current.has(id)) {
        return current;
      }
      return prev;
    }, null);
  }

  add(id: string, data: T): Bucket<T> {
    let bucket = this.getBucketContaining(id);
    if (!bucket) {
      // If no bucket, means no bucket contain this element, so get the most empty.
      bucket = this.getMostEmptyBucket();
    }

    if (!bucket) {
      // If no bucket we need to create a new one
      bucket = new Bucket<T>(this.MAX_SIZE);
      this.buckets.push(bucket);
    }

    bucket.add(id, data);

    return bucket;
  }

  delete(id: string) {
    for (let bucket of this.buckets) {
      if (bucket.delete(id)) {
        return bucket;
      }
    }
  }

  forEach(cb: (value: Bucket<T>, index: number) => void) {
    this.buckets.forEach(cb);
  }

  reduce<U>(
    cb: (previousValue: U, currentValue: Bucket<T>, currentIndex: number) => U,
    initialValue?: U,
  ): U {
    return this.buckets.reduce(cb, initialValue!);
  }

  filter(cb: (value: Bucket<T>, index: number) => boolean) {
    const buckets = this.buckets.filter(cb);
    return new BucketArray<T>(this.MAX_SIZE, buckets);
  }

  get(position: number | string): Bucket<T> | undefined {
    if (typeof position === 'string') {
      return this.reduce<Bucket<T> | undefined>((prev, current) => {
        if (current.id === position) {
          return current;
        }
      });
    }
    return this.buckets[position as number];
  }

  get size() {
    return this.buckets.length;
  }
}
