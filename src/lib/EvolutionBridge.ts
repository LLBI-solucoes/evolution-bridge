import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { EvolutionBridgeConfig, Post, SendText } from '../types';

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
export class EvolutionBridge {
    private url: string;
    private apiKey: string;
    private instance: string;

    private client: AxiosInstance;

    constructor(config: EvolutionBridgeConfig) {
        if (!config.url) throw new Error('url é obrigatória para inicializar o EvolutionBridge');
        if (!config.apiKey) throw new Error('apiKey é obrigatória para inicializar o EvolutionBridge');
        if (!config.instance) throw new Error('instance é obrigatória para inicializar o EvolutionBridge');

        this.client = axios.create();

        this.url = config.url;
        this.apiKey = config.apiKey;
        this.instance = config.instance;
    }


    /**
     * Envia um texto para um número
     * @param {SendText} sendText - Objeto com número e texto
     * @returns {Promise<T>} - Retorna uma promise com o resultado da requisição
     * @example
     * const result = await evolutionBridge.sendText({
     *     number: '123456789',
     *     text: 'Olá, mundo!',
     * })
     */
    async sendText({ number, text }: SendText): Promise<AxiosResponse<any>> {
        return this.post({
            url: `${this.url}/message/sendText/${this.instance}`,
            data: {
                number,
                text
            },
            config: {
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.apiKey,
                },
            },
        })
    }

    private async post<T = any>({ url, data, config }: Post): Promise<AxiosResponse<T>> {
        return this.client.post<T>(url, data, config);
    }
}
