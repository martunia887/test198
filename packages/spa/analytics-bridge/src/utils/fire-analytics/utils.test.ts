import { getImperativeAnalyticsDataFromArguments } from './utils';

const attrs = { something: true };
const invalidCases = [
  ['submitButton', 'button clicked'],
  ['button clicked', 'submitButton', 'something'],
  ['button clicked', attrs, attrs],
  ['button clicked', attrs, 'submitButton'],
  [attrs, 'button clicked', 'submitButton'],
];
const validCases = [
  [
    [],
    {
      actionSubject: undefined,
      action: undefined,
      actionSubjectId: undefined,
      attributes: undefined,
    },
  ],
  [
    ['button clicked', 'submitButton'],
    {
      actionSubject: 'button',
      action: 'clicked',
      actionSubjectId: 'submitButton',
      attributes: undefined,
    },
  ],
  [
    ['button clicked'],
    {
      actionSubject: 'button',
      action: 'clicked',
      actionSubjectId: undefined,
      attributes: undefined,
    },
  ],
  [
    ['submitButton'],
    {
      actionSubject: undefined,
      action: undefined,
      actionSubjectId: 'submitButton',
      attributes: undefined,
    },
  ],
  [
    ['button clicked', 'submitButton', attrs],
    {
      actionSubject: 'button',
      action: 'clicked',
      actionSubjectId: 'submitButton',
      attributes: attrs,
    },
  ],
  [
    ['button clicked', attrs],
    {
      actionSubject: 'button',
      action: 'clicked',
      actionSubjectId: undefined,
      attributes: attrs,
    },
  ],
  [
    ['submitButton', attrs],
    {
      actionSubject: undefined,
      action: undefined,
      actionSubjectId: 'submitButton',
      attributes: attrs,
    },
  ],
  [
    [attrs],
    {
      actionSubject: undefined,
      action: undefined,
      actionSubjectId: undefined,
      attributes: attrs,
    },
  ],
];

describe('transform arguments', () => {
  test('test valid cases', () => {
    validCases.forEach(validCase => {
      expect(
        // @ts-ignore we deliberately violate type checking here
        getImperativeAnalyticsDataFromArguments(validCase[0]),
      ).toEqual(validCase[1]);
    });
  });

  test('invalid cases', () => {
    invalidCases.forEach(invalidCase => {
      expect(() => {
        // @ts-ignore we deliberately violate type checking here
        getImperativeAnalyticsDataFromArguments(invalidCase[0]);
      }).toThrow();
    });
  });
});
