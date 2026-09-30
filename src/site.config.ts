export interface SiteConfig {
  siteUrl: string;
  siteName: string;
  title: string;
  description: string;
  author: string;
  handle: string;
  avatar: string;
  locale: string;

  // SEO & SNS
  ogImage: string;
  twitterHandle: string;

  // Analytics & Verification (空文字で無効化)
  googleAnalyticsId: string;
  googleSiteVerification: string;

  // Hero Section
  hero: {
    kicker: string;
    title: string;
    copy: string;
    primaryBtnText: string;
    primaryBtnHref: string;
    secondaryBtnText: string;
    secondaryBtnHref: string;
  };

  // About Section
  about: {
    kicker: string;
    title: string;
    lead: string;
    bio: string;
    tags: string[];
  };

  // Contact Section
  contact: {
    email: string;
    description: string;
  };

  // Footer Section
  footer: {
    tagline: string;
    copyrightYear: number;
  };
}

export const siteConfig: SiteConfig = {
  siteUrl: "https://yunfie-twitter.github.io",
  siteName: "ゆんふぃ Official Website",
  title: "ゆんふぃ | Official Website",
  description:
    "ゆんふぃの公式ホームページです。YouTube、GitHub、Ko-fi、note、X、Instagram、Misskeyなどの活動リンクをまとめています。",
  author: "ゆんふぃ",
  handle: "@yunfie",
  avatar:
    "https://proxy.pjsekai.world/image.webp?url=https://yt3.googleusercontent.com/sLRN8C_Bqv9bSaBZ-dX61Wlkjj6Zl92_EBfPNrSQA7XVU0_YuLOaZA-vF2P-1X1d6tcSplJtCA=s900-c-k-c0x00ffffff-no-rj",
  locale: "ja_JP",

  // OGP & Twitter
  ogImage: "/ogp.png",
  twitterHandle: "@yunfie_misskey",

  // Google Analytics & Search Console
  googleAnalyticsId: "G-678KKVFQ92",
  googleSiteVerification: "wnK_rnN5ZT49WvbmE-s4ZxSTiqJdGH_cXmg1y8Q0Iuc",

  // ヒーローセクション
  hero: {
    kicker: "Official Website",
    title: "@yunfie",
    copy: "調べて、作って、公開する。Web・音楽・ソフトウェアの断片を、静かに置いていく場所。",
    primaryBtnText: "About",
    primaryBtnHref: "#about",
    secondaryBtnText: "Links",
    secondaryBtnHref: "#links"
  },

  // Aboutセクション
  about: {
    kicker: "Personal Creator",
    title: "ABOUT",
    lead: "ゆんふぃです。Web・音楽・ソフトウェアなど、気になったことを調べたり、作ったものを公開したりしています。",
    bio: "このサイトは、SNSや投稿先、制作物、更新情報をまとめておくための場所です。興味の向くままに調べて、作って、試しながら、日々のアウトプットを少しずつ残しています。",
    tags: ["Web", "Music", "Software"]
  },

  // コンタクトセクション
  contact: {
    email: "yunfie168@proton.me",
    description: "お問い合わせやご連絡は、こちらのメールフォームからお願いします。"
  },

  // フッター
  footer: {
    tagline: "Official archive of web, music, notes, and tiny experiments.",
    copyrightYear: 2026
  }
};
