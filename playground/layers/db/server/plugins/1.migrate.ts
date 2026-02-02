import { consola } from 'consola'

import type { DrizzleDatasources } from '#nuxt-drizzle/virtual/datasources'

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hookOnce('drizzle:created', async (datasources) => {
    for (const [name, datasource] of Object.entries(datasources)) {
      const migrations = await useDrizzleMigrations(name as keyof DrizzleDatasources)
      if (!migrations) {
        consola.info(`Found no migrations for ${JSON.stringify(name)} datasource`)
        continue
      }

      consola.info(`Running migrations for ${JSON.stringify(name)} datasource...`)

      for await (const { id, query } of migrations) {
        try {
          await datasource.db.run(query)
        }
        catch (cause) {
          consola.warn(`Migrations for ${JSON.stringify(name)} rolled back.`)

          throw createError({
            fatal: true,
            message: `Migrations for ${JSON.stringify(name)} rolled back`,
            cause,
            data: {
              id,
              statement: query,
            },
          })
        }
      }

      consola.success(`Migrations for ${JSON.stringify(name)} completed`)
    }

    nitro.hooks.callHook('drizzle:migrated', datasources)
  })
})

declare module 'nitropack/types' {
  interface NitroRuntimeHooks {
    'drizzle:migrated': (datasources: DrizzleDatasources) => void
  }
}
