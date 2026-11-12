// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import PostHeader from '../components/PostHeader.vue'
import CookieConsent from '../components/CookieConsent.vue'
import ExternalLinkModal from '../components/ExternalLinkModal.vue'
import './style.css'
import './home.css'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-before': () => {
        const { page } = useData()
        if (page.value.relativePath.match(/^posts\/(?!index.md)/)) {
          return h(PostHeader)
        }
      },
      'layout-bottom': () => [h(CookieConsent), h(ExternalLinkModal)]
    })
  },
  enhanceApp({ router }) {
    if (typeof window === 'undefined') return
    router.onAfterRouteChange = (to) => {
      if (localStorage.getItem('site_cookie_consent') !== 'granted') return
      window.gtag?.('event', 'page_view', {
        page_location: window.location.href,
        page_path: to,
        page_title: document.title
      })
    }
  }
} satisfies Theme
