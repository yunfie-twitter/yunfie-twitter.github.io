<script setup lang="ts">
import { computed, ref } from 'vue'
import { featuredLinkNames, profileLinks, type ProfileLink } from '../data/links'

const featured = featuredLinkNames
  .map((name) => profileLinks.find((link) => link.name === name))
  .filter((link): link is ProfileLink => Boolean(link))

const primaryLinks = featured.length > 0 ? featured : profileLinks.slice(0, 4)
const moreLinks = profileLinks.filter((link) => !primaryLinks.includes(link))
const showAll = ref(false)

const visibleLinks = computed(() =>
  showAll.value ? [...primaryLinks, ...moreLinks] : primaryLinks
)
</script>

<template>
  <section id="links" class="mx-auto max-w-5xl px-6 py-12">
    <h2 class="mb-2 text-center text-3xl font-bold">LINKS</h2>
    <p class="mb-8 text-center text-secondary">各種SNSや関連サービスへのリンクです。</p>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <a
        v-for="link in visibleLinks"
        :key="link.name"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer me"
        :aria-label="link.label"
        class="flex flex-col gap-1 rounded-xl border border-main bg-[var(--vp-c-bg)] p-4 no-underline transition-shadow hover:shadow-lg"
      >
        <span
          class="mb-2 flex h-10 w-10 items-center justify-center rounded-lg"
          :style="{ backgroundColor: link.accent }"
          aria-hidden="true"
        >
          <img :src="link.icon" alt="" width="24" height="24" loading="lazy" />
        </span>
        <span class="font-semibold text-main">{{ link.name }}</span>
        <small class="text-secondary">{{ link.kind }}</small>
        <small class="truncate text-secondary">{{ link.text }}</small>
      </a>
    </div>

    <div v-if="moreLinks.length > 0" class="mt-6 text-center">
      <button
        type="button"
        class="cursor-pointer rounded-md border border-main px-5 py-2 text-sm text-main"
        :aria-expanded="showAll"
        @click="showAll = !showAll"
      >
        {{ showAll ? '閉じる' : '続きを表示' }}
      </button>
    </div>
  </section>
</template>
