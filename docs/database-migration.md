# データベースマイグレーションガイド

## 概要

複数人が同じリンクに回答できるようにするため、`guest_responses` テーブルを新規作成します。

## マイグレーション手順

### 1. Supabase Dashboard で SQL Editor を開く

https://app.supabase.com/project/_/sql

### 2. 以下のSQLを実行

```sql
-- ============================================
-- マイグレーション: 複数ゲスト回答対応
-- ============================================

-- 1. sessions テーブルの確認・修正
-- host_scores と guest_scores は {P, M, G, V} の構造で保存されます
-- result_type_id は4文字コード（例: EBSC, HIAS）で保存されます

-- 2. guest_responses テーブル作成
CREATE TABLE IF NOT EXISTS guest_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    guest_name TEXT NOT NULL,
    guest_answers JSONB NOT NULL,
    guest_scores JSONB NOT NULL,  -- {P: number, M: number, G: number, V: number} -3〜+3
    result_type_id TEXT,          -- 4文字コード（例: EBSC, HIAS）
    sync_rate INTEGER,            -- 0〜100
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. インデックス作成
CREATE INDEX idx_guest_responses_session_id ON guest_responses(session_id);
CREATE INDEX idx_guest_responses_created_at ON guest_responses(created_at);

-- 4. Row Level Security (RLS) の有効化
ALTER TABLE guest_responses ENABLE ROW LEVEL SECURITY;

-- 5. ポリシー作成（匿名ユーザーでも読み書き可能）
CREATE POLICY "Allow anonymous insert" ON guest_responses
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous select" ON guest_responses
    FOR SELECT TO anon USING (true);

-- 6. sessionsテーブルの既存カラム確認（オプション）
-- host_scores と guest_scores がJSONB型であることを確認
```

## データ構造

### 回答形式（answers）
```json
{
  "1": 2,    // question_id: value (-2〜+2)
  "2": -1,
  "3": 0,
  ...
}
```

### スコア形式（scores）
```json
{
  "P": 1.5,   // Power軸: H(-) vs E(+)
  "M": -0.5,  // Motive軸: I(-) vs B(+)
  "G": 2.1,   // Goal軸: A(-) vs S(+)
  "V": -1.2   // Value軸: D(-) vs C(+)
}
```

### タイプコード（result_type_id）
4文字コード（例: `EBSC`）
- 1文字目: P軸（H=Hierarchical, E=Equal）
- 2文字目: M軸（I=Instrumental, B=Being）
- 3文字目: G軸（A=Autonomous, S=Synergetic）
- 4文字目: V軸（D=Diverse, C=Congruent）

## 変更後のデータフロー

### 以前（単一回答）
```
[User1: 回答] → sessions.host_answers (保存)
                    ↓
[User2: 回答] → sessions.guest_answers (保存) ← 上書きされる問題
                    ↓
              結果表示
```

### 新方式（複数回答対応）
```
[User1: 回答] → sessions.host_answers (保存)
                    ↓
[User2-A: 回答] → guest_responses (新規レコード作成)
                    ↓
[User2-B: 回答] → guest_responses (新規レコード作成) ← 別レコードなので上書きされない
                    ↓
              結果表示（gidパラメータで特定の回答を指定）
```

## 16タイプ分類

4軸の組み合わせで16タイプに分類されます：

| 軸 | 左側（-） | 右側（+） |
|---|----------|----------|
| P（Power） | H: Hierarchical/階層的 | E: Equal/対等的 |
| M（Motive） | I: Instrumental/手段的 | B: Being/存在的 |
| G（Goal） | A: Autonomous/自律的 | S: Synergetic/共鳴的 |
| V（Value） | D: Diverse/多様的 | C: Congruent/一致的 |

例: `EBSC` = Equal + Being + Synergetic + Congruent = "運命の双子"

## 後方互換性

- 旧方式（`completed=true` で単一回答）のセッションも引き続き表示可能
- 結果ページは `gid` パラメータの有無で自動的に処理を切り替え

## URL仕様

### 新方式（複数回答対応）
- 結果ページ: `/result?sid=<session_id>&gid=<guest_response_id>`

### 旧方式（後方互換性）
- 結果ページ: `/result?sid=<session_id>`

## トラブルシューティング

### スコアが全て0になる場合
1. 回答データが正しく保存されているか確認（-2〜+2の範囲）
2. REVERSE_ITEMS（逆転項目）が正しく処理されているか確認
3. ブラウザのコンソールでエラーを確認

### result_type_idがNULLになる場合
1. `diagnose()` 関数が正しくタイプを返しているか確認
2. データベースのカラム型がTEXTであることを確認
