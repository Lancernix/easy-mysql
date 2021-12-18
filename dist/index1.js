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
Object.defineProperty(exports, "__esModule", { value: true });
var mysql2_1 = require("mysql2");
var typing_1 = require("./typing");
var option_1 = require("./option");
var MySQLClient = /** @class */ (function () {
    function MySQLClient(config) {
        this.pool = (0, mysql2_1.createPool)(config);
    }
    // 内部调用查询函数
    MySQLClient.prototype._query = function (sql, values) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.pool.promise().execute(sql, values)];
            });
        });
    };
    MySQLClient.prototype.select = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var table, column, where, order, _a, limit, _b, offset, sql, columnStr, whereStr, optionValues, orderStr, limitStr, _c, rows, _fields;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        table = params.table, column = params.column, where = params.where, order = params.order, _a = params.limit, limit = _a === void 0 ? 1 : _a, _b = params.offset, offset = _b === void 0 ? 0 : _b;
                        if (table === void 0) {
                            throw Error('table params is required!');
                        }
                        // columns
                        columnStr = (0, option_1.getColumns)(column);
                        // order
                        orderStr = (0, option_1.getOrder)(order);
                        // limit
                        limitStr = (0, option_1.getLimit)(offset, limit);
                        // where
                        whereStr = (0, option_1.getWhere)(where).str;
                        // optionValues
                        optionValues = (0, option_1.getWhere)(where).arr;
                        // prepared statement
                        sql = "".concat(typing_1.SELECT, " ").concat(columnStr, " ").concat(typing_1.FROM, " ").concat(table).concat(whereStr).concat(orderStr).concat(limitStr);
                        console.log(sql);
                        console.log(optionValues);
                        return [4 /*yield*/, this._query(sql, optionValues)];
                    case 1:
                        _c = _d.sent(), rows = _c[0], _fields = _c[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    return MySQLClient;
}());
exports.default = MySQLClient;
