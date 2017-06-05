"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
function isArray(o) {
    return ramda_1.type(o) === 'Array';
}
function deepReplaceInObject(currentValue, newValue, objectToReplaceIn) {
    if (isArray(objectToReplaceIn)) {
        return ramda_1.reduce(function (array, value) {
            var keyType = ramda_1.type(value);
            if (keyType === 'Object' || keyType === 'Array') {
                return array.concat([deepReplaceInObject(currentValue, newValue, value)]);
            }
            else if (value === currentValue) {
                return array.concat([newValue]);
            }
            return array.concat([value]);
        }, [], objectToReplaceIn);
    }
    else {
        var blah = ramda_1.keys(objectToReplaceIn);
        var wtf = objectToReplaceIn;
        return ramda_1.reduce(function (o, key) {
            var value = objectToReplaceIn[key];
            var keyType = ramda_1.type(value);
            if (keyType === 'Object' || keyType === 'Array') {
                return ramda_1.merge(o, (_a = {},
                    _a[key] = deepReplaceInObject(currentValue, newValue, value),
                    _a));
            }
            else if (value === currentValue) {
                return ramda_1.merge(o, (_b = {}, _b[key] = newValue, _b));
            }
            return ramda_1.merge(o, (_c = {}, _c[key] = value, _c));
            var _a, _b, _c;
        }, {}, ramda_1.keys(objectToReplaceIn));
    }
}
exports.default = deepReplaceInObject;
//# sourceMappingURL=index.js.map