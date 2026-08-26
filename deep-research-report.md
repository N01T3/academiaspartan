# Diretrizes de Projeto – Academia Spartan

**Identidade Visual:** O site deve transmitir força, profissionalismo e energia. Recomenda-se **paleta escura** com toques de cor forte: por exemplo, fundo preto/carvão e detalhes em vermelho e laranja vibrantes, criando contraste e dinamismo. O uso de **preto** transmite poder e sofisticação (componente premium), enquanto o **vermelho** destaca botões e chamadas de ação, reforçando energia, paixão e motivação. Cores secundárias como laranja podem acentuar entusiasmo. Mantenha bastante contraste (texto claro sobre fundo escuro) para legibilidade. 

 *Imagem inspiradora: atleta levantando peso em academia escura, reforçando o clima “bodybuilding” e energético desejado.* 

Escolha tipografia robusta e de fácil leitura: fontes **sans-serif negrito** para títulos (por exemplo _Montserrat_, _Oswald_ ou _Bebas Neue_), que transmitem força. Use fonte neutra para texto corrido (_Open Sans_, _Roboto_ ou similares) em tamanho confortável (≥16px) para boa experiência móvel. Evite mais de duas famílias de fonte diferentes. Títulos em caixa alta reforçam impacto visual.  

O layout deve ser moderno e “dinâmico”: use hero banner ou vídeo de atletas em ação na página inicial para criar imersão imediata. Incluir fotos reais da equipe e da estrutura, tornando o site autêntico (evite só imagens de banco de dados). Integre o feed do Instagram (social proof) no rodapé ou seção “Galeria”, conforme boas práticas (sites de academia costumam embutir feeds sociais para credibilidade). 

**Arquitetura de Pastas (Vue + Tailwind + TypeScript):** Organize o front-end segundo convenções Vue 3/Vite. Por exemplo, dentro de `src/` ter: 

```
src/
├── assets/          # arquivos estáticos (imagens, fontes, ícones)
├── components/      # componentes Vue reutilizáveis (botões, cards, navegação, etc.)
│   ├── ui/          # elementos de interface básicos
│   ├── layout/      # estrutura comum (header, footer, navbar)
│   └── ... 
├── views/           # páginas (Home.vue, Equipe.vue, Estrutura.vue, Bodybuilding.vue, Contato.vue, etc.) – cada arquivo mapeia uma rota
├── router/          # configuração do Vue Router (rotas apontando para views)
│   └── index.ts
├── composables/     # funções reutilizáveis com Composition API (ex: useAuth, useApi)
├── store/           # Pinia ou outro gerenciador de estado (ex.: modules para usuário, atletas)
├── utils/           # funções utilitárias (formatadores, validações)
├── services/        # chamadas HTTP / API (e.g. cliente Axios)  
├── layout/          # layouts gerais (separação de layouts multi-layout se necessário)
└── main.ts          # ponto de entrada Vue (instancia app, plugins, etc.)
```

Nesta estrutura, diferencie **views** de **components**: páginas são containers de alto nível (mapeados em rotas) e `components/` abriga elementos genéricos usados pelas views. Mantenha os arquivos de componente em **PascalCase** (por exemplo `MeuBotao.vue`), conforme guia de estilo Vue. Cada componente deve residir em seu próprio arquivo. Para escopo de estilo, use `<style scoped>` ou classes únicas (BEM) para evitar vazamento de CSS entre componentes. 

No root do projeto, inclua arquivos de configuração chave: `package.json`, `tsconfig.json` (TypeScript), `tailwind.config.js`, `vite.config.ts` e ferramentas de lint (ESLint) e formatação (Prettier). No `tailwind.config.js`, defina `content: ["./src/**/*.{vue,js,ts,jsx,tsx}"]` para o Tailwind processar classes em arquivos Vue/TS. Declare **design tokens** no config do Tailwind (cores, espaçamentos, tipografia) para consistência visual. Por exemplo, configure uma cor primária no tema para reutilizar nas classes de utilitários (`text-primary`, `bg-primary`, etc.) sem códigos mágicos dispersos. Essa abordagem reduz a repetição de valores e facilita a manutenção. 

**Backend em TypeScript:** Organize o servidor Node.js em **arquitetura por features**. Cada domínio (ex.: autênticação, usuários, treinos) fica em pasta própria, contendo `controller.ts`, `service.ts`, `model.ts` (ou entidade) e `route.ts`. Exemplo: 

