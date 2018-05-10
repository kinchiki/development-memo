## secret_key_base
cookie生成の時に必要な値らしい。
ecret_key_baseはcookie改ざん防止の鍵。

参考
http://hyottokoaloha.hatenablog.com/entry/2016/02/17/215910

## ディレクトリ内にgenerate
`app/controllers/manage/`に作成
```
rails generate controller manage/○○
```

## cssとjsの読み込み
```
<%= stylesheet_link_tag 'information', :media => 'all' %>
<%= javascript_include_tag 'hoge' %>
```

## concern
共通処理を切り出す

ActiveSupport

- mix-inの複雑な記述を省略できる
- 複雑な依存関係を考えずにすむ


## 特定のディレクトリのfixtureファイルを読み込む
```
rake db:fixtures:load FIXTURES_PATH=ファイルやディレクトリのパス
```
