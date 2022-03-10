"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.empty = exports.getSorted = void 0;
var ordered = function (items, order) {
    return items
        .filter(function (i) { return order.includes(i.id); }) // filtering out first
        .sort(function (a, b) { return order.indexOf(a.id) - order.indexOf(b.id); });
};
var getSorted = function (firstLevels, secondLevels, config) {
    if (firstLevels.length === 0 || !config)
        return [];
    var firstLevelIds = config.firstLevelIds, secondLevelIdsByFirstLevelId = config.secondLevelIdsByFirstLevelId;
    return ordered(firstLevels, firstLevelIds).map(function (parent) {
        if (!secondLevelIdsByFirstLevelId) {
            return __assign(__assign({}, parent), { items: [] });
        }
        return __assign(__assign({}, parent), { items: ordered(secondLevels, secondLevelIdsByFirstLevelId[parent.id]) });
    });
};
exports.getSorted = getSorted;
var empty = function () { return ({
    firstLevelIds: [],
    secondLevelIdsByFirstLevelId: {},
}); };
exports.empty = empty;
//# sourceMappingURL=index.js.map