import {
  TOption,
  OpFuncRet,
  PLACEHOLDER,
  AND,
  OR,
  TOrOption,
  Operator,
  SingleOptionValue,
  SingleOperator,
  MultiOptionValue,
  MultiOperator,
  OrOptionValue,
} from './typing';

// eq|gt|lt|ge|le|ne|like
const commonOpFunc = (key: SingleOperator, val: SingleOptionValue | SingleOptionValue[]): OpFuncRet => {
  if (Array.isArray(val)) {
    if (!val.length) {
      throw new Error('option array should not be empty!');
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
      throw new Error('option array should not be empty!');
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
      throw new Error('between option value should be a two-element array!');
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
      throw new Error('option array should not be empty!');
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
      throw new Error('in/ni option value should be a two-element array!');
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
const orOpFunc = (val: Partial<OrOptionValue>[]): OpFuncRet => {
  if (!Array.isArray(val) || val.length < 2) {
    throw new Error('or option should be an array with 2 elements or more!');
  }
  let optionStr: string = '(';
  const values: (string | number)[] = [];
  for (let i = 0; i < val.length; i++) {
    const keyArr = Object.keys(val[i]);
    if (keyArr.length !== 1) {
      throw new Error('object should have only one key in or option array!');
    }
    const key = keyArr[0];
    switch (key) {
      case SingleOperator.eq:
      case SingleOperator.ge:
      case SingleOperator.gt:
      case SingleOperator.le:
      case SingleOperator.lt:
      case SingleOperator.ne:
      case SingleOperator.like:
        const valueCommon = (val[i] as Record<SingleOperator, SingleOptionValue | SingleOptionValue[]>)[key];
        if (Array.isArray(valueCommon)) {
          throw new Error(`operator's value is not array in or option!`);
        } else {
          const [_str1, _values1] = commonOpFunc(key, valueCommon);
          optionStr += _str1;
          values.push(..._values1);
        }
        break;
      case MultiOperator.bw:
        const valueBw = (val[i] as Record<MultiOperator, MultiOptionValue | MultiOptionValue[]>)[key];
        if (Array.isArray(valueBw)) {
          throw new Error(`operator's value is not array in or option!`);
        } else {
          const [_str2, _values2] = bwOpFunc(key, valueBw);
          optionStr += _str2;
          values.push(..._values2);
        }
        break;
      case MultiOperator.in:
      case MultiOperator.ni:
        const valueI = (val[i] as Record<MultiOperator, MultiOptionValue | MultiOptionValue[]>)[key];
        if (Array.isArray(valueI)) {
          throw new Error(`operator's value is not array in or option!`);
        } else {
          const [_str3, _values3] = bwOpFunc(key, valueI);
          optionStr += _str3;
          values.push(..._values3);
        }
        break;
      default:
        throw new Error(`${key} is not a valid operator in or option!`);
    }
    optionStr += i === val.length - 1 ? ')' : ` ${OR} `;
  }
  console.log(optionStr);
  console.log(values);
  return [optionStr, values];
};

export { commonOpFunc, bwOpFunc, inAndNiOpFunc, orOpFunc };
