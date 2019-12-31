import { SCREEN } from '../../constants';

import { extractContextualData } from './index';

describe('extractContextualData', () => {
  test('should filter out undefined values', () => {
    const obj = { containerType: 'x', objectType: undefined };
    expect(extractContextualData(obj)).toEqual({ containerType: 'x' });
  });

  test('should merge sourceName and sourceType', () => {
    const obj = { sourceName: 'foo', sourceType: SCREEN };
    expect(extractContextualData(obj)).toEqual({ source: 'nameScreen' });
  });

  test('source should be undefined if there is a piece missing', () => {
    expect(extractContextualData({ sourceName: 'name' })).toEqual({
      source: undefined,
    });
    expect(extractContextualData({ sourceType: SCREEN })).toEqual({
      source: undefined,
    });
  });
});
