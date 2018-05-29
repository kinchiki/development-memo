## startでエラー
```
Starting MySQL
... ERROR! The server quit without updating PID file (/usr/local/var/mysql/xxx.local.pid).
```

`sudo /usr/local/var/mysql/xxx.local.err` を見るとこんなエラー。

```
/usr/local/Cellar/mysql@5.6/5.6.36_1/bin/mysqld: unknown variable 'default-character
-set=utf8mb4'
```

ということでオフ、というか消しましょう。

```sh
[mysqld]
# default-character-set=utf8mb4
```

## テーブルとカラム一覧取得
```sql
-- tabale 一覧
show tables from database_name;
-- カラム 一覧
show columns from tabale_name;
-- テーブルとカラム一覧
use information_schema;
select table_name, column_name from columns where table_schema='database_name';
```


## バージョン確認
```sql
show variables like 'version%';
-- or
select version();
```

### 注意
`mysql -V` は**クライアントのバージョン**で、サーバーのバージョンではない！


## 権限確認
```sql
show grants;
```


## user 作成
```sql
grant [role] on [DB].[table] to [user]@[host] [identified] by '[password]';

grant all on test_db.* to test_user@'localhost' identified by '[password]';
```

role - select, insert, update, delete, create, drop


## パスワード変更
SET PASSWORD FOR user_name = 'new_password';

## Sequel Pro の エクスポートのチェックボックス
- S: table structure
- C: content
- V: drop table syntax


## 環境構築
### 一度だけ権限変更
```
sudo chown -R _mysql:_mysql /usr/local/var/mysql
```

### 基本
まず起動させる

```
sudo mysql.server start
```


### なんかうまくいかないとき
エラーメッセージの場所に pid 自分でファイル作成

例

```
ERROR! The server quit without updating PID file (/usr/local/var/mysql/○○.local.pid).
↓
sudo touch /usr/local/var/mysql/○○.local.pid
```


## DBのコピー
```
shell> mysqldump db1 > dump.sql
shell> mysqladmin create db2
shell> mysql db2 < dump.sql
```

mysqldump コマンド行に `--databases` は使用してはいけないらしい。
`--databases` を使用すると、ダンプファイルに `USE db1` が含まれ、それによって mysql コマンド行の db2 の指定の効果がオーバーライドされるとのこと。

参考
https://dev.mysql.com/doc/refman/5.6/ja/mysqldump-copying-database.html


## バックアップとリストア
オプションの次にスペースは入れない
http://weblabo.oscasierra.net/mysql-mysqldump-01/

### エクスポート
```
mysqldump -u[ユーザー名] -p[パスワード] -r [バックアップファイル名] --single-transaction [データベース名]
```

### インポート
```
mysql -u[ユーザー名] -p[パスワード] [インポートするデータベース名] < [インポートするファイル名]
```


## databaseのサイズ確認
```
select table_schema, sum(data_length+index_length) /1024 /1024/1024 as GB from information_schema.tables  group by table_schema order by sum(data_length+index_length) desc;
```

参考
http://d.hatena.ne.jp/sho-yamasaki/20120405/1333640589
