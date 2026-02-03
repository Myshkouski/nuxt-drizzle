import { pgTable, text, timestamp, type PgArray } from 'drizzle-orm/pg-core'

export const posts = pgTable('posts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  date: timestamp('date', { withTimezone: true }).notNull(),
  authors: text('authors').array(),
})
