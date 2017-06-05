"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable no-expression-statement no-any */
var index_1 = require("./index");
var chai_1 = require("chai");
var ramda_1 = require("ramda");
describe('simple objects', function () {
    it('does not mutate the original object', function () {
        var object = {
            key1: 'some value',
            key2: 'another value',
        };
        var cloneOfObject = ramda_1.clone(object);
        index_1.deepReplaceInObject('some value', 'a new value', object);
        chai_1.expect(object).to.deep.equal(cloneOfObject);
    });
    it('can replace a string value', function () {
        var object = {
            key1: 'some value',
            key2: 'another value',
        };
        var replacedObject = index_1.deepReplaceInObject('some value', 'a new value', object);
        var expected = {
            key1: 'a new value',
            key2: 'another value',
        };
        chai_1.expect(replacedObject).to.deep.equal(expected);
    });
    it('can replace a string value with null', function () {
        var object = {
            key1: 'some value',
            key2: 'another value',
        };
        var replacedObject = index_1.deepReplaceInObject('some value', null, object);
        var expected = {
            key1: null,
            key2: 'another value',
        };
        chai_1.expect(replacedObject).to.deep.equal(expected);
    });
    it('can replace a number value', function () {
        var object = {
            key1: 4,
            key2: 5,
        };
        var replacedObject = index_1.deepReplaceInObject(4, 10, object);
        var expected = {
            key1: 10,
            key2: 5,
        };
        chai_1.expect(replacedObject).to.deep.equal(expected);
    });
    it('can replace a number value with null', function () {
        var object = {
            key1: 4,
            key2: 5,
        };
        var replacedObject = index_1.deepReplaceInObject(4, null, object);
        var expected = {
            key1: null,
            key2: 5,
        };
        chai_1.expect(replacedObject).to.deep.equal(expected);
    });
    it('can replace multiple string values', function () {
        var object = {
            key1: 'some value',
            key2: 5,
            key3: 'some value',
            key4: 'another value',
        };
        var replacedObject = index_1.deepReplaceInObject('some value', 'a new value', object);
        var expected = {
            key1: 'a new value',
            key2: 5,
            key3: 'a new value',
            key4: 'another value',
        };
        chai_1.expect(replacedObject).to.deep.equal(expected);
    });
    it('can replace multiple number values', function () {
        var object = {
            key1: 4,
            key2: 5,
            key3: 4,
            key4: 'another value',
        };
        var replacedObject = index_1.deepReplaceInObject(4, 'a new value', object);
        var expected = {
            key1: 'a new value',
            key2: 5,
            key3: 'a new value',
            key4: 'another value',
        };
        chai_1.expect(replacedObject).to.deep.equal(expected);
    });
    it('returns a copy of the object if there are no matches', function () {
        var object = {
            key1: 'some value',
            key2: 'another value',
        };
        var replacedObject = index_1.deepReplaceInObject('no match', 'a new value', object);
        chai_1.expect(replacedObject).to.deep.equal(object);
    });
});
describe('simple arrays', function () {
    it('does not mutate the original array', function () {
        var array = ['some value', 'another value'];
        var clonedArray = ramda_1.clone(array);
        index_1.deepReplaceInObject('some value', 'a new value', array);
        chai_1.expect(array).to.deep.equal(clonedArray);
    });
    it('can replace a string value', function () {
        var array = ['some value', 'another value'];
        var replacedArray = index_1.deepReplaceInObject('some value', 'a new value', array);
        var expected = ['a new value', 'another value'];
        chai_1.expect(replacedArray).to.deep.equal(expected);
    });
    it('can replace a string value with null', function () {
        var array = ['some value', 'another value'];
        var replacedArray = index_1.deepReplaceInObject('some value', null, array);
        var expected = [null, 'another value'];
        chai_1.expect(replacedArray).to.deep.equal(expected);
    });
    it('can replace a number value', function () {
        var array = [4, 5];
        var replacedArray = index_1.deepReplaceInObject(4, 10, array);
        var expected = [10, 5];
        chai_1.expect(replacedArray).to.deep.equal(expected);
    });
    it('can replace a number value with null', function () {
        var array = [4, 5];
        var replacedArray = index_1.deepReplaceInObject(4, null, array);
        var expected = [null, 5];
        chai_1.expect(replacedArray).to.deep.equal(expected);
    });
    it('can replace multiple string values', function () {
        var array = ['some value', 'another value', 'some value', 'yet another value'];
        var replacedArray = index_1.deepReplaceInObject('some value', 'a new value', array);
        var expected = ['a new value', 'another value', 'a new value', 'yet another value'];
        chai_1.expect(replacedArray).to.deep.equal(expected);
    });
    it('can replace multiple number values', function () {
        var array = [4, 5, 4, 6];
        var replacedArray = index_1.deepReplaceInObject(4, 10, array);
        var expected = [10, 5, 10, 6];
        chai_1.expect(replacedArray).to.deep.equal(expected);
    });
    it('returns a copy of the array if there are no matches', function () {
        var array = [4, 5, 4, 6];
        var replacedArray = index_1.deepReplaceInObject(9, 10, array);
        var expected = [4, 5, 4, 6];
        chai_1.expect(replacedArray).to.deep.equal(expected);
    });
});
describe('deeply nested values', function () {
    var object = {
        key1: 'some value',
        key2: {
            key1: 'some value',
            key2: [5, 'some value', 'some other value', 10],
            key3: [
                { key1: 'some other value' },
                { key2: [10, 'some other value', 5, 'some value'] },
                { key3: 'some value' },
                { key4: 5 },
                { key5: 10 }
            ],
            key4: 10,
            key5: 5,
        },
        key3: [10, 'some other value', 'some value', 5],
        key4: 10,
        key5: 'some other value',
        key6: 5,
    };
    it('does not mutate the object', function () {
        var clonedObject = ramda_1.clone(object);
        index_1.deepReplaceInObject('some value', 'a new value', object);
        chai_1.expect(object).to.deep.equal(clonedObject);
    });
    it('can replace string values', function () {
        var expected = {
            key1: 'a new value',
            key2: {
                key1: 'a new value',
                key2: [5, 'a new value', 'some other value', 10],
                key3: [
                    { key1: 'some other value' },
                    { key2: [10, 'some other value', 5, 'a new value'] },
                    { key3: 'a new value' },
                    { key4: 5 },
                    { key5: 10 }
                ],
                key4: 10,
                key5: 5,
            },
            key3: [10, 'some other value', 'a new value', 5],
            key4: 10,
            key5: 'some other value',
            key6: 5,
        };
        var replacedObject = index_1.deepReplaceInObject('some value', 'a new value', object);
        chai_1.expect(replacedObject).to.deep.equal(expected);
    });
    it('can replace number values', function () {
        var expected = {
            key1: 'some value',
            key2: {
                key1: 'some value',
                key2: [5, 'some value', 'some other value', 4],
                key3: [
                    { key1: 'some other value' },
                    { key2: [4, 'some other value', 5, 'some value'] },
                    { key3: 'some value' },
                    { key4: 5 },
                    { key5: 4 }
                ],
                key4: 4,
                key5: 5,
            },
            key3: [4, 'some other value', 'some value', 5],
            key4: 4,
            key5: 'some other value',
            key6: 5,
        };
        var replacedObject = index_1.deepReplaceInObject(10, 4, object);
        chai_1.expect(replacedObject).to.deep.equal(expected);
    });
    it('returns a copy of the object if nothing matches', function () {
        var replacedObject = index_1.deepReplaceInObject('no match', 'a new value', object);
        chai_1.expect(replacedObject).to.deep.equal(object);
    });
});
//# sourceMappingURL=index.spec.js.map