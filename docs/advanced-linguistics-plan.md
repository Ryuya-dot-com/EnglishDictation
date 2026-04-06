# 上級者向け英語学ページ設計メモ

## 目的

- 上級者向けに、英語学の知見を「面白い読み物」で終わらせず、英語学習の見方そのものを深めるページを新設する
- 受験用の文法解説とは別に、`なぜこの表現はこう振る舞うのか` を研究ベースで紹介する
- 日本語母語話者の学習者が、英語と日本語の違いを知的に楽しみつつ、読解や語彙学習の精度を上げられる構成にする

## このドキュメントで先に固定すること

- ページの役割と対象読者
- 先行研究の扱い方
- 章立て
- 各章の執筆テンプレート
- 軸がぶれないための禁止事項
- 実際の制作手順

## ページの位置づけ

- これは `文法の復習` の延長ではなく、`英語学から見る英語学習` のページとする
- 目的は、用語を増やすことではなく、学習者に `見え方が変わる体験` を作ることに置く
- 各章は必ず `研究として何が面白いか` と `学習者に何が残るか` の両方で締める
- 受験勉強の即効テクニックに寄りすぎず、しかし抽象論にも逃げない

## 想定読者

- 学校文法は一通り学んでおり、より深い理由づけを知りたい学習者
- 高校上位から大学生、社会人学習者までを含む
- 日本語母語話者を主に想定し、日本語との対照が理解を助ける章を多めに置く
- `形態論` `照応` `束縛` `含意` のような語を初見でも読めるよう、本文内で短く言い換える

## 学習者向けページとしての設計原則

### 1. 研究の紹介だけで終わらせない

- 研究の問い
- 直感を揺さぶる具体例
- その知見が学習にどう返ってくるか

この 3 点を毎章そろえる。

### 2. 古典理論と実証研究を区別する

- 古典理論:
  - その分野の見取り図を与える理論枠組み
- 実証研究:
  - 実験、コーパス、観察から得られた知見
- 学習上の示唆:
  - こちらで整理した教育的含意

本文では、どの文がどのレイヤーかを明確にする。

### 3. 日本語話者がつまずく比較を前面に出す

- `させる` と `make / have / get / let`
- `自分` と `himself / herself / him / her`
- `単語を丸ごと覚える` と `語根・接辞で見る`
- `動詞の意味` と `代名詞の解釈`

### 4. 数式や記号は最小限にする

- 木構造や形式表記は、理解を助けるときだけ使う
- `c-command` のような重要概念も、図を増やすよりまず平易な説明を優先する
- 記号体系の厳密さより、観察事実が分かることを優先する

## 軸をぶらさない執筆ルール

### 文体

- です・ます調
- 断定は必要な範囲にとどめ、論争点は `古典理論では` `後続研究では` と分ける
- 学術書の要約ではなく、学習者向けの再記述として書く
- 専門用語は見出しか補足に後置し、本文ではまず具体例と平易な言い換えを先に出す

### 分量の目安

- 初稿は 1 章あたり 1,200 から 2,000 字程度を目安にする
- 拡張章では、わかりやすさのために節や比較表を増やしてよい
- 例文は 3 から 6 個を基本にし、疑問形式の補助例は別枠で足してよい
- 必要ならミニ表を 1 つ以上入れてよい
- 参考文献は各章の末尾に 2 から 8 件を基本にし、論点が多い章ではそれ以上も許容する

### 毎章で必ず入れるもの

- 導入の問い
- 直感に反する例
- 中心となる研究知見
- 学習者向けの読み替え
- この章が効く学習場面
- まず試す練習
- 次に読む文献
- よくある誤解
- 参考文献

### 入れないもの

- 証明を追うためだけの長い形式的導出
- 研究史の細かな対立の羅列
- `この知見で点数が上がる` のような根拠のない効用説明
- 用語だけ多く、観察例が少ない解説
- 研究上は重要でも、学習者に還元しにくい細部

## 先行研究の扱い方

### 出典の優先順位

1. 原著論文
2. 原著者による書籍・章
3. 大学出版や学術出版社の書誌ページ

### 記述ルール

- 研究上の主張を述べるときは、原著かそれに準ずる一次ソースに依拠する
- 書誌ページは、出版情報や扱う論点の確認にのみ使う
- 学習者向けの比喩や整理は、研究の結論そのものではなく `教材としての読み替え` だと分かるように書く
- 論争のある話題は、`現在の有力説` と言い切らず、`古典的には` `少なくともこの研究では` のように範囲を限定する

