javascript: (function () {
  console.log(('========= start ========='));
  data = data_set();
  console.log(data.join(''));
  if(navigator.clipboard) {
    setTimeout((async() => {
      await navigator.clipboard.writeText(data.join(''));
      alert('コピーしました');
    }), 100);
  }
  console.log(('========= end ========='));

  function data_set() {
    let sheet_data = [];

    /*
      物件名
      document.getElementsByTagName('h1')[0].textContent;
    */
    sheet_data.push(document.getElementsByTagName('h1')[0].textContent);
    sheet_data.push("\t");

    /*
      URL
      location.href.replace(/\?.+/, '');
    */
    sheet_data.push(location.href.replace(/\?.+/, ''));
    sheet_data.push("\t");

    /* 退去日 */
    sheet_data.push(document.querySelectorAll('.data_table.table_gaiyou tr:nth-child(4) > td')[0].innerText.replace(/'/,''));
    sheet_data.push("\t");

    /*
      駅
      sheet_data.push("\t");
    */

    /* 時間 */
    Array.prototype.forEach.call(document.getElementsByClassName('property_view_table-read'), elm => {
      const text = elm.textContent;
      if (text.indexOf('登戸駅') != -1) {
        /* console.log(text.match(/\d+/)[0]); */
        sheet_data.push(text.match(/\d+/)[0]);
      }
    });
    sheet_data.push("\t");

    /*
      階
      document.getElementsByClassName('property_view_table-body')[5].textContent.slice(0, -1);
    */
    sheet_data.push(document.getElementsByClassName('property_view_table-body')[5].textContent.slice(0, -1));
    sheet_data.push("\t");

    /*
      面積
      document.getElementsByClassName('property_view_table-body')[3].textContent.slice(0, -2);
    */
    sheet_data.push(document.getElementsByClassName('property_view_table-body')[3].textContent.slice(0, -2));
    sheet_data.push("\t");

    /*
      主要採光面
      document.getElementsByClassName('property_view_table-body')[6].textContent;
    */
    sheet_data.push(document.getElementsByClassName('property_view_table-body')[6].textContent);
    sheet_data.push("\t");

    /* 家賃 管理費*/
    let elm_yatin = document.querySelectorAll('.property_view_note-list span');
    let yatin = Number(elm_yatin[0].textContent.slice(0, -2)) * 10000;
    let kanrihi = Number(elm_yatin[1].textContent.match(/\d+/)[0]);
    /*
      console.log(rent1 + rent2);
    */
    sheet_data.push(yatin);
    sheet_data.push("\t");
    sheet_data.push(kanrihi);
    sheet_data.push("\t");
    sheet_data.push(yatin + kanrihi);
    sheet_data.push("\t");

    /* 敷金 礼金 */
    let elm_shiki_rei = document.querySelectorAll('.property_view_note-list:nth-child(2) span');
    let shikikin = elm_shiki_rei[0].textContent.match(/\d+\.?\d*/);
    /*
      shikikin != null ? shikikin[0] * 10000 : 0;
    */
    sheet_data.push(shikikin != null ? shikikin[0] * 10000 : 0);
    sheet_data.push("\t");

    let reikin = elm_shiki_rei[1].textContent.match(/\d+\.?\d*/);
    /*
      reikin != null ? reikin[0] * 10000 : 0;
    */
    sheet_data.push(reikin != null ? reikin[0] * 10000 : 0);
    sheet_data.push("\t");

    /* 仲介手数料 ほか初期費用 */
    Array.prototype.forEach.call(document.querySelectorAll('.data_table.table_gaiyou .data_01'), elm => {
      const text = elm.textContent;
      if (text.indexOf('仲介手数料') != -1) {
        const tyukai_text = elm.nextElementSibling.innerText.match(/(\d+\.?\d*)ヶ月/);
        sheet_data.push(tyukai_text != null ? Math.floor(yatin * tyukai_text[1]) : 0);
        sheet_data.push("\t");
      }
      if (text.indexOf('ほか初期費用') != -1) {
        /* console.log(elm.nextElementSibling); */
        sheet_data.push(elm.nextElementSibling.innerText.match(/合計(\d+\.?\d*)/)[1] * 10000);
        sheet_data.push("\t");
      }
    });

    return sheet_data;
  }
})();
