## プロジェクト概要

このリポジトリは、初期データロード体験において **Wasm + DB（SQLite）** を使う価値があるかを、他方式と比較検証するためのサンプルです。以下の 4 画面を用意し、初期表示・転送量・実装/運用コストの観点でメリデメを比較します。

- `/csr`: クライアントで JSON フェッチして描画（CSR）
- `/ssr`: サーバでプレビューを生成して返す（SSR）
- `/wasm-insert-json`: JSON を取得後、Wasm SQLite に一括挿入してクエリ
- `/wasm-snapshot`: 事前ビルド済み SQLite スナップショットを配信しクエリ

### 比較表（実装の要点・メリデメ）

| 画面 | 経路/実装 | 転送量の傾向 | 初期表示まで | キャッシュ/再利用 | メリット | デメリット |
|---|---|---|---|---|---|---|
| CSR (`/csr`) | クライアントで `/api/users` から 10万件 JSON を取得し描画。`useCsrUsers` | 大（JSON 全件） | 遅め（取得と JSON パース完了まで待つ） | react-query は `staleTime:0` で実質都度取得 | 実装が最も簡単、API さえあれば動く | ネットワーク/パースが重い。モバイルで厳しい |
| SSR (`/ssr`) | サーバで 10 件プレビューを生成し埋め込み。`generateUsers({count:10})` | 小（プレビューのみ） | 速い（初期可視が早い） | `dynamic="force-dynamic"` のため都度生成 | TTFB 後すぐ見える、SEO に有利 | 全件は持たないため後続の完全データ取得設計が別途必要 |
| Wasm + Insert JSON (`/wasm-insert-json`) | JSON を取得→Wasm SQLite に一括挿入（PRAGMA で最適化）→クエリ。`useWasmSqliteUsersInsertJson` | 大（JSON 全件） | 中〜遅め（取得+挿入の初回コスト） | DB はメモリ内。リロードで消える | 以降の検索/並び替えが超高速。オフライン耐性（同セッション） | 初回が重い。メモリ使用も増える |
| Wasm + Snapshot (`/wasm-snapshot`) | 事前生成の `users-100k.sqlite` を配信→Wasm で開きクエリ（LIMIT 10、総数も取得）。`useWasmSqliteUsersSnapshot` | 中〜大（バイナリ。gzip が効き JSON より小さいことが多い） | 速い（パース不要、即クエリ可能） | HTTP/CDN で強キャッシュしやすい | 初回から安定して速い。CPU/メモリ効率良い | スナップショット生成・配布の運用。部分更新が難しい |

### 実装の対応ファイル

- 画面
  - `src/app/csr/page.tsx`
  - `src/app/ssr/page.tsx`
  - `src/app/wasm-insert-json/page.tsx`
  - `src/app/wasm-snapshot/page.tsx`
- フック
  - `src/hooks/use-csr-users.ts`
  - `src/hooks/use-wasm-sqlite-users.ts`
- API / ユーティリティ
  - `src/app/api/users/route.ts`（JSON を動的生成）
  - `src/lib/users.ts`（ダミーデータ生成）
- アセット
  - `public/sql-wasm.wasm`（sql.js の WASM）
  - `public/users-100k.sqlite`（スナップショット。配布/キャッシュ対象）

### 使い方（ローカル実行）

```bash
pnpm dev
# npm run dev / yarn dev / bun dev でも可
```

ブラウザで `http://localhost:3000` を開き、上記 4 画面に遷移してください。

### 測定の観点（例）

- **初期可視までの時間**（最初の 10 件が出るまで）
- **転送量**（JSON vs SQLite バイナリ、gzip 効率）
- **CPU/メモリ**（JSON パース/挿入 vs バイナリ読み込み）
- **運用性**（スナップショットの生成/配布、差分更新のしやすさ）

### sql.js / Turbopack に関する注意

- ブラウザ利用では `sql.js` の **ブラウザ向け ESM エントリ**を動的 import しています：
  - `import("sql.js/dist/sql-wasm.js")`
  - `public/sql-wasm.wasm` を `locateFile` で解決
- 型解決用の宣言は `src/types/sqljs-*.d.ts` に配置しています。
- Turbopack 環境では `fs` 解決周りで躓く場合があるため、上記エントリを使うか、開発サーバは webpack 実行を使う構成にしています。

### メモ

- SSR 画面は比較用に「プレビュー 10 件のみ」を返しています（全件は返しません）。
- Wasm + SQLite 方式は、一度ロードすれば同セッション内でのクエリは軽く、高速な検索・並び替え UI と相性が良いです。
