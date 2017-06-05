## 2つ以上前のコミットメッセージを編集する
```
git rebase -i HEAD~x
```
x前までのコミットがエディタで開くので、編集したコミットの`pick`を`edit`(eだけでもOK)に変更して保存終了。

```
git commit --amend
```

してコミットメッセージを編集したら

```
git rebase --continue
```

して終了。

## 未追跡ファイルを削除（コミット後の編集を消す）
動作確認
```
git clean -n
```

実行
```
git clean -f
```



## 追跡ブランチ削除
```
git branch -d -r origin/消すブランチ
```


## stash
一時退避

リスト表示
ハッシュ、コミットメッセージはstash時のHEADのもの
```
git stash list
```

変更内容も見れる
```
git stash list -p
```

詳しく見る
```
git stash show <stash名>
```

復活させる
```
git stash apply stash@{番号}
```

stash削除
```
git stash drop <stash名>
```

変更の復活と削除
```
git stash pop stash@{番号}
```

変更復活を取り消す
```
git stash show <適用したstash名> -p | git apply -R
```



## 直前のコミットに戻る（コミット後の変更を消す）
```
git reset --hard HEAD
```


## git addした後に変更点を見る
```
git diff --cached
```

## addの取り消し
- `git reset [ファイルパス]`
- `git rm --cached [ファイルパス]`

ファイルパスの省略でインデックスのファイル全て



## リモーリポジトリの変更
```
git remote set-url origin アドレス
git push -u origin master
```

`git push`だけだと弾かれる


## bitbucketでホスティング
`ユーザー名.bitbucket.org` というリポジトリを作成。
プライベートで可。

`https://ユーザー名.bitbucket.io/`でアクセス。

参考  
[意外と知られていない、BitbucketでもGithub PagesのようにWebページを公開 :) - Qiita](http://qiita.com/n0bisuke/items/8576456f2e329cb1df45)

[Free Hosting at BitBucket / hg tip](http://hgtip.com/tips/beginner/2009-10-13-free-hosting-at-bitbucket/)


## push
- u 追跡オプション `git pusn -u origin MJ-xxx`


## commitの取り消し、打ち消し
<http://qiita.com/shuntaro_tamura/items/06281261d893acf049ed>

```
取り消してコードも取り消し前に戻す
git reset --hard HEAD~1

取り消してコードはそのまま
git reset --soft HEAD~1

打ち消し（コミット履歴が残る）
git revert ハッシュ値
```


## コンフリクトの解消
### rebase
作業ブランチで

```
git rebase プルリク先のブランチ
```

conflictを直してadd
git rebase --continue か
git rebase --skip

git diffでコンフリクト箇所がわかる

`git rebase --abort` でrebase前に巻き戻せる

**なんか死んでpullしたときとかは、git commitだけのコンフリクト解消コミットをする**
