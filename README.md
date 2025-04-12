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
import { EvolutionBridge } from "evolution-bridge";

// Configuração básica
const bridge = new EvolutionBridge({
  url: "https://api.evolutionbridge.com",
  apiKey: "YOUR_API_KEY",
  instance: "YOUR_INSTANCE_ID",
});

// Exemplo de uso
bridge
  .sendText({
    data: {
      number: "YOUR_NUMBER",
      text: "YOUR_MESSAGE",
      quoted: {
        key: {
          id: "YOUR_MESSAGE_ID",
        },
        message: {
          conversation: "asd",
        },
      },
    },
  })
  .then((res) => console.log(res))
  .catch((err: Error) => console.error(err.message));
```

## Contribuição

Contribuições são sempre bem-vindas! Por favor, sinta-se à vontade para submeter um Pull Request.

## Licença

ISC
