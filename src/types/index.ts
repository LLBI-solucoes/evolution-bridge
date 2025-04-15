import { AxiosRequestConfig } from 'axios';

/**
 * Configuração necessária para inicializar o EvolutionBridge
 */
export interface EvolutionBridgeConfig {
  /** URL base da API do Evolution */
  url: string;
  /** Chave de API para autenticação */
  apiKey: string;
  /** Nome da instância do Evolution */
  instance: string;
}

/**
 * Interface para mensagens citadas
 */
interface Quoted {
  /** Chave da mensagem citada */
  key: {
    /** ID da mensagem citada */
    id: string;
  };
  /** Conteúdo da mensagem citada */
  message: {
    /** Texto da conversa citada */
    conversation: string;
  };
}

/**
 * Payload para envio de mensagem de texto
 */
export interface SendTextPayload {
  /** Número do destinatário no formato internacional (ex: 5511999999999) */
  number: string;
  /** Texto da mensagem */
  text: string;
  /** Delay em milissegundos antes do envio */
  delay?: number;
  /** Mensagem para citar */
  quoted?: Quoted;
  /** Habilitar preview de links */
  linkPreview?: boolean;
  /** Mencionar todos no grupo */
  mentionsEveryOne?: boolean;
  /** Lista de números para mencionar */
  mentioned?: string[];
}

/**
 * Parâmetros para envio de mensagem de texto
 */
export interface SendText {
  /** Dados da mensagem */
  data: SendTextPayload;
  /** Configurações adicionais da requisição */
  config?: {
    /** Parâmetros de query string */
    params?: Record<string, unknown>;
  };
}

/**
 * Interface para requisições POST
 */
export interface Post {
  /** Endpoint da API */
  url: string;
  /** Dados a serem enviados */
  data?: unknown;
  /** Configurações do Axios */
  config?: AxiosRequestConfig;
}
