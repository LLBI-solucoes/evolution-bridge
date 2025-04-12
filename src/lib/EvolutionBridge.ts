import axios, { AxiosInstance, AxiosResponse } from "axios";
import { EvolutionBridgeConfig, Post, SendText } from "../types";

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

  async sendText<T>({
    data,
    config = {},
  }: SendText): Promise<AxiosResponse<T>> {
    return this.post({
      url: `/message/sendText/${this.instance}`,
      data,
      config,
    });
  }

  private async post<T>({
    url,
    data,
    config = {},
  }: Post): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }
}
