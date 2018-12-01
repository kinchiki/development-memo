## export default と export の違い
export default ~ はimportする際にimport対象を指定しなくていい。

### export
```js
// func.js
export function func1() {
    // ~~
}
export function func2() {
    // ~~
}

// hoge.js
import { func1, func2 } from './func';
func1();
func2();

// or
import * as funcs from './func';
funcs.func1();
funcs.func2();
```

### export default
```js
// func.js
export default function func1() {
    // ~~
}

// hoge.js
import func from './func';
func(); // func.jsのfunc1が呼ばれる
```

### アンチパターン
Tree-Shakingどうのこうのでコードが増えるらしい。

```js
// func.js
export default {
    func1() {
        //
    },
    func2() {
        //
    }
}

// hoge.js
import funcs from './func';
funcs.func1();
funcs.func2();
```

### 参考
- [ES6のexportについて - Qiita](https://qiita.com/senou/items/a2f7a0f717d8aadabbf7)
- [JavaScriptのexport defaultアンチパターンについて、検証してみた - Qiita](https://qiita.com/genshun9/items/4a00aa6c709b9f024821)
- [ES6でexportとexport defaultをどう使い分ければいいの？ - なっく日報](https://yukidarake.hateblo.jp/entry/2015/08/11/210227)
