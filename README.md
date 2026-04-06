# English Dictation Studio

自習向けの英語ディクテーション Web アプリです。  
大文字・小文字と句読点を自動で無視し、各問題の振り返り、単語列の差分表示、セッション後の復習メモを確認できます。  
学習履歴と間違いバンクはブラウザの `localStorage` に保存され、次回起動時におすすめ復習カテゴリや `今日の3問` を表示します。  
各問題では `Before Listening` の注目ポイントと、解答後の `After Listening` 音読セルフチェックを使えます。  
`リスニング・シャドーイング` モードでは、入力の代わりに `音声だけで聞く -> キーフレーズ -> スクリプト重ね読み -> フレーズ反復 -> 自分の音読を録音して聞き返す -> 音読自己評価` の流れで練習できます。

## ローカルで確認する

```bash
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000` を開いてください。

マイク録音を使う場合は、`localhost` または `https` で開き、ブラウザのマイク権限を許可してください。

## 問題データを検証する

```bash
node scripts/validate-questions.mjs
```

`questions.json` を直編集したあとに実行すると、`blankWord` の不整合や `blankOccurrence` の不足を確認できます。

## 問題データのメモ

- `difficulty`: 未指定なら英文語数から `easy` `medium` `hard` を自動付与します
- `blankOccurrence`: `blankWord` が文中に複数回あるとき、何番目を空欄にするかを指定できます
- `explanation`: 各問題の振り返りで表示する短い解説を追加できます

## 文法復習ドキュメント

- 学習者向けの骨組み: [docs/grammar-review.md](docs/grammar-review.md)
- カテゴリ別の 1問チェック: [docs/grammar-review-quiz.md](docs/grammar-review-quiz.md)
- ブラウザで解くページ: [grammar-quiz.html](grammar-quiz.html)
- 執筆方針と出典ルール: [docs/grammar-review-plan.md](docs/grammar-review-plan.md)

## 上級者向け英語学ドキュメント

- 学習者向け本文: [docs/advanced-linguistics.md](docs/advanced-linguistics.md)
- 設計メモと出典方針: [docs/advanced-linguistics-plan.md](docs/advanced-linguistics-plan.md)
