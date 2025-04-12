import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { EvolutionBridgeConfig, RequestConfig, RetryConfig } from '../types';
import { delay, shouldRetryRequest } from '../utils';

export class EvolutionBridge {
    private client: AxiosInstance;
    private retryConfig: RetryConfig;

    constructor(config: EvolutionBridgeConfig = {}) {
        const { retryConfig, ...axiosConfig } = config;

        this.client = axios.create(axiosConfig);
        this.retryConfig = {
            retries: retryConfig?.retries ?? 3,
            retryDelay: retryConfig?.retryDelay ?? 1000,
            shouldRetry: retryConfig?.shouldRetry
        };

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        this.client.interceptors.request.use(
            (config) => {
                // Adiciona headers padrão se necessário
                config.headers = config.headers || {};
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.client.interceptors.response.use(
            (response) => response,
            async (error) => {
                const config = error.config as RequestConfig;

                if (!config || !shouldRetryRequest(error, this.retryConfig)) {
                    return Promise.reject(error);
                }

                config.retryCount = config.retryCount || 0;

                if (config.retryCount >= (this.retryConfig.retries || 3)) {
                    return Promise.reject(error);
                }

                config.retryCount++;

                await delay(this.retryConfig.retryDelay || 1000);
                return this.client(config);
            }
        );
    }

    async get<T = any>(url: string, config?: RequestConfig): Promise<AxiosResponse<T>> {
        return this.client.get<T>(url, config);
    }

    async post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<T>> {
        return this.client.post<T>(url, data, config);
    }

    async put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<T>> {
        return this.client.put<T>(url, data, config);
    }

    async delete<T = any>(url: string, config?: RequestConfig): Promise<AxiosResponse<T>> {
        return this.client.delete<T>(url, config);
    }

    async patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<T>> {
        return this.client.patch<T>(url, data, config);
    }
}