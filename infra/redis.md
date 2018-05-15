
## 手順
centos 6 の場合

```
# インストール
$ cd /usr/local
$ sudo su -
$ wget http://download.redis.io/releases/redis-3.2.10.tar.gz
$ tar xzf redis-3.2.10.tar.gz
$ cd redis-3.2.10
$ make
$ make install
$ rm redis-3.2.10.tar.gz

# /usr/local/bin に redi-cli と redis-serverのシンボリックリンクを張る必要があるかも


# redis 設定ファイル編集
$ mkdir /etc/redis /var/run/redis /var/log/redis
$ cp redis-3.2.10/redis.conf /etc/redis/6379.conf
$ cd /etc/redis
$ vim 6379.conf

# 編集箇所
128 daemonize yes
163 logfile /var/log/redis/redis_6379.log
# 247 dir /var/redis/6379
# 起動スクリプトのデフォルトてきには↓
# 247 dir /var/run
# 多分これにして起動スクリプトのPIDFILE一番いい
247 dir /var/run/redis # ほかのファイルは絶対パス指定でなければ dir 基準？


# 起動スクリプト作成 編集
$ cp -p /usr/local/redis-3.2.10/utils/redis_init_script /etc/init.d/redis # -p コピー元ファイルの属性保存
$ vim /etc/init.d/redis

# 自動起動設定用のコメント, 自前でインストールしたものはこれがないと service redis does not support chkconfig となる
5 # chkconfig: 345 70 15
# もし /etc/redis/6379.conf の pidfile を変えていたら合わせる


# 自動起動設定
$ chkconfig redis on
# service redis does not support chkconfig 出たら設定ファイルにコメント追加
```


```
# サービス一覧 数字はランレベル
$ chkconfig --list
# 自動起動をオン レベル未指定で起動/停止スクリプトの初期値になる
$ sudo chkconfig redis on

# オフにする場合
# chkconfig [--level levels] サービス名 off
# レベル未指定ですべてオフ
$ chkconfig redis off
```

## chkconfigの設定
起動レベル 起動時の優先順位 停止時の優先順位

-だとデフォルト？

```
# chkconfig: 345 70 15
# chkconfig: - 58 74
```

## 参考
- [Redis(公式)](https://redis.io/download)
- [Redisのインストール CentOS6.8 | システムガーディアン株式会社](https://sys-guard.com/post-13267/)
- [Redisインストール〜起動まで - Qiita](https://qiita.com/ono-soic/items/efbbf56fbbc8d4b44a07)
- [Redisのインストール・セットアップ - Qiita](https://qiita.com/KurosawaTsuyoshi/items/f8719bf7c3a10d22a921)
