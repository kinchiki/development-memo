# Active Record
## ActiveRecord_Relationの + について
`ActiveRecord_Relation` 同士を足すと `Array` になる。
よって `find_each` など `ActiveRecord_Relation` クラスに存在するメソッドを呼ぶと `NoMethodError: undefined method` になる。

```ruby
a = User.where.active
b = User.where.inactive
users = a+b
users.find_each {|u| u.id} #=> error
```


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

# Association
## association の inverse_of option
メモリ上で同一インスタンスとして扱われるようにするやつ

`:inverse_of` が指定されていない `:conditions, :through, :polymorphic, :class_name, :foreign_key` を含むアソシエーションに対してrubocopは警告を出す。

### 参考
[RuboCopの Rails/InverseOf について調べた - sometimes I laugh](https://sil.hatenablog.com/entry/rubocop-rails-inverse-of)


# Validation
## 複合ユニーク制約
外部キーは `_id` が必要

uniqueness の scope に カラムを書く。
複数の場合配列にする。

```ruby
validates :user_id, uniqueness: {:scope :target_user_id}
validates :user_id, uniqueness: { scope: %i[target_user_id invisible_type] }
```
