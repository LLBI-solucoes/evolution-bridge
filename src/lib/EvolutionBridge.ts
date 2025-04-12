import { EvolutionBridgeConfig } from '../types';

export class EvolutionBridge {
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


    async sendText(number: string, text: string): Promise<any> {
        return ({
            apiKey: this.apiKey,
            instance: this.instance,
            number,
            text,
        })
    }
}