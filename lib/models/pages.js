"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("superagent");
const config_1 = require("../config");
function getPageFromId(id, callback) {
    request
        .get(`${config_1.default.api_origin}/pages/${id}`)
        .end((err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, res.body);
    });
}
exports.getPageFromId = getPageFromId;
