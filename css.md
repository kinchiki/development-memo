## float
overflow-hiddenよりclearfixの方が良い？


## paddingとmarginの使い分け
- marginの縦の相殺を使いたいとき
- ネガティブマージンを使いたい margin
- borderの中と外どちらに余白を欲しいか
- 余白に色や画像が欲しいか
- autoを使いたいときはmargin


## インライン(inline)要素
- display: inline
- heightの指定ができない
- 中にblock要素を置けない
- 横に並ぶ
- その他色々


## ブロックボックス(block)要素
- display: block
- 縦に並ぶ
- 幅は無指定なら親要素の幅全体
- その他色々


## 幅
content + padding + border + margin

<!-- width: calc(100% - 20px - 6px); で自動幅計算 -->
box-sizing: border-box;  
width、height プロパティで指定できる領域に padding + border 領域を含める

`width: 100%`なら幅に合わせて拡大縮小。
`max-width: 100%`なら幅に合わせて拡大縮小するが原寸よりは大きくならない。


## 疑似要素
- first-child
- last-child
- nth-of-type(n)
- nth-last-of-type(n)
- hover
- not

(n)は(3n)や(2n+1)なども可能。
oddは奇数、evenは偶数


## 横並び
- float
- table
- inline-block
- flex

縦並びにするには`block`にするとかflexなら`flex-direction:column`にするなど



## プリプロセッサ（CSSメタ言語）
多分古い順

- LESS
- Sass/Scss
- Stylus
- PostCSS


## HTMLのtable
```table > (thead) > tbody > tr > th, td```

thとtdは同じ階層である。


## インライン要素の中央寄せ
### 1
親要素に`text-align: center;`

### 2
ブロック要素にして中央寄せ
```
display: block;
margin: auto;
```