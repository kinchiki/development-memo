kubectl コマンドの一般的な形式は、kubectl action resoruce です。
kubectl proxy で、ホストとクラスターの間に接続を確立。クラスター全体のプライベート ネットワークに通信を転送するプロキシを作成できます。


## コンポーネント
以下2つを合わせたKubernetes Clusterと呼ぶ
- Control Planes（コントロールプレーン） マスターノード
    - 別名 Admin, Master
- Nodes（ノード） ワーカーノード 複数
    - 別名 ワーカー
    - kubelet
        - マスターノードとkubeletが通信している
        - 実行されているPodとコンテナを管理
    - kube-proxy
    - コンテナランタイム
        - コンテナを動かす
        - レジストリからコンテナイメージを取得し、コンテナを解凍し、アプリケーションを実行することを担当

## リソース Resource
コンテナを管理するために、OSの機能や仕組みをリソースで抽象化
「実態は、OSの機能を使ってルールを追加しているだけ」

- Node = ワーカーノード
- Pod = コンテナ 複数のコンテナを入れることができる
- Volume = 共有ストレージ
- ReplicaSet = Podのレプリカを作成する。障害時に自動復旧する仕組み。
- Deployment = 複数のReplicaSetを管理し、ローリングアップデートやロールバックなどのデプロイを管理
- Service = Podのエンドポイントの割当やPodへの負荷分散を行う

### Deployment,ReplicaSet
DeploymentはReplicaSetを生成・管理し、ReplicaSetはPodを生成・管理します。
Kubernetes上にDeploymentを作成すると、そのDeploymentはその中にコンテナを持つPodを作成します(コンテナを直接作成するのではなく)。

### Pod
各Podは、スケジュールされているノードに関連付けられており、終了(再起動ポリシーに従って)または削除されるまでそこに残ります。

- コンテナ（のバージョンや使用ポートなどの、コンテナをどう動かすかに
関する情報）
- ネットワーキング
- Volume（共有ストレージ）
Podが最小単位

IPアドレスとポートスペースを共有はできない

Kubernetesクラスター内の各Podは、同じノード上のPodであっても一意のIPアドレスを持っているため、アプリケーションが機能し続けるように、Pod間の変更を自動的に調整する方法が必要です。



## Service
Serviceは、一連のPodにトラフィックをルーティングします。

Serviceは、アプリケーションに影響を与えることなく、KubernetesでPodが死んだり複製したりすることを可能にする抽象概念です。

Kubernetesクラスター内の各Podは、同じノード上のPodであっても一意のIPアドレスを持っているため、アプリケーションが機能し続けるように、Pod間の変更を自動的に調整する方法が必要です。

- ClusterIP
    - クラスター内の内部IPでServiceを公開
    - K8sクラスタ内からのみ疎通可能
- NodePort
    - NATを使用し、K8sクラスタ外からも疎通可能なIP
    - ClusterIPのスーパーセット
- LoadBalancer
    - Serviceに固定の外部IPを割り当てる
    - NodePortのスーパーセットです
    - 外から繋がる仮想IPを払い出すことができる仕組み
- ExternalName
    - externalNameで指定した名前のCNAMEレコードを返すことによって、任意の名前を使ってServiceを公開
    - プロキシは使用されません

エンドポイントの割当=クラスタ内やクラスタの外からの通信のためのIPアドレスの割当

仕様にselectorを定義しないというユースケースがいくつかあります。selectorを指定せずに作成したServiceについて、対応するEndpointsオブジェクトは作成されません。これによって、ユーザーは手動でServiceを特定のエンドポイントにマッピングできます。


## わかりやすい
挫折したエンジニア向け Kubernetesの仕組みをちゃんと理解する (入門/基本編) - YouTube https://www.youtube.com/watch?v=r0NpHb-6IvY
