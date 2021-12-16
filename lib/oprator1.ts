import {
  TOption,
  OpFuncRet,
  OptionError,
  ColumnValueError,
  PLACEHOLDER,
  AND,
  TOrOption,
  Operator,
  OperatorError,
  SingleOptionValue,
  SingleOperator,
  MultiOptionValue,
  MultiOperator,
  OrOperator,
  OrOptionValue,
} from './typing';

// eq|gt|lt|ge|le|ne|like
const commonOpFunc = (key: SingleOperator, val: SingleOptionValue | SingleOptionValue[]): OpFuncRet => {
  if (Array.isArray(val)) {
    if (!val.length) {
      throw OptionError('option array should not be empty!');
    }
    let optionStr: string = '';
    const values: (string | number)[] = [];
    for (let i = 0; i < val.length; i++) {
      optionStr +=
        i === val.length - 1
          ? `${val[i].column} ${Operator[key]} ${PLACEHOLDER}`
          : `${val[i].column} ${Operator[key]} ${PLACEHOLDER} ${AND} `;
      values.push(val[i].value);
    }
    return [optionStr, values];
  } else {
    return [`${val.column} ${Operator[key]} ${PLACEHOLDER}`, [val.value]];
  }
};

// bw
const bwOpFunc = (key: MultiOperator, val: MultiOptionValue | MultiOptionValue[]): OpFuncRet => {
  if (Array.isArray(val)) {
    if (!val.length) {
      throw OptionError('option array should not be empty!');
    }
    let optionStr: string = '';
    const values: (string | number)[] = [];
    for (let i = 0; i < val.length; i++) {
      optionStr +=
        i === val.length - 1
          ? `${val[i].column} ${Operator[key]} ${PLACEHOLDER} ${AND} ${PLACEHOLDER}`
          : `${val[i].column} ${Operator[key]} ${PLACEHOLDER} ${AND} ${PLACEHOLDER} ${AND} `;
      values.push(...val[i].value);
    }
    return [optionStr, values];
  } else {
    if (!Array.isArray(val.value) || val.value.length !== 2) {
      throw ColumnValueError('between option value should be a two-element array!');
    }
    return [`${val.column} ${Operator[key]} ${PLACEHOLDER} ${AND} ${PLACEHOLDER}`, val.value];
  }
};

// bw
// const bwOpFunc = (params: TOption): OpFuncRet => {
//   if (!(params instanceof Array) || params.length !== 3) {
//     throw OptionError(`BETWEEN option is an array with 3 elements!`);
//   }
//   if (!(params[2] instanceof Array) || params[2].length !== 2) {
//     throw ColumnValueError(`${params[0]} operator's column value should be a array with 2 element!`);
//   }
//   const optionStr = `${String(params[1])} ${params[0]} ${PLACEHOLDER} ${AND} ${PLACEHOLDER}`;
//   return [optionStr, [...params[2]]];
// };

// in/ni
const inAndNiOpFunc = (key: MultiOperator, val: MultiOptionValue | MultiOptionValue[]): OpFuncRet => {
  if (Array.isArray(val)) {
    if (!val.length) {
      throw OptionError('option array should not be empty!');
    }
    let optionStr: string = '';
    const values: (string | number)[] = [];
    for (let i = 0; i < val.length; i++) {
      optionStr +=
        i === val.length - 1
          ? `${val[i].column} ${Operator[key]} (${PLACEHOLDER}, ${PLACEHOLDER})`
          : `${val[i].column} ${Operator[key]} (${PLACEHOLDER}, ${PLACEHOLDER}) ${AND} `;
      values.push(...val[i].value);
    }
    return [optionStr, values];
  } else {
    if (!Array.isArray(val.value) || val.value.length !== 2) {
      throw ColumnValueError('in/ni option value should be a two-element array!');
    }
    return [`${val.column} ${Operator[key]} (${PLACEHOLDER}, ${PLACEHOLDER})`, val.value];
  }
};

// in|ni
// const inAndNiOpFunc = (params: TOption): OpFuncRet => {
//   if (!(params instanceof Array) || params.length !== 3) {
//     throw OptionError(`IN or NOT IN option is an array with 3 elements!`);
//   }
//   if (!(params[2] instanceof Array) || params[2].length === 0) {
//     throw ColumnValueError(`${params[0]} operator's column value need a non-empty array!`);
//   }
//   let optionStr: string = `${String(params[1])} ${params[0]} (`;
//   for (let _index = 0; _index < params[2].length; _index++) {
//     optionStr += _index !== params[2].length - 1 ? `${PLACEHOLDER}, ` : `${PLACEHOLDER})`;
//   }
//   // optionStr = optionStr.replace(/,\s$/, '') + ')';
//   return [optionStr, [...params[2]]];
// };

// or
const orOpFunc = (key: OrOperator, val: OrOptionValue[]): OpFuncRet => {
  if (!Array.isArray(val)) {
    throw OptionError('or option value should be an array!');
  }
  if (val.length < 2) {
    throw OptionError('or option array should at least have two elements!');
  }
  let optionStr: string = '';
  const values: (string | number)[] = [];
  for (let i = 0; i < val.length; i++) {
    const item = val[i];
    const key = Object.keys(item)[0];
    switch (key) {
      case SingleOperator.eq:
      case SingleOperator.ge:
      case SingleOperator.gt:
      case SingleOperator.le:
      case SingleOperator.lt:
      case SingleOperator.ne:
      case SingleOperator.like:
        item[key];
        const [_str, _values] = commonOpFunc(key, item[key] as SingleOptionValue);
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
    optionStr +=
      i === val.length - 1
        ? `${val[i].column} ${Operator[key]} (${PLACEHOLDER}, ${PLACEHOLDER})`
        : `${val[i].column} ${Operator[key]} (${PLACEHOLDER}, ${PLACEHOLDER}) ${AND} `;
    values.push(...val[i].value);
  }
  return [optionStr, values];
};

// or
const orOpFunc = (params: TOrOption): OpFuncRet => {
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
      case Operator.eq:
      case Operator.gt:
      case Operator.lt:
      case Operator.ge:
      case Operator.le:
      case Operator.ne:
      case Operator.like:
        const [_str1, _values1] = commonOpFunc(element);
        optionStr += _str1;
        optionValues.push(..._values1);
        break;
      case Operator.bw:
        const [_str2, _values2] = bwOpFunc(element);
        optionStr += _str2;
        optionValues.push(..._values2);
        break;
      case Operator.in:
      case Operator.ni:
        const [_str3, _values3] = inAndNiOpFunc(element);
        optionStr += _str3;
        optionValues.push(..._values3);
        break;
      case Operator.or:
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
