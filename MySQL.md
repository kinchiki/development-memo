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
