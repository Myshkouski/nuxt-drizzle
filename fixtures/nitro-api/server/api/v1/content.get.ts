import { useDatasource } from 'nitro-drizzle/runtime'

export default defineEventHandler(async (event) => {
  await event.context.drizzle.waitReady()

  const { database, schema } = await useDatasource('content')
  const [posts, comments] = await Promise.all([
    database.select().from(schema.posts).limit(10),
    database.select().from(schema.comments).limit(10),
  ])

  return {
    posts,
    comments,
  }
})
