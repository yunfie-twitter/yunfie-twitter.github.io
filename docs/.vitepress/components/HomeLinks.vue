<script setup lang="ts">
import { computed, ref } from 'vue'
import { featuredLinkNames, profileLinks, type ProfileLink } from '../data/links'
import SectionHeader from './SectionHeader.vue'

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
  <section id="links" class="home-section">
    <SectionHeader
      index="05 — Elsewhere"
      title="Links"
      description="各種SNSや関連サービスへのリンク。"
    />

    <div class="home-links">
      <a
        v-for="link in visibleLinks"
        :key="link.name"
        class="link-row"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer me"
        :aria-label="link.label"
      >
        <span class="link-row__icon" :style="{ backgroundColor: link.accent }" aria-hidden="true">
          <img :src="link.icon" alt="" width="18" height="18" loading="lazy" />
        </span>
        <span class="link-row__copy">
          <span class="link-row__name">{{ link.name }}</span>
          <span class="link-row__kind">{{ link.kind }}</span>
        </span>
        <span class="link-row__url">{{ link.text }}</span>
        <span class="link-row__arrow" aria-hidden="true">↗</span>
      </a>
    </div>

    <button
      v-if="moreLinks.length > 0"
      type="button"
      class="home-more"
      :aria-expanded="showAll"
      @click="showAll = !showAll"
    >
      {{ showAll ? '閉じる' : `続きを表示（+${moreLinks.length}）` }}
    </button>
  </section>
</template>
