## reference
- [配列ライクなオブジェクトをforEachするときのイディオム - ぷちてく - Petittech](https://ptech.g.hatena.ne.jp/noromanba/20120521/1337639496)
- [要素の取得方法まとめ - Qiita](https://qiita.com/amamamaou/items/25e8b4e1b41c8d3211f4#documentfragment-%E3%81%A7%E3%81%AF%E4%BD%BF%E3%81%88%E3%82%8B%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%E3%81%8C%E9%99%90%E3%82%89%E3%82%8C%E3%81%A6%E3%81%84%E3%82%8B)
- [JavaScript アロー関数を説明するよ - Qiita](https://qiita.com/may88seiji/items/4a49c7c78b55d75d693b)
- [Node.textContent - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Node/textContent)


## Qiitaのアドベントカレンダーの記事数とユニーク投稿者
```js
const authorHtml = document.getElementsByClassName('adventCalendarCalendar_author');
console.log(authorHtml.length + '記事');
const authors = [];
for(let i = 0; i < authorHtml.length; i++) {
  authors.push(authorHtml[i].innerText);
}
Array.from(new Set(authors));
```

## URLの言語の部分を変える change language at url
```js
javascript: location.href=location.href.replace('en-us','ja');
```

## alertを出し、そこに入力したidでタブを開く
```js
javascript:
const baseUrl = 'https://xxx.zendesk.com/agent/tickets/';
const ticketId = window.prompt('チケットIDを入力（#は不要）', '');
if (ticketId) { window.open(baseUrl + ticketId) };
```

## ランダムに情報を入力
```js
javascript: (function () {
  const rand = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min; const gender = rand(0, 1);
  document.querySelectorAll('[name="gender"]').forEach(elm => elm.checked = Number(elm.value) === gender);
  document.getElementById('birth_year').value = rand(1990, 1999);
  document.getElementById('birth_month').value = rand(1, 12);
  document.getElementById('birth_day').value = rand(1, 28);
  document.getElementById('prefecture').value = rand(1, 47);
}) ();
```

## ちょコム
```js
javascript: (
  function () {
    const card = ['1111', '2222', '3333', '4444'];
    card.forEach((num, i) => {
      document.querySelector(`input[name="CARD${i + 1}"]`).value = num;
    });
    document.getElementById('kiyaku_check').checked = true;
    document.querySelector('select[name="EXPYEAR"]').value = 'yyyy';
    document.querySelector('select[name="EXPMONTH"]').value = 'mm';
    document.querySelector('input[name="CARDNAME"]').value = 'your_cardname';
    document.querySelector('input[name="SECURITY"]').value = '000';
    document.querySelector('input[name="MAIL"]').value = 'your_email@gmail.com';
    document.querySelector('input[name="TEL"]').value = '090-0000-0000';
  }
) ();
