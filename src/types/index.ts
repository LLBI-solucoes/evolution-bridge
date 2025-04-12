import { AxiosRequestConfig } from "axios";

/**
 * Interface para configuração do EvolutionBridge
 * @interface EvolutionBridgeConfig
 * @property {string} apiKey - Chave de API do EvolutionBridge
 * @property {string} instance - Instância do EvolutionBridge
 */
export interface EvolutionBridgeConfig {
    url: string;
    apiKey: string;
    instance: string;
}

/**
 * Interface para enviar texto
 * @interface SendText
 * @property {string} number - Número do destinatário
 * @property {string} text - Texto a ser enviado
 */
export interface SendText {
    number: string,
    text: string
}

/**
 * Parametros para requisição POST
 * @interface Post
 * @property {string} url - URL da requisição
 * @property {any} data - Dados da requisição
 * @property {AxiosRequestConfig} config - Configuração da requisição
 */
export interface Post {
    url: string,
    data?: any,
    config?: AxiosRequestConfig
}