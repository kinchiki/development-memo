## require: false
Railsが自動で読み込まなくなる。
バッチなどでは手動で `require` すれば読めるようになる。

この場合 `capistrano` 系のgemは自動で読み込まれない。

```rb
group :development do
  gem 'capistrano', '~> 3.10', require: false
  gem 'capistrano-bundler', '~> 1.3', require: false
  gem 'capistrano-rails', '~> 1.3', require: false
  gem 'capistrano-rbenv', '~> 2.1', require: false
  gem 'capistrano3-puma', '~> 3.1', require: false
end
```

### 参考
[Ruby on Rails - Gemfileに書かれるrequire => false とはどういう意味でしょうか？(88151)｜teratail](https://teratail.com/questions/88151)


## バージョン指定
```rb
gem 'hoge' # 最新
gem 'hoge', '2.1.8'  # 2.1.8のみ使う
gem 'hoge', '~> 2.1'  # 2.1.0以上3.0.0未満の最新のものを使用
gem 'hoge', '~> 2.1.8'   # 2.1.8以上2.2.0未満の最新のものを使用
gem 'hoge', '>= 2.1.3'  # 2.1.3以上の最新のものを使う
```

### 参考
[セマンティック・バージョニングと、Gemfileのバージョン指定方法 - Gemfileでよく見る`~>`を使いこなす - Qiita](https://qiita.com/awakia/items/5745938c192ca1139c63)
