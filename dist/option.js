"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWhere = exports.getLimit = exports.getOrder = exports.getColumns = void 0;
var lodash_1 = require("lodash");
var oprator1_1 = require("./oprator1");
var typing_1 = require("./typing");
var getColumns = function (columns) { return (!(columns === null || columns === void 0 ? void 0 : columns.length) ? '*' : columns.join(', ')); };
exports.getColumns = getColumns;
var getOrder = function (orders) {
    if (!(orders === null || orders === void 0 ? void 0 : orders.length)) {
        return '';
    }
    else {
        return orders
            .reduce(function (res, item) { return res + " ".concat(item[0], " ").concat(item[1].toUpperCase(), ","); }, " ".concat(typing_1.ORDER))
            .replace(/,$/, '');
    }
};
exports.getOrder = getOrder;
var getLimit = function (offset, limit) {
    var offsetTag = offset >= 0 && (0, lodash_1.isInteger)(offset);
    var limitTag = limit >= 0 && (0, lodash_1.isInteger)(limit);
    if (offsetTag && limitTag) {
        return " ".concat(typing_1.LIMIT, " ").concat(offset, ", ").concat(limit, ";");
    }
    else {
        throw new Error("'".concat(typing_1.LIMIT, "' need two positive integer params!"));
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
        result = " ".concat(typing_1.WHRER, " ");
        var keyArr = Object.keys(where);
        for (var i = 0; i < keyArr.length; i++) {
            var key = keyArr[i];
            switch (key) {
                case typing_1.SingleOperator.eq:
                case typing_1.SingleOperator.ge:
                case typing_1.SingleOperator.gt:
                case typing_1.SingleOperator.le:
                case typing_1.SingleOperator.lt:
                case typing_1.SingleOperator.ne:
                case typing_1.SingleOperator.like:
                    var _a = (0, oprator1_1.commonOpFunc)(key, where[key]), _str = _a[0], _values = _a[1];
                    result += _str;
                    optionVals.push.apply(optionVals, _values);
                    break;
                case typing_1.MultiOperator.bw:
                    var _b = (0, oprator1_1.bwOpFunc)(key, where[key]), _strBw = _b[0], _valuesBw = _b[1];
                    result += _strBw;
                    optionVals.push.apply(optionVals, _valuesBw);
                    break;
                case typing_1.MultiOperator.in:
                case typing_1.MultiOperator.ni:
                    var _c = (0, oprator1_1.inAndNiOpFunc)(key, where[key]), _strI = _c[0], _valuesI = _c[1];
                    result += _strI;
                    optionVals.push.apply(optionVals, _valuesI);
                    break;
                case typing_1.OrOperator.or:
                    var _d = (0, oprator1_1.orOpFunc)(where[key]), _strOr = _d[0], _valuesOr = _d[1];
                    result += _strOr;
                    optionVals.push.apply(optionVals, _valuesOr);
                    break;
                default:
                    throw new Error("".concat(key, " is not a valid operator!"));
            }
            i !== keyArr.length - 1 && (result += " ".concat(typing_1.AND, " "));
        }
    }
    return {
        str: result,
        arr: optionVals,
    };
};
exports.getWhere = getWhere;
