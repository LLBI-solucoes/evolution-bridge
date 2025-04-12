"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvolutionBridge = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("./utils");
class EvolutionBridge {
    constructor(config = {}) {
        var _a, _b;
        const { retryConfig } = config, axiosConfig = __rest(config, ["retryConfig"]);
        this.client = axios_1.default.create(axiosConfig);
        this.retryConfig = {
            retries: (_a = retryConfig === null || retryConfig === void 0 ? void 0 : retryConfig.retries) !== null && _a !== void 0 ? _a : 3,
            retryDelay: (_b = retryConfig === null || retryConfig === void 0 ? void 0 : retryConfig.retryDelay) !== null && _b !== void 0 ? _b : 1000,
            shouldRetry: retryConfig === null || retryConfig === void 0 ? void 0 : retryConfig.shouldRetry
        };
        this.setupInterceptors();
    }
    setupInterceptors() {
        this.client.interceptors.request.use((config) => {
            // Adiciona headers padrão se necessário
            config.headers = config.headers || {};
            return config;
        }, (error) => Promise.reject(error));
        this.client.interceptors.response.use((response) => response, (error) => __awaiter(this, void 0, void 0, function* () {
            const config = error.config;
            if (!config || !(0, utils_1.shouldRetryRequest)(error, this.retryConfig)) {
                return Promise.reject(error);
            }
            config.retryCount = config.retryCount || 0;
            if (config.retryCount >= (this.retryConfig.retries || 3)) {
                return Promise.reject(error);
            }
            config.retryCount++;
            yield (0, utils_1.delay)(this.retryConfig.retryDelay || 1000);
            return this.client(config);
        }));
    }
    get(url, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.get(url, config);
        });
    }
    post(url, data, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.post(url, data, config);
        });
    }
    put(url, data, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.put(url, data, config);
        });
    }
    delete(url, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.delete(url, config);
        });
    }
    patch(url, data, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.patch(url, data, config);
        });
    }
}
exports.EvolutionBridge = EvolutionBridge;
__exportStar(require("./types"), exports);
