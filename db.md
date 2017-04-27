## バックアップとリストア
http://weblabo.oscasierra.net/mysql-mysqldump-01/

## 内部結合
```
SELECT カラム名1, カラム名2, ... FROM テーブル名１
  INNER JOIN テーブル名2 ON 結合の条件
```

「テーブル1からカラム1、カラム2を取ってきた後に、結合の条件に従ってテーブル2からも値を取得し、ひっつけて１つのテーブルにしてくださいね」的な

## update
一般的なかたち
```
update テーブル名 set カラム = 値 where 条件
```