```
backend/
├── src/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.model.ts
│   │   │   └── auth.route.ts
│   │   └── user/
│   │       ├── user.controller.ts
│   │       ├── user.service.ts
│   │       ├── user.model.ts
│   │       └── user.route.ts
│   ├── api/            # versões de API, ex.: v1/
│   ├── config/         # configurações (BD, env, auth)
│   ├── middleware/     # middlewares Express (autenticação, logger)
│   ├── utils/          # helper genéricos
│   └── server.ts       # servidor (Express/Koa) e inicialização
├── package.json
└── tsconfig.json
```

Essa separação facilita manutenção e escalabilidade. Use TypeORM/Mongoose para models de BD; organize validações e DTOs com classes TypeScript. Adote linting (ESLint+TS) e testes unitários (Jest, por exemplo) no backend. Empregue rotas REST ou GraphQL claras, com versionamento se houver evoluções. 

 *Imagem ilustrativa: atleta exibindo força, refletindo o foco “bodybuilding” e impacto visual desejado.* 

**Páginas e Funcionalidades:** Defina rotas e páginas que cubram todos os requisitos funcionais:

- **Home (página inicial):** banner impactante (foto ou vídeo de treino), resumo dos serviços e CTA claro (“Agende uma aula grátis”, por exemplo). Destaque diferenciais (treinadores especializados, foco em atletas).
- **Equipe:** fotos e mini-bios dos profissionais (treinadores, nutricionistas, preparador físico), com credenciais (certificações visíveis como prova social).
- **Estrutura:** galeria ou tour virtual da academia (aparelhos, área de treinamento, vestiários). Ambientes profissionais aumentam confiança.
- **Programas/Modalidades:** seção sobre **Bodybuilding/Atletismo** (o diferencial). Detalhe programas de desenvolvimento atlético, concursos etc. Inclua casos de sucesso e depoimentos.
- **Blog/Artigos (opcional):** posts sobre treinamento, nutrição e eventos, reforçando autoridade da marca.
- **Contato:** formulário, mapa de localização, horário de atendimento e links para redes sociais (Instagram, etc). Botão click-to-call para número.
- **Footer:** link rápido, redes sociais e integração (por exemplo, incorpore o feed do Instagram da academia). 

Navegação clara (5–7 itens principais) e menu responsivo. Em mobile, siga práticas “thumb-zone” para botões principais. Todas as imagens e vídeos devem ser otimizados para web (compressão) visando PageSpeed alto.

**Boas Práticas de Desenvolvimento:**  
- **Componentização e DRY:** Crie componentes genéricos (botões, cards, modais) para evitar duplicação. Utilize a Composition API do Vue para lógica compartilhada (composables) e Pinia para estado global (e.g. usuário logado, carrinho de planos).
- **Tailwind CSS:** Use classes utilitárias para estilos imediatos e componentes atômicos. Agrupe classes logicamente e siga uma ordem consistente. Extraia estilos repetidos como componentes Vue, em vez de usar em demasia `@apply`. Prefira sobrepor classes de design tokens configurados no Tailwind (cores, espaçamento pré-definidos) em vez de valores arbitrários.
- **Tipagem TypeScript:** Tipar props de componentes, retornos de serviços e requests. Utilize generics quando apropriado para formulários e API.
- **Lint e Formatação:** Implemente ESLint (configurando regras do Vue/TS) e Prettier para consistência de código. Verifique código automaticamente em PRs.  
- **Git e Workflow:** Use branching model (ex.: Git Flow ou trunk-based), commits atômicos e claros. Pull requests revisados por pares. Documente decisões técnicas importantes (README, código ou wiki).  
- **Testes:** Escreva testes unitários para componentes críticos e serviços (Jest/Vitest + Testing Library). Em cada novo recurso, implemente testes de integração sempre que possível.
- **Acessibilidade e SEO:** Implemente atributos `alt` em imagens, use tags semânticas HTML5 e garanta contraste suficiente (conforme WCAG). Meta tags (Open Graph) devem ser preparadas para compartilhamentos (Instagram, Facebook). O site deve ser indexável e mobile-first.

**Resumo:** Essas diretrizes (visuais e técnicas) devem guiar o desenvolvimento de um site robusto e atraente. Use o Tailwind conforme as regras do framework, mantenha um *design system* consistente (tokens para cores/espaçamentos), e siga padrões de projeto Vue recomendados. Ao compor o layout, lembre-se de que **websites de academias priorizam motivar a ação** do usuário (inscrição, agendamento) com CTAs agressivos e imagens inspiradoras. O resultado final deve refletir profissionalismo e apelo visual, despertando a vontade de treinar enquanto mantém código limpo, escalável e padronizado. 

**Fontes:** Bases teóricas em *colorimetria em design de academias*, *padrões de tipografia em sites de fitness*, e recomendações de arquitetura Vue/Tailwind/TypeScript. Essas referências embasam as escolhas visuais e estruturais acima.