import { Ordering } from '@appjusto/types';
import { omit, without } from 'lodash';
import { arrayMove } from './utils';

export const addFirstLevel = (ordering: Ordering, firstLevelId: string) => {
  const { firstLevelIds, secondLevelIdsByFirstLevelId } = ordering;
  if (firstLevelIds.indexOf(firstLevelId) !== -1) return ordering;
  return {
    firstLevelIds: [...firstLevelIds, firstLevelId],
    secondLevelIdsByFirstLevelId: {
      ...secondLevelIdsByFirstLevelId,
      [firstLevelId]: [],
    },
  } as Ordering;
};

export const removeFirstLevel = (ordering: Ordering, firstLevelId: string) => {
  const { firstLevelIds, secondLevelIdsByFirstLevelId } = ordering;
  const index = firstLevelIds.indexOf(firstLevelId);
  if (index === -1) return ordering;
  return {
    firstLevelIds: without(ordering.firstLevelIds, firstLevelId),
    secondLevelIdsByFirstLevelId: omit(secondLevelIdsByFirstLevelId, [
      firstLevelId,
    ]),
  } as Ordering;
};

export const updateFirstLevelIndex = (
  ordering: Ordering,
  firstLevelId: string,
  newIndex: number
) => {
  const { firstLevelIds } = ordering;
  const previousIndex = firstLevelIds.indexOf(firstLevelId);
  return {
    ...ordering,
    firstLevelIds: arrayMove<string>(firstLevelIds, previousIndex, newIndex),
  } as Ordering;
};
