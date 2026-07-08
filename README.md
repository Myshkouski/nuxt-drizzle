<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: nuxt-drizzle
- Description: My new Nuxt module
-->

# nuxt-drizzle

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A [Nuxt](https://nuxt.com) module that brings [Drizzle ORM](https://orm.drizzle.team) to the Nuxt server layer, built on top of [`nitro-drizzle`](https://www.npmjs.com/package/nitro-drizzle).

`nuxt-drizzle` is a thin Nuxt integration layer around [`nitro-drizzle`](https://www.npmjs.com/package/nitro-drizzle). It wires Drizzle into Nitro's server runtime — handling config discovery, migration execution, type generation, server virtual modules, and asset bundling — so you can work with one or many Drizzle datasources directly inside your Nuxt server routes and plugins.

- 🧩 First-class [`nitro-drizzle`](https://www.npmjs.com/package/nitro-drizzle) integration for Nuxt
- 🗄️ Multiple datasources (e.g. `sqlite`, `postgresql`, `mysql`) in a single app
- 🚀 Automatic migrations on server init (`migrateOnInit`)
- 🔌 Configurable connectors and drivers (e.g. `pglite`, `sqlite`)
- 🧠 Typed `useDatasource()` access from server routes and Nitro plugins
- 🛠️ Zero-config type templates and virtual modules generated on the fly

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxt module add nuxt-drizzle
```

Then register it and configure your datasources in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-drizzle',
  ],
  drizzle: {
    baseDir: './server/drizzle',
    migrations: {
      migrateOnInit: true,
    },
    datasources: {
      users: {
        connector: 'pglite',
      },
      content: {
        connector: 'sqlite',
      },
    },
  },
})
```

Define a datasource with `defineConfig` from `nitro-drizzle/config`:

```ts
// server/drizzle/users/drizzle-sqlite.config.ts
import { defineConfig } from 'nitro-drizzle/config'

export default defineConfig({
  strict: true,
  dialect: 'sqlite',
  schema: ['./sqlite/schema/authors.ts'],
  out: './sqlite/migrations',
}, import.meta.url)
```

Use it from a server route via `nitro-drizzle/runtime`:

```ts
// server/api/v1/users.get.ts
import { useDatasource } from 'nitro-drizzle/runtime'

export default defineEventHandler(async (event) => {
  await event.context.drizzle.waitReady()

  const { database, schema } = await useDatasource('users')
  const authors = await database.select().from(schema.authors).limit(10)

  return { authors }
})
```

That's it! You can now use `nuxt-drizzle` in your Nuxt app ✨

> Under the hood, all database wiring, migrations, and runtime helpers come from [`nitro-drizzle`](https://www.npmjs.com/package/nitro-drizzle). See its docs for the full configuration reference (`nitro-drizzle/config`, `nitro-drizzle/runtime`, `nitro-drizzle/utils`).

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```
</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-drizzle/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-drizzle

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-drizzle.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-drizzle

[license-src]: https://img.shields.io/npm/l/nuxt-drizzle.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-drizzle

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt
[nuxt-href]: https://nuxt.com
