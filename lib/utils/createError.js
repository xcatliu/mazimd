"use strict";
// https://stackoverflow.com/q/12709074/2777142
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (status, messageOrError) => {
    if (messageOrError instanceof Error) {
        messageOrError.status = status;
        return messageOrError;
    }
    const error = new Error(messageOrError);
    error.status = status;
    return error;
};
