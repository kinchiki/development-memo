## 複合ユニーク制約
複合インデックスにユニーク制約をつける。
外部キーにも `_id` をつける。

```ruby
def change
  create_table :table_name do |t|
    t.references :user, foreign_key: true, null: false
    t.references :target_user, foreign_key: { to_table: :users }, null: false

    t.timestamps
  end

  add_index :table_name, %i[user_id target_user_id], unique: true
end
```


## 外部キー制約を付けたカラムを変更する
こんなふうに怒られる。

```
Mysql2::Error: Cannot change column 'profile_id': used in a foreign key constraint 'fk_rails_a77d8eb8b1': ALTER TABLE `profile_languages` CHANGE `profile_id` `profile_id` int NOT NULL
```

1. 外部キーを消す
1. カラムを変える
1. 外部キーを再度付ける

```ruby 
remove_foreign_key :profile_languages, :profiles
change_column :profile_languages, :profile_id, :integer, limit: 8, null: false # bigintの場合
add_foreign_key :profile_languages, :profiles, column: :profile_id
```
### 参考
[外部キー制約かけたカラムを削除するのにハマったのでメモ。 - Qiita](https://qiita.com/geshi/items/94ccdd2e5345ee45ae4c)

## change_column時にbigint型のカラムの型指定を間違えてはいけない
```
category: BIGINT
```

これをこんなふうにしたら INT に変わってしまう。

```ruby
change_column :profile_languages, :profile_id, :integer, null: false
```

ただしくはlimitを指定する。8でいいかは知りません。

```ruby
change_column :profile_languages, :profile_id, :integer, null: false
```


## migrationが失敗した際にすべてロールバックしてくれない問題
MySQLは `CREATE TABLE` や `ALTER TABLE` で強制的にトランザクション外となってしまうらしい。

### 対処方法

- DBを直接変更してマイグレーション前の状態に戻してからもう一度migration実行
- マイグレーションファイルから成功した分以外を消しておいて、schema_migrationsに手で追加、残りは別のマイグレーションに回す
- マイグレーションファイルの中で成功した分をコメントアウトしてmigration成功後にコメントアウトを戻す

### 参考
[中途半端なマイグレーション - Qiita](https://qiita.com/jkr_2255/items/962861bf14f4749b992a)
