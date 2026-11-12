<script setup lang="ts">
import { getYoutubeHref, getYoutubeThumbnail, tracks } from '../data/tracks'
import SectionHeader from './SectionHeader.vue'
</script>

<template>
  <section id="music" class="home-section">
    <SectionHeader
      index="03 — Works"
      title="Music"
      description="制作した楽曲と映像作品。"
    />

    <div class="home-music">
      <a
        v-for="track in tracks"
        :key="track.youtubeId"
        class="music-row"
        :href="getYoutubeHref(track.youtubeId)"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`${track.title} を開く`"
      >
        <span class="music-row__media">
          <img
            :src="track.thumbnail ?? getYoutubeThumbnail(track.youtubeId)"
            :alt="track.title"
            width="480"
            height="270"
            loading="lazy"
          />
        </span>
        <span class="music-row__copy">
          <span class="music-row__title">{{ track.title }}</span>
          <span class="music-row__date">{{ track.date }}</span>
        </span>
      </a>
    </div>
  </section>
</template>
