export type Track = {
  title: string;
  youtubeId: string;
  date: string;
  description?: string;
  thumbnail?: string; // カスタムサムネイルURL（省略時はYouTubeサムネイルを使用）
};

export const tracks: Track[] = [
  {
    title: "Amanita Frow",
    youtubeId: "VvmDvLsaBnE",
    date: "2025.12.02",
    thumbnail: "https://i.ytimg.com/vi/VvmDvLsaBnE/maxresdefault.jpg",
  },
  {
    title: "紅の決意",
    youtubeId: "UjXFJPhSj-o",
    date: "2025.11.25",
    thumbnail: "https://cf.mora.jp/contents/package/0000/00000101/0042/455/797/0042455797.200.jpg",
  },
];

export const getYoutubeThumbnail = (id: string) =>
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const getYoutubeHref = (id: string) =>
  `https://www.youtube.com/watch?v=${id}`;
