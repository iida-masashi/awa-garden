# 阿波説デジタルガーデン (awa-garden)

> 阿波説 — 古代日本史において阿波国(現徳島県)が記紀神話の主舞台であったとする仮説 — に関する研究ノート群を公開するデジタルガーデン。

🌐 **公開サイト**: <https://iida-masashi.github.io/awa-garden/>

[![Deploy](https://github.com/iida-masashi/awa-garden/actions/workflows/deploy.yml/badge.svg)](https://github.com/iida-masashi/awa-garden/actions/workflows/deploy.yml)

---

## 構成

このリポジトリは **Obsidian Vault** をソースとし、**[Quartz v4](https://quartz.jzhao.xyz/)** を介して静的サイトを生成、**GitHub Pages** で配信する。

```
Obsidian Vault (D:/Vault/)              ← Source of truth (private)
       │
       ▼  sync (Vault → quartz/content/)
 _sync_to_quartz.py
       │
       ▼  build
   Quartz v4
       │
       ▼  push → GitHub Actions
 GitHub Pages → iida-masashi.github.io/awa-garden/
```

## コンテンツ概要

公開ノート **約 1,380 件**。以下の領域を網羅する。

| 領域 | 件数 | 内容 |
|---|---|---|
| **式内社/** | 538 | 延喜式神名帳ベースの索引(阿波 50 座を中心に、安房・上総・下総・常陸・武蔵・駿河・遠江・淡路・讃岐・伊予・土佐・伊豆・伊勢・大和・豊前・筑前・隠岐・石見・出雲ほか) |
| **理論・研究/** | 695 | 阿波説の主題別ハブ(理論基盤・考古学・氏族系譜・神話解読・地理地政学・信仰霊性) |
| **学術基盤/** | 65 | 一次史料インデックス・考古学ファクトシート・論文アウトライン・反証と課題 |
| **資料/** | 81 | MOC、専門論考、六国史解説 |

### 専門領域 MOC

- 🏛 氏族 × 祭祀 × 地理 統合 MOC — 阿波説の主要氏族 × 祖神 × 本拠地 × 式内社 × 東遷先
- 🗺 元宮ハブ MOC — 「元宮」概念から見る阿波の原型神社網
- 🗺 三宅記 MOC — 伊豆諸島創生神話と三嶋大明神の体系
- 🗺 国史見在社 MOC — 六国史所載神社の総合索引

### 主要専門ノート(目玉)

- 邦国之大典:平安時代の公式文書が語る神社の格 — 1070 年太政官符の精読
- 三宅記 伝承・事蹟完全目録 — 古文書 OCR 全 65 ページの校訂・現代語訳
- 考古学から見た三嶋神・三嶋大明神と『三宅記』 — 深澤太郎氏論文
- 天石門別八倉比売神社 — 阿波最高位の式内社(正一位)

---

## 公開フロー

### Vault → 本番反映

```bash
# Vault 編集 (Obsidian で通常作業)

# 同期 + frontmatter fix + dewikify
cd D:/Vault/_work && uv run python _sync_to_quartz.py

# (任意) ローカルプレビュー
cd /c/Users/iidam/quartz && npx quartz build --serve
# → http://localhost:8080

# 公開
cd /c/Users/iidam/quartz && git add -A && git commit -m "sync" && git push
```

`git push` で **GitHub Actions が自動 build + deploy**(約 1〜2 分)。

### Claude Code Skill 経由(推奨)

```
/awa-publish              # sync → build → commit → push の全自動
/awa-publish --skip-build # build verify を省略
/awa-publish --dry-run    # 何が変わるか確認のみ
/awa-sync                 # push せず sync + build のみ(preview 用)
/awa-sync --serve         # sync + ローカルサーバ起動
```

スキル本体: `~/.claude/skills/awa-publish/`、`~/.claude/skills/awa-sync/`

---

## 同期パイプラインの構成

| スクリプト | 役割 |
|---|---|
| `_sync_to_quartz.py` | オーケストレータ(mirror copy + 後段処理) |
| `_fix_quartz_frontmatter.py` | Obsidian の緩い YAML を厳密 YAML に変換 |
| `_dewikify_broken.py` | 解決できない wikilink を外部リンクまたはプレーンテキスト化 |
| `_audit_links3.py` | broken link の実態調査(任意・デバッグ用) |

(スクリプトは `D:/Vault/_work/` に配置、Vault と同じ private 領域で管理)

### 公開対象の選別

**mirror 同期(rsync style with --delete)**: `式内社/`、`理論・研究/`、`学術基盤/`、`資料/03_特定テーマ資料/`

**whitelist 同期(資料/ root)**: 主要 MOC、専門論考、六国史解説 14 ファイル

**意図的に除外**: `Web_Archives/`(他人ブログコピー)、`01_ブログアーカイブ/`、`02_連載・研究論考/note_posts/`、`kojiki_md/`、`Evernote/`、`Clippings/`、`gemini-scribe/`、`_work/`、`NAJ_*_raw*.md`、`*.bak`

詳細は `D:/Vault/_work/QUARTZ_SYNC_README.md` を参照。

---

## カスタマイズ

`quartz.config.ts`:

- `pageTitle`: 阿波説デジタルガーデン
- `locale`: ja-JP
- `baseUrl`: iida-masashi.github.io/awa-garden
- `ignorePatterns`: Web_Archives、01_ブログアーカイブ、note_posts、Clippings、gemini-scribe、NAJ_*_raw、*.bak ほか
- `CustomOgImages`: 無効化(絵文字 codepoint 未対応で build エラー)

### 依存関係更新の注意

Dependabot の一括更新 PR はメジャーバージョンアップを含むことがあり、`npm run check`(型チェック)通過後も実ビルド(`npx quartz build`)が壊れる場合がある。マージ前に必ず実ビルドまで確認すること。

- 例: `typescript` 5→6 で `tsconfig.json` の `moduleResolution: "node"` がエラー化(TS5107)
- 例: `js-yaml` 4→5 で default export の提供方法が変わり `SyntaxError` でビルドがクラッシュ

---

## クレジット

- **Quartz v4**: <https://quartz.jzhao.xyz/> by [jackyzha0](https://github.com/jackyzha0) (MIT License)
- **コンテンツ**: 阿波説に関する研究ノート(iida-masashi)
- 各論ノートの典拠は本文の参考文献欄を参照

---

## ライセンス

- **Quartz コード本体**: MIT License(`LICENSE.txt`)
- **コンテンツ(`content/`配下のノート)**: 著作権は著者(iida-masashi)に帰属。引用・参照時は出典の明記をお願いします。
