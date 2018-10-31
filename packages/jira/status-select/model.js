// @flow

export const UNDEFINED: 'UNDEFINED' = 'UNDEFINED';
export const TODO: 'TODO' = 'TODO';
export const IN_PROGRESS: 'IN_PROGRESS' = 'IN_PROGRESS';
export const DONE: 'DONE' = 'DONE';

export type StatusCategory =
  | typeof UNDEFINED
  | typeof TODO
  | typeof IN_PROGRESS
  | typeof DONE;

export const STATUS_CATEGORIES = [UNDEFINED, TODO, IN_PROGRESS, DONE];

const statusCategories: { id: string, statusCategory: StatusCategory }[] = [
  { id: '1', statusCategory: UNDEFINED },
  { id: '2', statusCategory: TODO },
  { id: '4', statusCategory: IN_PROGRESS },
  { id: '3', statusCategory: DONE },
];

export const statusCategoryForId = (
  statusCategoryId: string | number,
): StatusCategory => {
  const value = statusCategories.find(sc => sc.id === String(statusCategoryId));
  return value ? value.statusCategory : UNDEFINED;
};

export const categoryIdForStatusCategory = (
  statusCategory: StatusCategory | void,
): number => {
  const value = statusCategories.find(
    sc => sc.statusCategory === statusCategory,
  );
  return Number(value ? value.id : '1');
};
