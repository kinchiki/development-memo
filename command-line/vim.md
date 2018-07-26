## インデント
- =: indent at current line
- \>>: indent
- <<: reverse indent
- ctrl+t: indent on insert mode (カーソルが行頭ならTabも可)
- ctrl+d: reverse indent on insert mode (カーソルが行頭ならbackspaceでも可)

reference  
[覚えておきたい Vim コマンド 備忘録 - Qiita](https://qiita.com/colorrabbit/items/755cfbb0e97d48280775)


## 矩形選択
`ctrl+v` で矩形選択(VISUAL BLOCK)モード

1. ctrl+v
1. j or k で上下移動（カーソルも可）
1. shift+i でインサートモード
1. キー入力
1. esc でノーマルモード finish

## 起動したまま terminal に戻る
1. ctrl + z でターミナルに戻る
1. fg でバックグラウンドの vim に戻る


## 検索
- /str 下方向検索
- ?str 上方向検索
- n 次の検索結果
- N 前の検索結果
- * カーソル位置の単語を下方向に検索


## 行番号非表示
`:set nonu`

## 置換
```
頭の%は今開いているファイル

一行に複数あっても一回だけ
:%s/"置換前"/"置換後"/

一行に複数あったら全部
:%s/"置換前"/"置換後"/g

行指定 1から100行まで
:1,100s/"置換前"/"置換後"/g
```

## ハイライトを消す
`:noh`

## 終了
ZZ: 保存して終了。**読み取り専用の場合でも保存して終了**
ZQ: 保存せずに終了。警告なしに終了。
