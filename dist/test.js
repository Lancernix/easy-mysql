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
var index_1 = require("./index");
var client = new index_1.default({
    host: '101.42.92.75',
    port: 3306,
    database: 'sql_exam',
    user: 'sqladminuser',
    password: '123sql_ADMIN_user456',
    // dateStrings: true,
});
var test = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.select({
                    table: 'issue',
                    column: ['issue_id', 'system', 'directory_id', 'issue_title', 'create_time'],
                    where: {
                        // eq: {
                        //   // directory_id: 'eas4e3g1g4vs',
                        //   // create_user_id: '01412009',
                        // },
                        gt: { create_time: new Date('2021-11-15 17:40:35') },
                        // ne: {},
                        // bw: { create_time: [new Date('2021-11-15 17:30:01'), new Date('2021-11-15 17:45:01')] },
                        // in: { issue_id: [50, 55] },
                        or: [{ eq: { directory_id: 'goik7yndy3p9' } }, { eq: { directory_id: 'eas4e3g1g4vs' } }],
                    },
                    order: { issue_id: 'asc', issue_title: 'desc' },
                    limit: 10,
                })];
            case 1:
                res = _a.sent();
                console.log(res);
                return [2 /*return*/];
        }
    });
}); };
var test1 = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.delete({
                    table: 'issue',
                    // where: {
                    //   eq: { issue_id: 50 },
                    // },
                })];
            case 1:
                res = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// test();
test1();
