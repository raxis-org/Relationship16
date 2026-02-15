# RelationCheck 16 - 関係性診断アプリ

2人の関係性を16タイプに分類する診断アプリ。

## 機能

- **32問の診断**: 4軸（熱量・重心・目的・同期）× 8問
- **16タイプ分類**: 4軸の組み合わせによる純粋なタイプ分類
- **非同期対応**: URL共有で2人が別々に回答可能
- **統計収集**: Supabaseで診断結果を収集

## 技術スタック

- Next.js 14 (App Router)
- Supabase
- CSS Modules
- Lucide Icons

## セットアップ

```bash
# 依存関係インストール
npm install

# 環境変数設定
cp .env.local.example .env.local
# .env.localにSupabaseの認証情報を記入

# 開発サーバー起動
npm run dev
```

## データベーススキーマ

### sessions テーブル

| カラム | 型 | 説明 |
|--------|-----|------|
| id | uuid | 主キー |
| host_name | text | ユーザー1の名前 |
| host_answers | jsonb | ユーザー1の回答 |
| host_scores | jsonb | ユーザー1の軸スコア |
| guest_name | text | ユーザー2の名前 |
| guest_answers | jsonb | ユーザー2の回答 |
| guest_scores | jsonb | ユーザー2の軸スコア |
| result_type_id | integer | 結果タイプID |
| sync_rate | integer | シンクロ率 |
| completed | boolean | 完了フラグ |
| created_at | timestamptz | 作成日時 |
| updated_at | timestamptz | 更新日時 |

## 4軸の意味

| 軸 | Positive | Negative |
|---|----------|----------|
| 熱量軸 (Temperature) | Hot (情熱的) | Cold (冷静) |
| 重心軸 (Balance) | Equal (対等) | Lean (偏り) |
| 目的軸 (Purpose) | Value (価値重視) | Loose (緩やか) |
| 同期軸 (Sync) | Sync (一致) | Desync (非同期) |
