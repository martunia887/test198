import { ReplaySubject } from 'rxjs/ReplaySubject';
import { sleep } from '@atlaskit/media-test-helpers';
import { observableToPromise } from '../../observableToPromise';

describe('observableToPromise()', () => {
  const createFakeSubject = (unsubscribe: jest.Mock<() => void>): any => ({
    subscribe({ next }: any) {
      setTimeout(next, 0);
      return { unsubscribe };
    },
  });

  it.only('should return current value regardless of being complete', async () => {
    const subject = new ReplaySubject(1);

    subject.next(1);
    subject.next(2);
    expect(await observableToPromise(subject)).toEqual(2);

    subject.next(3);

    await new Promise(resolve => setTimeout(resolve, 1000));
    // subject.next(2);
    // expect(await observableToPromise(subject)).toEqual(2);
  });

  it('should unsubscribe after getting the value', async () => {
    const unsubscribe = jest.fn<() => void, []>();
    const subject = createFakeSubject(unsubscribe);

    await observableToPromise(subject);
    await sleep();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
