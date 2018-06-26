## 最新データを削除など
名前変えないとエラーになる。
MySQLだけ？

```sql
delete from users where id = (select max(id) from (select id from users) as tmp);
```


## 複数insert
該当カラム以外は決め打ちにして、selectで取ってくればいい。

```sql
INSERT INTO points (
  user_id,
  full_amount,
  created_at,
  updated_at
)
select
  id,
  100,
  NOW(),
  NOW()
from users
WHERE email LIKE 'hogehoge%@gmail.com';
```


## 内部結合
```
SELECT カラム名1, カラム名2, ... FROM テーブル名１
  INNER JOIN テーブル名2 ON 結合の条件
```

「テーブル1からカラム1、カラム2を取ってきた後に、結合の条件に従ってテーブル2からも値を取得し、ひっつけて１つのテーブルにしてくださいね」的な

`FROM`のあとからは()でくくられてるイメージ。

```sql
SELECT column1, column2, ... FROM table１
  INNER JOIN (table2 ON table1.columnX = table2.columnY)
```

`table1とtable2`の両方に存在するカラムから`table1.columnX = table2.columnY`を満たすレコードだけ取る


## 外部結合
外部結合は左右それぞれのテーブルの指定したカラムの値が一致するレコードに加えてどちらかのテーブルにしか存在しないデータについても取得します


## update
一般的なかたち

```sql
update テーブル名 set カラム = 値 where 条件
```


## LIKE
- % 任意の文字列（なしも含む）
- _ 任意の一文字

`NOT LIKE`で含まない


## DISTINCT, ALL
重複業を除外してデータ取得

```sql
SELECT DISTINCT name FROM goods;
```

nameカラムの重複するデータは除外して取得

allは重複含めて全て取得
