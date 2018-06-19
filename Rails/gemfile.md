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
