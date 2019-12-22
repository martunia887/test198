import { extractPropsFromObject } from '../../extractPropsFromObject';
import { createTestsForObject } from './_createTestsForObject';
import { object } from './_fixtures';

describe('extractPropsFromObject()', () => {
  createTestsForObject(object, extractPropsFromObject);
});
