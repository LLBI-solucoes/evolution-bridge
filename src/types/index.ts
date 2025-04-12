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
 * Interface para opções
 * @interface Options
 * @description Opções para enviar um texto para um número
 * @property {number} delay - Delay em milissegundos
 * @property {Quoted} quoted - Objeto que representa um quoted
 * @property {boolean} linkPreview - Indica se o link deve ser previsto
 * @property {boolean} mentionsEveryOne - Indica se todos os usuários devem ser mencionados
 * @property {string[]} mentioned - Lista de usuários a serem mencionados
 */
interface Options {
  delay?: number;
  quoted?: Quoted;
  linkPreview?: boolean;
  mentionsEveryOne?: boolean;
  mentioned?: string[];
}

/**
 * Interface para enviar um texto para um número
 * @interface SendText
 * @description Objeto para enviar um texto para um número
 * @extends {Options}
 * @property {string} number - Número do destinatário
 * @property {string} text - Texto a ser enviado
 */
export interface SendText extends Options {
  number: string;
  text: string;
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
  data: any;
}
