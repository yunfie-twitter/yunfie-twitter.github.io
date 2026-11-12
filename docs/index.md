---
layout: home
title: Home
hero:
  name: "ゆんふぃ"
  text: "調べて、作って、公開する。"
  tagline: "Web・音楽・ソフトウェアの断片を、静かに置いていく場所。"
  actions:
    - theme: brand
      text: Blog
      link: /posts/
    - theme: alt
      text: About
      link: /about/
  image:
    src: "https://media.yunfie.date/image.webp?url=https://yt3.googleusercontent.com/sLRN8C_Bqv9bSaBZ-dX61Wlkjj6Zl92_EBfPNrSQA7XVU0_YuLOaZA-vF2P-1X1d6tcSplJtCA=s900-c-k-c0x00ffffff-no-rj"
    alt: "ゆんふぃ"
---

<script lang="ts" setup>
import { data as posts } from './.vitepress/posts.data'
import moment from 'moment'
import HomeAbout from './.vitepress/components/HomeAbout.vue'
import HomeMusic from './.vitepress/components/HomeMusic.vue'
import HomeRepositories from './.vitepress/components/HomeRepositories.vue'
import HomeLinks from './.vitepress/components/HomeLinks.vue'
import HomeContact from './.vitepress/components/HomeContact.vue'

const latestPosts = posts.slice(0, 6)
</script>

<div class="vp-home">

## Latest Posts

<div class="mx-auto flex max-w-5xl flex-wrap justify-center gap-4 px-6">
  <a
    v-for="post of latestPosts"
    :key="post.url"
    :href="post.url"
    class="relative h-48 w-full overflow-hidden rounded-xl border border-main no-underline sm:basis-[48%] lg:basis-[32%]"
  >
    <img v-if="post.frontmatter.headerimage" :src="post.frontmatter.headerimage" alt="" class="img-overlay" />
    <div class="absolute inset-0 flex flex-col justify-center gap-1 px-4 py-2 text-main">
      <div class="text-center text-xl font-bold line-clamp-2">{{ post.frontmatter.title }}</div>
      <div class="line-clamp-2 font-medium">{{ post.frontmatter.description }}</div>
      <div v-if="post.frontmatter.tags" class="line-clamp-1">
        <span v-for="tag in post.frontmatter.tags" :key="tag"> #{{ tag }} </span>
      </div>
      <div class="text-right">{{ moment(post.frontmatter.date).format('YYYY-MM-DD') }}</div>
    </div>
  </a>
</div>

<HomeAbout />
<HomeMusic />
<HomeRepositories />
<HomeLinks />
<HomeContact />

</div>
