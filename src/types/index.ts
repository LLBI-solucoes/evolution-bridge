/**
 * Interface para configuração do EvolutionBridge
 * @interface EvolutionBridgeConfig
 * @property {string} apiKey - Chave de API do EvolutionBridge
 * @property {string} instance - Instância do EvolutionBridge
 */
export interface EvolutionBridgeConfig {
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