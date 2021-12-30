/**
 * clause handlers
 * such as column、where and so on
 */
import { isInteger, isEqual } from 'lodash';
import { bwOpFunc, commonOpFunc, inAndNiOpFunc, orOpFunc, checkEmptyArray, checkEmptyPlainObject } from './operator';
import { Order, Option, SingleOperator, MultiOperator, OrOperator, Row } from './typing';
import { ORDER, LIMIT, WHRER, AND, PLACEHOLDER } from './constant';

// column handler for select
export const getColumns = (columns: string[] | undefined) => (!columns?.length ? '*' : columns.join(', '));

export const getOrder = (order: Order | undefined) => {
  if (order === void 0 || !Object.keys(order).length) {
    return '';
  } else {
    return Object.keys(order)
      .reduce((res: string, item: string) => res + ` ${item} ${order[item].toUpperCase()},`, ` ${ORDER}`)
      .replace(/,$/, '');
  }
};

export const getLimit = (offset: number, limit: number) => {
  const offsetTag = offset >= 0 && isInteger(offset);
  const limitTag = limit >= 0 && isInteger(limit);
  if (offsetTag && limitTag) {
    return ` ${LIMIT} ${offset}, ${limit}`;
  } else {
    throw new Error(`'${LIMIT}' need two positive integer params!`);
  }
};

export const getWhere = (where: Option | undefined) => {
  let result: string;
  const optionVals: (string | number | Date)[] = [];
  if (where === void 0 || !Object.keys(where!).length) {
    result = '';
  } else {
    result = ` ${WHRER} `;
    const keyArr = Object.keys(where!);
    for (let i = 0; i < keyArr.length; i++) {
      const key = keyArr[i];
      let str: string;
      let values: (string | number | Date)[];
      let _str: string;
      let _values: (string | number | Date)[];
      switch (key) {
        case SingleOperator.eq:
        case SingleOperator.ge:
        case SingleOperator.gt:
        case SingleOperator.le:
        case SingleOperator.lt:
        case SingleOperator.ne:
        case SingleOperator.like:
          [_str, _values] = commonOpFunc(key, where[key]!);
          str = _str;
          values = _values;
          break;
        case MultiOperator.bw:
          [_str, _values] = bwOpFunc(key, where[key]!);
          str = _str;
          values = _values;
          break;
        case MultiOperator.in:
        case MultiOperator.ni:
          [_str, _values] = inAndNiOpFunc(key, where[key]!);
          str = _str;
          values = _values;
          break;
        case OrOperator.or:
          [_str, _values] = orOpFunc(where[key]!);
          str = _str;
          values = _values;
          break;
        default:
          throw new Error(`${key} is not a valid operator!`);
      }
      // non-empty
      if (str) {
        result += str;
        optionVals.push(...values);
        i !== keyArr.length - 1 && (result += ` ${AND} `);
      }
    }
    result === ` ${WHRER} ` && (result = '');
  }
  return {
    str: result,
    arr: optionVals,
  };
};

// cols and vals handler for insert
export const getColAndVals = (value: Row | Row[]) => {
  if (Array.isArray(value)) {
    checkEmptyArray('insert', value);
    const keyArr = Object.keys(value[0]);
    const columnStr = '(' + keyArr.join(', ') + ')';
    let valStr = '';
    const valArr: (string | number | Date)[] = [];
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      // check if every element of data has the same keys
      if (!isEqual(keyArr, Object.keys(item))) {
        throw new Error('no same keys');
      }
      const placeholders = Array(keyArr.length).fill(PLACEHOLDER);
      valStr += i === value.length - 1 ? `(${placeholders.join(', ')})` : `(${placeholders.join(', ')}), `;
      valArr.push(...Object.values(item));
    }
    return { columnStr, valStr, valArr };
  } else {
    checkEmptyPlainObject('insert', value);
    const keyArr = Object.keys(value);
    const columnStr = '(' + keyArr.join(', ') + ')';
    const placeholders = Array(keyArr.length).fill(PLACEHOLDER);
    const valArr = Object.values(value);
    const valStr = '(' + placeholders.join(', ') + ')';
    return { columnStr, valStr, valArr };
  }
};

// set string for update
export const getSet = (value: Row) => {
  checkEmptyPlainObject('update', value);
  const keyArr = Object.keys(value);
  const setStr = keyArr.reduce((res: string, key: string) => res + `${key} = ${PLACEHOLDER}, `, '').replace(/,\s$/, '');
  return { setStr, setVal: Object.values(value) };
};
