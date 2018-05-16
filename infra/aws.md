## AMI
Amazon Machine Image


## Elastic IP
2018/5/9 現在 IPv4のみ対応
関連付けていないIPアドレスはお金がかかるので、割り当てたらすぐに関連付けること。

参考
https://www.agilegroup.co.jp/technote/ec2-elastic-ips.html
https://www.ritolab.com/entry/18


## CloudFront
CDN

### 基本用語
- オリジンサーバ: 配信するオリジナルのファイルを置いておくサーバ
- エッジサーバ: 世界中に設置されている、ユーザへの配信を行うサーバ
- ディストリビューション: オリジンサーバの指定やCloudFrontの各設定、EC2でいうインスタンス
    - S3をオリジンサーバとしてRTMPによるストリーミング動画配信を行う場合のみRTMP
- CloudFrontドメイン: ディストリビューションに付与されるID、ユーザをこのCloudFrontドメインへアクセスさせる

### ディストリビューションの設定
- Origins: オリジンサーバ
- Behaviors: ルール
    - 上から評価される
- Error Pages:
- Restrictions:
- Invalidations: キャッシュの無効化

### キャッシュされているか確認
`Chrome DevTools - Network - Response Headers - x-cache` が Hit from cloudfront か Miss from cloudfront なら動いている。

Missだとオリジンサーバから返ってきている（キャッシュされていない）

`http://[Distribution の Domain Name]/ファイルパス` で表示されるかどうか

### ALBの前にCloudFrontを置く
- キャッシュはしない（させない）が、経路の最適化をするため
    - 3way hand shake が確実に最適化されるらしい
- httpからhttpsへのリダイレクトのため。ALBにはない。


### 参考
- [AWS再入門 Amazon CloudFront編 ｜ Developers.IO](https://dev.classmethod.jp/cloud/cm-advent-calendar-2015-aws-re-entering-cloudfront/)
- [いますぐ使う CloudFront - Qiita](https://qiita.com/sasasin/items/0f0ec1a90af6295589f9)

### 料金
https://aws.amazon.com/jp/cloudfront/pricing/

- データ転送送信量
- HTTP メソッドリクエスト数


## EC2
### 料金
- 時間単位
- 他にも？

### 起動できないときなど
デタッチして他のインスタンスにアタッチしたらなんとかなるかも。
ログやメッセージが見れる。

### 自動起動＆終了
インスタンスの AutoStart, AutoStop を `True` にする。
時間は Colud Watch で設定。

他にもやり方はいろいろある。


## RDS
ec2インスタンスから接続できるようセキュリティグループ作成

### AZ
アベイラビリティゾーンのこと。
数拠点に分かれているデータセンターのことをアベイラビリティゾーンと呼ぶ。

パラメータグループでcharacter_set を utf8mb4にしておく

### Multi-AZ
マルチアベイラビリティーゾーンのこと。
冗長構成。
AWS側が自動で親機と子機のデータの同期を取ってくれ、さらに、フェイルオーバー機能を使い、親機に障害があった際に自動で子機に切り替えが行わる。

[5分でわかる「RDS」 | ナレコムAWSレシピ](https://recipe.kc-cloud.jp/archives/7497)

### 料金
- 時間単位
- 他にも？


## ALB
### 手順
1. ターゲットグループ設定
1. インスタンス登録
1. ALB作成
    - セキュリティグループでEC2インスタンスへ接続できるようにする
        - ALBのセキュリティグループを作成してALBに追加
        - EC2インスタンスのセキュリティグループのインバウンドにALBのセキュリティグループを追加

[【新機能】新しいロードバランサー Application Load Balancer（ALB）が発表されました ｜ Developers.IO](https://dev.classmethod.jp/cloud/aws/alb-application-load-balancer/)


- L4 は NetWork
- L7 は HTTP通信 
レイヤー, プロトコルが違う


### 料金
https://aws.amazon.com/jp/elasticloadbalancing/pricing/

- 使用した分のみ


## ElastiCache
インメモリキャッシュ。

- Redis
- Memchached

### 料金
- 時間単位
- 他にも？