### 本ページで特に気をつける点

- `束縛理論` は古い標準的な説明として紹介し、理論名は必要になるまで前面に出しすぎない
- `implicit causality` は規則ではなく `bias` であり、常にそう解釈されるわけではないと明記する
- `形態論で単語を切る` 話では、意味的に透明な語だけでなく、表面上は切れそうでも意味がつながらない語があることも示す
- `日本語の使役` と `英語の使役` は一対一対応にせず、事象構造と関与の仕方の違いとして扱う

## 予定するファイル

- `docs/advanced-linguistics-plan.md`
  - 設計メモ
- `docs/advanced-linguistics.md`
  - 学習者向けの本文

必要なら後で次を追加する。

- `docs/advanced-linguistics-glossary.md`
  - 用語の補助集

## 章立て案

## 第1章 形態論で単語を見る

### 狙い

- 単語を `丸ごとの暗記対象` ではなく、語根・接辞・語族のネットワークとして見る見方を紹介する
- 英単語の見え方が、意味と品詞変化の予測可能性によって変わることを示す

### 中心論点

- 英語の語認識では、複雑な語が早い段階で形態的に分解されうる
- ただし、見かけ上切れそうでも意味がつながらない語もあり、単純な `切れば分かる` 主義では不十分
- 学習では `語族` と `接辞の働き` を押さえることが有効だが、語源雑学に流れすぎないほうがよい

### 具体例候補

- `act -> action -> active -> activity`
- `predict -> prediction -> predictable -> unpredictability`
- `corner` は `corn + er` に見えても、学習上は意味的にそのまま扱えない

### 学習者への還元

- 新出語を見たとき、まず `語根` と `接辞` に分けて品詞とおおよその意味を予測する
- ただし、予測が外れる語もあるので、`分けてみる -> 意味が本当に続くか確かめる` の二段階で処理する
- 高頻出形態素は、`意味` だけでなく `入力品詞 / 出力品詞` まで一緒に学ぶ
- `Word Part Levels Test` を参考に、接辞知識を `form / meaning / use` に分けて確認できる構成にする
- 高校生・大学生が実際に抱きやすい疑問を Q&A 化し、`選択制約` `競合` `歴史` `使用域` の違いで答え分ける

### 中心文献

- Kathleen Rastle, Matthew H. Davis, Boris New (2004), *The broth in my brother's brothel: Morpho-orthographic segmentation in visual word recognition*
- Virginia W. Berninger, Robert D. Abbott, William Nagy, Joanne Carlisle (2010), *Growth in phonological, orthographic, and morphological awareness in grades 1 to 6*

### 書くときの注意

- `形態論` と `語源学` を混同しない
- `英単語は全部分解できる` という誤解を避ける
- 受験向けの接頭辞暗記帳とは違い、`どこまで予測できて、どこから辞書確認が必要か` を示す
- `friendly -> friendliness` のような語では、`見た目の足し算` だけでなく、どの基体がすでに定着しているかも示す
- `irregardless` や `cacti/cactuses` のような語では、`論理的に変か` と `標準語としてどう扱われるか` を分けて書く

## 第2章 日本語の使役と英語の使役は何が違うか

### 狙い

- 日本語の `-sase-` と、英語の `make / have / get / let` が単純対応しない理由を示す
- `させる` の日本語感覚をそのまま英語に写すと、どこでずれるかを見える化する

### 中心論点

- 日本語と韓国語の使役研究では、直接使役、間接使役、その中間としての sociative causation が区別される
- 英語では、同じ `cause` の領域が複数の構文に分配される
- `make + O + V` と `get + O + to V` は似て見えても、コロケーションや難易感の含意が異なる
- 日本語の形態的使役は1つの形で広い意味を包むが、英語は `make / let / have / get` や語彙的使役へ粒度を分散させる
- `kill` と `cause to die`、`open` と `disappear` の差から、語彙的使役と自他交替の制約を示せる
- `食べさせられる` のような膠着的積み重ねは、英語では構文的に分散される
- L2では、日本語話者の英語学習者に `make` 側への偏りが出やすく、英語話者の日本語学習者には `に/を` と voice の積み重ねが負荷になりやすい

### 具体例候補

