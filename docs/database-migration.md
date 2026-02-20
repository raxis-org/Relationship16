# データベースマイグレーションガイド

## 概要

RelationCheck 16の新バージョン対応マイグレーションです。

## 新しい16タイプ定義

### 4軸の構成

| 軸 | コード | 左側（-） | 右側（+） | 説明 |
|---|-------|----------|----------|------|
| P(Passion) | P | C: Cool | H: Hot | 感情の温度 |
| M(Motive) | M | L: Lean | E: Equal | 関与の動機 |
| G(Goal) | G | L: Loose | V: Value | 目的の整合性 |
| V(Value) | V | D: Desync | S: Sync | 価値観の共鳴 |

### 16タイプコード

4文字で表現（例: `CEVS` = Cool + Equal + Value + Sync）

- **CEVS** - 運命の双子 (SS)
- **CEVD** - 知的パートナー (S)
- **CELS** - 穏やかな隣人 (S)
- **CELD** - 理性的友人 (A)
- **CLVS** - 癒しの相手 (A)
- **CLVD** - 気ままな友達 (B)
- **CLLS** - 気楽な知り合い (B)
- **CLLD** - 疎遠な知人 (C)
- **HEVS** - 情熱的パートナー (SS)
- **HEVD** - 刺激的な相手 (S)
- **HELS** - 親しい友達 (A)
- **HELD** - 社交的な知り合い (B)
- **HLVS** - 親密な相手 (S)
- **HLVD** - エキサイティングな相手 (A)
- **HLLS** - 遊び友達 (B)
- **HLLD** - 表面的な知り合い (C)

## マイグレーション手順

### 1. Supabase Dashboard で SQL Editor を開く

https://app.supabase.com/project/_/sql

### 2. 以下のSQLを実行

```sql
-- ============================================
-- マイグレーション: 新16タイプ対応
-- ============================================

-- 1. guest_responses テーブル作成（存在しない場合）
CREATE TABLE IF NOT EXISTS guest_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    guest_name TEXT NOT NULL,
    guest_answers JSONB NOT NULL,
    guest_scores JSONB NOT NULL,  -- {P: number, M: number, G: number, V: number} -3〜+3
    result_type_id TEXT,          -- 4文字コード（例: CEVS, HEVD）
    sync_rate INTEGER,            -- 0〜100
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

-- 5. sessionsテーブルのカラム型確認
-- host_scores と guest_scores がJSONB型であることを確認
-- result_type_id は4文字コード（TEXT）で保存
```

## データ構造

### 回答形式（answers）
```json
{
  "1": 5,    // question_id: value (1-5)
  "2": 3,
  "3": 4,
  ...
}
```

### スコア形式（scores）
```json
{
  "P": 1.5,   // Passion軸: Cool(-) vs Hot(+)  -3〜+3
  "M": -0.5,  // Motive軸: Lean(-) vs Equal(+) -3〜+3
  "G": 2.1,   // Goal軸: Loose(-) vs Value(+)  -3〜+3
  "V": -1.2   // Value軸: Desync(-) vs Sync(+) -3〜+3
}
```

### タイプコード（result_type_id）
4文字コード（例: `CEVS`）
- 1文字目: H/C = Hot/Cool
- 2文字目: E/L = Equal/Lean
- 3文字目: V/L = Value/Loose
- 4文字目: S/D = Sync/Desync

## 変更後のデータフロー

```
[User1: 回答] → sessions.host_answers (保存)
                    ↓
[User2: 回答] → guest_responses (新規レコード作成)
                    ↓
              診断実行 → 16タイプ判定（CEVS等）
                    ↓
              結果表示（画像: /assets/CEVS.png）
```

## トラブルシューティング

### スコアが全て0になる場合
1. 回答データが正しく保存されているか確認（1-5の範囲）
2. REVERSE_ITEMS（逆転項目）が正しく処理されているか確認
3. ブラウザのコンソールでエラーを確認

### result_type_idがNULLになる場合
1. `diagnose()` 関数が正しくタイプを返しているか確認
2. データベースのカラム型がTEXTであることを確認
3. 16タイプコード（4文字）が正しく生成されているか確認

### 画像が表示されない場合
1. `/assets/` ディレクトリに画像が配置されているか確認
2. 画像ファイル名がタイプコードと一致しているか確認（例: `CEVS.png`）
3. Next.jsの画像設定を確認
