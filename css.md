## 吹き出しなどの矢印を作る場合
左上基準なので、中央に配置したい場合はネガティブマージンで調整する必要あり。

例えば上矢印を上中央に配置するならこんな感じに書く。

```css
&::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  border-bottom: 7px solid $white;
  border-right: 7px solid transparent;
  border-left: 7px solid transparent;
  margin-left: -7px;
}
```


## インライン要素（か画像？）に生まれる縦の余白を消す
`line-height` 分の余白が生まれるため、`display: block;` でブロック要素にする。
もう一つ解決方法は多分`インライン要素？を縦の中央に配置する際の微調整`だったと思う。

## インライン要素？を縦の中央に配置する際の微調整
`インライン要素（か画像？）に生まれる縦の余白を消す` と関係あり。

以下は縦横を親要素の中央に配置する場合。

`line-height` 分の上下のずれを以下の方法で消す。

- `line-height: 1` でline-heightをfont-sizeにする
- `line-height(=fontsize) / 2` のネガティブマージンを設定する

```css
/* 親要素は position: relative; */
position: absolute;
margin-top: -5px;
line-height: 1;
font-size: 11px;
text-align: center;
top: 50%;
left: 0;
right: 0;
```


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

縦並びにするには`display:block`にするとか`flex-direction:column`にするなど


## プリプロセッサ（CSSメタ言語）
多分古い順。SCSSが定番か。

- LESS
- Sass/Scss
- Stylus
- PostCSS


## HTMLのtable
```table > (thead) > tbody > tr > th, td```

thとtdは同じ階層である。
あまり使わない方がよい。


## インライン要素の中央寄せ
### 1
親要素に`text-align: center;`

### 2
ブロック要素にして中央寄せ
```
display: block;
margin: auto;
```

### 3
親要素を flex にするのが手っ取り早い。


## flex
### justify-content,-webkit-justify-content
1. 均等配置 端隙間無し
    - `space-between`
1. 均等配置 端隙間あり
    - `space-around`
