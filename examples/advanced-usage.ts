import { AxiosResponse } from "axios";
import { EvolutionBridge } from "../src";

// Inicializar o cliente com configurações personalizadas
const bridge = new EvolutionBridge({
  url: "https://api.evolution.com",
  apiKey: "your-api-key",
  instance: "your-instance",
});

// Função para enviar mensagem com retry
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

// Função para enviar mensagem em lote
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

async function main() {
  try {
    // Exemplo 1: Envio com retry
    console.log("Enviando mensagem com retry...");
    const response1 = await sendMessageWithRetry(
      "5511999999999",
      "Esta mensagem será reenviada em caso de falha",
      3,
      2000
    );
    console.log("Mensagem enviada com sucesso:", response1.data);

    // Exemplo 2: Envio em lote
    console.log("Enviando mensagens em lote...");
    const messages = [
      { number: "5511999999999", text: "Mensagem 1" },
      { number: "5511999999999", text: "Mensagem 2" },
      { number: "5511999999999", text: "Mensagem 3" },
      { number: "5511999999999", text: "Mensagem 4" },
      { number: "5511999999999", text: "Mensagem 5" },
      { number: "5511999999999", text: "Mensagem 6" },
    ];

    const results = await sendBatchMessages(messages, 2, 1000);

    // Analisar resultados
    const successful = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    console.log(`Resultado do envio em lote:`);
    console.log(`- Sucessos: ${successful}`);
    console.log(`- Falhas: ${failed}`);
  } catch (error) {
    console.error("Erro:", error);
  }
}

main();
