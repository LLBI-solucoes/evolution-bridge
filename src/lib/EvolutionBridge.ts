import axios, { AxiosInstance, AxiosResponse } from "axios";
import { EvolutionBridgeConfig, Post, SendText } from "../types";

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
  private client: AxiosInstance;
  private instance: string;
  private params = {};

  constructor(config: EvolutionBridgeConfig) {
    if (!config.url) {
      throw new Error("url é obrigatória para inicializar o EvolutionBridge");
    }

    if (!config.apiKey) {
      throw new Error(
        "apiKey é obrigatória para inicializar o EvolutionBridge"
      );
    }

    if (!config.instance) {
      throw new Error(
        "instance é obrigatória para inicializar o EvolutionBridge"
      );
    }

    if (config.params) {
      this.params = config.params;
    } else {
      this.params = {};
    }

    this.client = axios.create({
      baseURL: config.url,
      headers: {
        "Content-Type": "application/json",
        apikey: config.apiKey,
      },
      maxBodyLength: Infinity,
      params: { ...this.params },
    });

    this.instance = config.instance;
  }

  /**
   * Envia um texto para um número
   * @param {SendText} data - Objeto com número e texto
   * @returns {Promise<T>} - Retorna uma promise com o resultado da requisição
   * @example
   * const result = await evolutionBridge.sendText({
   *     number: '123456789',
   *     text: 'Olá, mundo!',
   * })
   */
  async sendText<T>(data: SendText): Promise<AxiosResponse<T>> {
    return this.post({
      url: `/message/sendText/${this.instance}`,
      data,
    });
  }

  private async post<T>({ url, data }: Post): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data);
  }
}
