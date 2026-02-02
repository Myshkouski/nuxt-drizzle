export default defineNuxtConfig({
  modules: [
    '../src/module',
  ],
  drizzle: {
    baseDir: '#layers/db/server/drizzle',
  },
})
