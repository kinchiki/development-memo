## docker-compose を使ってる場合のエラー
コンテナのDBに接続するようにする

```env
DB_HOST=mysql
```

```sh
$ php artisan migrate

In Connection.php line 664:

  SQLSTATE[HY000] [2002] No such file or directory (SQL: select * from information_schema.tables where table_schema
   = pict_portfolio and table_name = migrations)


In Connector.php line 67:

  SQLSTATE[HY000] [2002] No such file or directory
```

reference  
[Get mysql error when deploy laravel project with Docker - Stack Overflow](https://stackoverflow.com/questions/41546422/get-mysql-error-when-deploy-laravel-project-with-docker)
