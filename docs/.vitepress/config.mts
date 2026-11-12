import { defineConfig, type DefaultTheme } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import footnote from 'markdown-it-footnote'
import { generateSidebar } from 'vitepress-sidebar'
import { Feed } from 'feed'
import matter from 'gray-matter'
import { siteConfig as site } from './data/site'

const docsRoot = fileURLToPath(new URL('..', import.meta.url))

interface PostEntry {
  slug: string
  title: string
  description: string
  date: string
}

const collectPosts = async (dir: string): Promise<PostEntry[]> => {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const results = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        return collectPosts(fullPath)
      }
      if (!entry.isFile() || !entry.name.endsWith('.md') || entry.name === 'index.md') {
        return []
      }
      const raw = await fs.readFile(fullPath, 'utf-8')
      const { data } = matter(raw)
      if (!data.title || !data.date) {
        return []
      }
      return [
        {
          slug: path.basename(entry.name, '.md'),
          title: String(data.title),
          description: String(data.description ?? ''),
          date: String(data.date)
        }
      ]
    })
  )
  return results.flat()
}

const rssPlugin = () => ({
  name: 'rss-generator',
  async buildEnd(config: { outDir: string }) {
    const posts = (await collectPosts(path.join(docsRoot, 'posts'))).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    const feed = new Feed({
      title: `${site.siteName} Blog`,
      description: `${site.siteName}のブログ更新情報です。`,
      id: site.siteUrl,
      link: site.siteUrl,
      language: 'ja',
      copyright: `© ${site.footer.copyrightYear} ${site.author}`,
      updated: posts[0] ? new Date(posts[0].date) : new Date(),
      feedLinks: { rss: `${site.siteUrl}/rss.xml` },
      author: { name: site.author, link: site.siteUrl }
    })

    posts.forEach((post) => {
      feed.addItem({
        title: post.title,
        id: `${site.siteUrl}/posts/${post.slug}/`,
        link: `${site.siteUrl}/posts/${post.slug}/`,
        description: post.description,
        date: new Date(post.date)
      })
    })

    await fs.writeFile(path.join(config.outDir, 'rss.xml'), feed.rss2(), 'utf-8')
  }
})

const gaSnippet = site.googleAnalyticsId
  ? `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('consent', 'default', { analytics_storage: 'denied', wait_for_update: 500 });
gtag('config', '${site.googleAnalyticsId}', { send_page_view: false });`
  : ''

export default defineConfig({
  title: site.siteName,
  titleTemplate: ':title | ゆんふぃ',
  description: site.description,
  lang: 'ja-JP',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: site.avatar }],
    ['meta', { name: 'author', content: site.author }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'google-site-verification', content: site.googleSiteVerification }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: `${site.siteName} RSS`, href: '/rss.xml' }],
    ...(site.googleAnalyticsId
      ? [
          ['script', {}, gaSnippet],
          [
            'script',
            { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${site.googleAnalyticsId}` }
          ]
        ]
      : [])
  ],
  themeConfig: {
    logo: site.avatar,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/posts/' },
      { text: 'Tags', link: '/tags/' },
      { text: 'About', link: '/about/' },
      { text: 'Privacy', link: '/privacy-policy/' }
    ],
    sidebar: sidebarTags(),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yunfie-twitter' },
      { icon: 'youtube', link: 'https://www.youtube.com/@yunfie_twitter_dayo' },
      { icon: 'x', link: 'https://x.com/yunfie_misskey' }
    ],
    footer: {
      copyright: `© ${site.footer.copyrightYear} ${site.author}. All Rights Reserved.`
    },
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3],
      label: '目次'
    }
  },
  markdown: {
    config: (md) => {
      md.use(footnote)
    },
    math: true
  },
  rewrites: {
    'posts/(.*)/:name.md': 'posts/:name/index.md',
    'indexes/:name.md': ':name/index.md'
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPHero\.vue$/,
          replacement: fileURLToPath(new URL('./components/CustomHero.vue', import.meta.url))
        },
        {
          find: /^.*\/VPDocFooter\.vue$/,
          replacement: fileURLToPath(new URL('./components/CustomDocFooter.vue', import.meta.url))
        },
        {
          find: /^.*\/NotFound\.vue$/,
          replacement: fileURLToPath(new URL('./components/CustomNotFound.vue', import.meta.url))
        }
      ]
    }
  },
  lastUpdated: true,
  sitemap: {
    hostname: site.siteUrl
  },
  buildEnd: rssPlugin().buildEnd
})

function sidebarTags(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Home', link: '/' },
    { text: 'Blog', link: '/posts/' },
    { text: 'About', link: '/about/' },
    {
      text: 'Tags',
      link: '.',
      base: '/tags/',
      items: generateSidebar({
        documentRootPath: 'docs',
        scanStartPath: 'tags',
        useTitleFromFileHeading: true,
        hyphenToSpace: true
      })
    }
  ]
}
