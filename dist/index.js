"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("./client");
var util_1 = require("./util");
process.on('unhandledRejection', function (reason, p) {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
exports.default = {
    Client: client_1.default,
    literal: util_1.literal,
    escape: util_1.escape,
};
