import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import { EvolutionBridge } from './EvolutionBridge';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('EvolutionBridge', () => {
  let bridge: EvolutionBridge;
  const config = {
    url: 'https://api.evolution.com',
    apiKey: 'test-api-key',
    instance: 'test-instance',
  };

  beforeEach(() => {
    mockedAxios.create.mockReturnValue({
      post: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      patch: jest.fn(),
      defaults: {
        headers: new AxiosHeaders(),
      },
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn(), clear: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn(), clear: jest.fn() },
      },
    } as any);
    bridge = new EvolutionBridge(config);
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should throw error if url is missing', () => {
      expect(() => {
        new EvolutionBridge({ ...config, url: '' });
      }).toThrow("The 'url' property is required to initialize EvolutionBridge.");
    });

    it('should throw error if apiKey is missing', () => {
      expect(() => {
        new EvolutionBridge({ ...config, apiKey: '' });
      }).toThrow("The 'apiKey' property is required to initialize EvolutionBridge.");
    });

    it('should throw error if instance is missing', () => {
      expect(() => {
        new EvolutionBridge({ ...config, instance: '' });
      }).toThrow("The 'instance' property is required to initialize EvolutionBridge.");
    });

    it('should initialize with valid config', () => {
      expect(() => {
        new EvolutionBridge(config);
      }).not.toThrow();
    });
  });

  describe('sendText', () => {
    const messageData = {
      number: '5511999999999',
      text: 'Test message',
    };

    it('should send text message successfully', async () => {
      const mockResponse: AxiosResponse = {
        data: { success: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const response = await bridge.sendText({ data: messageData });

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `/message/sendText/${config.instance}`,
        messageData,
        expect.any(Object)
      );
      expect(response).toEqual(mockResponse);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      mockedAxios.post.mockRejectedValueOnce(error);

      await expect(bridge.sendText({ data: messageData })).rejects.toThrow('API Error');
    });

    it('should send message with all optional parameters', async () => {
      const fullMessageData = {
        ...messageData,
        delay: 1000,
        linkPreview: true,
        mentionsEveryOne: true,
        mentioned: ['5511999999999'],
      };

      const mockResponse: AxiosResponse = {
        data: { success: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const response = await bridge.sendText({ data: fullMessageData });

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `/message/sendText/${config.instance}`,
        fullMessageData,
        expect.any(Object)
      );
      expect(response).toEqual(mockResponse);
    });
  });
});
