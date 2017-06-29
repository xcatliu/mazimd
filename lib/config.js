"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: 8100,
    api_origin: 'http://api.mazimd.com',
    cdn_origin: process.env.NODE_ENV === 'development' ? 'http://localhost:8100/public' : 'http://cdn.mazimd.com',
};
