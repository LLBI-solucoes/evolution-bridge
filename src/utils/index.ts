import { AxiosError } from 'axios';
import { RetryConfig } from '../types';

/**
 * Verifica se um erro é elegível para retry baseado na configuração
 */
export const shouldRetryRequest = (error: any, config: RetryConfig): boolean => {
    if (config.shouldRetry) {
        return config.shouldRetry(error);
    }

    // Comportamento padrão: retry em erros de rede ou servidor (5xx)
    return isNetworkError(error) || isServerError(error);
};

/**
 * Verifica se é um erro de rede (sem resposta do servidor)
 */
export const isNetworkError = (error: any): boolean => {
    return error instanceof AxiosError && !error.response;
};

/**
 * Verifica se é um erro de servidor (5xx)
 */
export const isServerError = (error: any): boolean => {
    return error instanceof AxiosError && error.response?.status ? error.response.status >= 500 : false;
};

/**
 * Cria uma promise que resolve após um delay específico
 */
export const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};