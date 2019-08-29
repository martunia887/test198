import { ReplaySubject } from 'rxjs/ReplaySubject';

// We can't use observable.toPromise() because it only resolves when the observable completes, which never happens with ReplaySubject
export const observableToPromise = <T>(
  observable: ReplaySubject<T>,
): Promise<T> => {
  return new Promise<T>(resolve => {
    const subscription = observable.subscribe({
      next: state => {
        resolve(state);
        setTimeout(() => subscription.unsubscribe(), 0);
      },
    });
  });
};
