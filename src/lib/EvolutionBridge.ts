import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { EvolutionBridgeConfig, Post, SendText } from '../types';

/**
 * EvolutionBridge - Classe principal para interação com a API do Evolution
 *
 * @example
 * ```typescript
 * const bridge = new EvolutionBridge({
 *   url: 'https://api.evolution.com',
 *   apiKey: 'your-api-key',
 *   instance: 'your-instance'
 * });
 *
 * // Enviar mensagem de texto
 * await bridge.sendText({
 *   data: {
 *     number: '5511999999999',
 *     text: 'Hello World!'
 *   }
 * });
 * ```
 */
export class EvolutionBridge {
  private client: AxiosInstance;
  private instance: string;

  /**
   * Cria uma nova instância do EvolutionBridge
   *
   * @param config - Configuração necessária para inicialização
   * @param config.url - URL base da API do Evolution
   * @param config.apiKey - Chave de API para autenticação
   * @param config.instance - Nome da instância do Evolution
   *
   * @throws {Error} Se alguma configuração obrigatória estiver faltando
   */
  constructor(config: EvolutionBridgeConfig) {
    const { url, apiKey, instance } = config;

    if (!url) {
      throw new Error("The 'url' property is required to initialize EvolutionBridge.");
    }

    if (!apiKey) {
      throw new Error("The 'apiKey' property is required to initialize EvolutionBridge.");
    }

    if (!instance) {
      throw new Error("The 'instance' property is required to initialize EvolutionBridge.");
    }

    this.client = axios.create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json',
        apikey: apiKey,
      },
      maxBodyLength: Infinity,
    });

    this.instance = instance;
  }

  /**
   * Método privado para realizar requisições POST
   *
   * @param params - Parâmetros da requisição
   * @param params.url - Endpoint da API
   * @param params.data - Dados a serem enviados
   * @param params.config - Configurações adicionais do Axios
   *
   * @returns Promise com a resposta da API
   *
   * @private
   */
  private post<T>({ url, data, config = {} }: Post): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  /**
   * Envia uma mensagem de texto para um número específico
   *
   * @param params - Parâmetros para envio da mensagem
   * @param params.data - Dados da mensagem
   * @param params.data.number - Número do destinatário no formato internacional (ex: 5511999999999)
   * @param params.data.text - Texto da mensagem
   * @param params.data.delay - Delay em milissegundos antes do envio (opcional)
   * @param params.data.quoted - Mensagem para citar (opcional)
   * @param params.data.linkPreview - Habilitar preview de links (opcional)
   * @param params.data.mentionsEveryOne - Mencionar todos no grupo (opcional)
   * @param params.data.mentioned - Lista de números para mencionar (opcional)
   * @param params.config - Configurações adicionais da requisição
   *
   * @returns Promise com a resposta da API
   *
   * @example
   * ```typescript
   * await bridge.sendText({
   *   data: {
   *     number: '5511999999999',
   *     text: 'Hello World!',
   *     delay: 1000,
   *     linkPreview: true
   *   }
   * });
   * ```
   */
  public sendText<T>({ data, config = {} }: SendText): Promise<AxiosResponse<T>> {
    return this.post<T>({
      url: `/message/sendText/${this.instance}`,
      data,
      config,
    });
  }
}
