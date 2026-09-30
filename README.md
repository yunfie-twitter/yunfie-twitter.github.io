# yunfie Official Website

ゆんふぃ（@yunfie）の公式ホームページです。  
Web・音楽・ソフトウェア制作などの活動リンクやブログ、制作物を掲載しています。

- **URL**: [https://yunfi.f5.si](https://yunfi.f5.si) (または [https://yunfie-twitter.github.io/pages/](https://yunfie-twitter.github.io/pages/))
- **Based on**: [pages-template](https://github.com/yunfie-twitter/pages-template)

---

## 🛠 サイト設定・更新方法

サイトの主要な設定は [`src/site.config.ts`](./src/site.config.ts) で一元管理されています。

- **基本情報**: タイトル、自己紹介文、アイコン、SNSリンク、連絡先メールアドレス
- **Google Analytics**: GA4 ID（`googleAnalyticsId`）
- **記事の追加**: `src/content/blog/` に Markdown（`.md`）ファイルを追加するだけで自動反映
- **リンクの追加・変更**: `src/data/links.ts`
- **リポジトリの追加・変更**: `src/data/repositories.ts`
- **楽曲・動画の追加・変更**: `src/data/tracks.ts`

---

## 🚀 開発コマンド

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動 (http://localhost:4321)
npm run dev

# プロダクションビルド
npm run build

# ビルド成果物のローカル確認
npm run preview
```

---

## 📄 License

MIT License - Copyright (c) 2026 yunfie
