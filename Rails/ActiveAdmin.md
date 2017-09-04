## 基本
`app/admin` 以下に `model名（単数）.rb` ファイルを配置する。
`CanCanCan` で権限管理をしている場合、 `app/models/ability.rb` で管理。

## コードの書き方
```
ActiveAdmin.register モデル名 do
  # 最初にやるあつ
  before_filter :なんちゃら

  # Strong Parameters みたいなもの。編集フォームで入力できるカラム。
  permit_params :room_type, :pin_message

  # 検索を表示するカラム
  filter :room_type
  filter :pin_message

  # ワンクリックで検索するもの
  scope :event do |rooms| rooms.event end
  # scope(:event, &:event)

  # 一覧に表示するカラム
  index do
    id_column
    column :room_type
    column :pin_message
    column :created_at
    column :updated_at
  end

  # 編集するカラム
  form do |f|
    f.inputs do
      f.input :room_type
      f.input :pin_message
    end
    f.actions
  end
end
```