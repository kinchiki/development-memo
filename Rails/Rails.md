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


## rmagickをアップデートしてエラー
rmagickのバージョンを落とす

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