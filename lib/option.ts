import { isInteger } from 'lodash';
import { commonOpFunc } from './oprator1';
import {
  OptionError,
  Columns,
  TOrder,
  Option,
  SingleOperator,
  MultiOperator,
  OrOperator,
  OperatorError,
  ORDER,
  LIMIT,
  WHRER,
} from './typing';

const getColumns = (columns: Columns) =>
  typeof columns === undefined || !columns?.length ? ' *' : ' ' + columns.join(', ');

const getOrder = (order: TOrder) => {
  if (typeof order === undefined || !order?.length) {
    return '';
  } else {
    return order.reduce(item => ` ${item[0]} ${item[1].toUpperCase},`, ` ${ORDER}`).replace(/,$/, '');
  }
};

const getLimit = (offset: number, limit: number) => {
  const offsetTag = offset >= 0 && isInteger(offset);
  const limitTag = limit >= 0 && isInteger(limit);
  if (offsetTag && limitTag) {
    return ` ${LIMIT} ${offset}, ${limit}`;
  } else {
    throw OptionError(`'${LIMIT}' need two positive integer params!`);
  }
};

const getWhere = (where: Option) => {
  if (typeof where === undefined || !Object.keys(where).length) {
    return '';
  } else {
    let result = ` ${WHRER} `;
    const optionVals: (string | number)[] = [];
    for (const key of Object.keys(where)) {
      switch (key) {
        case SingleOperator.eq:
        case SingleOperator.ge:
        case SingleOperator.gt:
        case SingleOperator.le:
        case SingleOperator.lt:
        case SingleOperator.ne:
        case SingleOperator.like:
          const [_str, _values] = commonOpFunc(key, where[key]);
          result += _str;
          optionVals.push(..._values);
          break;
        case MultiOperator.bw:
          break;
        case MultiOperator.in:
        case MultiOperator.ni:
          break;
        case OrOperator.or:
          break;
        default:
          throw OperatorError(`${key} is not a valid operator!`);
      }
    }
    for (let i = 0; i < where.length; i++) {
      if (!(where[i] instanceof Array) || !where[i].length) {
        throw OptionError('every option should be a non-empty array!');
      }
      const item = where[i];
      switch (item[0]) {
        case Operator.eq:
        case Operator.gt:
        case Operator.lt:
        case Operator.ge:
        case Operator.le:
        case Operator.ne:
        case Operator.like:
          const [_str, _values] = commonOpFunc(item);
          result += _str;
          optionValues.push(..._values);
          break;
        case Operator.bw:
          const [_strBw, _valuesBw] = bwOpFunc(item);
          result += _strBw;
          optionValues.push(..._valuesBw);
          break;
        case Operator.in:
        case Operator.ni:
          const [_strI, _valuesI] = inAndNiOpFunc(item);
          result += _strI;
          optionValues.push(..._valuesI);
          break;
        case Operator.or:
          const [_strOr, _valuesOr] = orOpFunc(item as TOrOption);
          result += _strI;
          optionValues.push(..._valuesI);
          break;
        default:
          throw OperatorError(`${item[0]} is not a valid operator!`);
      }
      i !== where.length - 1 && (result += ' AND ');
    }
  }
};

export default {
  getColumns,
  getOrder,
  getLimit,
  getWhere,
};
