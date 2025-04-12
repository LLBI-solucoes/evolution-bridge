import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RetryConfig {
    retries?: number;
    retryDelay?: number;
    shouldRetry?: (error: any) => boolean;
}

export class EvolutionBridge {
    private client: AxiosInstance;
    private retryConfig: RetryConfig;

    constructor(config?: AxiosRequestConfig, retryConfig: RetryConfig = {}) {
        this.client = axios.create(config);
        this.retryConfig = {
            retries: retryConfig.retries || 3,
            retryDelay: retryConfig.retryDelay || 1000,
            shouldRetry: retryConfig.shouldRetry || ((error) => {
                return axios.isAxiosError(error) && (!error.response || error.response.status >= 500);
            })
        };

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        this.client.interceptors.request.use(
            (config) => {
                // Adiciona headers padrão se necessário
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.client.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (!originalRequest || !this.retryConfig.shouldRetry?.(error)) {
                    return Promise.reject(error);
                }

                originalRequest.retryCount = originalRequest.retryCount || 0;

                if (originalRequest.retryCount >= this.retryConfig.retries!) {
                    return Promise.reject(error);
                }

                originalRequest.retryCount += 1;

                const delayRetryRequest = new Promise((resolve) => {
                    setTimeout(() => resolve(this.client(originalRequest)), this.retryConfig.retryDelay);
                });

                return delayRetryRequest;
            }
        );
    }

    async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.get<T>(url, config);
    }

    async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.post<T>(url, data, config);
    }

    async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.put<T>(url, data, config);
    }

    async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.delete<T>(url, config);
    }
}