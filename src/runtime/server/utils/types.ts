import type { DrizzleDatasourceName, NamedDrizzleDatasourceFactory } from '#nuxt-drizzle/virtual/datasources'

export type DrizzleDatasources = {
  readonly [TName in DrizzleDatasourceName]: NamedDrizzleDatasource<TName>
}

export interface DrizzleDatasource<TDatabase, TSchema> {
  db: TDatabase
  schema: TSchema
}

export type NamedDrizzleDatasource<TName extends DrizzleDatasourceName> = {
  db: Awaited<ReturnType<NamedDrizzleDatasourceFactory<TName>['createDb']>>
  schema: NamedDrizzleDatasourceFactory<TName>['schema']
}
