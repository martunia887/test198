import { JsonLd, ServerError } from '../../../client/types';
import { getError } from '../helpers';

describe('Helpers', () => {
  it('should detect error type when passed ServerError', () => {
    expect(
      getError(({
        message: 'some-message',
        name: 'some-error',
        resourceUrl: 'some-resourceUrl',
        status: 'some-status',
      } as unknown) as ServerError),
    ).toBe('some-error');
  });

  it('should detect error type when passed JsonLd', () => {
    expect(
      getError(({
        data: {
          error: {
            type: 'some-error',
          },
        },
      } as unknown) as JsonLd),
    ).toBe('some-error');
  });
});
