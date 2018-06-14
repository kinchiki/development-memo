## 言語仕様
シングルクォーテーション使えない？

演算子の前後にスペースが必要

`"\(variable)"` で変数展開


### 定数、変数
```swift
// 定数
let message: String = "Hello"
// 変数
var message: String = "Hello"
```

### if
```swift
// () はなし
if age > 18 {
    // 処理
}

if !(age > 18) {
    // 処理
}
```


## optional型
オプショナル型とはデータ型の一つ
オプショナル型とは変数にnilの代入を許容するデータ型で、反対に非オプショナル型はnilを代入できません。オプショナル型の変数にはデータ型の最後に「?」か「!」をつけます。

View Controller は、アプリケーションのユーザーインターフェイスの一部分と、インターフェイスおよび基になるデータのやり取りを管理します。

```swift
class Sample {
  func method() -> String {
    return "hoge"
  }
}
let sample: Sample? = Sample()
sample.method() // エラー、!か?を付ける必要がある
sample!.method() // OK、ただしsampleがnilの時にエラーになる
sample?.method() // OK、aがnilの時は戻り値がnilになる
```

参考
[Swiftのはてな記号とびっくりまーく記号についての調査 - しめ鯖日記](http://www.cl9.info/entry/2015/05/19/011734)


## lazy
レイジープロパティ

- letは不可能
- 参照したときに初めて初期値が設定される


## as
型変換

ダウンキャストする。
`as?` はキャストが失敗した場合にnilを返す
`as!` はキャストが失敗した場合にエラーになる

```swift
// 親クラスAnimal のインスタンス animal を 子クラスの cat にダウンキャスト
if let cat = animal as? Cat {
    // 
}
```

https://qiita.com/aki/items/50fbab1a4c0df3f3d23f
