"use strict";
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
exports.arrayMove = void 0;
var arrayMove = function (array, from, to) {
    var value = array[from];
    if (to > from) {
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], array.slice(0, from), true), array.slice(from + 1, to + 1), true), [
            value
        ], false), array.slice(to + 1), true);
    }
    else {
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], array.slice(0, to), true), [
            value
        ], false), array.slice(to, from), true), array.slice(from + 1), true);
    }
};
exports.arrayMove = arrayMove;
//# sourceMappingURL=utils.js.map