import { EvolutionBridgeConfig, Post, SendText, SendTextPayload } from './index';

describe('Types', () => {
  describe('EvolutionBridgeConfig', () => {
    it('should have required properties', () => {
      const config: EvolutionBridgeConfig = {
        url: 'https://api.evolution.com',
        apiKey: 'test-api-key',
        instance: 'test-instance',
      };

      expect(config).toHaveProperty('url');
      expect(config).toHaveProperty('apiKey');
      expect(config).toHaveProperty('instance');
    });
  });

  describe('SendTextPayload', () => {
    it('should have required properties', () => {
      const payload: SendTextPayload = {
        number: '5511999999999',
        text: 'Test message',
      };

      expect(payload).toHaveProperty('number');
      expect(payload).toHaveProperty('text');
    });

    it('should allow optional properties', () => {
      const payload: SendTextPayload = {
        number: '5511999999999',
        text: 'Test message',
        delay: 1000,
        linkPreview: true,
        mentionsEveryOne: true,
        mentioned: ['5511999999999'],
      };

      expect(payload).toHaveProperty('delay');
      expect(payload).toHaveProperty('linkPreview');
      expect(payload).toHaveProperty('mentionsEveryOne');
      expect(payload).toHaveProperty('mentioned');
    });
  });

  describe('SendText', () => {
    it('should have required properties', () => {
      const sendText: SendText = {
        data: {
          number: '5511999999999',
          text: 'Test message',
        },
      };

      expect(sendText).toHaveProperty('data');
    });

    it('should allow optional config', () => {
      const sendText: SendText = {
        data: {
          number: '5511999999999',
          text: 'Test message',
        },
        config: {
          params: {
            test: 'value',
          },
        },
      };

      expect(sendText).toHaveProperty('config');
    });
  });

  describe('Post', () => {
    it('should have required properties', () => {
      const post: Post = {
        url: '/test',
      };

      expect(post).toHaveProperty('url');
    });

    it('should allow optional properties', () => {
      const post: Post = {
        url: '/test',
        data: { test: 'value' },
        config: {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      };

      expect(post).toHaveProperty('data');
      expect(post).toHaveProperty('config');
    });
  });
});
