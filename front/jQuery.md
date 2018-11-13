## val()でchangeイベントは発火しない (val() doesn't raise change event)
`.trigger('change',[true])` がいいらしい。

参考
[jQueryのval()で値を変更してもchangeイベントは発火しない - Qiita（↑はコメント）](https://qiita.com/foo9/items/51ffdaa5305fbc4efa58)


## 要素追加 ( add element )
- append() その要素内の中に要素追加
- prepend() その要素内の先頭に要素追加
- after() その要素の後ろに要素追加
- before() その要素の前に要素追加
- wrap() その要素を囲うように要素追加（該当する要素分複数追加）
- wrapAll() その要素全体を囲うように要素追加（一つのみ）

参考
[jQueryを利用したDOM操作 要素の追加メソッドまとめ - Qiita](https://qiita.com/nekoneko-wanwan/items/227ccad5f8cc449e91e9)


## 要素削除 ( delete element )
- remove() 小要素ごと削除
- empty() 小要素を削除
- unwrap()  親要素を削除
- detach() 削除した要素を再利用する

参考
[jQueryでDOM要素を削除する：remove(), empty(), unwrap(), detach() | UX MILK](https://uxmilk.jp/10889)


## 要素取得 ( get elememnt)
- find()
- parent()
- parents
- child()
- children()
