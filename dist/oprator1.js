"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orOpFunc = exports.inAndNiOpFunc = exports.bwOpFunc = exports.commonOpFunc = void 0;
var typing_1 = require("./typing");
// eq|gt|lt|ge|le|ne|like
var commonOpFunc = function (key, val) {
    if (Array.isArray(val)) {
        if (!val.length) {
            throw new Error('option array should not be empty!');
        }
        var optionStr = '';
        var values = [];
        for (var i = 0; i < val.length; i++) {
            optionStr +=
                i === val.length - 1
                    ? "".concat(val[i].column, " ").concat(typing_1.Operator[key], " ").concat(typing_1.PLACEHOLDER)
                    : "".concat(val[i].column, " ").concat(typing_1.Operator[key], " ").concat(typing_1.PLACEHOLDER, " ").concat(typing_1.AND, " ");
            values.push(val[i].value);
        }
        return [optionStr, values];
    }
    else {
        return ["".concat(val.column, " ").concat(typing_1.Operator[key], " ").concat(typing_1.PLACEHOLDER), [val.value]];
    }
};
exports.commonOpFunc = commonOpFunc;
// bw
var bwOpFunc = function (key, val) {
    if (Array.isArray(val)) {
        if (!val.length) {
            throw new Error('option array should not be empty!');
        }
        var optionStr = '';
        var values = [];
        for (var i = 0; i < val.length; i++) {
            optionStr +=
                i === val.length - 1
                    ? "".concat(val[i].column, " ").concat(typing_1.Operator[key], " ").concat(typing_1.PLACEHOLDER, " ").concat(typing_1.AND, " ").concat(typing_1.PLACEHOLDER)
                    : "".concat(val[i].column, " ").concat(typing_1.Operator[key], " ").concat(typing_1.PLACEHOLDER, " ").concat(typing_1.AND, " ").concat(typing_1.PLACEHOLDER, " ").concat(typing_1.AND, " ");
            values.push.apply(values, val[i].value);
        }
        return [optionStr, values];
    }
    else {
        if (!Array.isArray(val.value) || val.value.length !== 2) {
            throw new Error('between option value should be a two-element array!');
        }
        return ["".concat(val.column, " ").concat(typing_1.Operator[key], " ").concat(typing_1.PLACEHOLDER, " ").concat(typing_1.AND, " ").concat(typing_1.PLACEHOLDER), val.value];
    }
};
exports.bwOpFunc = bwOpFunc;
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
var inAndNiOpFunc = function (key, val) {
    if (Array.isArray(val)) {
        if (!val.length) {
            throw new Error('option array should not be empty!');
        }
        var optionStr = '';
        var values = [];
        for (var i = 0; i < val.length; i++) {
            optionStr +=
                i === val.length - 1
                    ? "".concat(val[i].column, " ").concat(typing_1.Operator[key], " (").concat(typing_1.PLACEHOLDER, ", ").concat(typing_1.PLACEHOLDER, ")")
                    : "".concat(val[i].column, " ").concat(typing_1.Operator[key], " (").concat(typing_1.PLACEHOLDER, ", ").concat(typing_1.PLACEHOLDER, ") ").concat(typing_1.AND, " ");
            values.push.apply(values, val[i].value);
        }
        return [optionStr, values];
    }
    else {
        if (!Array.isArray(val.value) || val.value.length !== 2) {
            throw new Error('in/ni option value should be a two-element array!');
        }
        return ["".concat(val.column, " ").concat(typing_1.Operator[key], " (").concat(typing_1.PLACEHOLDER, ", ").concat(typing_1.PLACEHOLDER, ")"), val.value];
    }
};
exports.inAndNiOpFunc = inAndNiOpFunc;
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
var orOpFunc = function (val) {
    if (!Array.isArray(val) || val.length < 2) {
        throw new Error('or option should be an array with 2 elements or more!');
    }
    var optionStr = '(';
    var values = [];
    for (var i = 0; i < val.length; i++) {
        var keyArr = Object.keys(val[i]);
        if (keyArr.length !== 1) {
            throw new Error('object should have only one key in or option array!');
        }
        var key = keyArr[0];
        switch (key) {
            case typing_1.SingleOperator.eq:
            case typing_1.SingleOperator.ge:
            case typing_1.SingleOperator.gt:
            case typing_1.SingleOperator.le:
            case typing_1.SingleOperator.lt:
            case typing_1.SingleOperator.ne:
            case typing_1.SingleOperator.like:
                var valueCommon = val[i][key];
                if (Array.isArray(valueCommon)) {
                    throw new Error("operator's value is not array in or option!");
                }
                else {
                    var _a = commonOpFunc(key, valueCommon), _str1 = _a[0], _values1 = _a[1];
                    optionStr += _str1;
                    values.push.apply(values, _values1);
                }
                break;
            case typing_1.MultiOperator.bw:
                var valueBw = val[i][key];
                if (Array.isArray(valueBw)) {
                    throw new Error("operator's value is not array in or option!");
                }
                else {
                    var _b = bwOpFunc(key, valueBw), _str2 = _b[0], _values2 = _b[1];
                    optionStr += _str2;
                    values.push.apply(values, _values2);
                }
                break;
            case typing_1.MultiOperator.in:
            case typing_1.MultiOperator.ni:
                var valueI = val[i][key];
                if (Array.isArray(valueI)) {
                    throw new Error("operator's value is not array in or option!");
                }
                else {
                    var _c = bwOpFunc(key, valueI), _str3 = _c[0], _values3 = _c[1];
                    optionStr += _str3;
                    values.push.apply(values, _values3);
                }
                break;
            default:
                throw new Error("".concat(key, " is not a valid operator in or option!"));
        }
        optionStr += i === val.length - 1 ? ')' : " ".concat(typing_1.OR, " ");
    }
    console.log(optionStr);
    console.log(values);
    return [optionStr, values];
};
exports.orOpFunc = orOpFunc;
