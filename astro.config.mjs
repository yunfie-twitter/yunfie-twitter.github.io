import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import { copyFile } from "node:fs/promises";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import inline from "@playform/inline";
import compress from "@playform/compress";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const lazyLoadMarkdownImages = () => {
  return (tree) => {
    const visit = (node) => {
      if (!node || typeof node !== "object") return;

      if (node.type === "element" && node.tagName === "img") {
        node.properties = {
          ...node.properties,
          loading: node.properties?.loading ?? "lazy",
          decoding: node.properties?.decoding ?? "async",
          fetchpriority: node.properties?.fetchpriority ?? "low",
        };
      }

      if (Array.isArray(node.children)) {
        node.children.forEach(visit);
      }
    };

    visit(tree);
  };
};

const sitemapXmlAlias = () => ({
  name: "sitemap-xml-alias",
  hooks: {
    "astro:build:done": async ({ dir, logger }) => {
      try {
        await copyFile(new URL("sitemap-index.xml", dir), new URL("sitemap.xml", dir));
        logger.info("`sitemap.xml` created as an alias of `sitemap-index.xml`.");
      } catch (error) {
        logger.warn(`Could not create \`sitemap.xml\`: ${error.message}`);
      }
    },
  },
});

export default defineConfig({
  site: "https://yunfie-twitter.github.io",
  base: "/pages",

  integrations: [
    sitemap(),
    sitemapXmlAlias(),

    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),

    inline({
      Beasties: {
        publicPath: "/pages",
        pruneSource: false,
      },
    }),

    compress({
      CSS: true,
      HTML: true,
      Image: true,
      JavaScript: true,
      SVG: true,
    }),
  ],

  build: {
    inlineStylesheets: "auto",
  },

  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex, lazyLoadMarkdownImages],
    }),
  },

  vite: {
    build: {
      minify: "esbuild",
      cssCodeSplit: true,
      reportCompressedSize: false,
    },
  },
});
