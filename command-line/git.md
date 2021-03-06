## delete remote branch
上の方法はgitのバージョンが古いとできない

```
$ git push --delete origin <branch_name>
# or old way
$ git push origin :branch_name
```

参考
[Git/git push/リモートブランチの削除 - yanor.net/wiki](http://yanor.net/wiki/?Git%2Fgit%20push%2F%E3%83%AA%E3%83%A2%E3%83%BC%E3%83%88%E3%83%96%E3%83%A9%E3%83%B3%E3%83%81%E3%81%AE%E5%89%8A%E9%99%A4)

## ローカルの特定ファイルを管理対象外にする
```sh
# リポジトリの更新を取り込む方法
$ git update-index --assume-unchanged <fila_name>
$ git update-index --no-assume-unchanged <fila_name>

# リポジトリの更新を取り込まない方法
$ git update-index --skip-worktree <fila_name>
$ git update-index --no-skip-worktree <fila_name>
```

参考
https://qiita.com/usamik26/items/56d0d3ba7a1300625f92


## find てきなやつ
`ls-files` を使う。

```sh
$ git ls-files '*hogehoge*'
```


## 別ブランチの特定ファイルだけマージ
```sh
# ファイル確認
$ git show <ブランチ名>:<ファイル名>

# 取ってくる
$ git checkout <ブランチ名> -- <ファイル名>

# ディレクトリを取ってくる
$ git checkout <ブランチ名> <ディレクトリ名>
```

### 参考
[Git 1ファイルだけ別のブランチから持ってくる - Qiita](https://qiita.com/oret/items/b646fcada9d89ed308c4)


## master ブランチ以外削除
grepでmaster以外を除外してxargsで削除。
mergeされていないものも含むなら-Dオプションで。

```
$ git branch | grep -v master | xargs git branch -d
```

## 複数cherry_pick
左が古いコミット。
**古いコミットハッシュのコミットは含まれず、その次のコミットからcheryy-pickされる**。
もし左のコミット自体を含めたい場合、 `^` をつける。

```
$ git cherry-pick commitA..commitB

# commitAも含める場合
$ git cherry-pick commitA^..commitB
```


## 複数revert
nオプションでcommitせずにすむ

```
$ git revert -n <commit hash>
$ git revert -n <commit hash>
$ git revert -n <commit hash>
$ git commit
```

## remoteの追加、変更、削除
[参考](https://qiita.com/colorrabbit/items/15ee0127cfe9ca5760a8)

### add
```
$ git remote add github <remote-repositry-url>
```

### change
```
$ git remote set-url origin <remote-repositry-url>
```

### delete
```
$ git remote rm <remote-name or url>(未確認)
```

### 確認
```
# `.git/config` の `remote` を見たり -v つけたり
$ cat .git/confing
$ git remote -v
```


## なにも変更していないのになぜか git pull が失敗
### 原因
`git update-index --skip-worktree` したファイルがremoteの差分に含まれているとエラーになる。

```
$ git pull
error: Your local changes to the following files would be overwritten by checkout:
	config/environments/development.rb
Please commit your changes or stash them before you switch branches.
Aborting

$ git status
On branch master
Your branch is up-to-date with 'origin/master'.

nothing to commit, working tree clean

$ git stash
No local changes to save
```

適当にブランチを作り、対象ファイルを削除してコミットしたらできる。

```
$ git co -b hoge
$ git rm 対象ファイル
$ git commit -am なんかコメント
$ git co master
$ git pull # 成功！
```


## 間違えてプルリクをmasterにマージしてしまいrevertしたとき
マージ元 topic
本来のマージ先 release-x.x
master topicをrevert済み
とする

↓は若干違うかも

```
$ git checkout topic
$ git checkout [topicの最初のコミットの一つ前のコミットハッシュ]
$ git checkout -b topic_2
$ git merge --squash topic
$ git push -u origin topic_2
```

これで`topic_2`を`release-x.x`にマージ先としてプルリクを作成する。
そうすれば`master`に`topic`の差分が生まれる。

↓でよいかも？

```
$ git rebase -i HEAD~x
まとめる最後のpickをsquashに変更
$ git push -f
```


## git add -p
- y：このハンクをステージングする
- n：スキップする
- q：終了する
- a：以降のハンクをすべてステージングする
- d：以降のハンクをすべてスキップする
- g：指定したハンクへ移動
- /：正規表現によるハンクの検索
- j：未確定な前のハンクへ移動する
- J：前のハンクへ移動する
- k：未確定な次のハンクへ移動する
- K：ハンクへ移動する
- s：ハンクを分割する
- e：手動で現在のハンクを修正する
- ?：ヘルプを表示する

## ファイルの変更の削除
```
$ git checkout -- ファイル
```

↑のコマンドは`git status`に出てくる


## 2つ以上前のコミットを編集する
```
$ git rebase -i HEAD~x
```

x前までのコミットがエディタで開くので、編集したコミットの`pick`を`edit`(eだけでもOK)に変更して保存終了。
修正したいファイルを編集して add する。commit messeageを編集したい場合はなにもせず次。

```
$ git commit --amend
```

してcommitを更新したら

```
$ git rebase --continue
$ git push -f
```

して終了。


## 未追跡ファイル・ディレクトリを削除
削除ファイル確認

```
$ git clean -nd
```

ファイルのみ削除

```
$ git clean -f
```

ディレクトリも削除

```
$ git clean -df
```

パスを第一引数に指定するとそのパス内のみ。


## 追跡ブランチ削除
```
$ git branch -d -r origin/消すブランチ
```


## stash
一時退避

```
# 変更ファイル退避
$ git stash

# 名前をつけて保存
$ git stash save 'メッセージ'

# リスト表示
# ハッシュ、コミットメッセージはstash時のHEADのもの
$ git stash list

# 変更内容を全て見る
$ git stash list -p

# 該当stashの詳細
$ git stash show <stash名>

# 変更の復活と削除
$ git stash pop stash@{番号}

# stash削除
$ git stash drop <stash名>

# 全て削除
$ git stash clear

# 復活させる
$ git stash apply stash@{番号}

# 変更復活を取り消す
$ git stash show <適用したstash名> -p | git apply -R
```

### zshの場合
zshはstashを指定するときにシングルクォーテーションやダブルクォーテーションで囲むか、`{`と`}`をバックスラッシュでエスケープしないとエラーになります。

```
'stash@{x}'
"stash@{x}"
stash@\{x\}
```

これはエラー

```
$ git stash drop stash@{x}
=> stash@x is not a valid reference
```


## git addした後に変更点を見る
```
$ git diff --cached
```

## addの取り消し
- `git reset [ファイルパス]`
- `git rm --cached [ファイルパス]`

ファイルパスの省略でインデックスのファイル全て


## bitbucketでホスティング
`ユーザー名.bitbucket.org` というリポジトリを作成。
プライベートで可。

`https://ユーザー名.bitbucket.io/`でアクセス。

参考
[意外と知られていない、BitbucketでもGithub PagesのようにWebページを公開 :) - Qiita](http://qiita.com/n0bisuke/items/8576456f2e329cb1df45)

[Free Hosting at BitBucket / hg tip](http://hgtip.com/tips/beginner/2009-10-13-free-hosting-at-bitbucket/)


## push
- u 追跡オプション `git pusn -u origin カレントブランチ名`


## commitの取り消し、打ち消し
<http://qiita.com/shuntaro_tamura/items/06281261d893acf049ed>

```
取り消してコードも取り消し前に戻す
$ git reset --hard HEAD~1

取り消してコードはそのまま
$ git reset --soft HEAD~1

打ち消し（コミット履歴が残る）
$ git revert ハッシュ値
```


## コンフリクトの解消
### rebase
作業ブランチで

```
$ git rebase プルリク先のブランチ
```

conflictを直してadd
`git rebase --continue` か `git rebase --skip`

$ git diffでコンフリクト箇所がわかる

`git rebase --abort` でrebase前に巻き戻せる

最後は `git push -f`

**なにか死んでpullしたときなどは、git commitだけのコンフリクト解消コミットをする**

### merge
merge先のブランチをトピックブランチにmergeする。

```
$ git merge <merge先ブランチ>
```

コンフリクトが発生したら、解消して `git commit -m 'fixed conflict'` などとコミットすればよい。


## リモートで消えたブランチをローカルからも消す
```
$ git fetch --prune
```
