## command
- docker ps
- docker ps -a
- docker exec -it <container id> /bin/bash
    - 起動中のコンテナで別プロセスを立ち上げる
- docker rm <container id or name>
    - コンテナの削除
- docker rmi <image id or name>
- docker images
- docker build -t <image name> -f <path to dockerfile> .
- docker build --no-cache ...
    - キャッシュなし
- docker buildx prune -f
    - キャッシュの削除
- docker run -it --rm --name <container name> -p <local port>:<container port> <image name or id>
    - `-i` でインタラクティブモード
    - `-t` でttyを使う
    - `--rm` で終了時にコンテナを削除
    - `-p` でポートフォワーディング
        - docker-composeならymlで設定できるが、dockerfile単体では設定できない（EXPOSEだけはできる）
- docker stop <container id or name>
    - コンテナの正常停止
- docker kill <container id or name>
    - コンテナの強制停止


## docker volumeについて
Docker におけるデータ管理 | Docker ドキュメント
https://matsuand.github.io/docs.docker.jp.onthefly/storage/

- ボリュームはホストの `/var/lib/docker/volumes/` に保存される
    - macだとVM上でDockerが動いているため参照できないらしい
- できるだけ名前つきボリュームを使う
    - `docker run --mount type=volume,src=name,dst=/hoge ...` みたいなやつ
        - 古い書き方だと `docker run -v name:/hoge ...` みたいなやつ
    - 匿名ボリュームはコンテナが消えると削除される
        - `docker run -v /hoge ...` みたいなやつ
- バインドマウントは、ソースコードなどを即時共有したいときだけ使うようにする
    - つまり、開発環境用である
    - `docker run --mount type=bind,src=.,dst=/hoge ...` みたいなやつ
        - `src` はバインドマウントの場合はホスト側のディレクトリ
        - `dst` はコンテナ側のディレクトリ
        - 古い書き方だと `docker run -v ./data:/hoge  ...` みたいなやつ
- `--volumes-from <コンテナ名>` とすると、指定したコンテナのマウントと同じようにマウントする

### docker-composeの場合
```yaml
# ...

volumes:
      - type: bind # バインドマウント
        source: .
        target: /app
      - type: volume # ホストにマウントされる
        source: bundle-volume # ボリュームの名前
        target: /usr/local/bundle # コンテナ側の対象ディレクトリ

# ...

volumes:
  bundle-volume:
    driver: local
```
