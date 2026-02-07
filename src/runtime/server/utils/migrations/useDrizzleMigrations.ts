import { createError } from 'h3'
import type { Migration } from '@nuxt-drizzle/utils/migration'
import { useStorage } from 'nitropack/runtime'
import type { Storage } from 'unstorage'
import { digest } from 'ohash'

export async function useDrizzleMigrations<
  TName extends DrizzleDatasourceName,
>(name: TName) {
  const storage = useStorage<string>(`assets:drizzle:migrations:${name}`)
  const journal = await storage.getItem<MigrationJournal>(`meta/_journal.json`)
  if (!journal) {
    throw createError({
      fatal: true,
      message: `Cannot find migration journal for '${name}'`,
      data: {
        datasource: name,
      },
    })
  }

  return generate(journal, storage)
}

const STATEMENT_BREAKPOINT = '--> statement-breakpoint' as const

async function* generate(journal: MigrationJournal, storage: Storage<string>) {
  for (const { idx, when, tag, breakpoints } of journal.entries) {
    const filename = tag + '.sql'
    const query = await storage.getItem<string>(filename)

    if (!query) {
      throw createError({
        fatal: true,
        message: `Cannot find migration filename: ${filename}`,
        data: {
          filename,
        },
      })
    }

    const migration: Migration = {
      filename,
      idx,
      sql: query.split(STATEMENT_BREAKPOINT),
      hash: digest(query),
      folderMillis: when,
      bps: breakpoints,
    }

    yield migration
  }
}

interface MigrationJournal {
  entries: Iterable<{
    idx: number
    version: string
    when: number
    tag: string
    breakpoints: true
  }>
}
