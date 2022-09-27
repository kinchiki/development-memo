## resource
```hcl
resource "resourceの種類" "resource名" {

}
```

## terraform_remote_state
https://www.terraform.io/language/state/remote-state-data

他のterraform構成の出力を利用するためのもの

別フォルダのtfstateファイルのoutputを参照するdataブロック


## outout
出力された値をOutput Valuesとして明示的に書いておくと他のModuleさんも使えるようになります。また、OutputはModuleの中に書いてあげる必要があります。
