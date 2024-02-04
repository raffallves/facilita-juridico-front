# Front End da Aplicação

Esta é uma visualização bem simples, composta de uma página com alguns componentes e modais, feita para o teste da empresa Facilita Jurídico.

O ambiente de desenvolvimento utilizado é o Vite (devido à sua excelente performance de HMR). A linguagem escolhida foi o Typescript — devido à alta segurança da sua tipagem — com a framework React (um dos requisitos do teste).

## Rodando a aplicação

Basta rodar o seguinte comando para rodar o front localmente na porta 5173:

```bash
npm run dev
```

> [!Atenção]  
> Caso a url em que o back end da aplicação estiver rodando não for a `http://localhost` na porta `3000`, os seguintes arquivos terão de ser alterados:

- `./src/App.tsx`
- `./src/components/CreateClientDialog.tsx`
- `./src/components/ItineraryModal.tsx`

## Melhorias

A seguir estão as melhorias que eu faria caso tivesse mais tempo:

- Configuração para não precisar editar variáveis de ambiente (como a url do servidor) manualmente;
- Testes com a [react-testing-library](https://testing-library.com/);
- Identidade visual mais atraente desenhada no `Figma`;
- Paginação;
- Algum mecanismo de cache como o [Redis](https://redis.io/), por exemplo;
- Tela de login e de gerenciamento de conta;
- Gerenciamento de validação de tokens de acesso;
