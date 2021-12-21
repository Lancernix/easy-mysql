"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMoreElementArray = exports.checkTwoElementArray = exports.checkEmptyArray = exports.checkEmptyPlainObject = exports.checkPlainObject = void 0;
/**
 * util functions
 */
var lodash_1 = require("lodash");
var checkPlainObject = function (key, value) {
    if (!(0, lodash_1.isPlainObject)(value)) {
        throw new Error("".concat(key, "'s value should be a plain object!"));
    }
};
exports.checkPlainObject = checkPlainObject;
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
exports.checkTwoElementArray = checkTwoElementArray;
var checkMoreElementArray = function (key, value) {
    if (!Array.isArray(value) || value.length < 2) {
        throw new Error("".concat(key, "'s value should be an array with 2 elements or more!"));
    }
};
exports.checkMoreElementArray = checkMoreElementArray;
