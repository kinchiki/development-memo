# centOS7セッティング

## fish
参考（公式）
https://software.opensuse.org/download.html?project=shells%3Afish%3Arelease%3A2&package=fish

```sh
$ sudo yum -y install wget
$ cd /etc/yum.repos.d/
$ wget https://download.opensuse.org/repositories/shells:fish:release:2/CentOS_7/shells:fish:release:2.repo
$ sudo yum -y install fish
```

## sudoでパスワードを求められるまでの時間設定
root権限の `visudo` コマンドが `/etc/sudoers` を編集するコマンド。

```sh
$ sudo visudo
```

```sh
# Defaults env_resetの下にDefaults timestamp_timeout=時間(m)を記載
# 15分に設定する場合
Defaults    env_reset
Defaults    timestamp_timeout=15
```

## nginx
### 1 nginxのリポジトリを追加する
`/etc/yum.repos.d/nginx.repo` に以下を記載

```
$ sudo vim /etc/yum.repos.d/nginx.repo
```

`OS` は `centos`, `OSRELEASE` は `7` を指定

```
[nginx]
name=nginx repo
# baseurl=http://nginx.org/packages/OS/OSRELEASE/$basearch/
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=0
enabled=1
```

これでも設定ファイルを落とせるらしい。

```sh
sudo rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

### 2 yum install
```sh
sudo yum -y install nginx
```
