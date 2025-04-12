export interface EvolutionBridgeConfig {
  url: string;
  apiKey: string;
  instance: string;
}

interface Quoted {
  key: {
    id: string;
  };
  message: {
    conversation: string;
  };
}

interface Options {
  delay?: number;
  quoted?: Quoted;
  linkPreview?: boolean;
  mentionsEveryOne?: boolean;
  mentioned?: string[];
}

export interface SendText extends Options {
  number: string;
  text: string;
}

export interface Post {
  url: string;
  data: any;
}
