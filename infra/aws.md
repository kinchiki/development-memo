サービス一覧

## AMI
Amazon Machine Image

## Elastic IP
2018/5/9 現在 IPv4のみ対応
関連付けていないIPアドレスはお金がかかるので、割り当てたらすぐに関連付けること。

参考
https://www.agilegroup.co.jp/technote/ec2-elastic-ips.html
https://www.ritolab.com/entry/18

## Cloud front
CDN

## EC2
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

### Multi-AZ
マルチアベイラビリティーゾーンのこと。
冗長構成。
AWS側が自動で親機と子機のデータの同期を取ってくれ、さらに、フェイルオーバー機能を使い、親機に障害があった際に自動で子機に切り替えが行わる。

[5分でわかる「RDS」 | ナレコムAWSレシピ](https://recipe.kc-cloud.jp/archives/7497)
