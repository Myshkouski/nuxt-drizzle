export default defineNuxtConfig({
  modules: [
    '../../../src/module',
  ],
  runtimeConfig: {
    drizzle: {
      content: {
        url: ':memory:',
      },
      users: {
        database: 'users',
      },
    },
  },
  compatibilityDate: 'latest',
  drizzle: {
    datasource: {
      content: {
        connector: 'sqlite',
      },
      users: {
        connector: 'pglite',
      },
    },
  },
})
