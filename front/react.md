## props
親の Component A から子の Component B へpropsとして情報を渡すことができる。
このおかげで Components B は状態を持たない Stateless な Compenent として作ることができる。

## setState
stateの更新とrenderを呼ぶふたつの処理。
stateを変えるだけではviewは変わらない（renderされない）。

## container
代表してconnectされにいく親ComponentがContainer

たくさんのComponentがリスト形式で集められているが，各要素のComponent各々で接続すると収拾がつかなくなるので，代表して子要素を抱えるだけの1つの親Componentがconnectされにいく。

componentとstoreを繋ぐのがconnet

こんな感じ。

- M : store
- V : component
- C : Action


アクション呼ぶ
そのアクションのTypeでstateが変わる
returnでstateを返してpropsが変わる
