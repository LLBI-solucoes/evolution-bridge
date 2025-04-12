import { AxiosRequestConfig } from "axios";

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

export interface SendTextPayload {
  number: string;
  text: string;
  delay?: number;
  quoted?: Quoted;
  linkPreview?: boolean;
  mentionsEveryOne?: boolean;
  mentioned?: string[];
}

export interface SendText {
  data: SendTextPayload;
  config?: {
    params?: Record<string, any>;
  };
}

export interface Post {
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}
