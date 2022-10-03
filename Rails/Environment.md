## An error occurred while installing ffi
how to resolve

run below command.

```sh
LDFLAGS="-L/usr/local/opt/libffi/lib" PKG_CONFIG_PATH="/usr/local/opt/libffi/lib/pkgconfig" bundle install --path vendor/bundle
```

happen `Gem::Ext::BuildError: ERROR: Failed to build gem native extension.`

```sh
An error occurred while installing ffi (1.10.0), and Bundler cannot continue.
Make sure that `gem install ffi -v '1.10.0' --source 'https://rubygems.org/'` succeeds before bundling.

In Gemfile:
  selenium-webdriver was resolved to 3.141.0, which depends on
    childprocess was resolved to 0.9.0, which depends on
      ffi
         run  bundle exec spring binstub --all
bundler: command not found: spring
Install missing gem executables with `bundle install`
```

reference

- https://github.com/ffi/ffi/issues/651#issuecomment-434927135
- [gem ffi のインストールに失敗するときのコンパイラオプション指定方法 - Qiita](https://qiita.com/ts-3156/items/cb2aba33e0bd9d088f4f)

## スマホからlocalに接続
1. `rails s -b 0.0.0.0`
1. 同じWifiに接続
1. `PCのIPアドレス:3000`を直打ち


## rmagick, ruby-filemagic error 2022/10/03
### 解決策
```sh
$ brew install imagemagick@6 pkg-config libmagic
# export PATH="/usr/local/opt/imagemagick@6/bin:$PATH" 以下2つだけでよい？
$ export LDFLAGS="-L/usr/local/opt/imagemagick@6/lib"
$ export CPPFLAGS="-I/usr/local/opt/imagemagick@6/include"
```
### error
```sh
Installing rmagick 4.2.2 with native extensions
Gem::Ext::BuildError: ERROR: Failed to build gem native extension.

    current directory: /Users/akito.mizuno/src/mj/mj2/vendor/bundle/ruby/2.5.0/gems/rmagick-4.2.2/ext/RMagick
/Users/akito.mizuno/.rbenv/versions/2.5.1/bin/ruby -r ./siteconf20221003-85337-1bdy2q7.rb extconf.rb
checking for brew... yes
checking for Ruby version >= 2.3.0... yes
checking for pkg-config... yes
Package MagickCore was not found in the pkg-config search path.
Perhaps you should add the directory containing `MagickCore.pc'
to the PKG_CONFIG_PATH environment variable
No package 'MagickCore' found


ERROR: Can't install RMagick 4.2.2.
Can't find the ImageMagick library or one of the dependent libraries.
Check the mkmf.log file for more detailed information.


*** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of necessary
libraries and/or headers.  Check the mkmf.log file for more details.  You may
need configuration options.

Provided configuration options:
	--with-opt-dir
	--without-opt-dir
	--with-opt-include
	--without-opt-include=${opt-dir}/include
	--with-opt-lib
	--without-opt-lib=${opt-dir}/lib
	--with-make-prog
	--without-make-prog
	--srcdir=.
	--curdir
	--ruby=/Users/akito.mizuno/.rbenv/versions/2.5.1/bin/$(RUBY_BASE_NAME)

To see why this extension failed to compile, please check the mkmf.log which can be found here:

  /Users/akito.mizuno/src/mj/mj2/vendor/bundle/ruby/2.5.0/extensions/x86_64-darwin-21/2.5.0/rmagick-4.2.2/mkmf.log

extconf failed, exit code 1

Gem files will remain installed in /Users/akito.mizuno/src/mj/mj2/vendor/bundle/ruby/2.5.0/gems/rmagick-4.2.2 for inspection.
Results logged to /Users/akito.mizuno/src/mj/mj2/vendor/bundle/ruby/2.5.0/extensions/x86_64-darwin-21/2.5.0/rmagick-4.2.2/gem_make.out

An error occurred while installing rmagick (4.2.2), and Bundler cannot continue.
Make sure that `gem install rmagick -v '4.2.2' --source 'https://rubygems.org/'` succeeds before bundling.
```

```sh
An error occurred while installing ruby-filemagic (0.7.2), and Bundler cannot continue.
```

## Nokogiri Error
公式ページに解決方法が載っているのでそれを見る。
[Installing Nokogiri - Nokogiri 鋸](http://www.nokogiri.org/tutorials/installing_nokogiri.html)


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


## rmagickでrails sがこける
```sh
$ bundle exec gem uninstall rmagick
$ PKG_CONFIG_PATH=/usr/local/opt/imagemagick@6/lib/pkgconfig bundle install --path vendor/bundle
```


## 画像アップロードが失敗する（エラー画面にはならない）
### ログ
```sh
Filename Failed to manipulate with rmagick, maybe it is not an image? Original Error: unable to load module `/usr/local/Cellar/imagemagick@6/6.9.8-10/lib/ImageMagick//modules-Q16/coders/jpeg.la': file not found @ error/module.c/OpenModule/1290
```

imagemagick をアップデートして rmagick を入れ直す

### imagemagick オプション込みで入れ直し（これは別にやらなくてよい）
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

多分間違えて `bundle exec uninstall rmagick (gemが抜けている)` としていただけで、失敗することはないと思う。


## imagemagick をアップデートしてエラー
`brew upgrade` で imagemagick@6 をアップデートしたら `rails s` がエラーになった。

おそらく解決はこれだけでよい

```sh
$ bundle exec gem uninstall rmagick
$ PKG_CONFIG_PATH=/usr/local/opt/imagemagick@6/lib/pkgconfig bundle install --path vendor/bundle
```

### imagemagick のバージョンを落とす解決方法
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


## ovirt-engine-sdk でエラー(fogの依存関係？)
centosなら libcurl-devel, libxml2-devel を入れればOK

```
$ sudo yum -y install gcc libcurl-devel libxml2-devel redhat-rpm-config
```

githubに必要パッケージが記載されている
https://github.com/oVirt/ovirt-engine-sdk-ruby

### エラー

```sh
current directory:
bundle/ruby/2.5.0/gems/ovirt-engine-sdk-4.2.4/ext/ovirtsdk4c
/usr/local/rbenv/versions/2.5.1/bin/ruby -r ./siteconf20180508-2914-g8l0i3.rb
extconf.rb
checking for xml2-config... yes
checking for curl-config... no
*** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of necessary
libraries and/or headers.  Check the mkmf.log file for more details.  You may
need configuration options.

Provided configuration options:
	--with-opt-dir
	--without-opt-dir
	--with-opt-include
	--without-opt-include=${opt-dir}/include
	--with-opt-lib
	--without-opt-lib=${opt-dir}/lib
	--with-make-prog
	--without-make-prog
	--srcdir=.
	--curdir
	--ruby=/usr/local/rbenv/versions/2.5.1/bin/$(RUBY_BASE_NAME)
	--with-libcurl-config
	--without-libcurl-config
	--with-pkg-config
	--without-pkg-config
extconf.rb:40:in `<main>': The "libcurl" package isn't available. (RuntimeError)

To see why this extension failed to compile, please check the mkmf.log which can
be found here:

bundle/ruby/2.5.0/extensions/x86_64-linux/2.5.0-static/ovirt-engine-sdk-4.2.4/mkmf.log

extconf failed, exit code 1

Gem files will remain installed in
bundle/ruby/2.5.0/gems/ovirt-engine-sdk-4.2.4 for
inspection.
Results logged to
bundle/ruby/2.5.0/extensions/x86_64-linux/2.5.0-static/ovirt-engine-sdk-4.2.4/gem_make.out

An error occurred while installing ovirt-engine-sdk (4.2.4), and Bundler cannot
continue.
Make sure that `gem install ovirt-engine-sdk -v '4.2.4'` succeeds before
bundling.

In Gemfile:
  fog was resolved to 2.0.0, which depends on
    fog-ovirt was resolved to 1.0.3, which depends on
      ovirt-engine-sdk
```


## rails s や c でエラー
```
/usr/local/rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/bundler-1.16.1/lib/bundler/runtime.rb:84:in `rescue in block (2 levels) in require': There was an error while trying to load the gem 'uglifier'. (Bundler::GemRequireError)
Gem Load Error is: Could not find a JavaScript runtime. See https://github.com/rails/execjs for a list of available runtimes.
```

node を入れればOK

以下全文。
`rails c` の出力の方が少なくてわかりやすい。

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


## rails c や puma start で redis で落ちる
`invalid uri scheme '' (ArgumentError)` で落ちる。

環境変数やRailsのコードのRedisのエンドポイントの先頭に `redis://` をつける。

### 参考
[REDIS_URL環境変数は'redis://hostname:6379'のようにスキマー(redis://)を含めるほうが良いお話 - Qiita](https://qiita.com/blueplanet/items/b72be9dc349ec7f15cba)

### エラー
```
$ bin/rails c
Traceback (most recent call last):
	63: from bin/rails:4:in `<main>'
	62: from bundle/ruby/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:283:in `require'
	61: from bundle/ruby/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:249:in `load_dependency'
	60: from bundle/ruby/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:283:in `block in require'
	59: from bundle/ruby/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:29:in `require'
	58: from bundle/ruby/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:20:in `require_with_bootsnap_lfi'
	57: from bundle/ruby/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/loaded_features_index.rb:65:in `register'
	56: from bundle/ruby/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:21:in `block in require_with_bootsnap_lfi'
	55: from bundle/ruby/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:21:in `require'
	54: from bundle/ruby/2.5.0/gems/railties-5.2.0/lib/rails/commands.rb:18:in `<main>'
	53: from bundle/ruby/2.5.0/gems/railties-5.2.0/lib/rails/command.rb:46:in `invoke'
	52: from bundle/ruby/2.5.0/gems/railties-5.2.0/lib/rails/command/base.rb:65:in `perform'
	51: from bundle/ruby/2.5.0/gems/thor-0.20.0/lib/thor.rb:387:in `dispatch'
	50: from bundle/ruby/2.5.0/gems/thor-0.20.0/lib/thor/invocation.rb:126:in `invoke_command'
	49: from bundle/ruby/2.5.0/gems/thor-0.20.0/lib/thor/command.rb:27:in `run'
	48: from bundle/ruby/2.5.0/gems/railties-5.2.0/lib/rails/commands/console/console_command.rb:95:in `perform'
	47: from bundle/ruby/2.5.0/gems/railties-5.2.0/lib/rails/command/actions.rb:18:in `require_application_and_environment!'
	46: from bundle/ruby/2.5.0/gems/railties-5.2.0/lib/rails/application.rb:337:in `require_environment!'
	45: from bundle/ruby/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:283:in `require'
	44: from bundle/ruby/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:249:in `load_dependency'
	43: from bundle/ruby/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:283:in `block in require'
	42: from bundle/ruby/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:29:in `require'
	41: from bundle/ruby/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:20:in `require_with_bootsnap_lfi'
	40: from bundle/ruby/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/loaded_features_index.rb:65:in `register'
	39: from bundle/ruby/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:21:in `block in require_with_bootsnap_lfi'
	38: from bundle/ruby/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:21:in `require'
	37: from config/environment.rb:7:in `<main>'
	36: from bundle/ruby/2.5.0/gems/railties-5.2.0/lib/rails/application.rb:361:in `initialize!'
	35: from bundle/ruby/2.5.0/gems/railties-5.2.0/lib/rails/initializable.rb:60:in `run_initializers'
	34: from /usr/local/rbenv/versions/2.5.1/lib/ruby/2.5.0/tsort.rb:205:in `tsort_each'
	33: from /usr/local/rbenv/versions/2.5.1/lib/ruby/2.5.0/tsort.rb:226:in `tsort_each'
	32: from /usr/local/rbenv/versions/2.5.1/lib/ruby/2.5.0/tsort.rb:347:in `each_strongly_connected_component'
	31: from /usr/local/rbenv/versions/2.5.1/lib/ruby/2.5.0/tsort.rb:347:in `call'
	30: from /usr/local/rbenv/versions/2.5.1/lib/ruby/2.5.0/tsort.rb:347:in `each'
	29: from /usr/local/rbenv/versions/2.5.1/lib/ruby/2.5.0/tsort.rb:349:in `block in each_strongly_connected_component'
	28: from /usr/local/rbenv/versions/2.5.1/lib/ruby/2.5.0/tsort.rb:415:in `each_strongly_connected_component_from'
	27: from /usr/local/rbenv/versions/2.5.1/lib/ruby/2.5.0/tsort.rb:415:in `call'
	26: from bundle/ruby/2.5.0/gems/railties-5.2.0/lib/rails/initializable.rb:50:in `tsort_each_child'
	25: from bundle/ruby/2.5.0/gems/railties-5.2.0/lib/rails/initializable.rb:50:in `each'
	24: from /usr/local/rbenv/versions/2.5.1/lib/ruby/2.5.0/tsort.rb:421:in `block in each_strongly_connected_component_from'
	23: from /usr/local/rbenv/versions/2.5.1/lib/ruby/2.5.0/tsort.rb:431:in `each_strongly_connected_component_from'
	22: from /usr/local/rbenv/versions/2.5.1/lib/ruby/2.5.0/tsort.rb:422:in `block (2 levels) in each_strongly_connected_component_from'
	21: from /usr/local/rbenv/versions/2.5.1/lib/ruby/2.5.0/tsort.rb:350:in `block (2 levels) in each_strongly_connected_component'
	20: from /usr/local/rbenv/versions/2.5.1/lib/ruby/2.5.0/tsort.rb:228:in `block in tsort_each'
	19: from bundle/ruby/2.5.0/gems/railties-5.2.0/lib/rails/initializable.rb:61:in `block in run_initializers'
	18: from bundle/ruby/2.5.0/gems/railties-5.2.0/lib/rails/initializable.rb:32:in `run'
	17: from bundle/ruby/2.5.0/gems/railties-5.2.0/lib/rails/initializable.rb:32:in `instance_exec'
	16: from bundle/ruby/2.5.0/gems/railties-5.2.0/lib/rails/engine.rb:613:in `block in <class:Engine>'
	15: from bundle/ruby/2.5.0/gems/railties-5.2.0/lib/rails/engine.rb:613:in `each'
	14: from bundle/ruby/2.5.0/gems/railties-5.2.0/lib/rails/engine.rb:614:in `block (2 levels) in <class:Engine>'
	13: from bundle/ruby/2.5.0/gems/railties-5.2.0/lib/rails/engine.rb:656:in `load_config_initializer'
	12: from bundle/ruby/2.5.0/gems/activesupport-5.2.0/lib/active_support/notifications.rb:170:in `instrument'
	11: from bundle/ruby/2.5.0/gems/railties-5.2.0/lib/rails/engine.rb:657:in `block in load_config_initializer'
	10: from bundle/ruby/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:277:in `load'
	 9: from bundle/ruby/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:249:in `load_dependency'
	 8: from bundle/ruby/2.5.0/gems/activesupport-5.2.0/lib/active_support/dependencies.rb:277:in `block in load'
	 7: from bundle/ruby/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:50:in `load'
	 6: from bundle/ruby/2.5.0/gems/bootsnap-1.3.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:50:in `load'
	 5: from config/initializers/redis.rb:3:in `<main>'
	 4: from config/initializers/redis.rb:3:in `new'
	 3: from bundle/ruby/2.5.0/gems/redis-4.0.1/lib/redis.rb:38:in `initialize'
  1 # .bashrc
	 2: from bundle/ruby/2.5.0/gems/redis-4.0.1/lib/redis.rb:38:in `new'
	 1: from bundle/ruby/2.5.0/gems/redis-4.0.1/lib/redis/client.rb:79:in `initialize'
bundle/ruby/2.5.0/gems/redis-4.0.1/lib/redis/client.rb:415:in `_parse_options': invalid uri scheme '' (ArgumentError)
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
