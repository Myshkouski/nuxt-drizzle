import { createError } from 'h3'
import { migrate, type DrizzleDatabase, type Migration } from '@nuxt-drizzle/utils/migration'
import type { NamedDrizzleDatasource } from '../types'

export async function migrateDrizzle<
  TDatasource extends NamedDrizzleDatasource<DrizzleDatasourceName>,
>(datasource: TDatasource, migrations: Iterable<Migration> | AsyncIterable<Migration>) {
  try {
    await migrate(datasource.db as any as DrizzleDatabase, migrations)
  }
  catch (cause) {
    throw createError({
      fatal: true,
      cause,
    })
  }
}
