<script setup lang="ts">
import { siteConfig } from '../data/site'

const { about, avatar, author } = siteConfig
</script>

<template>
  <section id="about" class="mx-auto max-w-5xl px-6 py-12">
    <div
      class="flex flex-col items-center gap-8 rounded-2xl border border-main bg-[var(--vp-c-bg-brand)] p-8 sm:flex-row sm:items-start"
    >
      <div class="flex shrink-0 flex-col items-center gap-3 text-center">
        <span class="text-xs font-semibold uppercase tracking-widest text-primary-default">
          {{ about.kicker }}
        </span>
        <h2 class="m-0 text-3xl font-bold">{{ about.title }}</h2>
        <img
          :src="avatar"
          :alt="`${author}のアバター`"
          width="160"
          height="160"
          loading="lazy"
          class="h-40 w-40 rounded-full object-cover"
        />
      </div>

      <div class="flex-1">
        <p class="mt-0 text-lg font-medium text-main">{{ about.lead }}</p>
        <p class="text-secondary">{{ about.bio }}</p>
        <ul class="mt-4 flex flex-wrap gap-2 p-0">
          <li
            v-for="tag in about.tags"
            :key="tag"
            class="list-none rounded-full border border-main px-3 py-1 text-sm text-secondary"
          >
            {{ tag }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
