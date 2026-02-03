export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    '@nuxt/ui',
  ],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  runtimeConfig: {
    drizzle: {
      content: {
        url: ':memory:',
      },
      users: {
        url: ':memory:',
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
        connector: 'sqlite',
      },
    },
  },
})
