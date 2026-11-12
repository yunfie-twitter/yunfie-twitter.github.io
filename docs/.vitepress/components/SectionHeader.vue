<script setup lang="ts">
defineProps<{
  index: string
  title: string
  description?: string
}>()
</script>

<template>
  <header class="home-section__head">
    <span class="home-section__index">{{ index }}</span>
    <h2 class="home-section__title">{{ title }}</h2>
    <p v-if="description" class="home-section__desc">{{ description }}</p>
  </header>
</template>
