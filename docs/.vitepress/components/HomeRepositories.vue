<script setup lang="ts">
import { repositories } from '../data/repositories'
</script>

<template>
  <section id="repository" class="mx-auto max-w-5xl px-6 py-12">
    <h2 class="mb-2 text-center text-3xl font-bold">REPOSITORY</h2>
    <p class="mb-8 text-center text-secondary">公開しているコードや制作物の置き場です。</p>

    <div class="grid gap-6">
      <a
        v-for="repository in repositories"
        :key="repository.url"
        :href="repository.url"
        target="_blank"
        rel="noopener noreferrer me"
        :aria-label="repository.label"
        class="flex flex-col overflow-hidden rounded-xl border border-main bg-[var(--vp-c-bg)] no-underline transition-shadow hover:shadow-lg sm:flex-row"
      >
        <img
          :src="repository.image"
          alt=""
          width="1200"
          height="600"
          loading="lazy"
          class="w-full object-cover sm:w-1/2"
        />
        <span class="flex flex-col justify-center gap-1 px-5 py-4">
          <small class="text-secondary">GitHub</small>
          <strong class="text-lg text-main">{{ repository.name }}</strong>
          <em class="text-sm not-italic text-secondary">{{ repository.displayUrl }}</em>
        </span>
      </a>
    </div>
  </section>
</template>
