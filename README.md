# Portfolio Backend

## プロダクトの説明

このプロジェクトは、ポートフォリオサイトのバックエンドAPIです。

## 技術スタック

### フレームワーク・ライブラリ

- **NestJS**: モダンなNode.jsフレームワーク
- **TypeScript**: 型安全な開発
- **Express**: HTTPサーバー
- **Swagger**: API仕様書の自動生成

### 開発ツール

- **ESLint**: コードの静的解析
- **Prettier**: コードフォーマッター
- **Jest**: テスティングフレームワーク
- **Husky**: Git フック
- **Commitlint**: コミットメッセージの規約チェック
- **pnpm**: 高速なパッケージマネージャー

## Architecture

このプロジェクトはClean Architectureの原則に基づいて設計されています。詳細は[アーキテクチャドキュメント](architecture.md)をご覧ください。

## セットアップ

### 前提条件

- Node.js 18.x以上
- pnpm

### インストール

```bash
# 依存関係のインストール
pnpm install
```

### 環境設定

```bash
# 環境変数ファイルの作成
cp .env.example .env

# 必要に応じて.envファイルを編集
```

### 開発サーバーの起動

```bash
# 開発モード（ホットリロード）
pnpm run start:dev

# 通常モード
pnpm run start

# プロダクションモード
pnpm run start:prod
```

### その他のコマンド

```bash
# ビルド
pnpm run build

# テスト実行
pnpm run test

# テスト実行（ウォッチモード）
pnpm run test:watch

# カバレッジ付きテスト
pnpm run test:cov

# E2Eテスト
pnpm run test:e2e

# リント
pnpm run lint

# フォーマット
pnpm run format
```

### API仕様書

開発サーバー起動後、以下のURLでSwagger UIにアクセスできます：

```
http://localhost:3000/swagger
```

## 技術選定理由

### NestJS

- **スケーラブルなアーキテクチャ**: 依存性注入、モジュール化により保守性の高いコードが書ける
- **TypeScript ファーストサポート**: 型安全性と開発体験の向上
- **豊富なエコシステム**: Swagger、バリデーション、テストなどの統合が容易
- **Express基盤**: 安定性と豊富なミドルウェア
- **デコレーター活用**: 直感的で読みやすいコード
