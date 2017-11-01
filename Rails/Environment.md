## couldn't find file 'webpack-bundle' with type 'application/javascript' で死ぬ
### 結論
こんな感じのコマンド叩けばよい？

```npm run build:development```

### 探り方
`package.json` の `scripts` 見る

例えば以下
```json
  "scripts": {
    "postinstall": "cd client && npm install",
    "rails-server": "bundle exec foreman start -f Procfile.dev",
    "hot-dev": "bundle exec foreman start client -f Procfile.hot && bundle exec foreman start -f Procfile.hot -m all=1,client=0",
    "test": "rspec",
    "eslint": "eslint client/Couplink/libs/"
  },
```

`Procfile.dev` の `client` を見る

例えば以下
```
client: sh -c 'rm app/assets/webpack/* || true && cd client && npm run build:development'
```

`client/package.json` の `scripts` 見る

例えば以下
```
  "scripts": {
    "build:test": "webpack --config webpack.config.js",
    "build:production": "NODE_ENV=production webpack --config webpack.config.js",
    "build:development": "webpack -w --config webpack.config.js",
    "build:development:once": "webpack --config webpack.config.js",
    "build:hot": "webpack-dev-server --config webpack.hot.config --progress",
    "test": "jest",
    "test:watch": "npm test -- --watch"
  },
```


## imagemagick をアップデートして rmagick を入れ直す
### 画像アップロードが失敗する（エラー画面にはならない）
```
Filename Failed to manipulate with rmagick, maybe it is not an image? Original Error: unable to load module `/usr/local/Cellar/imagemagick@6/6.9.8-10/lib/ImageMagick//modules-Q16/coders/jpeg.la': file not found @ error/module.c/OpenModule/1290
```

### imagemagick オプション込みで入れ直し（これはやらなくてよいかも）
```
& brew install imagemagick@6 --build-from-source
```

### rmagick 入れ直し
```
$ bundle exec uninstall rmagick
$ PKG_CONFIG_PATH=/usr/local/opt/imagemagick@6/lib/pkgconfig bundle install --path vendor/bundle
```

#### もし bundle exec uninstall rmagick が失敗したら
以下で動いた。

```
$ gem update --system
$ gem update
```


## imagemagick をアップデートしてエラー
`brew upgrade` で imagemagick@6 をアップデートしたら `rails s` がエラーになった。

imagemagick のバージョンを落とす。

brew switch

もしアンインストールしていたら、gitのコミットを戻す。

```
Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/activesupport-5.0.3/lib/active_support/dependencies.rb:293:in `require': dlopen(/Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/rmagick-2.16.0/lib/RMagick2.bundle, 9): Library not loaded: /usr/local/opt/imagemagick@6/lib/libMagickWand-6.Q16.4.dylib (LoadError)
  Referenced from: /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/rmagick-2.16.0/lib/RMagick2.bundle
  Reason: image not found - /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/rmagick-2.16.0/lib/RMagick2.bundle
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/activesupport-5.0.3/lib/active_support/dependencies.rb:293:in `block in require'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/activesupport-5.0.3/lib/active_support/dependencies.rb:259:in `load_dependency'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/activesupport-5.0.3/lib/active_support/dependencies.rb:293:in `require'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/rmagick-2.16.0/lib/rmagick_internal.rb:12:in `<top (required)>'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/activesupport-5.0.3/lib/active_support/dependencies.rb:293:in `require'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/activesupport-5.0.3/lib/active_support/dependencies.rb:293:in `block in require'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/activesupport-5.0.3/lib/active_support/dependencies.rb:259:in `load_dependency'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/activesupport-5.0.3/lib/active_support/dependencies.rb:293:in `require'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/rmagick-2.16.0/lib/rmagick.rb:1:in `<top (required)>'
	from /Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler/runtime.rb:91:in `require'
	from /Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler/runtime.rb:91:in `block (2 levels) in require'
	from /Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler/runtime.rb:86:in `each'
	from /Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler/runtime.rb:86:in `block in require'
	from /Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler/runtime.rb:75:in `each'
	from /Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler/runtime.rb:75:in `require'
	from /Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler.rb:107:in `require'
	from /Users/akito.mizuno/couplink/config/application.rb:13:in `<top (required)>'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/railties-5.0.3/lib/rails/commands/commands_tasks.rb:88:in `require'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/railties-5.0.3/lib/rails/commands/commands_tasks.rb:88:in `block in server'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/railties-5.0.3/lib/rails/commands/commands_tasks.rb:85:in `tap'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/railties-5.0.3/lib/rails/commands/commands_tasks.rb:85:in `server'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/railties-5.0.3/lib/rails/commands/commands_tasks.rb:49:in `run_command!'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/railties-5.0.3/lib/rails/commands.rb:18:in `<top (required)>'
	from bin/rails:4:in `require'
	from bin/rails:4:in `<main>'
```

