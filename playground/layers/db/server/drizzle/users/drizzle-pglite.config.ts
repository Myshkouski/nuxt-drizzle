import { defineConfig } from '@nuxt-drizzle/utils'

export default defineConfig({
  strict: true,
  dialect: 'postgresql',
  driver: 'pglite',
  schema: './postgresql/schema.ts',
  out: './postgresql/migrations',
  casing: 'snake_case',
}, __dirname)
