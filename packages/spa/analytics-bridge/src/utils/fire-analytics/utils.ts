import { AnalyticsAttributes, ImperativeAnalyticsData } from '../../types';

type Argument = string | AnalyticsAttributes;

export type Arguments =
  | []
  | [string]
  | [string, string]
  | [AnalyticsAttributes]
  | [string, AnalyticsAttributes]
  | [string, string, AnalyticsAttributes];

const extractDataFromStringAttribute = (
  string: string,
): ImperativeAnalyticsData => {
  const arr = string.split(' ');

  switch (arr.length) {
    case 1:
      return {
        actionSubject: undefined,
        action: undefined,
        actionSubjectId: arr[0],
        attributes: undefined,
      };
    case 2:
      return {
        actionSubject: arr[0],
        action: arr[1],
        actionSubjectId: undefined,
        attributes: undefined,
      };
    default:
      throw Error('Event of this type is not supported');
  }
};

const extractDataFromOneAttribute = (
  one: Argument,
): ImperativeAnalyticsData => {
  if (typeof one === 'string') {
    return extractDataFromStringAttribute(one);
  }

  if (typeof one === 'object') {
    return {
      actionSubject: undefined,
      action: undefined,
      actionSubjectId: undefined,
      attributes: one,
    };
  }

  throw Error('Event of this type is not supported');
};

const extractDataFromTwoAttribute = (
  one: Argument,
  two: Argument,
): ImperativeAnalyticsData => {
  if (typeof one === 'string' && typeof two === 'string') {
    const { action, actionSubject } = extractDataFromStringAttribute(one);
    const actionSubjectId = two;
    return {
      actionSubject,
      action,
      actionSubjectId,
      attributes: undefined,
    };
  }

  if (typeof one === 'string' && typeof two === 'object') {
    const {
      action,
      actionSubject,
      actionSubjectId,
    } = extractDataFromStringAttribute(one);
    return {
      actionSubject,
      action,
      actionSubjectId,
      attributes: two,
    };
  }

  throw Error('Event of this type is not supported');
};

const extractDataFromThreeAttribute = (
  one: Argument,
  two: Argument,
  three: Argument,
): ImperativeAnalyticsData => {
  if (
    typeof one === 'string' &&
    typeof two === 'string' &&
    typeof three === 'object'
  ) {
    const { action, actionSubject } = extractDataFromStringAttribute(one);
    const actionSubjectId = two;
    return {
      actionSubject,
      action,
      actionSubjectId,
      attributes: three,
    };
  }

  throw Error('Event of this type is not supported');
};

export const getImperativeAnalyticsDataFromArguments = (
  args: Arguments,
): ImperativeAnalyticsData => {
  switch (args.length) {
    case 0:
      return {
        actionSubject: undefined,
        action: undefined,
        actionSubjectId: undefined,
        attributes: undefined,
      };
    case 1:
      return extractDataFromOneAttribute(args[0]);
    case 2:
      return extractDataFromTwoAttribute(args[0], args[1]);
    case 3:
      return extractDataFromThreeAttribute(args[0], args[1], args[2]);
    default:
      throw Error('Can not fire an empty event');
  }
};
