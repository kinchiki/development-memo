## Rails基本
`render '◯◯'`
とかだったら同じフォルダの`_◯◯`を呼び出す


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


## concern
共通処理を切り出す

ActiveSupport

- mix-inの複雑な記述を省略できる
- 複雑な依存関係を考えずにすむ


## 特定のディレクトリのfixtureファイルを読み込む
```
rake db:fixtures:load FIXTURES_PATH=ファイルやディレクトリのパス
```