import path from 'node:path'
import nuxtDrizzle from '../../../src/module'

export default defineNuxtConfig({
  compatibilityDate: 'latest',
  modules: [
    nuxtDrizzle,
  ],
  drizzle: {
    baseDir: path.resolve(import.meta.dirname, './server/drizzle'),
    datasource: {
      content: {
        connector: 'sqlite',
      },
      users: {
        connector: 'pglite',
      },
    },
  },
  nitro: {
    typescript: {
      tsConfig: {
        include: [
          // Fix types when referencing module using import statement
          '../../../src/runtime/server/**/*.d.ts',
        ]
      }
    }
  },
})
