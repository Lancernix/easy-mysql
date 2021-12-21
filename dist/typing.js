"use strict";
/**
 * type define
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operator = exports.OrOperator = exports.MultiOperator = exports.SingleOperator = void 0;
// 单值操作符
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
// 双（多）值操作符
var MultiOperator;
(function (MultiOperator) {
    MultiOperator["bw"] = "bw";
    MultiOperator["in"] = "in";
    MultiOperator["ni"] = "ni";
})(MultiOperator = exports.MultiOperator || (exports.MultiOperator = {}));
// OR操作符
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
