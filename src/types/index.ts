import { AxiosRequestConfig } from "axios";

/**
 * Interface para configuração do EvolutionBridge
 * @interface EvolutionBridgeConfig
 * @description Configuração do EvolutionBridge
 * @property {string} url - URL da API da Evolution
 * @property {string} apiKey - Chave de API da Evolution
 * @property {string} instance - Nome da instância da Evolution
 */
export interface EvolutionBridgeConfig {
  url: string;
  apiKey: string;
  instance: string;
}

/**
 * Interface para um quoted
 * @interface quoted
 * @description Objeto que representa um quoted
 */
interface Quoted {
  key: {
    id: string;
  };
  message: {
    conversation: string;
  };
}

/**
 * Interface para envio de texto via EvolutionBridge
 * @interface SendText
 * @description Configura o envio de um texto via EvolutionBridge
 * @property {object} data - Dados do texto
 * @property {string} data.number - N mero do destinat rio
 * @property {string} data.text - Texto a ser enviado
 * @property {number} [data.delay] - Tempo em segundos para aguardar antes de enviar o texto
 * @property {Quoted} [data.quoted] - Mensagem referenciada
 * @property {boolean} [data.linkPreview] - Mostrar preview de links
 * @property {boolean} [data.mentionsEveryOne] - Marcar todos os usu rios da conversa
 * @property {string[]} [data.mentioned] - N meros dos usu rios a serem mencionados
 * @property {AxiosRequestConfig} [config] - Configura o da requisi o
 */
export interface SendText {
  data: {
    number: string;
    text: string;
    delay?: number;
    quoted?: Quoted;
    linkPreview?: boolean;
    mentionsEveryOne?: boolean;
    mentioned?: string[];
  };
  config?: {
    params?: any;
    asdasdasd: any;
  };
}

/**
 * Interface para uma requisição POST
 * @interface Post
 * @description Objeto para uma requisição POST
 * @property {string} url - URL da requisição
 * @property {any} data - Dados da requisição
 */
export interface Post {
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}
