import { RetryConfig } from './types';
/**
 * Verifica se um erro é elegível para retry baseado na configuração
 */
export declare const shouldRetryRequest: (error: any, config: RetryConfig) => boolean;
/**
 * Verifica se é um erro de rede (sem resposta do servidor)
 */
export declare const isNetworkError: (error: any) => boolean;
/**
 * Verifica se é um erro de servidor (5xx)
 */
export declare const isServerError: (error: any) => boolean;
/**
 * Cria uma promise que resolve após um delay específico
 */
export declare const delay: (ms: number) => Promise<void>;
