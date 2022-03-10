import { WithId } from '@appjusto/types';
import { without } from 'lodash';
import { Ordering } from './types';
import { arrayMove } from './utils';

export const getSecondLevelIds = (ordering: Ordering, firstLevelId: string) =>
  ordering.secondLevelIdsByFirstLevelId[firstLevelId];

export const getParent = <T extends object>(
  ordering: Ordering,
  firstLevels: WithId<T>[],
  secondLevelID: string
) =>
  firstLevels.find(
    (first) =>
      first.id ===
      Object.entries(ordering.secondLevelIdsByFirstLevelId).find(([_, ids]) =>
        ids.includes(secondLevelID)
      )![0]
  );

export const getParentId = (ordering: Ordering, secondLevelId: string) => {
  const { firstLevelIds, secondLevelIdsByFirstLevelId } = ordering;
  return firstLevelIds.find(
    (id) =>
      (secondLevelIdsByFirstLevelId[id] ?? []).indexOf(secondLevelId) !== -1
  );
};

export const addSecondLevel = (
  ordering: Ordering,
  secondLevelId: string,
  firstLevelId: string
) => {
  const { secondLevelIdsByFirstLevelId } = ordering;
  return {
    ...ordering,
    secondLevelIdsByFirstLevelId: {
      ...secondLevelIdsByFirstLevelId,
      [firstLevelId]: (secondLevelIdsByFirstLevelId[firstLevelId] ?? []).concat(
        secondLevelId
      ),
    },
  } as Ordering;
};

export const removeSecondLevel = (
  ordering: Ordering,
  secondLevelId: string,
  firstLevelId?: string
) => {
  let currentParentId = firstLevelId;
  if (!currentParentId) currentParentId = getParentId(ordering, secondLevelId);
  if (!currentParentId) return ordering;
  const { secondLevelIdsByFirstLevelId } = ordering;
  return {
    ...ordering,
    secondLevelIdsByFirstLevelId: {
      ...secondLevelIdsByFirstLevelId,
      [currentParentId]: without(
        secondLevelIdsByFirstLevelId[currentParentId],
        secondLevelId
      ),
    },
  } as Ordering;
};

export const updateSecondLevelIndex = (
  ordering: Ordering,
  secondLevelId: string,
  fromParentId: string,
  toParentId: string,
  from: number,
  to: number
) => {
  const { secondLevelIdsByFirstLevelId } = ordering;
  const fromOrder = secondLevelIdsByFirstLevelId[fromParentId];
  const toOrder = secondLevelIdsByFirstLevelId[toParentId] ?? [];
  let newOrderByParentId = {};
  if (fromParentId === toParentId) {
    // moving inside same parent
    newOrderByParentId = {
      ...secondLevelIdsByFirstLevelId,
      [fromParentId]: arrayMove<string>(toOrder, from, to),
    };
  } else {
    // moving to another parent
    newOrderByParentId = {
      ...secondLevelIdsByFirstLevelId,
      [fromParentId]: fromOrder.filter((id) => id !== secondLevelId),
      [toParentId]: [
        ...toOrder.slice(0, to),
        secondLevelId,
        ...toOrder.slice(to),
      ],
    };
  }
  return {
    ...ordering,
    secondLevelIdsByFirstLevelId: newOrderByParentId,
  } as Ordering;
};

export const updateParent = (
  ordering: Ordering,
  secondLevelId: string,
  firstLevelId: string
) => {
  const currentParentId = getParentId(ordering, secondLevelId);
  // avoid update when parent is the same
  if (currentParentId === firstLevelId) return ordering;
  let nextOrdering: Ordering = ordering;
  // remove from its current parent
  if (currentParentId) {
    nextOrdering = removeSecondLevel(ordering, secondLevelId, currentParentId);
  }
  // add to the new parent
  return addSecondLevel(nextOrdering, secondLevelId, firstLevelId);
};
