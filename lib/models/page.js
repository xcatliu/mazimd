"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const md5 = require("md5");
const PageSchema = new mongoose_1.Schema({
    id: String,
    content: String
});
PageSchema.methods.contentToMd5 = function () {
    return md5(this.content);
};
exports.default = mongoose_1.model('Page', PageSchema);
