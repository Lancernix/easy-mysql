"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orOpFunc = exports.inAndNiOpFunc = exports.bwOpFunc = exports.commonOpFunc = void 0;
// eq|gt|lt|ge|le|ne|like
var commonOpFunc = function (params) {
    if (!(params instanceof Array) || params.length !== 3) {
        throw OptionError("common option is an array with 3 elements!");
    }
    if (params[2] instanceof Array) {
        throw ColumnValueError("".concat(params[0], " operator's column value is not a array!"));
    }
    var optionStr = "".concat(String(params[1]), " ").concat(params[0], " ").concat(PLACEHOLDER);
    return [optionStr, [params[2]]];
};
exports.commonOpFunc = commonOpFunc;
// bw
var bwOpFunc = function (params) {
    if (!(params instanceof Array) || params.length !== 3) {
        throw OptionError("BETWEEN option is an array with 3 elements!");
    }
    if (!(params[2] instanceof Array) || params[2].length !== 2) {
        throw ColumnValueError("".concat(params[0], " operator's column value should be a array with 2 element!"));
    }
    var optionStr = "".concat(String(params[1]), " ").concat(params[0], " ").concat(PLACEHOLDER, " ").concat(AND, " ").concat(PLACEHOLDER);
    return [optionStr, __spreadArray([], params[2], true)];
};
exports.bwOpFunc = bwOpFunc;
// in|ni
var inAndNiOpFunc = function (params) {
    if (!(params instanceof Array) || params.length !== 3) {
        throw OptionError("IN or NOT IN option is an array with 3 elements!");
    }
    if (!(params[2] instanceof Array) || params[2].length === 0) {
        throw ColumnValueError("".concat(params[0], " operator's column value need a non-empty array!"));
    }
    var optionStr = "".concat(String(params[1]), " ").concat(params[0], " (");
    for (var _index = 0; _index < params[2].length; _index++) {
        optionStr += _index !== params[2].length - 1 ? "".concat(PLACEHOLDER, ", ") : "".concat(PLACEHOLDER, ")");
    }
    // optionStr = optionStr.replace(/,\s$/, '') + ')';
    return [optionStr, __spreadArray([], params[2], true)];
};
exports.inAndNiOpFunc = inAndNiOpFunc;
// or
var orOpFunc = function (params) {
    if (!(params instanceof Array) || params.length < 3) {
        throw OptionError("OR option is an array with least 3 elements!");
    }
    var optionStr = '(';
    var optionValues = [];
    for (var _index = 1; _index < params.length; _index++) {
        var element = params[_index];
        if (!(element instanceof Array)) {
            throw OptionError("OR option rest elements should be a TOption array!");
        }
        switch (element[0]) {
            case EOperator.eq:
            case EOperator.gt:
            case EOperator.lt:
            case EOperator.ge:
            case EOperator.le:
            case EOperator.ne:
            case EOperator.like:
                var _a = commonOpFunc(element), _str1 = _a[0], _values1 = _a[1];
                optionStr += _str1;
                optionValues.push.apply(optionValues, _values1);
                break;
            case EOperator.bw:
                var _b = bwOpFunc(element), _str2 = _b[0], _values2 = _b[1];
                optionStr += _str2;
                optionValues.push.apply(optionValues, _values2);
                break;
            case EOperator.in:
            case EOperator.ni:
                var _c = inAndNiOpFunc(element), _str3 = _c[0], _values3 = _c[1];
                optionStr += _str3;
                optionValues.push.apply(optionValues, _values3);
                break;
            case EOperator.or:
                throw OperatorError("nested OR is not allowed!");
            default:
                throw OperatorError("".concat(element[0], " is not a valid operator!"));
        }
        optionStr += _index !== params[2].length - 1 ? ' or ' : ')';
    }
    // optionStr = optionStr.replace(/\sor\s$/, '') + ')';
    return [optionStr, optionValues];
};
exports.orOpFunc = orOpFunc;