- `Mother put the clothes on the child.` と `Mother made the child wear the clothes.`
- `先生は生徒を駅まで歩かせた` に近い英語を、`made the students walk` と `walked the students` で比較する
- `I got him to help me.` と `I made him help me.` の違い
- `彼女を泣かせた` を `made her cry` と `caused her to cry` で比較する
- `The door opened / I opened the door` と `*I disappeared the evidence` を対比する
- `食べ-させ-られ-まし-た` を `I was made to eat` のような英語の分散構造と比べる
- `I had my wallet stolen` と `財布を盗まれた` を機能比較する

### 学習者への還元

- 日本語の `させる` を見た瞬間に `make` と決め打ちしない
- 英語では、強制、説得、段取り、許可が別の構文に分かれやすいと理解する
- 和文英訳で `causer` の関与の強さを読む習慣につなげる
- `語彙的使役で1語にできるか` と `periphrastic causative が必要か` を分けて考える
- `食べさせられる` のような形は、語幹・使役・受身・時制に分けてから英語へ直す
- `have + O + p.p.` の被害読みのように、形は違っても機能が重なる構文があると理解する

### 中心文献

- Masayoshi Shibatani (1973), *Semantics of Japanese Causativization*
- Masayoshi Shibatani, Prashant Pardeshi (2001), *The Causative Continuum*
- Yae Furuta (2008), *Differences between the causatives MAKE and GET: Based on Studies of Collocation*
- Leonard Talmy (2000), *Force Dynamics in Language and Cognition*
- J. A. Fodor (1970), *Three Reasons for Not Deriving "Kill" from "Cause to Die"*
- Beth Levin, Malka Rappaport Hovav (1995), *Unaccusativity*

### 書くときの注意

- 英語の causative を `強制` だけでまとめない
- 日本語の格助詞 `に / を` の話に深入りしすぎず、学習者が英訳で迷う点に絞る
- `make / have / get / let` を一覧化するときは、意味説明だけでなく典型例も並べる
- `kill = cause to die` のような分解は、便利な近似であって完全同義ではないと明記する
- `have my wallet stolen` のような構文は、構文対応ではなく機能対応として説明する

## 第3章 束縛理論で再帰表現を見る

### 狙い

- Binding Condition A/B/C を、`self` 系・普通の代名詞・固有名詞の見分け方としてまず定着させる
- `自分` `自分自身` `彼` `お互い` `pro` を通して、日本語では束縛が統語だけで閉じないことを示す
- 英語学習に直結する実用的な読み方と、理論上なぜ難しいのかの両方を見せる

### 中心論点

- 古典的な束縛理論では、Condition A/B/C が `anaphor / pronoun / R-expression` の分布を分ける
- 英語の `himself` は強い局所性を持つが、日本語の `自分` は長距離束縛・主語志向性・視点依存を示す
- `自分自身` のような complex anaphor では局所性が戻りやすく、`自分` との差が出る
- 束縛は表面語順だけでなく再構築とも関わるため、scrambling や前置だけを見ても判断できない
- 日本語では敬語、共感度、相互表現、ゼロ代名詞のような語用論的要因が束縛解釈に深く関わる
- したがって、日本語から英語へ直すときには `自分` や省略主語の感覚をそのまま写せない

### 具体例候補

- `John saw himself.`
- `John saw him.`
- `John said that Bill hurt himself.` と `John said that Bill hurt him.` の対比
- `*He likes John.` で Condition C を見る
- `太郎が [次郎が自分を批判した] と言った`
- `太郎が [次郎が自分自身を批判した] と言った`
- `先生が学生に自分の研究について話された`
- `太郎と花子は [お互いが優秀だ] と思っている`
- `太郎が [pro 賢いと] 思っている`

### 学習者への還元

- 長い英文で代名詞を見たら、まず `self` 系か普通の代名詞か固有名詞かを判定する習慣をつける
- 英語では近い節の中で A/B/C を当て、日本語ではその後に `視点` `敬語` `ゼロ代名詞` を疑う
- `自分 = himself` と機械的に対応づけない
- 英文解釈で、前置や移動があっても元の位置で読めるかを一度疑う
- 日本語の代名詞省略や `彼` の性質が、英語の pronoun system とかなり違うことを意識する

### 中心文献

