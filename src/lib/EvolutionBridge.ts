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
    private apiKey: string;
    private instance: string;

    constructor(config: EvolutionBridgeConfig) {
        if (!config.apiKey) {
            throw new Error('apiKey é obrigatória para inicializar o EvolutionBridge');
        }

        if (!config.instance) {
            throw new Error('instance é obrigatória para inicializar o EvolutionBridge');
        }

        this.apiKey = config.apiKey;
        this.instance = config.instance;
    }


    /**
     * Envia um texto para um número
     * @param {SendText} sendText - Objeto com número e texto
     * @returns {Promise<any>} - Retorna uma promise com o resultado da requisição
     */
    async sendText({ number, text }: SendText): Promise<any> {
        return ({
            apiKey: this.apiKey,
            instance: this.instance,
            number,
            text,
        })
    }
}

export default EvolutionBridge;