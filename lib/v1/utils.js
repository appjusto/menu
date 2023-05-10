"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayMove = void 0;
const arrayMove = (array, from, to) => {
    const value = array[from];
    if (to > from) {
        return [
            ...array.slice(0, from),
            ...array.slice(from + 1, to + 1),
            value,
            ...array.slice(to + 1),
        ];
    }
    else {
        return [
            ...array.slice(0, to),
            value,
            ...array.slice(to, from),
            ...array.slice(from + 1),
        ];
    }
};
exports.arrayMove = arrayMove;
//# sourceMappingURL=utils.js.map