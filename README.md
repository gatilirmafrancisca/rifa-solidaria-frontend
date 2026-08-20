# Gatil Irmã Francisca — Frontend

Frontend da Ação Solidária do Gatil Irmã Francisca. Stack: **React +
TypeScript + Tailwind CSS**, empacotado com **Vite** e roteado com
**React Router v7** (modo data router / SPA — sem SSR). Deploy alvo:
**Vercel**.

O backend (Express + TypeScript + MongoDB) é um projeto separado —
este repositório só conhece a API por HTTP, através de `VITE_API_URL`.

## Como rodar

```bash
npm install
cp .env.example .env   # ajuste VITE_API_URL se necessário
npm run dev
```

- `npm run dev` — servidor de desenvolvimento (Vite)
- `npm run build` — type-check + build de produção em `dist/`
- `npm run preview` — serve o build de produção localmente
- `npm run lint` — ESLint
- `npm run format` — Prettier

## Por que essa estrutura

```
src/
├── app/            Composição raiz: router, layout raiz
├── pages/          Uma página por rota. Só orquestra — nunca contém
│                   lógica de negócio ou chamada de API direta.
├── features/       Um domínio de produto por pasta (ex: raffle/).
│   └── raffle/     Tudo que é específico da rifa: componentes,
│                   hooks, tipos e chamadas de API do domínio.
├── components/
│   ├── ui/         Design system puro (Button, Input, Card...).
│   │               Não sabe nada sobre "rifa", "gato" ou negócio.
│   └── layout/     Header, Footer — usados em toda página.
├── hooks/          Hooks reaproveitáveis entre features
│                   (ex: useOrderParams).
├── lib/
│   ├── api/        Cliente HTTP central + um arquivo de API por
│                   domínio (ex: raffle.ts). Nenhum componente chama
│                   fetch() diretamente.
│   └── utils/      Funções puras (formatação, validação).
├── types/          Tipos compartilhados entre features.
└── styles/         CSS global (só o essencial — o resto é Tailwind).
```

**Regra geral:** se algo é específico da rifa, mora em `features/raffle`.
Se pode ser reaproveitado em qualquer campanha futura do Gatil (um
Button, um Input, a formatação de moeda), mora em `components/ui` ou
`lib/utils`. Isso evita que o projeto vire um único módulo gigante
conforme surgirem novas ações (ex: uma futura campanha de adoção
teria sua própria pasta `features/adocao`, reaproveitando o mesmo
design system).

## Sobre a rifa especificamente

A tela principal é `pages/ChooseNumberPage.tsx`, que hoje responde por:

- `/` (rota inicial, temporário até existir uma landing própria)
- `/acao-solidaria/escolher-numero`

Ela lê o `order_id` devolvido pelo PagBank via `useOrderParams()` e
busca os números já ocupados via `useAvailableNumbers()`.

### O que está mockado (procure por `TODO INTEGRAÇÃO API`)

- `features/raffle/constants.ts` — `MOCK_TAKEN_NUMBERS` é uma lista
  fixa. Trocar por dado real assim que o endpoint existir.
- `lib/api/raffle.ts` — `fetchTakenNumbers()` e `confirmNumber()`
  hoje retornam dado mockado. Os comentários mostram exatamente qual
  chamada real via `apiClient` deve substituí-los, incluindo os
  dois endpoints esperados:
  - `GET /api/rifa/numeros-ocupados`
  - `POST /api/rifa/confirmar-numero`
- `useRaffleForm.ts` — o `submit()` já está pronto para tratar o erro
  de "número escolhido por outra pessoa" (corrida entre dois
  compradores); falta só o backend devolver esse código de erro.

## Variáveis de ambiente

Ver `.env.example`. Nenhum segredo deve ir para o frontend — chaves de
API, credenciais do Mongo etc. ficam só no backend.

## Deploy (Vercel)

Este projeto é uma SPA estática (build gerado em `dist/`). O
`vercel.json` já inclui o rewrite necessário para que rotas do React
Router (ex: `/acao-solidaria/escolher-numero`) funcionem em refresh
de página, sem depender de um servidor Node.

O backend Express deve ser um projeto Vercel separado (ou uma
Serverless Function própria), com sua URL configurada em
`VITE_API_URL` nas variáveis de ambiente do projeto Vercel do
frontend.
