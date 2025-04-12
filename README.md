# Evolution Bridge

Uma ponte de integração robusta para a Evolution API com recursos avançados de retry e interceptação.

## Instalação

```bash
npm install evolution-bridge
```

## Características

- Integração simplificada com Evolution API
- Sistema de retry automático para requisições falhas
- Interceptadores configuráveis
- Tipagem TypeScript completa

## Uso

```typescript
import { EvolutionBridge } from 'evolution-bridge';

// Configuração básica
const bridge = new EvolutionBridge({
  baseURL: 'https://sua-api.com',
});

// Configuração com retry personalizado
const bridgeWithRetry = new EvolutionBridge(
  {
    baseURL: 'https://sua-api.com',
  },
  {
    retries: 3,
    retryDelay: 1000,
    shouldRetry: (error) => {
      return error.response?.status >= 500;
    },
  }
);

// Exemplo de uso
async function exemplo() {
  try {
    const response = await bridge.get('/endpoint');
    console.log(response.data);
  } catch (error) {
    console.error('Erro:', error);
  }
}
```

## Contribuição

Contribuições são sempre bem-vindas! Por favor, sinta-se à vontade para submeter um Pull Request.

## Licença

ISC