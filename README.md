# PMGV診断 - 4軸16タイプ関係性診断

[![PMGV診断](https://img.shields.io/badge/PMGV-診断-blue)](https://pmgv-diagnosis.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**PMGV診断**は、Passion・Motive・Goal・Valueの4軸から二人の関係性を分析し、16タイプに分類する無料の相性診断サービスです。

🔗 **https://pmgv-diagnosis.vercel.app**

## 概要

恋人、友人、家族、仕事仲間――どんな関係性でも、PMGV診断でより深く理解し、より良い関係を築くためのヒントが見つかります。

### 4軸（PMGV）の意味

| 軸 | 名称 | Positive | Negative | 説明 |
|---|------|----------|----------|------|
| **P** | Passion (パッション軸) | Hot (情熱的) | Cool (冷静的) | 感情の温度 |
| **M** | Motive (モチーフ軸) | Equal (対等) | Lean (偏り) | 関与の動機 |
| **G** | Goal (ゴール軸) | Value (価値重視) | Loose (緩やか) | 目的の整合性 |
| **V** | Value (バリュー軸) | Sync (同期) | Desync (非同期) | 価値観の共鳴 |

### 16タイプの例

- **CEVS** - 運命の双子（Cool + Equal + Value + Sync）
- **HEVS** - 情熱的パートナー（Hot + Equal + Value + Sync）
- **CLVS** - 癒しの相手（Cool + Lean + Value + Sync）

## 機能

- ✅ **32問の科学的診断** - 4軸×8問の質問で関係性を分析
- ✅ **16タイプ分類** - PMGVの組み合わせによる詳細なタイプ分類
- ✅ **非同期対応** - URL共有で2人が別々に回答可能
- ✅ **詳細なアドバイス** - 各タイプの強み・弱み、おすすめの接し方を提供
- ✅ **完全無料・ログイン不要** - 個人情報の登録なしで今すぐ診断可能
- ✅ **SNSシェア対応** - LINE、Twitterなどで簡単に共有

## 技術スタック

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Database**: [Supabase](https://supabase.com/)
- **Styling**: CSS Modules
- **Icons**: [Lucide React](https://lucide.dev/)
- **Hosting**: Vercel

## ローカル開発

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/pmgv-diagnosis.git
cd pmgv-diagnosis

# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.local.example .env.local
# .env.localにSupabaseの認証情報を記入

# 開発サーバーの起動
npm run dev
```

## データベーススキーマ

### sessions テーブル

| カラム | 型 | 説明 |
|--------|-----|------|
| id | uuid | 主キー |
| host_name | text | ユーザー1の名前 |
| host_answers | jsonb | ユーザー1の回答 {questionId: value} |
| host_scores | jsonb | ユーザー1の軸スコア {P, M, G, V} |
| guest_name | text | ユーザー2の名前 |
| guest_answers | jsonb | ユーザー2の回答 |
| guest_scores | jsonb | ユーザー2の軸スコア |
| result_type_id | text | 結果タイプコード（例: CEVS）|
| sync_rate | integer | シンクロ率 (0-100) |
| completed | boolean | 完了フラグ |
| created_at | timestamptz | 作成日時 |

### guest_responses テーブル（複数回答対応）

| カラム | 型 | 説明 |
|--------|-----|------|
| id | uuid | 主キー |
| session_id | uuid | sessionsテーブルの外部キー |
| guest_name | text | ゲストの名前 |
| guest_answers | jsonb | ゲストの回答 |
| guest_scores | jsonb | ゲストの軸スコア |
| result_type_id | text | 結果タイプコード |
| sync_rate | integer | シンクロ率 |
| created_at | timestamptz | 作成日時 |

## ディレクトリ構造

```
src/
├── app/                    # Next.js App Router
│   ├── page.js            # ホームページ
│   ├── layout.js          # ルートレイアウト（SEOメタデータ）
│   ├── 16types/           # 16タイプ一覧・詳細
│   ├── diagnose/          # 診断フロー
│   └── result/            # 診断結果
├── components/            # 共通コンポーネント
│   ├── Layout.js         # レイアウト（Header/Footer）
│   ├── Toast.js          # トースト通知
│   └── ShareMenu.js      # シェアメニュー
├── data/                  # 静的データ
│   ├── questions.js      # 32問の質問データ
│   └── relationTypes.js  # 16タイプ定義
├── lib/                   # ユーティリティ
│   ├── supabase.js       # Supabaseクライアント
│   └── db.js             # DB操作ラッパー
└── logic/                 # 診断ロジック
    └── diagnostic.js     # スコア計算・タイプ判定
```

## SEO対策

- ✅ 各ページに適切なメタタイトル・メタディスクリプションを設定
- ✅ Open Graph / Twitter Card対応
- ✅ 構造化データ（Schema.org）の埋め込み
- ✅ Canonical URLの設定
- ✅ 適切な見出し構造（h1-h6）

## ライセンス

MIT License

## 作者

PMGV診断チーム
