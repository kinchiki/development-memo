```sh
$ yum remove [package_name] # package_nameアンインストール
$ yum list installed # インストール一覧
$ yum list updates # アップデート可能一覧
$ yum search [package_name] # 検索 概要表示
$ yum info [package_name] # 詳細情報表示
```

## 外部(?)リポジトリ
`/etc/yum.repos.d/` に該当リポジトリの設定ファイルで `enabled=1` だとデフォルトでオン。

`enabled=0` なら `yum --enablerepo=remi install [paclage_name]` みたいにする。

`yum repolist` でリポジトリ表示。


## パッケージグループ
```
$ yum -v grouplist # グループリスト
$ yum groupremove [group_name] # グループ削除 パッケージも消える？
