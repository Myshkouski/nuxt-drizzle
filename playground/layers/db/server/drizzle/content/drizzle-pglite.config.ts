import { defineConfig } from '@nuxt-drizzle/utils'

export default defineConfig({
  strict: true,
  dialect: 'postgresql',
  driver: 'pglite',
  schema: [
    './postgresql/schema/posts.ts',
    './postgresql/schema/comments.ts',
  ],
  out: './postgresql/migrations',
}, __dirname)
