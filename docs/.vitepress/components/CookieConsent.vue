<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { siteConfig } from '../data/site'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const STORAGE_KEY = 'site_cookie_consent'
const hasGA = Boolean(siteConfig.googleAnalyticsId)
const visible = ref(false)

const applyConsent = (granted: boolean) => {
  window.gtag?.('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied'
  })
  if (granted && siteConfig.googleAnalyticsId) {
    window.gtag?.('config', siteConfig.googleAnalyticsId, {
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title
    })
  }
}

const choose = (granted: boolean) => {
  localStorage.setItem(STORAGE_KEY, granted ? 'granted' : 'denied')
  applyConsent(granted)
  visible.value = false
}

onMounted(() => {
  if (!hasGA) return
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === null) {
    window.setTimeout(() => {
      visible.value = true
    }, 1600)
    return
  }
  applyConsent(saved === 'granted')
})
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-x-0 bottom-0 z-50 border-t border-main bg-[var(--vp-c-bg)] px-4 py-3 shadow-lg"
    role="region"
    aria-label="Cookie同意"
  >
    <div class="mx-auto flex max-w-5xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
      <p class="m-0 text-sm text-main">
        このサイトではGoogle Analyticsを使用しています。アクセス解析のためCookieを利用する場合があります。
        <a
          class="text-primary-default underline"
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          >Googleのプライバシーポリシー</a
        >
      </p>
      <div class="flex shrink-0 gap-2">
        <button
          type="button"
          class="cursor-pointer rounded-md border border-main px-4 py-2 text-sm text-main"
          @click="choose(false)"
        >
          拒否する
        </button>
        <button
          type="button"
          class="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm text-white"
          @click="choose(true)"
        >
          同意する
        </button>
      </div>
    </div>
  </div>
</template>
