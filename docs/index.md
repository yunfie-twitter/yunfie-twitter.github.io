---
layout: home
title: Home
hero:
  name: "ゆんふぃのブログ"
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
import SectionHeader from './.vitepress/components/SectionHeader.vue'
import HomeAbout from './.vitepress/components/HomeAbout.vue'
import HomeMusic from './.vitepress/components/HomeMusic.vue'
import HomeRepositories from './.vitepress/components/HomeRepositories.vue'
import HomeLinks from './.vitepress/components/HomeLinks.vue'
import HomeContact from './.vitepress/components/HomeContact.vue'

const latestPosts = posts.slice(0, 6)
</script>

<div class="vp-home">

<section class="home-section">
  <SectionHeader
    index="01 — Journal"
    title="Latest Posts"
    description="更新情報、制作メモ、日々の記録。"
  />

  <div class="home-posts">
    <a
      v-for="(post, index) in latestPosts"
      :key="post.url"
      :href="post.url"
      class="post-row"
      :class="{ 'post-row--lead': index === 0 }"
    >
      <span class="post-row__index">{{ String(index + 1).padStart(2, '0') }}</span>
      <span class="post-row__date">{{ moment(post.frontmatter.date).format('YYYY-MM-DD') }}</span>
      <span class="post-row__body">
        <span class="post-row__title">{{ post.frontmatter.title }}</span>
        <span class="post-row__desc">{{ post.frontmatter.description }}</span>
      </span>
      <span v-if="post.frontmatter.tags" class="post-row__tags">
        <span v-for="tag in post.frontmatter.tags" :key="tag">#{{ tag }}</span>
      </span>
      <span class="post-row__arrow" aria-hidden="true">→</span>
    </a>
  </div>
</section>

<HomeAbout />
<HomeMusic />
<HomeRepositories />
<HomeLinks />
<HomeContact />

</div>
