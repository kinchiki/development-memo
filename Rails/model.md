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
