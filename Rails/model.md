# Active Record
## callback
https://railsguides.jp/active_record_callbacks.html#%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B6%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF

https://qiita.com/rtoya/items/29cef3e328299781a328

https://qiita.com/htz/items/56798d53ec5988733fc6


## column に対する破壊的メソッド
通常の変数と同じ。

値は変わるがsaveされない。
非破壊的メソッドなら値自体も変わらない。

```ruby
user = User.last
user.name #=> 'joh smith'

user.name.slice(0..3) #=> 'joh '
user.name #=> 'joh smith'
user.will_save_change_to_email? #=> false

user.name.slice!(0..3) #=> 'joh '
user.name #=> 'smith'
user.will_save_change_to_email? #=> true
```


## find_in_batches
ブロック引数は配列

```ruby
Profile.order(id: :desc).limit(100).find_in_batches(batch_size: 10) do |profile|
  p profile.size => 10
  p profile.class => array
end
```


## ?(Rails >= 5.0)

`present? && self != 0` か？

```ruby
profile.job_id = 0
profile.job_id? #=> false

profile.job_id = 1
profile.job_id? #=> true

profile.job_id = -1
profile.job_id? #=> true
```


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
