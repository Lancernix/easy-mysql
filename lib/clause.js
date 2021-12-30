"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSet = exports.getColAndVals = exports.getWhere = exports.getLimit = exports.getOrder = exports.getColumns = void 0;
/**
 * clause handlers
 * such as column、where and so on
 */
var lodash_1 = require("lodash");
var operator_1 = require("./operator");
var typing_1 = require("./typing");
var constant_1 = require("./constant");
// column handler for select
var getColumns = function (columns) { return (!(columns === null || columns === void 0 ? void 0 : columns.length) ? '*' : columns.join(', ')); };
exports.getColumns = getColumns;
var getOrder = function (order) {
    if (order === void 0 || !Object.keys(order).length) {
        return '';
    }
    else {
        return Object.keys(order)
            .reduce(function (res, item) { return res + " ".concat(item, " ").concat(order[item].toUpperCase(), ","); }, " ".concat(constant_1.ORDER))
            .replace(/,$/, '');
    }
};
exports.getOrder = getOrder;
var getLimit = function (offset, limit) {
    var offsetTag = offset >= 0 && (0, lodash_1.isInteger)(offset);
    var limitTag = limit >= 0 && (0, lodash_1.isInteger)(limit);
    if (offsetTag && limitTag) {
        return " ".concat(constant_1.LIMIT, " ").concat(offset, ", ").concat(limit);
    }
    else {
        throw new Error("'".concat(constant_1.LIMIT, "' need two positive integer params!"));
    }
};
exports.getLimit = getLimit;
var getWhere = function (where) {
    var result;
    var optionVals = [];
    if (where === void 0 || !Object.keys(where).length) {
        result = '';
    }
    else {
        result = " ".concat(constant_1.WHRER, " ");
        var keyArr = Object.keys(where);
        for (var i = 0; i < keyArr.length; i++) {
            var key = keyArr[i];
            var str = void 0;
            var values = void 0;
            switch (key) {
                case typing_1.SingleOperator.eq:
                case typing_1.SingleOperator.ge:
                case typing_1.SingleOperator.gt:
                case typing_1.SingleOperator.le:
                case typing_1.SingleOperator.lt:
                case typing_1.SingleOperator.ne:
                case typing_1.SingleOperator.like:
                    var _a = (0, operator_1.commonOpFunc)(key, where[key]), _str = _a[0], _values = _a[1];
                    str = _str;
                    values = _values;
                    break;
                case typing_1.MultiOperator.bw:
                    var _b = (0, operator_1.bwOpFunc)(key, where[key]), _strBw = _b[0], _valuesBw = _b[1];
                    str = _strBw;
                    values = _valuesBw;
                    break;
                case typing_1.MultiOperator.in:
                case typing_1.MultiOperator.ni:
                    var _c = (0, operator_1.inAndNiOpFunc)(key, where[key]), _strI = _c[0], _valuesI = _c[1];
                    str = _strI;
                    values = _valuesI;
                    break;
                case typing_1.OrOperator.or:
                    var _d = (0, operator_1.orOpFunc)(where[key]), _strOr = _d[0], _valuesOr = _d[1];
                    str = _strOr;
                    values = _valuesOr;
                    break;
                default:
                    throw new Error("".concat(key, " is not a valid operator!"));
            }
            // non-empty
            if (!!str) {
                result += str;
                optionVals.push.apply(optionVals, values);
                i !== keyArr.length - 1 && (result += " ".concat(constant_1.AND, " "));
            }
        }
        result === " ".concat(constant_1.WHRER, " ") && (result = '');
    }
    return {
        str: result,
        arr: optionVals,
    };
};
exports.getWhere = getWhere;
// cols and vals handler for insert
var getColAndVals = function (value) {
    if (Array.isArray(value)) {
        (0, operator_1.checkEmptyArray)('insert', value);
        var keyArr = Object.keys(value[0]);
        var columnStr = '(' + keyArr.join(', ') + ')';
        var valStr = '';
        var valArr = [];
        for (var i = 0; i < value.length; i++) {
            var item = value[i];
            // check if every element of data has the same keys
            if (!(0, lodash_1.isEqual)(keyArr, Object.keys(item))) {
                throw new Error('no same keys');
            }
            var placeholders = Array(keyArr.length).fill(constant_1.PLACEHOLDER);
            valStr += i === value.length - 1 ? "(".concat(placeholders.join(', '), ")") : "(".concat(placeholders.join(', '), "), ");
            valArr.push.apply(valArr, Object.values(item));
        }
        return { columnStr: columnStr, valStr: valStr, valArr: valArr };
    }
    else {
        (0, operator_1.checkEmptyPlainObject)('insert', value);
        var keyArr = Object.keys(value);
        var columnStr = '(' + keyArr.join(', ') + ')';
        var placeholders = Array(keyArr.length).fill(constant_1.PLACEHOLDER);
        var valArr = Object.values(value);
        var valStr = '(' + placeholders.join(', ') + ')';
        return { columnStr: columnStr, valStr: valStr, valArr: valArr };
    }
};
exports.getColAndVals = getColAndVals;
// set string for update
var getSet = function (value) {
    (0, operator_1.checkEmptyPlainObject)('update', value);
    var keyArr = Object.keys(value);
    var setStr = keyArr.reduce(function (res, key) { return res + "".concat(key, " = ").concat(constant_1.PLACEHOLDER, ", "); }, '').replace(/,\s$/, '');
    return { setStr: setStr, setVal: Object.values(value) };
};
exports.getSet = getSet;
