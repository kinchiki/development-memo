## スマホからlocalに接続
1. `rails s -b 0.0.0.0`
1. 同じWifiに接続
1. `PCのIPアドレス:3000`を直打ち


## Nokogiri Error
[ここを見る](http://www.nokogiri.org/tutorials/installing_nokogiri.html)


### 解決作1
```sh
$ brew unlink xz
$ gem install nokogiri # or bundle install
$ brew link xz
```

### 解決策2
```sh
$ brew install libxml2
# If using Bundle
$ bundle config build.nokogiri --use-system-libraries --with-xml2-include=$(brew --prefix libxml2)/include/libxml2
$ bundle install
```


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
```sh
client: sh -c 'rm app/assets/webpack/* || true && cd client && npm run build:development'
```

`client/package.json` の `scripts` 見る

例えば以下
```json
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
```sh
Filename Failed to manipulate with rmagick, maybe it is not an image? Original Error: unable to load module `/usr/local/Cellar/imagemagick@6/6.9.8-10/lib/ImageMagick//modules-Q16/coders/jpeg.la': file not found @ error/module.c/OpenModule/1290
```

### imagemagick オプション込みで入れ直し（これはやらなくてよいかも）
```sh
$ brew install imagemagick@6 --build-from-source
```

### rmagick 入れ直し
```
$ bundle exec gem uninstall rmagick
$ PKG_CONFIG_PATH=/usr/local/opt/imagemagick@6/lib/pkgconfig bundle install --path vendor/bundle
```

#### もし bundle exec gem uninstall rmagick が失敗したら
以下で動いた。

```
$ gem update --system
$ gem update
```

多分間違えて `bundle exec uninstall rmagick(gemがない)` としていただけで、失敗することはないと思う。


## imagemagick をアップデートしてエラー
`brew upgrade` で imagemagick@6 をアップデートしたら `rails s` がエラーになった。

imagemagick のバージョンを落とす。

brew switch

もしアンインストールしていたら、gitのコミットを戻す。

```sh
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

```sh
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


## rails s や c でエラー
```
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bundler-1.16.1/lib/bundler/runtime.rb:84:in `rescue in block (2 levels) in require': There was an error while trying to load the gem 'uglifier'. (Bundler::GemRequireError)
Gem Load Error is: Could not find a JavaScript runtime. See https://github.com/rails/execjs for a list of available runtimes.
```

node を入れればOK

以下全文。
`rails c` の方がわかりやすい。

```sh
Traceback (most recent call last):
	45: from bin/rails:3:in `<main>'
	44: from bin/rails:3:in `load'
	43: from /var/www/av-sommelier/sample/bin/spring:15:in `<top (required)>'
	42: from /usr/local/rbenv/versions/2.5.1/lib/ruby/2.5.0/rubygems/core_ext/kernel_require.rb:70:in `require'
	41: from /usr/local/rbenv/versions/2.5.1/lib/ruby/2.5.0/rubygems/core_ext/kernel_require.rb:70:in `require'
	40: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/spring-2.0.2/lib/spring/binstub.rb:31:in `<top (required)>'
	39: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/spring-2.0.2/lib/spring/binstub.rb:31:in `load'
	38: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/spring-2.0.2/bin/spring:49:in `<top (required)>'
	37: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/spring-2.0.2/lib/spring/client.rb:30:in `run'
	36: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/spring-2.0.2/lib/spring/client/command.rb:7:in `call'
	35: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/spring-2.0.2/lib/spring/client/rails.rb:28:in `call'
	34: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/spring-2.0.2/lib/spring/client/rails.rb:28:in `load'
	33: from /var/www/av-sommelier/sample/bin/rails:9:in `<top (required)>'
	32: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:283:in `require'
	31: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:249:in `load_dependency'
	30: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:283:in `block in require'
	29: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:29:in `require'
	28: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:20:in `require_with_bootsnap_lfi'
	27: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/loaded_features_index.rb:65:in `register'
	26: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:21:in `block in require_with_bootsnap_lfi'
	25: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:21:in `require'
	24: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/railties-5.2.0/lib/rails/commands.rb:18:in `<main>'
	23: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/railties-5.2.0/lib/rails/command.rb:46:in `invoke'
	22: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/railties-5.2.0/lib/rails/command/base.rb:65:in `perform'
	21: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/thor-0.20.0/lib/thor.rb:387:in `dispatch'
	20: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/thor-0.20.0/lib/thor/invocation.rb:126:in `invoke_command'
	19: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/thor-0.20.0/lib/thor/command.rb:27:in `run'
	18: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/railties-5.2.0/lib/rails/commands/server/server_command.rb:142:in `perform'
	17: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/railties-5.2.0/lib/rails/commands/server/server_command.rb:142:in `tap'
	16: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/railties-5.2.0/lib/rails/commands/server/server_command.rb:145:in `block in perform'
	15: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:283:in `require'
	14: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:249:in `load_dependency'
	13: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:283:in `block in require'
	12: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:29:in `require'
	11: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:20:in `require_with_bootsnap_lfi'
	10: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/loaded_features_index.rb:65:in `register'
	 9: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:21:in `block in require_with_bootsnap_lfi'
	 8: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:21:in `require'
	 7: from /var/www/av-sommelier/sample/config/application.rb:7:in `<main>'
	 6: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bundler-1.16.1/lib/bundler.rb:114:in `require'
	 5: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bundler-1.16.1/lib/bundler/runtime.rb:65:in `require'
	 4: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bundler-1.16.1/lib/bundler/runtime.rb:65:in `each'
	 3: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bundler-1.16.1/lib/bundler/runtime.rb:76:in `block in require'
	 2: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bundler-1.16.1/lib/bundler/runtime.rb:76:in `each'
	 1: from /usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bundler-1.16.1/lib/bundler/runtime.rb:80:in `block (2 levels) in require'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bundler-1.16.1/lib/bundler/runtime.rb:84:in `rescue in block (2 levels) in require': There was an error while trying to load the gem 'uglifier'. (Bundler::GemRequireError)
Gem Load Error is: Could not find a JavaScript runtime. See https://github.com/rails/execjs for a list of available runtimes.
Backtrace for gem load error is:
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/execjs-2.7.0/lib/execjs/runtimes.rb:58:in `autodetect'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/execjs-2.7.0/lib/execjs.rb:5:in `<module:ExecJS>'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/execjs-2.7.0/lib/execjs.rb:4:in `<main>'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:21:in `require'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:21:in `block in require_with_bootsnap_lfi'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/loaded_features_index.rb:65:in `register'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:20:in `require_with_bootsnap_lfi'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:29:in `require'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:283:in `block in require'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:249:in `load_dependency'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:283:in `require'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/uglifier-4.1.10/lib/uglifier.rb:5:in `<main>'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:71:in `require'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:71:in `block in require_with_bootsnap_lfi'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/loaded_features_index.rb:65:in `register'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:70:in `require_with_bootsnap_lfi'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:79:in `require'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bundler-1.16.1/lib/bundler/runtime.rb:81:in `block (2 levels) in require'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bundler-1.16.1/lib/bundler/runtime.rb:76:in `each'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bundler-1.16.1/lib/bundler/runtime.rb:76:in `block in require'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bundler-1.16.1/lib/bundler/runtime.rb:65:in `each'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bundler-1.16.1/lib/bundler/runtime.rb:65:in `require'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bundler-1.16.1/lib/bundler.rb:114:in `require'
/var/www/av-sommelier/sample/config/application.rb:7:in `<main>'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:21:in `require'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:21:in `block in require_with_bootsnap_lfi'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/loaded_features_index.rb:65:in `register'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:20:in `require_with_bootsnap_lfi'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:29:in `require'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:283:in `block in require'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:249:in `load_dependency'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:283:in `require'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/railties-5.2.0/lib/rails/commands/server/server_command.rb:145:in `block in perform'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/railties-5.2.0/lib/rails/commands/server/server_command.rb:142:in `tap'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/railties-5.2.0/lib/rails/commands/server/server_command.rb:142:in `perform'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/thor-0.20.0/lib/thor/command.rb:27:in `run'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/thor-0.20.0/lib/thor/invocation.rb:126:in `invoke_command'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/thor-0.20.0/lib/thor.rb:387:in `dispatch'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/railties-5.2.0/lib/rails/command/base.rb:65:in `perform'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/railties-5.2.0/lib/rails/command.rb:46:in `invoke'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/railties-5.2.0/lib/rails/commands.rb:18:in `<main>'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:21:in `require'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:21:in `block in require_with_bootsnap_lfi'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/loaded_features_index.rb:65:in `register'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:20:in `require_with_bootsnap_lfi'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:29:in `require'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:283:in `block in require'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:249:in `load_dependency'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:283:in `require'
/var/www/av-sommelier/sample/bin/rails:9:in `<top (required)>'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/spring-2.0.2/lib/spring/client/rails.rb:28:in `load'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/spring-2.0.2/lib/spring/client/rails.rb:28:in `call'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/spring-2.0.2/lib/spring/client/command.rb:7:in `call'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/spring-2.0.2/lib/spring/client.rb:30:in `run'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/spring-2.0.2/bin/spring:49:in `<top (required)>'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/spring-2.0.2/lib/spring/binstub.rb:31:in `load'
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/spring-2.0.2/lib/spring/binstub.rb:31:in `<top (required)>'
/usr/local/rbenv/versions/2.5.1/lib/ruby/2.5.0/rubygems/core_ext/kernel_require.rb:70:in `require'
/usr/local/rbenv/versions/2.5.1/lib/ruby/2.5.0/rubygems/core_ext/kernel_require.rb:70:in `require'
/var/www/av-sommelier/sample/bin/spring:15:in `<top (required)>'
bin/rails:3:in `load'
bin/rails:3:in `<main>'
Bundler Error Backtrace:
```
