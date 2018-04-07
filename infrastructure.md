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
