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
exports.updateParent = exports.updateSecondLevelIndex = exports.removeSecondLevel = exports.addSecondLevel = exports.getParentId = exports.getParent = exports.getSecondLevelIds = void 0;
var lodash_1 = require("lodash");
var utils_1 = require("./utils");
var getSecondLevelIds = function (ordering, firstLevelId) {
    return ordering.secondLevelIdsByFirstLevelId[firstLevelId];
};
exports.getSecondLevelIds = getSecondLevelIds;
var getParent = function (ordering, firstLevels, secondLevelID) {
    return firstLevels.find(function (first) {
        return first.id ===
            Object.entries(ordering.secondLevelIdsByFirstLevelId).find(function (_a) {
                var _ = _a[0], ids = _a[1];
                return ids.includes(secondLevelID);
            })[0];
    });
};
exports.getParent = getParent;
var getParentId = function (ordering, secondLevelId) {
    var firstLevelIds = ordering.firstLevelIds, secondLevelIdsByFirstLevelId = ordering.secondLevelIdsByFirstLevelId;
    return firstLevelIds.find(function (id) { var _a; return ((_a = secondLevelIdsByFirstLevelId[id]) !== null && _a !== void 0 ? _a : []).indexOf(secondLevelId) !== -1; });
};
exports.getParentId = getParentId;
var addSecondLevel = function (ordering, secondLevelId, firstLevelId) {
    var _a;
    var _b;
    var secondLevelIdsByFirstLevelId = ordering.secondLevelIdsByFirstLevelId;
    return __assign(__assign({}, ordering), { secondLevelIdsByFirstLevelId: __assign(__assign({}, secondLevelIdsByFirstLevelId), (_a = {}, _a[firstLevelId] = ((_b = secondLevelIdsByFirstLevelId[firstLevelId]) !== null && _b !== void 0 ? _b : []).concat(secondLevelId), _a)) });
};
exports.addSecondLevel = addSecondLevel;
var removeSecondLevel = function (ordering, secondLevelId, firstLevelId) {
    var _a;
    var currentParentId = firstLevelId;
    if (!currentParentId)
        currentParentId = (0, exports.getParentId)(ordering, secondLevelId);
    if (!currentParentId)
        return ordering;
    var secondLevelIdsByFirstLevelId = ordering.secondLevelIdsByFirstLevelId;
    return __assign(__assign({}, ordering), { secondLevelIdsByFirstLevelId: __assign(__assign({}, secondLevelIdsByFirstLevelId), (_a = {}, _a[currentParentId] = (0, lodash_1.without)(secondLevelIdsByFirstLevelId[currentParentId], secondLevelId), _a)) });
};
exports.removeSecondLevel = removeSecondLevel;
var updateSecondLevelIndex = function (ordering, secondLevelId, fromParentId, toParentId, from, to) {
    var _a, _b;
    var _c;
    var secondLevelIdsByFirstLevelId = ordering.secondLevelIdsByFirstLevelId;
    var fromOrder = secondLevelIdsByFirstLevelId[fromParentId];
    var toOrder = (_c = secondLevelIdsByFirstLevelId[toParentId]) !== null && _c !== void 0 ? _c : [];
    var newOrderByParentId = {};
    if (fromParentId === toParentId) {
        // moving inside same parent
        newOrderByParentId = __assign(__assign({}, secondLevelIdsByFirstLevelId), (_a = {}, _a[fromParentId] = (0, utils_1.arrayMove)(toOrder, from, to), _a));
    }
    else {
        // moving to another parent
        newOrderByParentId = __assign(__assign({}, secondLevelIdsByFirstLevelId), (_b = {}, _b[fromParentId] = fromOrder.filter(function (id) { return id !== secondLevelId; }), _b[toParentId] = __spreadArray(__spreadArray(__spreadArray([], toOrder.slice(0, to), true), [
            secondLevelId
        ], false), toOrder.slice(to), true), _b));
    }
    return __assign(__assign({}, ordering), { secondLevelIdsByFirstLevelId: newOrderByParentId });
};
exports.updateSecondLevelIndex = updateSecondLevelIndex;
var updateParent = function (ordering, secondLevelId, firstLevelId) {
    var currentParentId = (0, exports.getParentId)(ordering, secondLevelId);
    // avoid update when parent is the same
    if (currentParentId === firstLevelId)
        return ordering;
    var nextOrdering = ordering;
    // remove from its current parent
    if (currentParentId) {
        nextOrdering = (0, exports.removeSecondLevel)(ordering, secondLevelId, currentParentId);
    }
    // add to the new parent
    return (0, exports.addSecondLevel)(nextOrdering, secondLevelId, firstLevelId);
};
exports.updateParent = updateParent;
//# sourceMappingURL=children.js.map