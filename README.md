# RelationCheck 16

16タイプ関係性診断Webアプリケーション「RelationCheck 16」

## 概要

二人のユーザーの回答を分析し、16種類のタイプに分類するWeb診断サイトです。
**Next.js App Router** を使用し、ページ階層とURLパスが一致する構造になっています。

## 4軸スコアリングシステム

| 軸 | 高い側 | 低い側 |
|---|---|---|
| 熱量 (Hot/Cold) | 感情的・能動的 | 冷静・ドライ |
| 重心 (Equal/Lean) | 対等な関係 | どちらかに偏りあり |
| 目的 (Value/Loose) | 成長・生産性重視 | 心地よさ・惰性重視 |
| 同期 (Sync/Desync) | 回答内容が一致 | 回答内容がズレている |

## URL構造（階層的ルーティング）

```
/                          ← ホーム（ランディングページ）
├── diagnose/              ← 診断スタート
│   ├── /                  ← パートナーAの名前入力
│   ├── user1/             ← パートナーAの質問回答（16問）
│   ├── user2/             ← パートナーBの名前入力→質問回答
│   └── loading/           ← 診断計算中
└── result/                ← 診断結果表示
```

## 16タイプ一覧

| No | タイプ名 | シンクロ率 | おすすめの過ごし方 | ランク |
|:---:|:---|:---:|:---|:---:|
| 1 | 伝説のバディ | 95-100% | 起業・世界征服 | S+ |
| 2 | 宿命のライバル | 80% | 格闘技・徹夜の議論 | S |
| 3 | 最強のビジネスパートナー | 70% | 投資・タスク管理 | A+ |
| 4 | 師弟を超えた共犯者 | 60% | 秘密のプロジェクト | A |
| 5 | 魂の双子（ソウルツイン） | 99% | 瞑想・沈黙 | SS |
| 6 | 陽だまりの老夫婦 | 90% | 縁側でお茶・盆栽 | S |
| 7 | 全肯定型サンクチュアリ | 85% | 泥酔・甘やかし合い | A+ |
| 8 | 放牧中の幼馴染 | 75% | 放置・別行動 | B+ |
| 9 | 飼い主と忠犬 | 40% | 散歩・命令の遂行 | C |
| 10 | 相互監視型メンヘラ | 50% | GPS共有・スマホ検閲 | D |
| 11 | 利害一致の仮面夫婦 | 30% | 冠婚葬祭・契約更新 | C- |
| 12 | 共依存の泥舟 | 20% | 傷の舐め合い | D- |
| 13 | 平行線を辿る宇宙人 | 10% | 各自の趣味・深追い禁止 | E |
| 14 | 一方通行の片想いごっこ | 15% | 献身・スルーの練習 | E+ |
| 15 | 昨日会ったばかりの親友 | 45% | 初対面のフリ | C+ |
| 16 | NPCとプレイヤー | 5% | 今すぐ解散 | F |

## ディレクトリ構成

```
.
├── next.config.js              # Next.js設定
├── package.json
├── README.md
├── .gitignore
└── src/
    ├── app/                    # App Router
    │   ├── layout.js           # ルートレイアウト
    │   ├── page.js             # ホームページ (/)
    │   ├── globals.css         # グローバルスタイル
    │   ├── diagnose/
    │   │   ├── page.js         # 名前入力 (/diagnose)
    │   │   ├── page.module.css # スタイル
    │   │   ├── user1/
    │   │   │   ├── page.js     # パートナーAの回答 (/diagnose/user1)
    │   │   │   └── page.module.css
    │   │   ├── user2/
    │   │   │   ├── page.js     # パートナーBの回答 (/diagnose/user2)
    │   │   │   └── page.module.css
    │   │   └── loading/
    │   │       ├── page.js     # ローディング (/diagnose/loading)
    │   │       └── page.module.css
    │   └── result/
    │       ├── page.js         # 結果表示 (/result)
    │       └── page.module.css
    ├── components/
    │   ├── Layout.js           # 共通レイアウト
    │   └── Layout.module.css
    ├── context/
    │   └── DiagnoseContext.js  # 状態管理（Context API）
    ├── data/
    │   ├── questions.js        # 質問データ
    │   └── relationTypes.js    # 16タイプ定義
    └── logic/
        └── diagnostic.js       # 診断ロジック
```

## 実行手順

```bash
# 1. 依存関係のインストール
npm install

# 2. 開発サーバー起動
npm run dev

# 3. ブラウザで http://localhost:3000 を開く
```

## 技術スタック

- **Next.js 14** (App Router)
- **React 18**
- **CSS Modules**（Tailwind CSS不使用）
- **Lucide React**（アイコン）

## 状態管理

Context APIを使用し、以下の状態を管理:
- `user1Name`, `user2Name` - ユーザー名
- `user1Answers`, `user2Answers` - 回答データ
- `result` - 診断結果

## UI特徴

- ダークモードUI（グラデーション背景）
- CSS Modulesによるスコープ付きスタイル
- ガラスモーフィズム効果
- アニメーション対応
- レスポンシブデザイン

## 診断フロー

1. `/` - ランディングページで説明を確認
2. `/diagnose` - パートナーAの名前入力
3. `/diagnose/user1` - パートナーAの16問回答
4. `/diagnose/user2` - パートナーBの名前入力→16問回答
5. `/diagnose/loading` - 診断計算中
6. `/result` - 結果表示（シンクロ率・4軸分析・16タイプ）
