import { keys, merge, reduce, type } from 'ramda';

export interface anyObject {
  [key: string]: any;
}

function isArray(o: anyObject | Array<any>): o is Array<any> {
  return type(o) === 'Array';
}

export default function deepReplaceInObject(currentValue: string | number, newValue: string | number, objectToReplaceIn: anyObject | any[]): typeof objectToReplaceIn {
  if (isArray(objectToReplaceIn)) {
    return reduce((array, value) => {
      const keyType = type(value);
      if (keyType === 'Object' || keyType === 'Array') {
        return [...array, deepReplaceInObject(currentValue, newValue, value)];
      } else if (value === currentValue) {
        return [...array, newValue];
      }
      return [...array, value];
    }, [], objectToReplaceIn);
  } else {
    return reduce((o: object, key) => {
      const value = <any>objectToReplaceIn[key];
      const keyType = type(value);
      if (keyType === 'Object' || keyType === 'Array') {
        return merge(o, {
          [key]: deepReplaceInObject(currentValue, newValue, value),
        });
      } else if (value === currentValue) {
        return merge(o, { [key]: newValue });
      }
      return merge(o, { [key]: value });
    }, {}, keys(objectToReplaceIn));
  }
}