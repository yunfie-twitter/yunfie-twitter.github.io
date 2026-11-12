<script setup>
import { useData } from 'vitepress'
import moment from 'moment'

const { frontmatter } = useData()

const tagHref = (tag) => '/tags/' + encodeURIComponent(tag.replaceAll(' ', '').toLowerCase())
</script>

<template>
  <div class="vp-doc">
    <p class="mb-0">
      <span>📆 {{ moment(frontmatter.date).format('YYYY-MM-DD') }}</span>
    </p>
    <h1>{{ frontmatter.title }}</h1>
    <p v-if="frontmatter.description" class="text-secondary text-base">
      {{ frontmatter.description }}
    </p>
    <div v-if="frontmatter.tags" class="flex flex-row flex-wrap gap-2 leading-7">
      <a v-for="tag in frontmatter.tags" :key="tag" :href="tagHref(tag)">#{{ tag }}</a>
    </div>
  </div>
</template>
