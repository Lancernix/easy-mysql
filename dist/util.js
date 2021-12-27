"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escape = exports.literal = void 0;
var mysql2_1 = require("mysql2");
Object.defineProperty(exports, "escape", { enumerable: true, get: function () { return mysql2_1.escape; } });
/**
 * check basic format and return the literal of mysql build-in function
 * @param params function literal
 * @returns formatted function literal
 */
var literal = function (params) {
    var funcReg = /^(?:[A-Za-z]+_?)*[A-Za-z]+\(.*\)$/;
    // check params foramt
    if (!funcReg.test(params)) {
        throw new Error('params format is incorrect!');
    }
    return params.replace(/^[A-Za-z_]+(?=\(.*\)$)/, function (funcName) { return funcName.toUpperCase(); });
};
exports.literal = literal;
