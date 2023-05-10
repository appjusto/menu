"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFirstLevelIndex = exports.removeFirstLevel = exports.addFirstLevel = void 0;
const lodash_1 = require("lodash");
const utils_1 = require("./utils");
const addFirstLevel = (ordering, firstLevelId) => {
    const { firstLevelIds, secondLevelIdsByFirstLevelId } = ordering;
    if (firstLevelIds.indexOf(firstLevelId) !== -1)
        return ordering;
    return {
        firstLevelIds: [...firstLevelIds, firstLevelId],
        secondLevelIdsByFirstLevelId: {
            ...secondLevelIdsByFirstLevelId,
            [firstLevelId]: [],
        },
    };
};
exports.addFirstLevel = addFirstLevel;
const removeFirstLevel = (ordering, firstLevelId) => {
    const { firstLevelIds, secondLevelIdsByFirstLevelId } = ordering;
    const index = firstLevelIds.indexOf(firstLevelId);
    if (index === -1)
        return ordering;
    return {
        firstLevelIds: (0, lodash_1.without)(ordering.firstLevelIds, firstLevelId),
        secondLevelIdsByFirstLevelId: (0, lodash_1.omit)(secondLevelIdsByFirstLevelId, [
            firstLevelId,
        ]),
    };
};
exports.removeFirstLevel = removeFirstLevel;
const updateFirstLevelIndex = (ordering, firstLevelId, newIndex) => {
    const { firstLevelIds } = ordering;
    const previousIndex = firstLevelIds.indexOf(firstLevelId);
    return {
        ...ordering,
        firstLevelIds: (0, utils_1.arrayMove)(firstLevelIds, previousIndex, newIndex),
    };
};
exports.updateFirstLevelIndex = updateFirstLevelIndex;
//# sourceMappingURL=parent.js.map