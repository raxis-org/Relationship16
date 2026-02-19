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

-- 1. guest_responses テーブル作成
CREATE TABLE IF NOT EXISTS guest_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    guest_name TEXT NOT NULL,
    guest_answers JSONB NOT NULL,
    guest_scores JSONB NOT NULL,
    result_type_id TEXT,
    sync_rate INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. インデックス作成
CREATE INDEX idx_guest_responses_session_id ON guest_responses(session_id);
CREATE INDEX idx_guest_responses_created_at ON guest_responses(created_at);

-- 3. Row Level Security (RLS) の有効化
ALTER TABLE guest_responses ENABLE ROW LEVEL SECURITY;

-- 4. ポリシー作成（匿名ユーザーでも読み書き可能）
CREATE POLICY "Allow anonymous insert" ON guest_responses
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous select" ON guest_responses
    FOR SELECT TO anon USING (true);

-- 5. 既存データの移行（オプション：過去の回答を新テーブルに移行する場合）
-- 注意: 既存の completed=true のセッションがある場合のみ実行
/*
INSERT INTO guest_responses (session_id, guest_name, guest_answers, guest_scores, result_type_id, sync_rate)
SELECT 
    id as session_id,
    guest_name,
    guest_answers,
    guest_scores,
    result_type_id,
    sync_rate
FROM sessions
WHERE completed = true 
    AND guest_name IS NOT NULL
    AND guest_answers IS NOT NULL;
*/
```

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

## 後方互換性

- 旧方式（`completed=true` で単一回答）のセッションも引き続き表示可能
- 結果ページは `gid` パラメータの有無で自動的に処理を切り替え

## URL仕様

### 新方式（複数回答対応）
- 結果ページ: `/result?sid=<session_id>&gid=<guest_response_id>`

### 旧方式（後方互換性）
- 結果ページ: `/result?sid=<session_id>`

