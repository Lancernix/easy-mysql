"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operator = exports.OrOperator = exports.MultiOperator = exports.SingleOperator = exports.PLACEHOLDER = exports.LIMIT = exports.ORDER = exports.WHRER = exports.OR = exports.AND = exports.INSERT = exports.FROM = exports.SELECT = void 0;
/**
 * constant define
 */
exports.SELECT = 'SELECT';
exports.FROM = 'FROM';
exports.INSERT = 'INSERT';
exports.AND = 'AND';
exports.OR = 'OR';
exports.WHRER = 'WHERE';
exports.ORDER = 'ORDER BY';
exports.LIMIT = 'LIMIT';
exports.PLACEHOLDER = '?';
/**
 * type define
 */
var SingleOperator;
(function (SingleOperator) {
    SingleOperator["eq"] = "eq";
    SingleOperator["ne"] = "ne";
    SingleOperator["gt"] = "gt";
    SingleOperator["lt"] = "lt";
    SingleOperator["ge"] = "ge";
    SingleOperator["le"] = "le";
    SingleOperator["like"] = "like";
})(SingleOperator = exports.SingleOperator || (exports.SingleOperator = {}));
var MultiOperator;
(function (MultiOperator) {
    MultiOperator["bw"] = "bw";
    MultiOperator["in"] = "in";
    MultiOperator["ni"] = "ni";
})(MultiOperator = exports.MultiOperator || (exports.MultiOperator = {}));
var OrOperator;
(function (OrOperator) {
    OrOperator["or"] = "or";
})(OrOperator = exports.OrOperator || (exports.OrOperator = {}));
var Operator;
(function (Operator) {
    Operator["eq"] = "=";
    Operator["ne"] = "!=";
    Operator["gt"] = ">";
    Operator["lt"] = "<";
    Operator["ge"] = ">=";
    Operator["le"] = "<=";
    Operator["like"] = "LIKE";
    Operator["bw"] = "BETWEEN";
    Operator["in"] = "IN";
    Operator["ni"] = "NOT IN";
    Operator["or"] = "OR";
})(Operator = exports.Operator || (exports.Operator = {}));
