export type ProfileLink = {
  name: string;
  url: string;
  label: string;
  text: string;
  kind: string;
  icon: string;
  accent: string;
};

export const profileLinks: ProfileLink[] = [
  {
    name: "Ko-fi",
    url: "https://ko-fi.com/yunfie",
    label: "Ko-fiを開く",
    text: "https://ko-fi.com/yunfie",
    kind: "Support",
    icon: "https://cdn.simpleicons.org/kofi/ffffff",
    accent: "#ff5f5f"
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@yunfie_twitter_dayo",
    label: "YouTubeを開く",
    text: "https://www.youtube.com/@yunfie_twitter_dayo",
    kind: "Video",
    icon: "https://cdn.simpleicons.org/youtube/ffffff",
    accent: "#e62117"
  },
  {
    name: "GitHub",
    url: "https://github.com/yunfie-twitter",
    label: "GitHubを開く",
    text: "https://github.com/yunfie-twitter",
    kind: "Code",
    icon: "https://cdn.simpleicons.org/github/ffffff",
    accent: "#24292f"
  },
  {
    name: "misskey.io",
    url: "https://misskey.io/@yunfie_noc",
    label: "Misskey misskey.ioを開く",
    text: "https://misskey.io/@yunfie_noc",
    kind: "Social",
    icon: "https://cdn.simpleicons.org/misskey/ffffff",
    accent: "#86b300"
  },
  {
    name: "note",
    url: "https://note.com/yunfie_twitter",
    label: "noteを開く",
    text: "https://note.com/yunfie_twitter",
    kind: "Writing",
    icon: "https://cdn.simpleicons.org/note/ffffff",
    accent: "#41c9b4"
  },
  {
    name: "Wikipedia",
    url: "https://ja.wikipedia.org/wiki/%E5%88%A9%E7%94%A8%E8%80%85:%E3%82%86%E3%82%93%E3%81%B5%E3%81%83",
    label: "Wikipedia利用者ページを開く",
    text: "ja.wikipedia.org/wiki/利用者:ゆんふぃ",
    kind: "Profile",
    icon: "https://cdn.simpleicons.org/wikipedia/ffffff",
    accent: "#6b7280"
  },
  {
    name: "X",
    url: "https://x.com/yunfie_misskey",
    label: "Xを開く",
    text: "https://x.com/yunfie_misskey",
    kind: "Social",
    icon: "https://cdn.simpleicons.org/x/ffffff",
    accent: "#111111"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/yunfie168/",
    label: "Instagramを開く",
    text: "https://www.instagram.com/yunfie168/",
    kind: "Photo",
    icon: "https://cdn.simpleicons.org/instagram/ffffff",
    accent: "#d9468d"
  }
];

export const featuredLinkNames = ["YouTube", "X", "misskey.io", "GitHub"];
