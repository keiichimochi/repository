# 雑多なデータを快適に放り込むプライベートリポジトリナリ！

## 🚀 プロジェクト概要
気になるWebサイト、アイデア、写真、動画、音声など、あらゆるデータを雑に放り込めるプライベートリポジトリを提供するプロジェクトナリ！

## 🛠 技術スタック
- フロントエンド: React + TypeScript
- バックエンド: Cloudflare Workers
- データベース: Cloudflare D1
- ストレージ: Cloudflare R2
- デプロイ: Cloudflare Pages

## 🏃‍♂️ 開発環境のセットアップ

### 必要な環境
- Node.js (v18以上)
- Cloudflare Wrangler CLI
- pnpm (パッケージマネージャー)

### インストール手順
1. リポジトリのクローン
```bash
git clone [repository-url]
cd repository
```

2. 依存関係のインストール
```bash
pnpm install
```

3. 環境変数の設定
```bash
cp .env.sample .env
# .envファイルに必要な環境変数を設定するナリ
```

4. 開発サーバーの起動
```bash
# フロントエンド
pnpm run dev:frontend

# バックエンド
pnpm run dev:worker
```

## 📁 プロジェクト構造
```
repository/
├── src/
│   ├── frontend/     # Reactフロントエンド
│   ├── backend/      # APIとデータベース
│   └── workers/      # Cloudflare Workers
├── .env.sample       # 環境変数のサンプル
└── README.md         # プロジェクトの説明
```

## 🔑 環境変数
必要な環境変数は.env.sampleを参照するナリ！

## 👥 コントリビューション
1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📝 ライセンス
このプロジェクトはMITライセンスの下で公開されているナリ
