/* tslint:disable no-expression-statement no-any */
import { deepReplaceInObject } from './index';
import { expect } from 'chai';
import { clone } from 'ramda';

describe('simple objects', () => {
  it('does not mutate the original object', () => {
    const object = {
      key1: 'some value',
      key2: 'another value',
    }
    const cloneOfObject = clone(object);
    deepReplaceInObject('some value', 'a new value', object);
    expect(object).to.deep.equal(cloneOfObject);
  });

  it('can replace a string value', () => {
    const object = {
      key1: 'some value',
      key2: 'another value',
    }
    const replacedObject = deepReplaceInObject('some value', 'a new value', object);
    const expected = {
      key1: 'a new value',
      key2: 'another value',
    }
    expect(replacedObject).to.deep.equal(expected);
  });

  it('can replace a string value with null', () => {
    const object = {
      key1: 'some value',
      key2: 'another value',
    }
    const replacedObject = deepReplaceInObject('some value', null, object);
    const expected = {
      key1: <null>null,
      key2: 'another value',
    }
    expect(replacedObject).to.deep.equal(expected);
  });

  it('can replace a number value', () => {
    const object = {
      key1: 4,
      key2: 5,
    }
    const replacedObject = deepReplaceInObject(4, 10, object);
    const expected = {
      key1: 10,
      key2: 5,
    }
    expect(replacedObject).to.deep.equal(expected);
  });

  it('can replace a number value with null', () => {
    const object = {
      key1: 4,
      key2: 5,
    }
    const replacedObject = deepReplaceInObject(4, null, object);
    const expected = {
      key1: <null>null,
      key2: 5,
    }
    expect(replacedObject).to.deep.equal(expected);
  })

  it('can replace multiple string values', () => {
    const object = {
      key1: 'some value',
      key2: 5,
      key3: 'some value',
      key4: 'another value',
    }
    const replacedObject = deepReplaceInObject('some value', 'a new value', object);
    const expected = {
      key1: 'a new value',
      key2: 5,
      key3: 'a new value',
      key4: 'another value',
    }
    expect(replacedObject).to.deep.equal(expected);
  });

  it('can replace multiple number values', () => {
    const object = {
      key1: 4,
      key2: 5,
      key3: 4,
      key4: 'another value',
    }
    const replacedObject = deepReplaceInObject(4, 'a new value', object);
    const expected = {
      key1: 'a new value',
      key2: 5,
      key3: 'a new value',
      key4: 'another value',
    }
    expect(replacedObject).to.deep.equal(expected);
  });

  it('returns a copy of the object if there are no matches', () => {
    const object = {
      key1: 'some value',
      key2: 'another value',
    }
    const replacedObject = deepReplaceInObject('no match', 'a new value', object);
    expect(replacedObject).to.deep.equal(object);
  });
});

describe('simple arrays', () => {
  it('does not mutate the original array', () => {
    const array = ['some value', 'another value']
    const clonedArray = clone(array);
    deepReplaceInObject('some value', 'a new value', array);
    expect(array).to.deep.equal(clonedArray);
  });

  it('can replace a string value', () => {
    const array = ['some value', 'another value']
    const replacedArray = deepReplaceInObject('some value', 'a new value', array);
    const expected = ['a new value', 'another value'];
    expect(replacedArray).to.deep.equal(expected);
  });

  it('can replace a string value with null', () => {
    const array = ['some value', 'another value']
    const replacedArray = deepReplaceInObject('some value', null, array);
    const expected = [null, 'another value'];
    expect(replacedArray).to.deep.equal(expected);
  })

  it('can replace a number value', () => {
    const array = [4, 5]
    const replacedArray = deepReplaceInObject(4, 10, array);
    const expected = [10, 5];
    expect(replacedArray).to.deep.equal(expected);
  });

  it('can replace a number value with null', () => {
    const array = [4, 5]
    const replacedArray = deepReplaceInObject(4, null, array);
    const expected = [null, 5];
    expect(replacedArray).to.deep.equal(expected);
  });

  it('can replace multiple string values', () => {
    const array = ['some value', 'another value', 'some value', 'yet another value'];
    const replacedArray = deepReplaceInObject('some value', 'a new value', array);
    const expected = ['a new value', 'another value', 'a new value', 'yet another value'];
    expect(replacedArray).to.deep.equal(expected);
  });

  it('can replace multiple number values', () => {
    const array = [4, 5, 4, 6];
    const replacedArray = deepReplaceInObject(4, 10, array);
    const expected = [10, 5, 10, 6];
    expect(replacedArray).to.deep.equal(expected);
  });

  it('returns a copy of the array if there are no matches', () => {
    const array = [4, 5, 4, 6];
    const replacedArray = deepReplaceInObject(9, 10, array);
    const expected = [4, 5, 4, 6];
    expect(replacedArray).to.deep.equal(expected);
  });
});

describe('deeply nested values', () => {
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

  it('does not mutate the object', () => {
    const clonedObject = clone(object);
    deepReplaceInObject('some value', 'a new value', object);
    expect(object).to.deep.equal(clonedObject);
  });

  it('can replace string values', () => {
    const expected = {
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
    const replacedObject = deepReplaceInObject('some value', 'a new value', object);
    expect(replacedObject).to.deep.equal(expected);
  });

  it('can replace number values', () => {
    const expected = {
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
    const replacedObject = deepReplaceInObject(10, 4, object);
    expect(replacedObject).to.deep.equal(expected);
  });

  it('returns a copy of the object if nothing matches', () => {
    const replacedObject = deepReplaceInObject('no match', 'a new value', object);
    expect(replacedObject).to.deep.equal(object);
  });
})
