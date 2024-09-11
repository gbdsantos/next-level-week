<h1 align="center">
    <br>
    NLW Pocket: JavaScript
</h1>

<p align="center">
  <a href="https://orm.drizzle.team">
    <img alt="Versão do Drizzle" src="https://img.shields.io/badge/drizzle-v0.33.0-43853D?style=flat&logo=drizzle&logoColor=c5f74f&labelColor=000&color=393939">
  </a>
  <a href="https://nodejs.org">
    <img alt="versão do Node.js" src="https://img.shields.io/badge/node.js-v20.16.1-3853D?style=flat&logo=node.js&logoColor=white&labelColor=43853D&color=5a5a5a">
  </a>
</p>

<div align="center">
  <details>
  <summary><b>Demo</b></summary>
    <div style="width: 90%;">
      <img alt="Demonstração da aplicação" src="demo.gif" />
    </div>
  </details>
</div>

<br>

<div align="center">
  <h4 align="center">leia no idioma</h4>
  <a href="https://github.com/gbdsantos/next-level-week/blob/master/17-edition/server" hreflang="en-us" alt="en-us">🇺🇸 inglês
  </a>
</div>

## Sobre

Edição 17 do evento Next Level Week Pocket: JavaScript da Rocketseat durante os dias  09, 10, 11 de Setembro de 2024.

## Início

```bash
# 1. Instalar as dependências
npm install

# 2. Cria um novo ambiente docker
docker compose up -d

# 3. Executar migrations
npx drizzle-kit migrate

# 4. Run seeds (OPCIONAL)
npm run seed

# 5. Gerar migrations (OPCIONAL)
npx drizzle-kit generate

# Ver tabelas do banco de dados
npx drizzle-kit studio
```

<br>

## Comandos Executados

```bash
# Criar projeto
npm init -y

# Instalar TypeScript, Node.js types, e tsx
npm i typescript @types/node tsx -D

# Inicializar TypeScript
npx tsc --init

# Instalar Fastify
npm i fastify

# Instalar Biomejs
npm i -D --save-exact @biomejs/biome

# Instalar Drizzle ORM
npm i drizzle-orm 

# Instalar drizzle-kit
npm i drizzle-kit -D

# Instalar Zod
npm i zod

# Instalar postgres driver
npm i postgres

# Instalar parallel
npm i @paralleldrive/cuid2

# Instalar dayjs
npm i dayjs

# Instalar fastify-type-provider-zod
npm i fastify-type-provider-zod

# Instalar fastify/cors
npm i @fastify/cors
```

<br>

## Requisitos do ambiente local

- Node.js >=20

## Tecnologias

- [Biome](https://biomejs.dev "Biomejs") - Uma cadeia de ferramentas para seu projeto web. Formate, *lint* e mais em uma fração de segundo
- [Drizzle](https://orm.drizzle.team "Drizzle ORM - next gen TypeScript ORM") - JavaScript/TypeScript ORM (*Object Relation Mapping*)
- [Node.js](https://nodejs.org "Node.js") - Ambiente/plataforma em tempo de execução para JavaScript

---

Feito com ❤️ por Guilherme Bezerra 👋 [Entre em contato!](https://www.linkedin.com/in/gbdsantos "LinkedIn - Guilherme Bezerra")