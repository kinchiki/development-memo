## resource
単一のリソースのみルート定義する。

- indexがない
- show, edit, delete で :id を要求しない


## _url
絶対パスを返す


## format
jsonやhtmlとかそういう話。

デフォルトは `.html`

`format: false` で複数のフォーマットに対応しない。


## controller
urlはresouresに指定したもので、呼び出されるcontrollerはcontrollerに指定したもの。


## as


## scope, module


## collection, member, on
- collection: 複数のリソース
- member: 単一のリソース


## shallow
浅いネスト作成


## concern
共通化
