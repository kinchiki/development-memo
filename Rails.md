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