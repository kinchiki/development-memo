## 変数 ( variable )
MySQLだけかも

`@variable` で変数を設定できる。

```sql
set @start_date = '2020-02-10', @end_date = '2020-02-20', @end_date_1_day_ago = date_sub(@end_date, interval 1 day);
select @start_date, @end_date, @end_date_1_day_ago;

select
    *
from
    users
where
    created_at between @start_date and @end_date
;

## 週次（yyyy/mm/dd (w)形式）
MySQLだけかも

```sql
date_format(created_at - interval weekday(created_at) day, '%Y/%m/%d (%a)')
```

## datetimeやdateに時間を足したり引いたり
use `date_add` or `date_sub`.

```sql
insert into users (
  user_id,
  created_at,
  updated_at
)
values (
  1,
  select date_add(now(),interval 3 month), -- 今より3ヶ月後
  select date_add(now(),interval 3 month) -- 今より3ヶ月後
)
```

## カラムや外部キーなどの確認
### テーブルとカラム一覧
MySQLだけかも

```sql
-- table 一覧
show tables;
-- use していなかったら
show tables from database_name;

-- カラム 一覧
describe [table_name];
-- or
show columns from [table_name];

-- テーブルとカラム一覧
use information_schema;
select [table_name], [column_name] from columns where table_schema='database_name';
```


### 外部キーやユニークキー
MySQLだけかも

```sql
show create table [tabal_name];
```

参考
[外部キーやユニークキーなどが貼られているか確認 - Webエンジニアの技術メモ　～PHP、SQL、Linuxなど～](http://d.hatena.ne.jp/moroto1122/20130202/1359733525)


## インデックスが貼られているかの確認
MySQLだけかも

```
show index from [tabal_name];
```

[MySQLでインデックスが貼られているかを確認するSQL - Qiita](https://qiita.com/pugiemonn/items/2edf5d7967fb45dd5196)

## unixtimeの日数の差
60 / 60 / 24 で割れば、日数になる

```sql
select
    from_unixtime(users.reg_date)
    , from_unixtime(us.reg_date)
    , format( ((us.reg_date - user.reg_date) / 60 / 60 / 24), 1) as '会員登録からの日数'
from
    users
    inner join user_subscriptions as us
        on us.user_id = users.id
;
```



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
重複を除外してデータ取得

```sql
SELECT DISTINCT name FROM goods;
```

nameカラムの重複するデータは除外して取得

allは重複含めて全て取得
