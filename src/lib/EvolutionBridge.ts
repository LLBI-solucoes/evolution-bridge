import { EvolutionBridgeConfig, SendText } from '../types';

/**
 * Classe para interagir com o EvolutionBridge
 * @class EvolutionBridge
 * @param {EvolutionBridgeConfig} config - Configuração do EvolutionBridge
 * @example
 * const evolutionBridge = new EvolutionBridge({
 *     apiKey: '123456789',
 *     instance: 'my-instance',   
 })
 */
class EvolutionBridge {
    private url: string;
    private apiKey: string;
    private instance: string;

    constructor(config: EvolutionBridgeConfig) {
        if (!config.url) throw new Error('url é obrigatória para inicializar o EvolutionBridge');
        if (!config.apiKey) throw new Error('apiKey é obrigatória para inicializar o EvolutionBridge');
        if (!config.instance) throw new Error('instance é obrigatória para inicializar o EvolutionBridge');

        this.url = config.url;
        this.apiKey = config.apiKey;
        this.instance = config.instance;
    }


    /**
     * Envia um texto para um número
     * @param {SendText} sendText - Objeto com número e texto
     * @returns {Promise<any>} - Retorna uma promise com o resultado da requisição
     * @example
     * const result = await evolutionBridge.sendText({
     *     number: '123456789',
     *     text: 'Olá, mundo!',
     * })
     */
    async sendText({ number, text }: SendText): Promise<any> {
        return ({
            url: this.url,
            apiKey: this.apiKey,
            instance: this.instance,
            number,
            text,
        })
    }
}

export default EvolutionBridge;