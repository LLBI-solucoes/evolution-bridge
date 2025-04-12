import axios, { AxiosInstance, AxiosResponse } from "axios";
import { EvolutionBridgeConfig, Post, SendText } from "../types";

export class EvolutionBridge {
  private client: AxiosInstance;
  private instance: string;

  constructor(config: EvolutionBridgeConfig) {
    const { url, apiKey, instance } = config;

    if (!url) {
      throw new Error(
        "The 'url' property is required to initialize EvolutionBridge."
      );
    }

    if (!apiKey) {
      throw new Error(
        "The 'apiKey' property is required to initialize EvolutionBridge."
      );
    }

    if (!instance) {
      throw new Error(
        "The 'instance' property is required to initialize EvolutionBridge."
      );
    }

    this.client = axios.create({
      baseURL: url,
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
      },
      maxBodyLength: Infinity,
    });

    this.instance = instance;
  }

  private post<T>({ url, data, config = {} }: Post): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  public sendText<T>({
    data,
    config = {},
  }: SendText): Promise<AxiosResponse<T>> {
    return this.post<T>({
      url: `/message/sendText/${this.instance}`,
      data,
      config,
    });
  }
}
