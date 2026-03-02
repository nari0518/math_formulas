# math_formulas

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
2. 新しい Markdown ファイルを `docs/` に追加したら、ルートで:
   ```bash
   node scripts/generate_docs_index.js
   ```
3. 好きな HTTP サーバでワークスペースを配信し、ブラウザで `index.html` を開く。
   例: `python3 -m http.server 8000`。

---

必要に応じて、クライアント側の UI や CSS をカスタマイズしてください。
