import { EvolutionBridge } from "../src";

// Inicializar o cliente
const bridge = new EvolutionBridge({
  url: "https://api.evolution.com",
  apiKey: "your-api-key",
  instance: "your-instance",
});

async function main() {
  try {
    // Exemplo 1: Enviar mensagem simples
    const response1 = await bridge.sendText({
      data: {
        number: "5511999999999",
        text: "Olá! Esta é uma mensagem de teste.",
      },
    });
    console.log("Mensagem enviada:", response1.data);

    // Exemplo 2: Enviar mensagem com delay e preview de link
    const response2 = await bridge.sendText({
      data: {
        number: "5511999999999",
        text: "Confira este link: https://example.com",
        delay: 2000,
        linkPreview: true,
      },
    });
    console.log("Mensagem com link enviada:", response2.data);

    // Exemplo 3: Enviar mensagem citando outra
    const response3 = await bridge.sendText({
      data: {
        number: "5511999999999",
        text: "Respondendo à sua mensagem anterior",
        quoted: {
          key: {
            id: "message-id-to-quote",
          },
          message: {
            conversation: "Mensagem original",
          },
        },
      },
    });
    console.log("Mensagem citada enviada:", response3.data);

    // Exemplo 4: Enviar mensagem com menções
    const response4 = await bridge.sendText({
      data: {
        number: "5511999999999",
        text: "Olá @5511999999999 e @5511888888888!",
        mentioned: ["5511999999999", "5511888888888"],
      },
    });
    console.log("Mensagem com menções enviada:", response4.data);
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
  }
}

main();
