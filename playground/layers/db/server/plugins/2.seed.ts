import { consola } from 'consola'

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hookOnce('drizzle:migrated', async (datasources) => {
    consola.info('Seed started...')

    // Seed authors
    await datasources.users.db.insert(datasources.users.schema.authors).values([
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    ]).onConflictDoNothing()

    // Seed posts
    await datasources.content.db.insert(datasources.content.schema.posts).values([
      { id: '1', title: 'Nuxt Icon v1', description: 'Discover Nuxt Icon v1!', image: 'https://nuxt.com/assets/blog/nuxt-icon/cover.png', date: new Date('2024-11-25'), authors: ['1', '2'] },
      { id: '2', title: 'Nuxt 3.14', description: 'Nuxt 3.14 is out!', image: 'https://nuxt.com/assets/blog/v3.14.png', date: new Date('2024-11-04'), authors: ['1'] },
      { id: '3', title: 'Nuxt 3.13', description: 'Nuxt 3.13 is out!', image: 'https://nuxt.com/assets/blog/v3.13.png', date: new Date('2024-08-22'), authors: ['2'] },
    ]).onConflictDoNothing()

    // Seed comments
    await datasources.content.db.insert(datasources.content.schema.comments).values([
      { id: '1', postId: '1', authorId: '2', content: 'Great first post!', createdAt: new Date() },
      { id: '2', postId: '1', authorId: '1', content: 'Thanks for the comment!', createdAt: new Date() },
    ]).onConflictDoNothing()

    consola.info('Seed completed!')
  })
})
