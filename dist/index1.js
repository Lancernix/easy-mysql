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
var oprator1_1 = require("./oprator1");
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
    // getConnection() {
    //   const onErr = (err: NodeJS.ErrnoException) => {
    //     err.name = 'MySQLConnectionError';
    //     throw err;
    //   };
    //   const onConnection = params => {
    //     return;
    //   };
    //   return this.pool.getConnection();
    // }
    MySQLClient.prototype.select = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var table, columns, options, orders, _a, limit, _b, offset, sql, columnStr, where, optionValues, order, limitStr, i, item, _c, _str, _values, _d, _strBw, _valuesBw, _e, _strI, _valuesI, _f, _strOr, _valuesOr, _g, rows, fields;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        table = params.table, columns = params.columns, options = params.options, orders = params.orders, _a = params.limit, limit = _a === void 0 ? 1 : _a, _b = params.offset, offset = _b === void 0 ? 0 : _b;
                        optionValues = [];
                        // columns
                        columnStr = typeof columns === undefined || !(columns === null || columns === void 0 ? void 0 : columns.length) ? '*' : columns.join(', ');
                        // order
                        if (typeof orders === undefined || !(orders === null || orders === void 0 ? void 0 : orders.length)) {
                            order = '';
                        }
                        else {
                            order = orders.reduce(function (item) { return " ".concat(item[0], " ").concat(item[1].toUpperCase, ","); }, ' ORDER BY').replace(/,$/, '');
                        }
                        // limit
                        limitStr = " LIMIT ".concat(offset, ", ").concat(limit);
                        // where
                        if (typeof options === undefined || !(options === null || options === void 0 ? void 0 : options.length)) {
                            where = '';
                        }
                        else {
                            where = ' WHERE ';
                            for (i = 0; i < options.length; i++) {
                                if (!(options[i] instanceof Array) || !options[i].length) {
                                    throw (0, typing_1.OptionError)('every option should be a non-empty array!');
                                }
                                item = options[i];
                                switch (item[0]) {
                                    case typing_1.EOperator.eq:
                                    case typing_1.EOperator.gt:
                                    case typing_1.EOperator.lt:
                                    case typing_1.EOperator.ge:
                                    case typing_1.EOperator.le:
                                    case typing_1.EOperator.ne:
                                    case typing_1.EOperator.like:
                                        _c = (0, oprator1_1.commonOpFunc)(item), _str = _c[0], _values = _c[1];
                                        where += _str;
                                        optionValues.push.apply(optionValues, _values);
                                        break;
                                    case typing_1.EOperator.bw:
                                        _d = (0, oprator1_1.bwOpFunc)(item), _strBw = _d[0], _valuesBw = _d[1];
                                        where += _strBw;
                                        optionValues.push.apply(optionValues, _valuesBw);
                                        break;
                                    case typing_1.EOperator.in:
                                    case typing_1.EOperator.ni:
                                        _e = (0, oprator1_1.inAndNiOpFunc)(item), _strI = _e[0], _valuesI = _e[1];
                                        where += _strI;
                                        optionValues.push.apply(optionValues, _valuesI);
                                        break;
                                    case typing_1.EOperator.or:
                                        _f = (0, oprator1_1.orOpFunc)(item), _strOr = _f[0], _valuesOr = _f[1];
                                        where += _strI;
                                        optionValues.push.apply(optionValues, _valuesI);
                                        break;
                                    default:
                                        throw (0, typing_1.OperatorError)("".concat(item[0], " is not a valid operator!"));
                                }
                                i !== options.length - 1 && (where += ' AND ');
                            }
                        }
                        // prepared statement
                        sql = "SELECT ".concat(columnStr, " FROM ").concat(table).concat(where).concat(order).concat(limitStr);
                        console.log(sql);
                        console.log(optionValues);
                        return [4 /*yield*/, this._query(sql, optionValues)];
                    case 1:
                        _g = _h.sent(), rows = _g[0], fields = _g[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    return MySQLClient;
}());
exports.default = MySQLClient;
