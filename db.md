## バックアップとリストア
http://weblabo.oscasierra.net/mysql-mysqldump-01/

## 内部結合
```
SELECT カラム名1, カラム名2, ... FROM テーブル名１
  INNER JOIN テーブル名2 ON 結合の条件
```

「テーブル1からカラム1、カラム2を取ってきた後に、結合の条件に従ってテーブル2からも値を取得し、ひっつけて１つのテーブルにしてくださいね」的な

`FROM`のあとからは()でくくられてるイメージ。
```
SELECT column1, column2, ... FROM table１
  INNER JOIN (table2 ON table1.columnX = table2.columnY)
```

`table1とtable2`の両方に存在するカラムから`table1.columnX = table2.columnY`を満たすレコードだけ取る


## 外部結合
外部結合は左右それぞれのテーブルの指定したカラムの値が一致するレコードに加えてどちらかのテーブルにしか存在しないデータについても取得します


## update
一般的なかたち
```
update テーブル名 set カラム = 値 where 条件
```

## LIKE
- % 任意の文字列（なしも含む）
- _ 任意の一文字

`NOT LIKE`で含まない
