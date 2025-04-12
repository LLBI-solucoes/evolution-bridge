import axios, { AxiosInstance, AxiosResponse } from "axios";
import { EvolutionBridgeConfig, Post, SendText } from "../types";

/**
 * @class EvolutionBridge
 * @description Classe para interagir com o Evolution API
 * @param {EvolutionBridgeConfig} config - Configuração do EvolutionBridge
 * @example
 * const evolutionBridge = new EvolutionBridge({
 *     url: 'https://api.evolutionbridge.com',
 *     apiKey: '123456789',
 *     instance: 'my-instance',
 * })
 */
export class EvolutionBridge {
  private client: AxiosInstance;
  private instance: string;

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

    this.client = axios.create({
      baseURL: config.url,
      headers: {
        "Content-Type": "application/json",
        apikey: config.apiKey,
      },
      maxBodyLength: Infinity,
    });

    this.instance = config.instance;
  }

  /**
   * Sends a text message using the EvolutionBridge.
   * @template T - The expected response type.
   * @param {SendText} param0 - Object containing the text data and optional configuration.
   * @param {object} param0.data - Data for the text message.
   * @param {string} param0.data.number - Recipient's number.
   * @param {string} param0.data.text - Text to be sent.
   * @param {number} [param0.data.delay] - Delay in seconds before sending the text.
   * @param {Quoted} [param0.data.quoted] - Referenced message.
   * @param {boolean} [param0.data.linkPreview] - Show link preview.
   * @param {boolean} [param0.data.mentionsEveryOne] - Mention all users in the conversation.
   * @param {string[]} [param0.data.mentioned] - Numbers of users to be mentioned.
   * @param {AxiosRequestConfig} [param0.config] - Optional request configuration.
   * @returns {Promise<AxiosResponse<T>>} - Returns a promise with the response of the request.
   */
  async sendText<T>({ data, config }: SendText): Promise<AxiosResponse<T>> {
    return this.post({
      url: `/message/sendText/${this.instance}`,
      data,
      config,
    });
  }

  /**
   * Sends a POST request to the EvolutionBridge.
   * @template T - The expected response type.
   * @param {Post} param0 - Object containing the request data and optional configuration.
   * @param {string} param0.url - URL of the request.
   * @param {object} param0.data - Data for the request.
   * @param { {params?: any} } [param0.config] - Optional request configuration.
   * @returns {Promise<AxiosResponse<T>>} - Returns a promise with the response of the request.
   */
  private async post<T>({
    url,
    data,
    config,
  }: Post): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }
}
