"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var clause_1 = require("./clause");
var constant_1 = require("./constant");
var Query = /** @class */ (function () {
    function Query() {
    }
    /**
     * basic query method, subclass should override this method
     * @param _sql (prepared) sql statement
     * @param _values values corresponding to placeholders
     * @returns sql execute result
     */
    Query.prototype._query = function (_sql, _values) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('subclass must override this method');
            });
        });
    };
    /**
     * query method
     * @param sql (prepared) sql statement
     * @param values values corresponding to placeholders
     * @returns sql execute result
     */
    Query.prototype.query = function (sql, values) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._query(sql, values)];
            });
        });
    };
    /**
     * select method
     * @param params a object including table、column、where、order、limit and offset attributes
     * @returns sql execute result
     */
    Query.prototype.select = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var table, column, where, order, _a, limit, _b, offset, columnStr, orderStr, limitStr, _c, whereStr, optionValues, sql, _d, rows, _fields, error_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        table = params.table, column = params.column, where = params.where, order = params.order, _a = params.limit, limit = _a === void 0 ? 1 : _a, _b = params.offset, offset = _b === void 0 ? 0 : _b;
                        columnStr = (0, clause_1.getColumns)(column);
                        orderStr = (0, clause_1.getOrder)(order);
                        limitStr = (0, clause_1.getLimit)(offset, limit);
                        _c = (0, clause_1.getWhere)(where), whereStr = _c.str, optionValues = _c.arr;
                        sql = "".concat(constant_1.SELECT, " ").concat(columnStr, " ").concat(constant_1.FROM, " ").concat(table).concat(whereStr).concat(orderStr).concat(limitStr, ";");
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._query(sql, optionValues)];
                    case 2:
                        _d = _e.sent(), rows = _d[0], _fields = _d[1];
                        return [2 /*return*/, rows];
                    case 3:
                        error_1 = _e.sent();
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * select count method
     * @param params a object including table and where attributes
     * @returns row count
     */
    Query.prototype.count = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var table, where, whereStr, optionValues, sql, _a, rows, _fields, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        table = params.table, where = params.where;
                        whereStr = (0, clause_1.getWhere)(where).str;
                        optionValues = (0, clause_1.getWhere)(where).arr;
                        sql = "".concat(constant_1.SELECT, " ").concat(constant_1.COUNT, " ").concat(constant_1.FROM, " ").concat(table).concat(whereStr, ";");
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._query(sql, optionValues)];
                    case 2:
                        _a = _b.sent(), rows = _a[0], _fields = _a[1];
                        return [2 /*return*/, rows[0]["".concat(constant_1.COUNT)]];
                    case 3:
                        error_2 = _b.sent();
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * insert method
     * @param params a object including table and value attributes
     * @returns sql execute result
     */
    Query.prototype.insert = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var table, value, _a, columnStr, valStr, valArr, sql, _b, rows, _fields, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        table = params.table, value = params.value;
                        _a = (0, clause_1.getColAndVals)(value), columnStr = _a.columnStr, valStr = _a.valStr, valArr = _a.valArr;
                        sql = "".concat(constant_1.INSERT, " ").concat(constant_1.INTO, " ").concat(table, " ").concat(columnStr, " ").concat(constant_1.VALUES, " ").concat(valStr, ";");
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._query(sql, valArr)];
                    case 2:
                        _b = _c.sent(), rows = _b[0], _fields = _b[1];
                        return [2 /*return*/, rows];
                    case 3:
                        error_3 = _c.sent();
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * update method
     * @param params a object including table、value and where attributes
     * @returns sql execute result
     */
    Query.prototype.update = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var table, value, where, _a, setStr, setVal, _b, whereStr, optionValues, sql, valArr, _c, rows, _fields, error_4;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        table = params.table, value = params.value, where = params.where;
                        _a = (0, clause_1.getSet)(value), setStr = _a.setStr, setVal = _a.setVal;
                        _b = (0, clause_1.getWhere)(where), whereStr = _b.str, optionValues = _b.arr;
                        sql = "".concat(constant_1.UPDATE, " ").concat(table, " ").concat(constant_1.SET, " ").concat(setStr).concat(whereStr, ";");
                        valArr = __spreadArray(__spreadArray([], setVal, true), optionValues, true);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._query(sql, valArr)];
                    case 2:
                        _c = _d.sent(), rows = _c[0], _fields = _c[1];
                        return [2 /*return*/, rows];
                    case 3:
                        error_4 = _d.sent();
                        throw error_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * delete method
     * @param params a object including table and where attributes
     * @returns sql execute result
     */
    Query.prototype.delete = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var table, where, _a, whereStr, optionValues, sql, _b, rows, _fields, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        table = params.table, where = params.where;
                        _a = (0, clause_1.getWhere)(where), whereStr = _a.str, optionValues = _a.arr;
                        sql = "".concat(constant_1.DELETE, " ").concat(constant_1.FROM, " ").concat(table).concat(whereStr, ";");
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._query(sql, optionValues)];
                    case 2:
                        _b = _c.sent(), rows = _b[0], _fields = _b[1];
                        return [2 /*return*/, rows];
                    case 3:
                        error_5 = _c.sent();
                        throw error_5;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Query;
}());
exports.default = Query;
