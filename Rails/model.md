# Active Record
## in
`hoge.where(カラム: 配列)` で可能

例

```ruby
hoge.where(id: [1,3,4,5])
```

## attribute
カラムをセット

updateなどで更新

```
obj.attributes = params[:model]
```

<http://qiita.com/tyamagu2/items/8abd93bb7ab0424cf084>


## バリデーションエラーを見る
`save!` or `errors` 見る。

```ruby
user = User.new(user_params)
user.save!

# or

user.save
user.errors
```


## association の inverse_of option
メモリ上で同一インスタンスとして扱われるようにするやつ

`:inverse_of` が指定されていない `:conditions, :through, :polymorphic, :class_name, :foreign_key` を含むアソシエーションに対してrubocopは警告を出す。

### 参考
[RuboCopの Rails/InverseOf について調べた - sometimes I laugh](https://sil.hatenablog.com/entry/rubocop-rails-inverse-of)
