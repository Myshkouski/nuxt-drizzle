import { defineConfig } from '@nuxt-drizzle/utils'

export default defineConfig({
  dialect: 'postgresql',
  driver: 'pglite',
  schema: './schema/authors.ts',
  out: './migrations',
}, __dirname)
