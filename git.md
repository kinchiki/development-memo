## stash
一時退避

リスト表示
```
git stash list
```

変更内容も見れる
```
git stash list -p
```

変更の復活と削除
```
git stash pop
```



## 直前のコミットに戻る（コミット後の変更を消す）
```
git reset --hard HEAD
```


## git addした後に変更点を見る
```git diff --cached```

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
