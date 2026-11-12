<script setup lang="ts">
import { repositories } from '../data/repositories'
import SectionHeader from './SectionHeader.vue'
</script>

<template>
  <section id="repository" class="home-section">
    <SectionHeader
      index="04 — Code"
      title="Repository"
      description="公開しているコードと制作物。"
    />

    <div class="home-repos">
      <a
        v-for="repository in repositories"
        :key="repository.url"
        class="repo-row"
        :href="repository.url"
        target="_blank"
        rel="noopener noreferrer me"
        :aria-label="repository.label"
      >
        <span class="repo-row__thumb">
          <img :src="repository.image" alt="" width="1200" height="600" loading="lazy" />
        </span>
        <span class="repo-row__copy">
          <span class="repo-row__label">GitHub</span>
          <span class="repo-row__name">{{ repository.name }}</span>
          <span class="repo-row__url">{{ repository.displayUrl }}</span>
        </span>
        <span class="repo-row__arrow" aria-hidden="true">↗</span>
      </a>
    </div>
  </section>
</template>
