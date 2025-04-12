"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = exports.isServerError = exports.isNetworkError = exports.shouldRetryRequest = void 0;
const axios_1 = require("axios");
/**
 * Verifica se um erro é elegível para retry baseado na configuração
 */
const shouldRetryRequest = (error, config) => {
    if (config.shouldRetry) {
        return config.shouldRetry(error);
    }
    // Comportamento padrão: retry em erros de rede ou servidor (5xx)
    return (0, exports.isNetworkError)(error) || (0, exports.isServerError)(error);
};
exports.shouldRetryRequest = shouldRetryRequest;
/**
 * Verifica se é um erro de rede (sem resposta do servidor)
 */
const isNetworkError = (error) => {
    return error instanceof axios_1.AxiosError && !error.response;
};
exports.isNetworkError = isNetworkError;
/**
 * Verifica se é um erro de servidor (5xx)
 */
const isServerError = (error) => {
    var _a;
    return error instanceof axios_1.AxiosError && ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) ? error.response.status >= 500 : false;
};
exports.isServerError = isServerError;
/**
 * Cria uma promise que resolve após um delay específico
 */
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
exports.delay = delay;
