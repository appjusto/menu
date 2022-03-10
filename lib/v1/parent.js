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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFirstLevelIndex = exports.removeFirstLevel = exports.addFirstLevel = void 0;
var lodash_1 = require("lodash");
var utils_1 = require("./utils");
var addFirstLevel = function (ordering, firstLevelId) {
    var _a;
    var firstLevelIds = ordering.firstLevelIds, secondLevelIdsByFirstLevelId = ordering.secondLevelIdsByFirstLevelId;
    if (firstLevelIds.indexOf(firstLevelId) !== -1)
        return ordering;
    return {
        firstLevelIds: __spreadArray(__spreadArray([], firstLevelIds, true), [firstLevelId], false),
        secondLevelIdsByFirstLevelId: __assign(__assign({}, secondLevelIdsByFirstLevelId), (_a = {}, _a[firstLevelId] = [], _a)),
    };
};
exports.addFirstLevel = addFirstLevel;
var removeFirstLevel = function (ordering, firstLevelId) {
    var firstLevelIds = ordering.firstLevelIds, secondLevelIdsByFirstLevelId = ordering.secondLevelIdsByFirstLevelId;
    var index = firstLevelIds.indexOf(firstLevelId);
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
var updateFirstLevelIndex = function (ordering, firstLevelId, newIndex) {
    var firstLevelIds = ordering.firstLevelIds;
    var previousIndex = firstLevelIds.indexOf(firstLevelId);
    return __assign(__assign({}, ordering), { firstLevelIds: (0, utils_1.arrayMove)(firstLevelIds, previousIndex, newIndex) });
};
exports.updateFirstLevelIndex = updateFirstLevelIndex;
//# sourceMappingURL=parent.js.map