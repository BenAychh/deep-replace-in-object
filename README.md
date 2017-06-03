# deep-replace-in-object

[![CircleCI](https://circleci.com/gh/BenAychh/deep-replace-in-object.svg?style=svg)](https://circleci.com/gh/BenAychh/deep-replace-in-object)
[![Test Coverage](https://codeclimate.com/github/BenAychh/deep-replace-in-object/badges/coverage.svg)](https://codeclimate.com/github/BenAychh/deep-replace-in-object/coverage)

no-mutation function to deeply replace strings and numbers in nested objects/arrays.

Example:
```javascript
const object = {
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
const replacedObject = deepReplaceInObject('some value', 'a new value', object);
console.log(replacedObject);
{
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
```
