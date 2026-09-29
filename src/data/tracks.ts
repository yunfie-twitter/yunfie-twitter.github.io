export type Track = {
  title: string;
  youtubeId: string;
  date: string;
  description?: string;
  thumbnail?: string; // カスタムサムネイルURL（省略時はYouTubeサムネイルを使用）
};

export const tracks: Track[] = [

];

export const getYoutubeThumbnail = (id: string) =>
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const getYoutubeHref = (id: string) =>
  `https://www.youtube.com/watch?v=${id}`;
