import { defineConfig } from '@nuxt-drizzle/utils/config'

export default defineConfig({
  strict: true,
  dialect: 'sqlite',
  schema: './sqlite/schema.ts',
  out: './sqlite/migrations',
  casing: 'snake_case',
}, __dirname)
