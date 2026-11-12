# yunfie Official Website

ゆんふぃ（@yunfie）の公式ホームページです。Web・音楽・ソフトウェア制作などの活動リンクやブログ、制作物を掲載しています。

- **URL**: [https://yunfie.date](https://yunfie.date)
- **Built with**: [VitePress](https://vitepress.dev/)
- **Based on**: [alphaRomeo323.github.io](https://github.com/alphaRomeo323/alpharomeo323.github.io)

---

## 🛠 サイト設定・更新方法

- **基本情報**: [`docs/.vitepress/data/site.ts`](./docs/.vitepress/data/site.ts)（タイトル、自己紹介、アバター、GA4 ID、連絡先）
- **SNSリンク**: [`docs/.vitepress/data/links.ts`](./docs/.vitepress/data/links.ts)
- **リポジトリ**: [`docs/.vitepress/data/repositories.ts`](./docs/.vitepress/data/repositories.ts)
- **楽曲・動画**: [`docs/.vitepress/data/tracks.ts`](./docs/.vitepress/data/tracks.ts)
- **記事の追加**: `docs/posts/年/` に Markdown（`.md`）を追加（frontmatter に `title`, `date`, `description`, `tags`）
- **固定ページ**: `docs/indexes/`（About / Privacy Policy）
- **ナビ・サイドバー**: [`docs/.vitepress/config.mts`](./docs/.vitepress/config.mts)

## 🚀 開発コマンド

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動 (http://localhost:5173)
npm run dev

# プロダクションビルド
npm run build

# ビルド成果物のローカル確認
npm run preview
```

ビルド成果物は `docs/.vitepress/dist` に出力されます。

## 📄 License

MIT License - Copyright (c) 2026 yunfie
