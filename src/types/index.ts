/**
 * Interface para configuração do EvolutionBridge
 * @interface EvolutionBridgeConfig
 * @property {string} apiKey - Chave de API do EvolutionBridge
 * @property {string} instance - Instância do EvolutionBridge
 */
export interface EvolutionBridgeConfig {
  url: string;
  apiKey: string;
  instance: string;
  params?: any[];
}

/**
 * Interface para enviar mensagem
 * @interface SendText
 * @property {string} number - Número do destinatário
 * @property {string} text - Texto a ser enviado
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
 * Interface para configuração de opções
 * @interface Options
 * @property {number} delay - Tempo de espera em milissegundos
 * @property {Quoted} quoted - Habilita a citação
 * @property {boolean} linkPreview - Habilita a previsualização de links
 * @property {boolean} mentionsEveryOne - Habilita a mencão para todos
 * @property {string[]} mentioned - Lista de IDs de usuários para mencionar
 */
export interface Options {
  delay?: number;
  quoted?: Quoted;
  linkPreview?: boolean;
  mentionsEveryOne?: boolean;
  mentioned?: string[];
}

/**
 * Interface para enviar texto
 * @interface SendText
 * @property {string} number - Número do destinatário
 * @property {string} text - Texto a ser enviado
 */
export interface SendText extends Options {
  number: string;
  text: string;
}

/**
 * Parametros para requisição POST
 * @interface Post
 * @property {string} url - URL da requisição
 * @property {any} data - Dados da requisição
 * @property {AxiosRequestConfig} config - Configuração da requisição
 */
export interface Post {
  url: string;
  data: any;
}
