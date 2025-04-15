# Guia de Contribuição

Obrigado por considerar contribuir com o Evolution Bridge! Este documento fornece um conjunto de diretrizes para contribuir com o projeto.

## Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Requisitos para Contribuição

- Node.js 14 ou superior
- TypeScript 4.0 ou superior
- Conhecimento básico de Git
- Familiaridade com o padrão de commits convencionais

## Padrão de Código

### TypeScript

- Use TypeScript estritamente tipado
- Evite usar `any` sempre que possível
- Documente interfaces e tipos complexos
- Use enums para valores constantes
- Siga as convenções de nomenclatura do TypeScript

### Estilo de Código

- Use 2 espaços para indentação
- Use ponto e vírgula no final das declarações
- Use aspas simples para strings
- Use camelCase para variáveis e funções
- Use PascalCase para classes e interfaces
- Use UPPER_SNAKE_CASE para constantes

### Documentação

- Documente todas as funções públicas com JSDoc
- Inclua exemplos de uso quando apropriado
- Mantenha a documentação atualizada
- Use markdown para formatação

## Estrutura do Projeto

```
evolution-bridge/
├── src/                    # Código fonte
│   ├── lib/               # Implementação principal
│   ├── types/             # Definições de tipos
│   └── index.ts           # Ponto de entrada
├── examples/              # Exemplos de uso
├── docs/                  # Documentação
├── tests/                 # Testes
└── package.json           # Configuração do projeto
```

## Testes

- Escreva testes para todas as novas funcionalidades
- Mantenha a cobertura de testes acima de 80%
- Use Jest para testes
- Siga o padrão de nomenclatura `*.test.ts`

## Commits

Siga o padrão de commits convencionais:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Tipos de commit:

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças na documentação
- `style`: Formatação, ponto e vírgula, etc.
- `refactor`: Refatoração de código
- `test`: Adição ou modificação de testes
- `chore`: Atualização de tarefas, configuração, etc.

## Pull Requests

1. Descreva claramente as mudanças
2. Inclua exemplos de uso quando apropriado
3. Atualize a documentação
4. Certifique-se de que todos os testes passam
5. Mantenha o PR focado em uma única mudança

## Issues

- Use o template de issue apropriado
- Forneça informações detalhadas sobre o problema
- Inclua exemplos de código quando possível
- Use labels apropriados

## Código de Conduta

- Seja respeitoso
- Mantenha discussões construtivas
- Aceite críticas construtivas
- Ajude outros contribuidores

## Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a licença MIT.
