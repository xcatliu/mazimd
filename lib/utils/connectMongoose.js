"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config_1 = require("../config");
function default_1() {
    mongoose.Promise = global.Promise;
    mongoose.connect(config_1.default.db, (err) => {
        if (err) {
            console.error(`connect to ${config_1.default.db} error: ${err.message}`);
            process.exit(1);
        }
    });
}
exports.default = default_1;
