import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getBlogPosts } from "../data/posts";
import { withBase } from "../utils/paths";

const siteTitle = "yunfie Blog";
const siteDescription = "yunfieのブログ更新情報です。";

export async function GET(context: APIContext) {
  const posts = await getBlogPosts();
  const site = new URL(withBase("/"), context.site ?? "https://yunfie-twitter.github.io");

  return rss({
    title: siteTitle,
    description: siteDescription,
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.date),
      link: withBase(`/blog/${post.id}/`),
    })),
  });
}
