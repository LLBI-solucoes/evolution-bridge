import { AxiosResponse } from 'axios';
import { EvolutionBridgeConfig, RequestConfig } from './types';
export declare class EvolutionBridge {
    private client;
    private retryConfig;
    constructor(config?: EvolutionBridgeConfig);
    private setupInterceptors;
    get<T = any>(url: string, config?: RequestConfig): Promise<AxiosResponse<T>>;
    post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<T>>;
    put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<T>>;
    delete<T = any>(url: string, config?: RequestConfig): Promise<AxiosResponse<T>>;
    patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<T>>;
}
export * from './types';
