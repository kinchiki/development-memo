## コマンドメモ
### リスンしているポートとプロセス
`ss -tuln`

`0.0.0.0:22` だと、全IPから受け付けている。
`127.x.x.x` はループバックアドレスで、そのサーバーからしかアクセスできない。

検索
`ss -tuln | grep 80`

どのプロセスがポートを使っているか
`sudo ss -tulnp`

## DNSレコード
| 種別 | 必須 | 説明 |
|---|:-:|---|
| A | 必須 | ipv4 |
| AAAA | - | ipv6 DSNサーバーが対応している必要あり |
| CNAME | - | エイリアス |

Aを設定しないとつながらない

## ホスト名とipアドレスの対応付けが記述されているファイル
localhostなどはこれを見ればどこを向いているかわかる。

`/etc/hosts`


## ssh接続したらWARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!が出る時
以下のコマンドでアップデートする

```
$ ssh-keygen -R 対象HOST(IPアドレス)
```

OS再インストールやホスト名付け替えをするとこんな注意が出るようになることがある。

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ECDSA key sent by the remote host is
***************************************************
Please contact your system administrator.
Add correct host key in /Users/user-name/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in /Users/user-name/.ssh/known_hosts
Password authentication is disabled to avoid man-in-the-middle attacks.
Keyboard-interactive authentication is disabled to avoid man-in-the-middle attacks.
```

### 参考
- https://qiita.com/grgrjnjn/items/8ca33b64ea0406e12938
- https://www.uramiraikan.net/Works/entry-1970.html


## 急にsshできなくなる
```
$ ssh -T git@github.com
git@github.com: Permission denied (publickey).
```

解決方法。
`ssh-add` だけではだめだった。

```
$ eval "$(ssh-agent -s)"
$ ssh-add ~/.ssh/id_rsa
```
