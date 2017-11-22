## MySQLメモ
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