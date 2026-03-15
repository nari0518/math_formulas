# Summary_for_Tests

静的サイトとして Markdown ファイルを読み込み、KaTeX で数学を表示するシンプルな仕組みです。

## 仕様

* Markdown ファイルは `docs/` に置く。
* ファイル名は `年度-分野-テスト番号.md` (例: `R7-A-5.md`)。
  - 分野には `A` や `B` のような数式以外に `英コミa` や `英コミb` といった
    任意の文字列を使えます。
* `scripts/generate_docs_index.js` を実行すると `docs/files.json` が生成され、
  ファイル一覧とメタデータが記録される。
* `index.html` はホーム画面を提供し、一覧からファイルを選択・フィルタできる。
  ファイル表示時に「ホームへ戻る」ボタンを表示し、ブラウザの戻るボタンも
  使える。
* KaTeX と markdown-it は CDN から読み込む。
* HTMLの基本的なリンクは `<a href="...">テキスト</a>` で書きます。
  （例: `<a href="https://nari0518.github.io/Flashcards/">フラッシュカード</a>`）

## セットアップと実行

1. Node.js が必要です。インストールされていない場合は公式サイトから取得。
2. このリポジトリには `package.json` があり、いくつか便利な npm スクリプトが定義されています：
   ```sh
   npm install        # (オプション) dev 依存があれば
   npm run generate   # docs/files.json を再生成
   npm run build      # generate のエイリアス
   npm run start      # ローカルサーバを立ち上げ (python3)
   ```
   Markdown ファイルを `docs/` に追加したら `npm run generate` を実行してください。
   GitHub Actions も配置済みで、`docs/**/*.md` やスクリプトが変更されると
   自動的に `files.json` を再生成してコミットします。
3. 好きな HTTP サーバでワークスペースを配信し、ブラウザで `index.html` を開く。
   例: `npm run start` あるいは `python3 -m http.server 8000`。

---

### CI での自動化

本リポジトリには `.github/workflows/gen-index.yml` があり、
Markdown を push した際に GitHub Actions が起動して `npm run generate` を実行します。
生成された `docs/files.json` に差分があれば自動でコミット＆pushするように設定してあります。
（プライベートリポジトリや他の CI でも同様の手順を組み込むことができます。）

---

必要に応じて、クライアント側の UI や CSS をカスタマイズしてください。
