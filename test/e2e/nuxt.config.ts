export default defineNuxtConfig({
  compatibilityDate: 'latest',
  extends: [
    '../fixtures/nuxt-app'
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
  drizzle: {
    datasource: {
      content: {
        connector: 'sqlite',
      },
      users: {
        connector: 'pglite',
      },
    },
  }
})
