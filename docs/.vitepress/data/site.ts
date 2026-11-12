export interface SiteConfig {
  siteUrl: string;
  siteName: string;
  title: string;
  description: string;
  author: string;
  handle: string;
  avatar: string;
  locale: string;

  ogImage: string;
  twitterHandle: string;

  googleAnalyticsId: string;
  googleSiteVerification: string;

  hero: {
    kicker: string;
    title: string;
    copy: string;
    primaryBtnText: string;
    primaryBtnHref: string;
    secondaryBtnText: string;
    secondaryBtnHref: string;
  };

  about: {
    kicker: string;
    title: string;
    lead: string;
    bio: string;
    tags: string[];
  };

  contact: {
    email: string;
    description: string;
  };

  footer: {
    tagline: string;
    copyrightYear: number;
  };
}

export const siteConfig: SiteConfig = {
  siteUrl: "https://yunfie.date",
  siteName: "ゆんふぃ Official Website",
  title: "ゆんふぃ | Official Website",
  description:
    "ゆんふぃの公式ホームページです。YouTube、GitHub、Ko-fi、note、X、Instagram、Misskeyなどの活動リンクをまとめています。",
  author: "ゆんふぃ",
  handle: "@yunfie",
  avatar:
    "https://media.yunfie.date/image.webp?url=https://yt3.googleusercontent.com/sLRN8C_Bqv9bSaBZ-dX61Wlkjj6Zl92_EBfPNrSQA7XVU0_YuLOaZA-vF2P-1X1d6tcSplJtCA=s900-c-k-c0x00ffffff-no-rj",
  locale: "ja_JP",

  ogImage: "/ogp.png",
  twitterHandle: "@yunfie_misskey",

  googleAnalyticsId: "G-678KKVFQ92",
  googleSiteVerification: "wnK_rnN5ZT49WvbmE-s4ZxSTiqJdGH_cXmg1y8Q0Iuc",

  hero: {
    kicker: "Official Website",
    title: "@yunfie",
    copy: "調べて、作って、公開する。Web・音楽・ソフトウェアの断片を、静かに置いていく場所。",
    primaryBtnText: "About",
    primaryBtnHref: "/about/",
    secondaryBtnText: "Links",
    secondaryBtnHref: "#links"
  },

  about: {
    kicker: "Personal Creator",
    title: "ABOUT",
    lead: "ゆんふぃです。Web・音楽・ソフトウェアなど、気になったことを調べたり、作ったものを公開したりしています。",
    bio: "このサイトは、SNSや投稿先、制作物、更新情報をまとめておくための場所です。興味の向くままに調べて、作って、試しながら、日々のアウトプットを少しずつ残しています。",
    tags: ["Web", "Music", "Software"]
  },

  contact: {
    email: "yunfie168@proton.me",
    description: "お問い合わせやご連絡は、こちらのメールフォームからお願いします。"
  },

  footer: {
    tagline: "Official archive of web, music, notes, and tiny experiments.",
    copyrightYear: 2026
  }
};
