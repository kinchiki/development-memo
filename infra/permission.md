## ユーザー情報
`/etc/passwd`

### 書式
```
ユーザー名:パスワード:ユーザーID:グループID:その他の情報:ホームディレクトリ:シェル
```

パスワードは暗号化されて「/etc/shadow」ファイルに保存されており、「/etc/passwd」上では「x」と表示される。

### 参考
[Linuxのユーザーとグループって何だろう？ (1/2)：“応用力”をつけるためのLinux再入門（10） - ＠IT](http://www.atmarkit.co.jp/ait/articles/1706/02/news014.html)


## グループ情報
`/etc/group`

### 書式
```
グループ名:パスワード:グループID:ユーザーリスト
```

### 参考
[Linuxのユーザーとグループって何だろう？ (1/2)：“応用力”をつけるためのLinux再入門（10） - ＠IT](http://www.atmarkit.co.jp/ait/articles/1706/02/news014.html)
