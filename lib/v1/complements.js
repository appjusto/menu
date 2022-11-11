"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isComplementGroupEqual = void 0;
var isComplementGroupEqual = function (a, b) {
    var _a, _b, _c;
    if (a.enabled !== b.enabled)
        return false;
    if (((_a = a.items) === null || _a === void 0 ? void 0 : _a.length) !== ((_b = b.items) === null || _b === void 0 ? void 0 : _b.length))
        return false;
    if ((_c = a.items) === null || _c === void 0 ? void 0 : _c.some(function (c, i) {
        if (c.description != b.items[i].description)
            return true;
        if (c.enabled != b.items[i].enabled)
            return true;
        if (c.name != b.items[i].name)
            return true;
        if (c.price != b.items[i].price)
            return true;
        return false;
    }))
        return false;
    if (a.minimum !== b.minimum)
        return false;
    if (a.maximum !== b.maximum)
        return false;
    if (a.name !== b.name)
        return false;
    if (a.required !== b.required)
        return false;
    return true;
};
exports.isComplementGroupEqual = isComplementGroupEqual;
//# sourceMappingURL=complements.js.map