シンボリックリンク `libMagickWand-6.Q16.4.dylib` を作成したらまたエラー

```
/Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler/runtime.rb:94:in `rescue in block (2 levels) in require': There was an error while trying to load the gem 'rmagick'. (Bundler::GemRequireError)
Gem Load Error is: This installation of RMagick was configured with ImageMagick 6.9.8 but ImageMagick 6.9.9-0 is in use.

Backtrace for gem load error is:
/Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/activesupport-5.0.3/lib/active_support/dependencies.rb:293:in `require'
/Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/activesupport-5.0.3/lib/active_support/dependencies.rb:293:in `block in require'
/Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/activesupport-5.0.3/lib/active_support/dependencies.rb:259:in `load_dependency'
/Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/activesupport-5.0.3/lib/active_support/dependencies.rb:293:in `require'
/Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/rmagick-2.16.0/lib/rmagick_internal.rb:12:in `<top (required)>'
/Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/activesupport-5.0.3/lib/active_support/dependencies.rb:293:in `require'
/Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/activesupport-5.0.3/lib/active_support/dependencies.rb:293:in `block in require'
/Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/activesupport-5.0.3/lib/active_support/dependencies.rb:259:in `load_dependency'
/Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/activesupport-5.0.3/lib/active_support/dependencies.rb:293:in `require'
/Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/rmagick-2.16.0/lib/rmagick.rb:1:in `<top (required)>'
/Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler/runtime.rb:91:in `require'
/Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler/runtime.rb:91:in `block (2 levels) in require'
/Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler/runtime.rb:86:in `each'
/Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler/runtime.rb:86:in `block in require'
/Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler/runtime.rb:75:in `each'
/Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler/runtime.rb:75:in `require'
/Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler.rb:107:in `require'
/Users/akito.mizuno/couplink/config/application.rb:13:in `<top (required)>'
/Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/railties-5.0.3/lib/rails/commands/commands_tasks.rb:88:in `require'
/Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/railties-5.0.3/lib/rails/commands/commands_tasks.rb:88:in `block in server'
/Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/railties-5.0.3/lib/rails/commands/commands_tasks.rb:85:in `tap'
/Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/railties-5.0.3/lib/rails/commands/commands_tasks.rb:85:in `server'
/Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/railties-5.0.3/lib/rails/commands/commands_tasks.rb:49:in `run_command!'
/Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/railties-5.0.3/lib/rails/commands.rb:18:in `<top (required)>'
bin/rails:4:in `require'
bin/rails:4:in `<main>'
Bundler Error Backtrace:
	from /Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler/runtime.rb:90:in `block (2 levels) in require'
	from /Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler/runtime.rb:86:in `each'
	from /Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler/runtime.rb:86:in `block in require'
	from /Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler/runtime.rb:75:in `each'
	from /Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler/runtime.rb:75:in `require'
	from /Users/akito.mizuno/.rbenv/versions/2.3.1/lib/ruby/gems/2.3.0/gems/bundler-1.14.6/lib/bundler.rb:107:in `require'
	from /Users/akito.mizuno/couplink/config/application.rb:13:in `<top (required)>'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/railties-5.0.3/lib/rails/commands/commands_tasks.rb:88:in `require'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/railties-5.0.3/lib/rails/commands/commands_tasks.rb:88:in `block in server'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/railties-5.0.3/lib/rails/commands/commands_tasks.rb:85:in `tap'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/railties-5.0.3/lib/rails/commands/commands_tasks.rb:85:in `server'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/railties-5.0.3/lib/rails/commands/commands_tasks.rb:49:in `run_command!'
	from /Users/akito.mizuno/couplink/vendor/bundle/ruby/2.3.0/gems/railties-5.0.3/lib/rails/commands.rb:18:in `<top (required)>'
	from bin/rails:4:in `require'
	from bin/rails:4:in `<main>'
```