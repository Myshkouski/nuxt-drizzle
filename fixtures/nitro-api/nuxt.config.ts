import path from "node:path";

export default defineNuxtConfig({
  modules: ["nuxt-drizzle"],
  drizzle: {
    baseDir: path.resolve(import.meta.dirname, "./server/drizzle"),
    migrations: {
      migrateOnInit: true,
    },
    datasources: {
      content: {
        connector: "sqlite",
      },
      users: {
        connector: "pglite",
      },
      // @ts-expect-error unknown datasource type is intentionally omitted to test validation
      unknownDatasource: {},
    },
  },
});