- Noam Chomsky (1981), *Lectures on Government and Binding*
- Takako Aikawa (2002), *Reflexives*
- Masayo Iida, *Context and Binding in Japanese*
- Susumu Kuno (1987), *Functional Syntax: Anaphora, Discourse, and Empathy*
- Taisuke Nishigauchi (2002), *Scrambling and Reconstruction at LF*
- C.-T. James Huang (1984), *On the Distribution and Reference of Empty Pronouns*

### 書くときの注意

- `c-command` や `governing category` は厳密定義から始めず、まず `構文上届くか` `だいたい一番近い節か` という直感で導入する
- 原理 A/B/C は 1 枚で比較できる早見表を置く
- 章の冒頭で `John saw himself / John saw him / John said that Bill hurt himself / 太郎が [次郎が自分を批判した] と言った` の4本を先に見せ、そこからルールへ進む
- `自分` の論争史を細かくたどるより、`なぜ英語の himself と同じにできないのか` を前面に出す
- 敬語や視点性は、`統語だけで決まらない例` として位置づけ、断定しすぎない
- `お互い` や `彼` では、研究上の主張と学習者向けの教育的整理を混同しない

## 第4章 動詞が代名詞の解釈を偏らせる

### 狙い

- 動詞の意味が、後続する `because` 節や代名詞解釈に偏りを生むことを紹介する
- 読解で `なんとなくこの人を指す気がする` 感覚に、意味的な理由があると示す

### 中心論点

- `implicit causality` では、動詞が `because` の後の理由を主語側か目的語側のどちらへ寄せやすいかという bias を持つ
- 入門的な基本対比は `admire` と `frighten` で示し、`fear` は対立の相手としては使わない
- その bias は、曖昧な代名詞の解釈や文の続き方に影響する
- `because` と `and so` では、原因と結果を問う方向が違うため、偏りが逆転しうる
- 後続研究では、bias は文末統合だけでなく、代名詞の出るかなり早い段階でも使われることが示されている
- 日本語では、動詞後置とゼロ代名詞の多さがあるため、英語と同方向の bias を持ちながらも使われ方はやや異なりうる

### 具体例候補

- `John admired Mary because she had solved the problem.`
- `John frightened Mary because he was waving a knife.`
- `John admired Mary, and so he asked another question.`
- `John praised Mary because she had worked hard.`
- `John apologized to Mary because he had been rude.`

### 学習者への還元

- 読解で代名詞解釈に迷ったとき、文法だけでなく動詞の意味も手がかりになると分かる
- `because` 節の主語だけでなく、`and so` の後に来やすい結果側も予測できるようになる
- `動詞を見る -> because/so を見る -> どちら側が来やすいか予測する` という読み方を作る
- 英文が `なぜそう続くと自然に感じるのか` を説明できるようになる

### 中心文献

- Catherine Garvey, Alfonso Caramazza, Jack Yates (1974), *Factors influencing assignment of pronoun antecedents*
- Roger Brown, Deborah Fish (1983), *The psychological causality implicit in language*
- Arnout W. Koornneef, Jos J.A. Van Berkum (2006), *On the use of verb-based implicit causality in sentence comprehension*
- Joshua K. Hartshorne, Yasutada Sudo, Miki Uruwashi, et al. (2012), *Implicit Causality Pronoun Resolution Biases in English, Japanese, Mandarin Chinese, and Russian*
- Alan Garnham, Matthew Traxler, Jane Oakhill, Morton Ann Gernsbacher (1996), *The Locus of Implicit Causality Effects in Comprehension*
- Joshua Hartshorne, Tim O'Donnell, Joshua B. Tenenbaum (2015), *The causes and consequences explicit in verbs*
- Alan Garnham, Svenja Vorthmann, Karolina Kaplanova (2021), *Implicit consequentiality bias in English: A corpus of 300+ verbs*

### 書くときの注意

- ここで言う bias は `傾向` であって `必ずそうなる規則` ではない
- 代名詞解釈を文法規則だけで説明できないことを面白さとして出す
- 専門用語の数を増やしすぎず、例文中心で進める
- 冒頭では `admire / frighten` と `because / and so` の4本の例文を先に見せて、あとから `NP1 / NP2` の用語を導入する

## 共通テンプレート

今後の本文は、各章を次の順で書く。

