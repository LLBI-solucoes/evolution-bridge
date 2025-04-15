# Evolution Bridge

Biblioteca TypeScript para integração com a API do Evolution.

## Instalação

```bash
npm install evolution-bridge
# ou
yarn add evolution-bridge
```

## Requisitos

- Node.js 14 ou superior
- TypeScript 4.0 ou superior (opcional)

## Uso Básico

```typescript
import { EvolutionBridge } from "evolution-bridge";

// Inicializar o cliente
const bridge = new EvolutionBridge({
  url: "https://api.evolution.com",
  apiKey: "your-api-key",
  instance: "your-instance",
});

// Enviar mensagem de texto
await bridge.sendText({
  data: {
    number: "5511999999999",
    text: "Hello World!",
  },
});
```

## Configuração

### EvolutionBridgeConfig

| Parâmetro | Tipo   | Descrição                      |
| --------- | ------ | ------------------------------ |
| url       | string | URL base da API do Evolution   |
| apiKey    | string | Chave de API para autenticação |
| instance  | string | Nome da instância do Evolution |

## Métodos

### sendText

Envia uma mensagem de texto para um número específico.

```typescript
await bridge.sendText({
  data: {
    number: "5511999999999",
    text: "Hello World!",
    delay: 1000,
    linkPreview: true,
  },
});
```

#### Parâmetros

| Parâmetro             | Tipo     | Obrigatório | Descrição                             |
| --------------------- | -------- | ----------- | ------------------------------------- |
| data.number           | string   | Sim         | Número do destinatário                |
| data.text             | string   | Sim         | Texto da mensagem                     |
| data.delay            | number   | Não         | Delay em milissegundos antes do envio |
| data.quoted           | Quoted   | Não         | Mensagem para citar                   |
| data.linkPreview      | boolean  | Não         | Habilitar preview de links            |
| data.mentionsEveryOne | boolean  | Não         | Mencionar todos no grupo              |
| data.mentioned        | string[] | Não         | Lista de números para mencionar       |

## Tipos

### Quoted

Interface para mensagens citadas.

```typescript
interface Quoted {
  key: {
    id: string;
  };
  message: {
    conversation: string;
  };
}
```

### SendTextPayload

Payload para envio de mensagem de texto.

```typescript
interface SendTextPayload {
  number: string;
  text: string;
  delay?: number;
  quoted?: Quoted;
  linkPreview?: boolean;
  mentionsEveryOne?: boolean;
  mentioned?: string[];
}
```

## Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Suporte

Para suporte, por favor abra uma issue no GitHub ou entre em contato através do email de suporte.
