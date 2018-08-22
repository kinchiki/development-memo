## String deletion and return value
文字列から文字を削除したい場合のメソッドとその返り値

- slice, []: 返り値は削除した文字（指定した範囲）
- delete: 返り値は削除した後の文字列。一文字ずつ判断しているため注意が必要
- sub, gsub: 返り値は置換した後の文字列

```ruby
# slice, []
string = 'aioueaiueo'
string.slice(0..1) #=> "ai"
string #=> "aioueaiueo"
string.slice!(0..1) #=> "ai"
string #=> "oueaiueo"
string[0..1] = '' #=> ""
string #=> "eaiueo"

# delete
string = 'aioueaiueo'
string.delete('au') #=> "ioeieo"
string #=> "aioueaiueo"
string.delete!('au') #=> "ioeieo"
string #=> "ioeieo"

# sub
string = 'aioueaiueo'
string.sub('a', '') #=> "ioueaiueo"
string #=> "aioueaiueo"
string.gsub('a', '') #=> "ioueiueo"
string #=> "aioueaiueo"
string.sub!('a', '') #=> "ioueaiueo"
string #=> "ioueaiueo"
```

reference
[code161](http://doc.code161.com/ruby/string-delete-method/)
[文字列の一部を削除する - Ruby Tips!](http://rubytips86.hatenablog.com/entry/2014/03/20/155851)

## ループのインデックス
- `each_with_index` は0から開始
- `each.with_index` は引数の値から開始

```ruby
users.each_with_index do |user, i|
  p i # => 0,1,2,3...
end

users.each.with_index(1) do |user, i|
  p i # => 1,2,3...
end
```


## caller
メソッドがどこから呼ばれたかを出す

## included of Module
init みたいなもの。

[引用](https://ref.xaio.jp/ruby/classes/module/included)

>includeメソッドによってモジュールが他のモジュールやクラスにインクルードされたあとに呼び出されます。引数にはモジュールをインクルードするクラスやモジュールが入ります。


## positive?
レシーバが 0 より大きい場合に true 、そうでない場合に false を返す

https://docs.ruby-lang.org/ja/latest/method/Numeric/i/positive=3f.html

## クラスメソッド（self.method名とか）
インスタンスなしで実行可能なメソッド。
`クラス名.メソッド名`で実行可能。

```ruby
# その1
class Hage
  def self.hege
    puts "hege"
  end
end
Hage.hege # => hege

# その2
# class << self 内で定義する
class Hage
  class << self
    def hege
      puts "hege"
    end
  end
end
Hage.hege # => hege
```

参考：[Rubyのクラスメソッドとインスタンスメソッドの例](https://qiita.com/tbpgr/items/56eb65c0ea5882abbb07)

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