```md
## {章タイトル}

### ひとことで言うと
- 章の要点を 1 文で言う

### まず結論
- 学習者が先に知るべきことを 2 から 3 点

### 導入の問い
- 学習者が「確かに気になる」と思える問いを 1 つ置く

### まず見る例
- 英語例を 2 から 4 個
- 必要なら日本語例も 1 つ
- できれば各例に一言の意味差を付ける

### 研究のポイント
- 古典理論
- 実証研究
- 研究上の注意

### 学習でどう使うか
- 語彙学習
- 読解
- 和文英訳
- 英文解釈

### この章が効く学習場面
- 何の学習に返るかを 2 から 4 個

### まず試す練習
- 読んだあとすぐできる練習を 2 から 4 個

### 次に読む文献
- 入門として 1 本
- 核になるものを 1 本
- 発展として 1 本

### つまずきやすい点
- 一対一対応の誤解
- 過度の一般化
- 用語だけで理解した気になる誤り

### 参考文献
- 著者
- 年
- タイトル
- URL
```

## ページ全体で入れる補助要素

### 冒頭に置く案内

- このページは受験用の最短暗記ではなく、英語の仕組みを少し深く知りたい人向けであること
- 数学の証明のような厳密展開ではなく、学習者向けに読みやすく再構成していること
- 研究上の話題なので、節によっては複数の見方があること

### 末尾に置く案内

- ここで扱った用語のミニ索引
- 参考文献一覧
- 発展学習のための読書案内

## 今回は見送る話題

- ミニマリスト・プログラムの詳しい導出
- 島の制約や痕跡理論など、形式化が先に立ちやすい話題
- コーパス統計の方法論の細部
- 研究史の年表化

これらは面白いが、最初のページとしては負荷が高い。

## 品質チェック項目

- 各章に `ひとことで言うと` と `まず結論` がある
- 各章に一次ソースが 2 件以上ある
- 各章に英語例が 2 個以上ある
- 各章の末尾に `学習でどう使うか` がある
- 各章で `研究上の主張` と `教材としての整理` を混同していない
- 日本語母語話者に固有のつまずきが少なくとも 1 つ入っている
- 面白さだけでなく、学習上の手触りが残る

## 制作手順

1. 章ごとの一次文献を確定する
2. 各章の中心例文を先に決める
3. 例文に合わせて理論説明を最短化する
4. `研究のポイント` を執筆する
5. `学習でどう使うか` へ落とし込む
6. 最後に、用語の難しさと情報量を削る

## 執筆順

1. 第2章 日本語の使役と英語の使役
2. 第3章 束縛理論で再帰表現を見る
3. 第1章 形態論で単語を見る
4. 第4章 動詞が代名詞の解釈を偏らせる

この順にする理由は次の通り。

- 使役と束縛は、日本語との対照が明確で、学習者が `違い` をすぐ実感しやすい
- 形態論は有益だが、抽象化しすぎると語源雑学に流れやすいので、先に文レベルの章でトーンを固める
- implicit causality は最も面白い一方、説明を雑にすると `なんとなく` の話に見えるので最後に丁寧に書く

## 参照予定の主な先行研究

### 形態論

- Rastle, Davis, and New (2004)
  - https://www.mrc-cbu.cam.ac.uk/personal/matt.davis/pubs/rastle_davis_new.pbr2004.pdf
- Berninger, Abbott, Nagy, and Carlisle (2010)
  - https://pubmed.ncbi.nlm.nih.gov/19826956/

### 使役

- Shibatani (1973)
  - https://philpapers.org/rec/SHISOJ
- Shibatani and Chung (2001)
  - https://da.lib.kobe-u.ac.jp/da/kernel/80010011/80010011.pdf
- Furuta (2008)
  - https://www.jstage.jst.go.jp/article/let/45/0/45_KJ00007040097/_article

### 束縛理論

- Chomsky (1981)
  - https://search.worldcat.org/title/Lectures-on-government-and-binding/oclc/7721202
- Iida
  - https://web.stanford.edu/group/cslipublications/cslipublications/site/1881526747.shtml

### 照応の因果バイアス

- Garnham et al. (1996)
  - https://pmc.ncbi.nlm.nih.gov/articles/PMC4515414/
- Hartshorne, O'Donnell, and Tenenbaum (2015)
  - https://doi.org/10.1080/23273798.2015.1008524
- Garnham, Vorthmann, and Kaplanova (2021)
  - https://pmc.ncbi.nlm.nih.gov/articles/PMC8367889/
