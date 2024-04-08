"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empty = exports.getSorted = void 0;
const ordered = (items, order) => {
    return items
        .filter((i) => order?.includes(i.id)) // filtering out first
        .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
};
const getSorted = (firstLevels, secondLevels, config) => {
    if (firstLevels.length === 0 || !config)
        return [];
    const { firstLevelIds, secondLevelIdsByFirstLevelId } = config;
    return ordered(firstLevels, firstLevelIds).map((parent) => {
        if (!secondLevelIdsByFirstLevelId) {
            return {
                ...parent,
                items: [],
            };
        }
        return {
            ...parent,
            items: ordered(secondLevels, secondLevelIdsByFirstLevelId[parent.id]),
        };
    });
};
exports.getSorted = getSorted;
const empty = () => ({
    firstLevelIds: [],
    secondLevelIdsByFirstLevelId: {},
});
exports.empty = empty;
//# sourceMappingURL=index.js.map