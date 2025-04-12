import { AxiosRequestConfig } from 'axios';
export interface RetryConfig {
    /** Número máximo de tentativas de retry */
    retries?: number;
    /** Delay em milissegundos entre as tentativas */
    retryDelay?: number;
    /** Função que determina se deve tentar novamente baseado no erro */
    shouldRetry?: (error: any) => boolean;
}
export interface EvolutionBridgeConfig extends AxiosRequestConfig {
    /** Configurações específicas para o sistema de retry */
    retryConfig?: RetryConfig;
}
export interface RequestConfig extends AxiosRequestConfig {
    /** Contador de tentativas de retry para a requisição atual */
    retryCount?: number;
}
