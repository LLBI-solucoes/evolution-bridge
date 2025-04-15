# Casos de Uso Avançados

Este documento descreve casos de uso avançados da biblioteca Evolution Bridge.

## Envio com Retry Automático

O exemplo abaixo demonstra como implementar um sistema de retry automático para mensagens que falham:

```typescript
async function sendMessageWithRetry(
  number: string,
  text: string,
  maxRetries = 3,
  delayBetweenRetries = 1000
) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await bridge.sendText({
        data: {
          number,
          text,
          delay: attempt * 1000, // Aumenta o delay a cada tentativa
        },
      });
      return response;
    } catch (error) {
      lastError = error;
      console.log(`Tentativa ${attempt} falhou:`, error.message);

      if (attempt < maxRetries) {
        console.log(
          `Aguardando ${delayBetweenRetries}ms antes da próxima tentativa...`
        );
        await new Promise((resolve) =>
          setTimeout(resolve, delayBetweenRetries)
        );
      }
    }
  }

  throw lastError;
}
```

### Uso

```typescript
const response = await sendMessageWithRetry(
  "5511999999999",
  "Esta mensagem será reenviada em caso de falha",
  3, // Número máximo de tentativas
  2000 // Delay entre tentativas em milissegundos
);
```

## Envio em Lote

Para enviar múltiplas mensagens de forma eficiente, você pode usar o exemplo abaixo:

```typescript
async function sendBatchMessages(
  messages: Array<{ number: string; text: string }>,
  batchSize = 5,
  delayBetweenBatches = 2000
) {
  const results: PromiseSettledResult<AxiosResponse>[] = [];

  for (let i = 0; i < messages.length; i += batchSize) {
    const batch = messages.slice(i, i + batchSize);
    console.log(
      `Enviando lote ${i / batchSize + 1} de ${Math.ceil(
        messages.length / batchSize
      )}`
    );

    const batchPromises = batch.map((msg) =>
      bridge.sendText({
        data: {
          number: msg.number,
          text: msg.text,
        },
      })
    );

    const batchResults = await Promise.allSettled(batchPromises);
    results.push(...batchResults);

    if (i + batchSize < messages.length) {
      console.log(
        `Aguardando ${delayBetweenBatches}ms antes do próximo lote...`
      );
      await new Promise((resolve) => setTimeout(resolve, delayBetweenBatches));
    }
  }

  return results;
}
```

### Uso

```typescript
const messages = [
  { number: "5511999999999", text: "Mensagem 1" },
  { number: "5511999999999", text: "Mensagem 2" },
  // ... mais mensagens
];

const results = await sendBatchMessages(messages, 2, 1000);

// Analisar resultados
const successful = results.filter((r) => r.status === "fulfilled").length;
const failed = results.filter((r) => r.status === "rejected").length;

console.log(`Resultado do envio em lote:`);
console.log(`- Sucessos: ${successful}`);
console.log(`- Falhas: ${failed}`);
```

## Boas Práticas

1. **Tamanho do Lote**

   - Ajuste o `batchSize` de acordo com a capacidade da sua instância
   - Valores muito altos podem sobrecarregar o servidor
   - Valores muito baixos podem tornar o processo mais lento

2. **Delays**

   - Use delays apropriados entre tentativas e lotes
   - Aumente o delay progressivamente em caso de falhas
   - Considere implementar um backoff exponencial

3. **Tratamento de Erros**

   - Sempre implemente tratamento de erros adequado
   - Registre os erros para análise posterior
   - Considere implementar um sistema de notificação para falhas críticas

4. **Monitoramento**
   - Implemente logs detalhados
   - Monitore a taxa de sucesso/falha
   - Ajuste os parâmetros com base nas métricas coletadas

## Exemplos de Uso em Produção

### Sistema de Notificações

```typescript
class NotificationSystem {
  private bridge: EvolutionBridge;
  private retryConfig = {
    maxRetries: 3,
    delayBetweenRetries: 2000,
  };

  constructor(config: EvolutionBridgeConfig) {
    this.bridge = new EvolutionBridge(config);
  }

  async sendNotification(users: User[], message: string) {
    const messages = users.map((user) => ({
      number: user.phone,
      text: message,
    }));

    try {
      const results = await sendBatchMessages(messages, 5, 1000);
      this.logResults(results);
      this.handleFailures(results);
    } catch (error) {
      this.handleCriticalError(error);
    }
  }

  private logResults(results: PromiseSettledResult<AxiosResponse>[]) {
    // Implementar lógica de logging
  }

  private handleFailures(results: PromiseSettledResult<AxiosResponse>[]) {
    // Implementar lógica de tratamento de falhas
  }

  private handleCriticalError(error: Error) {
    // Implementar lógica para erros críticos
  }
}
```

### Sistema de Campanhas

```typescript
class CampaignSystem {
  private bridge: EvolutionBridge;

  constructor(config: EvolutionBridgeConfig) {
    this.bridge = new EvolutionBridge(config);
  }

  async runCampaign(campaign: Campaign) {
    const { messages, schedule, targetUsers } = campaign;

    for (const message of messages) {
      if (this.shouldSendMessage(message, schedule)) {
        await this.sendCampaignMessage(message, targetUsers);
      }
    }
  }

  private async sendCampaignMessage(message: Message, users: User[]) {
    const batchSize = this.calculateOptimalBatchSize(users.length);

    const results = await sendBatchMessages(
      users.map((user) => ({
        number: user.phone,
        text: this.personalizeMessage(message, user),
      })),
      batchSize,
      2000
    );

    this.updateCampaignMetrics(results);
  }

  private calculateOptimalBatchSize(totalUsers: number): number {
    // Implementar lógica para calcular o tamanho ideal do lote
    return Math.min(10, Math.max(1, Math.floor(totalUsers / 10)));
  }

  private personalizeMessage(message: Message, user: User): string {
    // Implementar lógica de personalização
    return message.text.replace("{name}", user.name);
  }

  private updateCampaignMetrics(
    results: PromiseSettledResult<AxiosResponse>[]
  ) {
    // Implementar lógica de atualização de métricas
  }
}
```
