"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EOperator = exports.PLACEHOLDER = exports.AND = exports.ColumnValueError = exports.OperatorError = exports.OptionError = void 0;
/**
 * type define
 */
exports.AND = 'AND';
exports.PLACEHOLDER = '?';
var EOperator;
(function (EOperator) {
    EOperator["eq"] = "=";
    EOperator["ne"] = "!=";
    EOperator["gt"] = ">";
    EOperator["lt"] = "<";
    EOperator["ge"] = ">=";
    EOperator["le"] = "<=";
    EOperator["like"] = "LIKE";
    EOperator["bw"] = "BETWEEN";
    EOperator["in"] = "IN";
    EOperator["ni"] = "NOT IN";
    EOperator["or"] = "OR";
})(EOperator = exports.EOperator || (exports.EOperator = {}));
