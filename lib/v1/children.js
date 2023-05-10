"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateParent = exports.updateSecondLevelIndex = exports.removeSecondLevel = exports.addSecondLevel = exports.getParentId = exports.getParent = exports.getSecondLevelIds = void 0;
const lodash_1 = require("lodash");
const utils_1 = require("./utils");
const getSecondLevelIds = (ordering, firstLevelId) => ordering.secondLevelIdsByFirstLevelId[firstLevelId];
exports.getSecondLevelIds = getSecondLevelIds;
const getParent = (ordering, firstLevels, secondLevelID) => firstLevels.find((first) => first.id ===
    Object.entries(ordering.secondLevelIdsByFirstLevelId).find(([_, ids]) => ids.includes(secondLevelID))[0]);
exports.getParent = getParent;
const getParentId = (ordering, secondLevelId) => {
    const { firstLevelIds, secondLevelIdsByFirstLevelId } = ordering;
    return firstLevelIds.find((id) => (secondLevelIdsByFirstLevelId[id] ?? []).indexOf(secondLevelId) !== -1);
};
exports.getParentId = getParentId;
const addSecondLevel = (ordering, secondLevelId, firstLevelId) => {
    const { secondLevelIdsByFirstLevelId } = ordering;
    return {
        ...ordering,
        secondLevelIdsByFirstLevelId: {
            ...secondLevelIdsByFirstLevelId,
            [firstLevelId]: (secondLevelIdsByFirstLevelId[firstLevelId] ?? []).concat(secondLevelId),
        },
    };
};
exports.addSecondLevel = addSecondLevel;
const removeSecondLevel = (ordering, secondLevelId, firstLevelId) => {
    let currentParentId = firstLevelId;
    if (!currentParentId)
        currentParentId = (0, exports.getParentId)(ordering, secondLevelId);
    if (!currentParentId)
        return ordering;
    const { secondLevelIdsByFirstLevelId } = ordering;
    return {
        ...ordering,
        secondLevelIdsByFirstLevelId: {
            ...secondLevelIdsByFirstLevelId,
            [currentParentId]: (0, lodash_1.without)(secondLevelIdsByFirstLevelId[currentParentId], secondLevelId),
        },
    };
};
exports.removeSecondLevel = removeSecondLevel;
const updateSecondLevelIndex = (ordering, secondLevelId, fromParentId, toParentId, from, to) => {
    const { secondLevelIdsByFirstLevelId } = ordering;
    const fromOrder = secondLevelIdsByFirstLevelId[fromParentId];
    const toOrder = secondLevelIdsByFirstLevelId[toParentId] ?? [];
    let newOrderByParentId = {};
    if (fromParentId === toParentId) {
        // moving inside same parent
        newOrderByParentId = {
            ...secondLevelIdsByFirstLevelId,
            [fromParentId]: (0, utils_1.arrayMove)(toOrder, from, to),
        };
    }
    else {
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
    };
};
exports.updateSecondLevelIndex = updateSecondLevelIndex;
const updateParent = (ordering, secondLevelId, firstLevelId) => {
    const currentParentId = (0, exports.getParentId)(ordering, secondLevelId);
    // avoid update when parent is the same
    if (currentParentId === firstLevelId)
        return ordering;
    let nextOrdering = ordering;
    // remove from its current parent
    if (currentParentId) {
        nextOrdering = (0, exports.removeSecondLevel)(ordering, secondLevelId, currentParentId);
    }
    // add to the new parent
    return (0, exports.addSecondLevel)(nextOrdering, secondLevelId, firstLevelId);
};
exports.updateParent = updateParent;
//# sourceMappingURL=children.js.map