import {
  TOption,
  TOpFuncRet,
  OptionError,
  ColumnValueError,
  PLACEHOLDER,
  AND,
  TOrOption,
  EOperator,
  OperatorError,
} from './typing';

// eq|gt|lt|ge|le|ne|like
const commonOpFunc = (params: TOption): TOpFuncRet => {
  if (!(params instanceof Array) || params.length !== 3) {
    throw OptionError(`common option is an array with 3 elements!`);
  }
  if (params[2] instanceof Array) {
    throw ColumnValueError(`${params[0]} operator's column value is not a array!`);
  }
  const optionStr = `${String(params[1])} ${params[0]} ${PLACEHOLDER}`;
  return [optionStr, [params[2]]];
};

// bw
const bwOpFunc = (params: TOption): TOpFuncRet => {
  if (!(params instanceof Array) || params.length !== 3) {
    throw OptionError(`BETWEEN option is an array with 3 elements!`);
  }
  if (!(params[2] instanceof Array) || params[2].length !== 2) {
    throw ColumnValueError(`${params[0]} operator's column value should be a array with 2 element!`);
  }
  const optionStr = `${String(params[1])} ${params[0]} ${PLACEHOLDER} ${AND} ${PLACEHOLDER}`;
  return [optionStr, [...params[2]]];
};

// in|ni
const inAndNiOpFunc = (params: TOption): TOpFuncRet => {
  if (!(params instanceof Array) || params.length !== 3) {
    throw OptionError(`IN or NOT IN option is an array with 3 elements!`);
  }
  if (!(params[2] instanceof Array) || params[2].length === 0) {
    throw ColumnValueError(`${params[0]} operator's column value need a non-empty array!`);
  }
  let optionStr: string = `${String(params[1])} ${params[0]} (`;
  for (let _index = 0; _index < params[2].length; _index++) {
    optionStr += _index !== params[2].length - 1 ? `${PLACEHOLDER}, ` : `${PLACEHOLDER})`;
  }
  // optionStr = optionStr.replace(/,\s$/, '') + ')';
  return [optionStr, [...params[2]]];
};

// or
const orOpFunc = (params: TOrOption): TOpFuncRet => {
  if (!(params instanceof Array) || params.length < 3) {
    throw OptionError(`OR option is an array with least 3 elements!`);
  }
  let optionStr: string = '(';
  let optionValues: unknown[] = [];
  for (let _index = 1; _index < params.length; _index++) {
    const element = params[_index];
    if (!(element instanceof Array)) {
      throw OptionError(`OR option rest elements should be a TOption array!`);
    }
    switch (element[0]) {
      case EOperator.eq:
      case EOperator.gt:
      case EOperator.lt:
      case EOperator.ge:
      case EOperator.le:
      case EOperator.ne:
      case EOperator.like:
        const [_str1, _values1] = commonOpFunc(element);
        optionStr += _str1;
        optionValues.push(..._values1);
        break;
      case EOperator.bw:
        const [_str2, _values2] = bwOpFunc(element);
        optionStr += _str2;
        optionValues.push(..._values2);
        break;
      case EOperator.in:
      case EOperator.ni:
        const [_str3, _values3] = inAndNiOpFunc(element);
        optionStr += _str3;
        optionValues.push(..._values3);
        break;
      case EOperator.or:
        throw OperatorError(`nested OR is not allowed!`);
      default:
        throw OperatorError(`${element[0]} is not a valid operator!`);
    }
    optionStr += _index !== params[2].length - 1 ? ' or ' : ')';
  }
  // optionStr = optionStr.replace(/\sor\s$/, '') + ')';
  return [optionStr, optionValues];
};

export { commonOpFunc, bwOpFunc, inAndNiOpFunc, orOpFunc };
