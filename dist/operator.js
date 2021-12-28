"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orOpFunc = exports.inAndNiOpFunc = exports.bwOpFunc = exports.commonOpFunc = exports.checkEmptyArray = exports.checkEmptyPlainObject = void 0;
/**
 * operator handlers
 */
var lodash_1 = require("lodash");
var typing_1 = require("./typing");
var constant_1 = require("./constant");
// eq|gt|lt|ge|le|ne|like
var commonOpFunc = function (op, val) {
    checkPlainObject(op, val);
    var optionStr = '';
    var values = [];
    var keyArr = Object.keys(val);
    if (keyArr.length) {
        for (var i = 0; i < keyArr.length; i++) {
            var key = keyArr[i];
            optionStr +=
                i === keyArr.length - 1
                    ? "".concat(key, " ").concat(typing_1.Operator[op], " ").concat(constant_1.PLACEHOLDER)
                    : "".concat(key, " ").concat(typing_1.Operator[op], " ").concat(constant_1.PLACEHOLDER, " ").concat(constant_1.AND, " ");
            values.push(val[key]);
        }
    }
    return [optionStr, values];
};
exports.commonOpFunc = commonOpFunc;
// bw
var bwOpFunc = function (op, val) {
    checkPlainObject(op, val);
    var optionStr = '';
    var values = [];
    var keyArr = Object.keys(val);
    if (keyArr.length) {
        for (var i = 0; i < keyArr.length; i++) {
            var key = keyArr[i];
            checkTwoElementArray(key, val[key]);
            optionStr +=
                i === keyArr.length - 1
                    ? "".concat(key, " ").concat(typing_1.Operator[op], " ").concat(constant_1.PLACEHOLDER, " ").concat(constant_1.AND, " ").concat(constant_1.PLACEHOLDER)
                    : "".concat(key, " ").concat(typing_1.Operator[op], " ").concat(constant_1.PLACEHOLDER, " ").concat(constant_1.AND, " ").concat(constant_1.PLACEHOLDER, " ").concat(constant_1.AND, " ");
            values.push.apply(values, val[key]);
        }
    }
    return [optionStr, values];
};
exports.bwOpFunc = bwOpFunc;
// in|ni
var inAndNiOpFunc = function (op, val) {
    // 占位符组装
    var composePlaceholder = function (params) {
        return Array(params.length).fill(constant_1.PLACEHOLDER).join(', ');
    };
    checkPlainObject(op, val);
    var optionStr = '';
    var values = [];
    var keyArr = Object.keys(val);
    if (keyArr.length) {
        for (var i = 0; i < keyArr.length; i++) {
            var key = keyArr[i];
            (0, exports.checkEmptyArray)(key, val[key]);
            optionStr +=
                i === keyArr.length - 1
                    ? "".concat(key, " ").concat(typing_1.Operator[op], " (").concat(composePlaceholder(val[key]), ")")
                    : "".concat(key, " ").concat(typing_1.Operator[op], " (").concat(composePlaceholder(val[key]), ") ").concat(constant_1.AND, " ");
            values.push.apply(values, val[key]);
        }
    }
    return [optionStr, values];
};
exports.inAndNiOpFunc = inAndNiOpFunc;
// or
var orOpFunc = function (val) {
    checkMoreElementArray('or', val);
    var optionStr = '(';
    var values = [];
    for (var i = 0; i < val.length; i++) {
        var keyArr = Object.keys(val[i]);
        for (var j = 0; j < keyArr.length; j++) {
            var key = keyArr[j];
            switch (key) {
                case typing_1.SingleOperator.eq:
                case typing_1.SingleOperator.ge:
                case typing_1.SingleOperator.gt:
                case typing_1.SingleOperator.le:
                case typing_1.SingleOperator.lt:
                case typing_1.SingleOperator.ne:
                case typing_1.SingleOperator.like:
                    var valueCommon = val[i][key];
                    var _a = commonOpFunc(key, valueCommon), _str1 = _a[0], _values1 = _a[1];
                    optionStr += _str1;
                    values.push.apply(values, _values1);
                    break;
                case typing_1.MultiOperator.bw:
                    var valueBw = val[i][key];
                    var _b = bwOpFunc(key, valueBw), _str2 = _b[0], _values2 = _b[1];
                    optionStr += _str2;
                    values.push.apply(values, _values2);
                    break;
                case typing_1.MultiOperator.in:
                case typing_1.MultiOperator.ni:
                    var valueI = val[i][key];
                    var _c = bwOpFunc(key, valueI), _str3 = _c[0], _values3 = _c[1];
                    optionStr += _str3;
                    values.push.apply(values, _values3);
                    break;
                default:
                    throw new Error("".concat(key, " is not a valid operator in or option!"));
            }
            j !== keyArr.length - 1 && (optionStr += " ".concat(constant_1.AND, " "));
        }
        optionStr += i === val.length - 1 ? ')' : " ".concat(constant_1.OR, " ");
    }
    return [optionStr, values];
};
exports.orOpFunc = orOpFunc;
/**
 * error check
 */
var checkPlainObject = function (key, value) {
    if (!(0, lodash_1.isPlainObject)(value)) {
        throw new Error("".concat(key, "'s value should be a plain object!"));
    }
};
var checkEmptyPlainObject = function (key, value) {
    if (!(0, lodash_1.isPlainObject)(value) || !Object.keys(value).length) {
        throw new Error("".concat(key, "'s value should be a non-empty plain object!"));
    }
};
exports.checkEmptyPlainObject = checkEmptyPlainObject;
var checkEmptyArray = function (key, value) {
    if (!Array.isArray(value) || !value.length) {
        throw new Error("".concat(key, "'s value should be a non-empty array!"));
    }
};
exports.checkEmptyArray = checkEmptyArray;
var checkTwoElementArray = function (key, value) {
    if (!Array.isArray(value) || value.length !== 2) {
        throw new Error("".concat(key, "'s value should be an array with 2 elements!"));
    }
};
var checkMoreElementArray = function (key, value) {
    if (!Array.isArray(value) || value.length < 2) {
        throw new Error("".concat(key, "'s value should be an array with 2 elements or more!"));
    }
};
