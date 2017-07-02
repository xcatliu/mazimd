"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("superagent");
const config_1 = require("../config");
function getAllThemes(callback) {
    request
        .get(`${config_1.default.api_origin}/themes`)
        .end((err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, res.body);
    });
}
exports.getAllThemes = getAllThemes;
function getThemeFromId(id, callback) {
    request
        .get(`${config_1.default.api_origin}/themes/${id}`)
        .end((err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, res.body);
    });
}
exports.getThemeFromId = getThemeFromId;
