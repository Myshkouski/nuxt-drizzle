<template>
  <UContainer class="space-y-8 my-8">
    <h1 class="text-2xl font-bold px-0.5">
      Blog Posts
    </h1>
    <UBlogPosts :posts="posts" />
  </UContainer>
</template>

<script setup lang="ts">
import type { BlogPostProps, UserProps } from '@nuxt/ui'

definePageMeta({
  title: 'Blog Posts',
})

const { data: users } = useFetch('/api/v1/users')
const authors = computed(() => {
  if (!users.value) return []
  return users.value.authors
})

const { data: content } = useFetch('/api/v1/content')
const posts = computed(() => {
  if (!content.value) return []
  return content.value.posts.map((post) => {
    return {
      ...post,
      authors: authors.value.filter((author) => {
        return post.authors?.includes(author.id)
      }).map((author) => {
        return {
          name: author.name,
          avatar: {
            text: author.name.split(' ').map(value => value.at(0)!).join(''),
          },
        } satisfies UserProps
      }),
    } satisfies BlogPostProps
  })
})
</script>
