<script setup lang="ts">
import { getYoutubeHref, getYoutubeThumbnail, tracks } from '../data/tracks'
</script>

<template>
  <section id="music" class="mx-auto max-w-5xl px-6 py-12">
    <h2 class="mb-2 text-center text-3xl font-bold">MUSIC</h2>
    <p class="mb-8 text-center text-secondary">音楽や動画作品のリストです。</p>

    <div class="grid gap-6 sm:grid-cols-2">
      <a
        v-for="track in tracks"
        :key="track.youtubeId"
        :href="getYoutubeHref(track.youtubeId)"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`${track.title} を開く`"
        class="overflow-hidden rounded-xl border border-main bg-[var(--vp-c-bg)] no-underline transition-shadow hover:shadow-lg"
      >
        <img
          :src="track.thumbnail ?? getYoutubeThumbnail(track.youtubeId)"
          :alt="track.title"
          width="480"
          height="270"
          loading="lazy"
          class="aspect-video w-full object-cover"
        />
        <div class="px-4 py-3">
          <small class="text-secondary">{{ track.date }}</small>
          <p class="my-1 font-semibold text-main">{{ track.title }}</p>
          <p v-if="track.description" class="m-0 text-sm text-secondary">{{ track.description }}</p>
        </div>
      </a>
    </div>
  </section>
</template>
