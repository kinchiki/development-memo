## renderとpartial
`render '◯◯'`
とかだったら同じフォルダのpartial（ファイル名が`_◯◯`）を呼び出す

## renderとredirect_to
### render
アクションを経由しない。
インスタンス変数を書き換えたくないときなどに使用。

### redirect/to
アクションを経由する


## attribute
カラムをセット

updateなどで更新

```
obj.attributes = params[:model]
```

<http://qiita.com/tyamagu2/items/8abd93bb7ab0424cf084>


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


## スマホからlocalに接続
1. 同じWifiに接続
1. `PCのIPアドレス:3000`を直打ち
