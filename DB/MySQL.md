## datetimeやdateに足す
use `DATE_ADD` .

```sql
insert into points (
  user_id,
  full_amount,
  expired_at,
  created_at,
  updated_at
)
values (
  523839,
  30,
  30,
  select DATE_ADD(NOW(),INTERVAL 3 MONTH),
  NOW(),
  NOW()
)
```

## warnings が見たいとき
`show warnings;` を叩くか `--show-warnings` をつけて起動するか、my.cnfに書く。

```sql
> show warnings;
```

```sh
$ mysql --show-warnings -uroot -p test
```

```
[mysql]
show-warngins
```

参考
[cl.pocari.org - MySQL の warnings をすぐに表示させる方法](http://cl.pocari.org/2007-10-01-1.html)


## 127.0.0.1で接続できない場合
こう出る。
Sequel Proだと `localhost` で接続できないから困る。

```
Host '127.0.0.1' is not allowed to connect to this MySQL server
```

`127.0.0.1` に接続可能なユーザーを作成する。

```sql
use mysql;
select user, host from mysql.user;
grant all on db_name.* to user_name@'127.0.0.1' identified by 'your_password';
```

参考
- [他のサーバに入れない。MySQLで他のサーバからのアクセスを許可する - ヌキのやる気のないエンジニアブログ](http://d.hatena.ne.jp/editnuki/20110813/1313177077)
- [MySQL :: 外部ホストから接続を許可する [Tipsというかメモ]](http://tm.root-n.com/database:mysql:setup:allow_connect_remote_host)


## rootのパスワードがわからなくなったら
初期パスワードならこれ。

```sh
grep -e 'A temporary password is generated for root@localhost' /var/log/mysqld.log
```

それ以外なら、セーフモードで起動して変更する。

```
# セーフモードで起動
$ mysqld_safe --skip-grant-tables &
$ mysql -u root
```

```sql
-- パスワードを更新
use mysql;
update user set password=PASSWORD("hogehoge") where User='root';
-- MySQL 5.7.6以降だとauthentication_string
-- update user set authentication_string=password("k59XZurA") where User='root';
flush privileges;
quit;
```

```sh
# 再起動
$ service mysqld stop
$ service mysqld start
```

参考
- [MySQLでrootパスワードを忘れた場合の対処方法 | 東京上野のWeb制作会社LIG](https://liginc.co.jp/web/programming/mysql/87393)
- [MySQL 5.7.6でroot用パスワードが変わらなくて困った話 - Qiita](https://qiita.com/gatchan0807/items/7323a5d2dd365308cb94)


## 外部キーやユニークキーなどの確認
```sql
show create table tabal_name
```

参考
[外部キーやユニークキーなどが貼られているか確認 - Webエンジニアの技術メモ　～PHP、SQL、Linuxなど～](http://d.hatena.ne.jp/moroto1122/20130202/1359733525)


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

role - *(all), select, insert, update, delete, create, drop


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
