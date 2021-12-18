import { isInteger } from 'lodash';
import { bwOpFunc, commonOpFunc, inAndNiOpFunc, orOpFunc } from './oprator1';
import { Order, Option, SingleOperator, MultiOperator, OrOperator, ORDER, LIMIT, WHRER, AND } from './typing';

export const getColumns = (columns: string[] | undefined) => (!columns?.length ? '*' : columns.join(', '));

export const getOrder = (orders: Order[] | undefined) => {
  if (!orders?.length) {
    return '';
  } else {
    return orders
      .reduce((res: string, item: Order) => res + ` ${item[0]} ${item[1].toUpperCase()},`, ` ${ORDER}`)
      .replace(/,$/, '');
  }
};

export const getLimit = (offset: number, limit: number) => {
  const offsetTag = offset >= 0 && isInteger(offset);
  const limitTag = limit >= 0 && isInteger(limit);
  if (offsetTag && limitTag) {
    return ` ${LIMIT} ${offset}, ${limit};`;
  } else {
    throw new Error(`'${LIMIT}' need two positive integer params!`);
  }
};

export const getWhere = (where: Option | undefined) => {
  let result: string;
  const optionVals: (string | number)[] = [];
  if (where === void 0 || !Object.keys(where!).length) {
    result = '';
  } else {
    result = ` ${WHRER} `;
    const keyArr = Object.keys(where!);
    for (let i = 0; i < keyArr.length; i++) {
      const key = keyArr[i];
      switch (key) {
        case SingleOperator.eq:
        case SingleOperator.ge:
        case SingleOperator.gt:
        case SingleOperator.le:
        case SingleOperator.lt:
        case SingleOperator.ne:
        case SingleOperator.like:
          const [_str, _values] = commonOpFunc(key, where![key]);
          result += _str;
          optionVals.push(..._values);
          break;
        case MultiOperator.bw:
          const [_strBw, _valuesBw] = bwOpFunc(key, where![key]);
          result += _strBw;
          optionVals.push(..._valuesBw);
          break;
        case MultiOperator.in:
        case MultiOperator.ni:
          const [_strI, _valuesI] = inAndNiOpFunc(key, where![key]);
          result += _strI;
          optionVals.push(..._valuesI);
          break;
        case OrOperator.or:
          const [_strOr, _valuesOr] = orOpFunc(where![key]);
          result += _strOr;
          optionVals.push(..._valuesOr);
          break;
        default:
          throw new Error(`${key} is not a valid operator!`);
      }
      i !== keyArr.length - 1 && (result += ` ${AND} `);
    }
  }
  return {
    str: result,
    arr: optionVals,
  };
};
