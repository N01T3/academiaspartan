# Academia Spartan 🏋️

Site institucional da **Academia Spartan** — centro de treinamento focado em
bodybuilding, força e performance. Construído com **Vue 3 + TypeScript +
Tailwind CSS**, com painel administrativo completo e dados mock persistidos em
`localStorage` (backend previsto para a fase 2).

---

## Sumário

1. [Visão geral](#visão-geral)
2. [Funcionalidades](#funcionalidades)
3. [Stack tecnológica](#stack-tecnológica)
4. [Pré-requisitos](#pré-requisitos)
5. [Instalação e execução](#instalação-e-execução)
6. [Variáveis de ambiente](#variáveis-de-ambiente)
7. [Scripts disponíveis](#scripts-disponíveis)
8. [Estrutura do projeto](#estrutura-do-projeto)
9. [Design system](#design-system)
10. [Rotas](#rotas)
11. [Autenticação e papéis](#autenticação-e-papéis)
12. [Painel administrativo](#painel-administrativo)
13. [Camada de dados (mock)](#camada-de-dados-mock)
14. [SEO e meta tags](#seo-e-meta-tags)
15. [Logo e imagens](#logo-e-imagens)
16. [Decisões técnicas](#decisões-técnicas)
17. [Roadmap — Fase 2 (backend)](#roadmap--fase-2-backend)
18. [Solução de problemas](#solução-de-problemas)

---

## Visão geral

Site com 8 páginas públicas, área de login administrativo e painel com 9
módulos de gerenciamento. Todos os dados são **mock** e persistidos no
`localStorage` do navegador, simulando CRUD real para facilitar a migração
para uma API no futuro.

## Funcionalidades

**Site público**

- Home com hero, diferenciais, resumo de programas e depoimentos
- Página de equipe com credenciais (prova social)
- Galeria de estrutura
- Programas/Modalidades (com destaque para Bodybuilding)
- Blog com filtro por categoria e página de artigo
- Contato com formulário (grava mensagem), mapa, horários e click-to-call
- Rodapé com feed do Instagram (placeholder)

**Painel administrativo** (ver seção própria)

## Stack tecnológica

| Camada       | Tecnologia                              | Versão |
| ------------ | --------------------------------------- | ------ |
| Framework    | Vue 3 (Composition API / `<script setup>`) | ^3.5   |
| Linguagem    | TypeScript                              | ~6.0   |
| Build        | Vite                                    | ^8.2   |
| Estilo       | Tailwind CSS                            | ^3.4   |
| Roteamento   | Vue Router                              | ^4.6   |
| Estado       | Pinia                                   | ^4.0   |
| Lint         | ESLint (+ plugin Vue/TS)                | ^10    |
| Formatação   | Prettier                                | ^3.9   |

## Pré-requisitos

- Node.js 18+ (projeto validado em Node 24.19)
- npm 9+

## Instalação e execução

```bash
git clone <repo>
cd academia-spartan
npm install
cp .env.example .env   # ajuste as credenciais se desejar
npm run dev            # http://localhost:5173
```

## Variáveis de ambiente

| Variável         | Descrição                     | Padrão       |
| ---------------- | ----------------------------- | ------------ |
| `VITE_ADMIN_USER` | Usuário do admin (bootstrap) | `admin`      |
| `VITE_ADMIN_PASS` | Senha do admin (bootstrap)   | `spartan123` |

> O arquivo `.env` não é versionado. `.env.example` serve de referência.

## Scripts disponíveis

| Script             | O que faz                                            |
| ------------------ | ---------------------------------------------------- |
| `npm run dev`      | Servidor de desenvolvimento (HMR)                    |
| `npm run build`    | Typecheck (`vue-tsc -b`) + build de produção         |
| `npm run preview`  | Serve o build de produção localmente                 |
| `npm run typecheck`| Checa tipos TypeScript                               |
| `npm run lint`     | ESLint com auto-correção (`--fix`)                   |
| `npm run format`   | Formata com Prettier                                 |

## Estrutura do projeto

```
academia-spartan/
├── index.html                  # entry HTML (pt-BR, fontes, meta)
├── package.json
├── tsconfig.json / .app / .node
├── vite.config.ts              # alias @ → src/
├── tailwind.config.cjs         # design tokens (cores, fontes)
├── postcss.config.cjs
├── eslint.config.js            # flat config (Vue + TS + Prettier)
├── .prettierrc.json
├── .env / .env.example         # credenciais admin
├── scripts/
│   └── process-logo.mjs        # recorte/upscale do logo
├── public/
│   ├── favicon.svg
│   └── logo.png
└── src/
    ├── main.ts                 # bootstrap (Pinia + Router)
    ├── App.vue                 # <RouterView/>
    ├── style.css               # @tailwind + classes utilitárias
    ├── assets/
    │   └── logo.png
    ├── types/index.ts          # interfaces do domínio
    ├── data/                   # seeds mock (team, posts, programs, ...)
    ├── store/                  # Pinia (auth, users, content, finance, erp)
    ├── router/index.ts         # rotas + guards
    ├── composables/            # useAuth, useMeta
    ├── utils/                  # format, storage
    ├── components/
    │   ├── ui/                 # UiButton, BaseModal, ToggleSwitch, SectionTitle, KpiCard
    │   ├── layout/             # SiteHeader, SiteFooter, InstagramFeed, PublicLayout
    │   └── sections/           # Hero, TeamCard, ProgramCard, BlogCard, TestimonialCard
    ├── views/                  # páginas públicas
    └── admin/                  # AdminLayout + 9 módulos
```

## Design system

Tokens definidos em `tailwind.config.cjs`:

- **Cores**: `ink` (fundo carvão `#0B0D10` + escala), `primary` (vermelho
  `#E11D2E` + escala 50–900), `accent` (laranja `#F97316` + escala)
- **Tipografia**: `font-display` (Oswald, títulos em caixa alta) e `font-sans`
  (Inter, texto ≥16px)
- **Classes utilitárias** em `src/style.css`: `.container-content`, `.section`,
  `.btn` / `.btn-primary` / `.btn-accent` / `.btn-outline`, `.input`, `.label`,
  `.card`, `.eyebrow`

## Rotas

| Rota          | View            | Descrição                                |
| ------------- | --------------- | ---------------------------------------- |
| `/`           | HomeView        | Hero, diferenciais, programas, depoimentos, CTA |
| `/equipe`     | EquipeView      | Cards da equipe                          |
| `/estrutura`  | EstruturaView   | Galeria                                  |
| `/programas`  | ProgramasView   | Modalidades + casos de sucesso           |
| `/blog`       | BlogView        | Lista com filtro por categoria           |
| `/blog/:slug` | BlogPostView    | Artigo                                   |
| `/contato`    | ContatoView     | Formulário + mapa + horários             |
| `/login`      | LoginView       | Login administrativo                     |

## Autenticação e papéis

- Login mock validado contra o `store/users` (seed do `.env` para o admin).
- Sessão persistida em `localStorage` (`spartan.token` + `spartan.session`).
- Papéis: `admin` (acesso total) e `editor` (sem Usuários, Finanças e ERP).
- Guarda `beforeEach` em `router/index.ts` protege `/admin/*` (metas
  `requiresAuth` e `requiresAdmin`).

## Painel administrativo

| Rota               | Módulo        | CRUD                              |
| ------------------ | ------------- | --------------------------------- |
| `/admin`           | Dashboard     | KPIs                              |
| `/admin/posts`     | Posts do blog | criar/editar/excluir/publicar     |
| `/admin/equipe`    | Equipe        | criar/editar/excluir              |
| `/admin/depoimentos` | Depoimentos | criar/editar/excluir              |
| `/admin/programas` | Programas     | criar/editar/excluir              |
| `/admin/config`    | Config do site | hero, contato, horários, redes, mapa |
| `/admin/mensagens` | Mensagens     | ler/marcar lida/excluir           |
| `/admin/usuarios`  | Usuários      | criar/editar/excluir (papéis)     |
| `/admin/financas`  | Finanças      | lançamentos + planos              |
| `/admin/erp`       | ERP           | módulos e integrações             |

## Camada de dados (mock)

- Seeds em `src/data/*.ts`.
- Stores Pinia (`store/*.ts`) carregam do `localStorage` (fallback = seed) e
  persistem a cada alteração.
- Chaves: `spartan.<entidade>` (ex.: `spartan.posts`).

| Store     | Entidades                                                                 |
| --------- | ------------------------------------------------------------------------- |
| `auth`    | token + usuário logado                                                    |
| `users`   | usuários do admin                                                         |
| `content` | equipe, programas, posts, depoimentos, galeria, config, mensagens         |
| `finance` | transações, planos                                                        |
| `erp`     | módulos ERP                                                               |

## SEO e meta tags

- `composables/useMeta.ts` injeta/atualiza `title`, `description` e Open Graph
  (`og:title`, `og:description`, `og:image`, `og:url`) por página.
- `index.html` com idioma `pt-BR`, `theme-color` e fontes do Google Fonts.

## Logo e imagens

- `public/logo.png` (favicon/referência pública) e `src/assets/logo.png`.
- O logo atual foi recortado/processado a partir de um screenshot (upscale 3×,
  fundo removido via script `scripts/process-logo.mjs`). **Substituir por um
  original em alta/vector** quando disponível.
- Demais imagens são placeholders do Unsplash.

## Decisões técnicas

- **Views vs components**: páginas em `views/`; elementos reutilizáveis em
  `components/` (`ui/`, `layout/`, `sections/`).
- **PascalCase** para componentes, alias `@` → `src/`.
- **Tailwind**: tokens centralizados em vez de valores arbitrários; estilos
  repetidos extraídos como classes de componente (`.btn`, `.card`) via
  `@layer components`.
- **TypeScript estrito**: `noUnusedLocals`, `noUnusedParameters` habilitados.
- **ESLint flat config** + Prettier (`semi: false`, `singleQuote: true`).
- `sharp` é dependência de build apenas para processar o logo (script).

## Roadmap — Fase 2 (backend)

- API REST em Node.js/TypeScript (arquitetura por features: controller,
  service, model, route).
- Autenticação real (JWT + bcrypt), banco PostgreSQL + TypeORM (ou MongoDB +
  Mongoose).
- Substituir persistência em `localStorage` por chamadas HTTP (camada
  `services/` com Axios).
- Integrações reais: formulário de contato, feed do Instagram e módulos ERP.

## Solução de problemas

| Problema                                          | Solução                                                                 |
| ------------------------------------------------- | ----------------------------------------------------------------------- |
| `node` não reconhecido no terminal                | Instale Node LTS (`winget install OpenJS.NodeJS.LTS`) e reabra o terminal |
| Login não funciona                                | Verifique `.env` (use `.env.example`) e limpe o `localStorage` do navegador |
| Dados mock "antigos" persistindo                  | Limpe a chave `spartan.*` no `localStorage`                             |
