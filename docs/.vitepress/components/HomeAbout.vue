<script setup lang="ts">
import { siteConfig } from '../data/site'
import SectionHeader from './SectionHeader.vue'

const { about, avatar, author } = siteConfig
</script>

<template>
  <section id="about" class="home-section">
    <SectionHeader
      index="02 — Profile"
      title="About"
      description="Web・音楽・ソフトウェアを横断して、調べて作ったものを残しています。"
    />

    <div class="home-about">
      <img
        class="home-about__avatar"
        :src="avatar"
        :alt="`${author}のアバター`"
        width="112"
        height="112"
        loading="lazy"
      />

      <div>
        <p class="home-about__lead">{{ about.lead }}</p>
        <p class="home-about__body">{{ about.bio }}</p>
        <ul class="home-tags" aria-label="活動分野">
          <li v-for="tag in about.tags" :key="tag">{{ tag }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
