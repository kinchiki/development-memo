## ファイルアップロードでfailed (13: Permission denied)
アプリケーションでファイルをアップロードしたら、このようなエラーが出る。

```sh
open() "/var/lib/nginx/tmp/client_body/0000000003" failed (13: Permission denied)
```

`/var/lib/nginx` 配下のオーナーが、nginxの実行ユーザーと異なるため。

`/etc/nginx/nginx.conf` の `user` に合わせる。

```
sudo chown -R xxx:xxx /etc/nginx
```
