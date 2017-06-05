## 引数
### *
配列となる
```
def foo(x, *xs)
  puts "#{x} : #{xs.inspect}"   # Object#inspect は p のような詳細な内部表示
end
foo(1)        #=> 1 : []
foo(1, 2)     #=> 1 : [2]
foo(1, 2, 3)  #=> 1 : [2, 3]

def bar(x, *) # 残りの引数を単に無視したいとき
  puts "#{x}"
end
bar(1)        #=> 1
bar(1, 2)     #=> 1
bar(1, 2, 3)  #=> 1
```


## ブロックあれこれ
http://qiita.com/kidach1/items/15cfee9ec66804c3afd2
http://language-and-engineering.hatenablog.jp/entry/20101118/p1
https://qa.atmarkit.co.jp/q/35

### ブロック
**ブロックとは引数**

- `do~end`または`{}`のなか
- メソッドの引数にしかなれない
- yieldによって実行される

### yield
ブロックを呼び出すもの

メソッドのなかに`yield`があったらそのメソッドの引数にはブロックが含まれる

引数として渡せるブロックは一つだけ→わざわざ`block.call`なんて明記しない

ブロックはyieldが示すから仮引数`&block`もいらない

### Proc
ブロックをオブジェクト化したもの
callで呼び出すことができる

`block_given?`は引数にブロックがあるかどうか判定するメソッド

ブロック付きのメソッドを呼び出す際、ブロックの代わりに Proc オブジェクトを渡すことができます。この場合、Proc オブジェクトに & 記号を前置します。


`Symbol#to_proc`というメソッドがあります。これはレシーバに対してシンボルと同名のメソッドを呼び出す Proc オブジェクトを返すメソッドです。言葉で説明するとわかりにくいですが、つまりこんな感じです。

```
:upcase.to_proc #=> proc {|i| i.upcase }
```

この2つを組み合わせるとこう書けるようになります。

```
%w(foo bar).map(&:upcase.to_proc)
```

& を前置すると自動的に`to_proc`が呼ばれますので、さらに縮めてこう書けます。

```
%w(foo bar).map(&:upcase)
```