
console.log("Content script loaded");

// main.jsからtabIndexを受け取る
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  var tabIndex = message.tabIndex + 1;
  var plane_html = message.plane_html;
  console.log("tabIndex received:", tabIndex);
  //tabindexを二桁の0埋め文字列に変換
  tabIndex = ("00" + tabIndex).slice(-2);
  // メッセージを受け取った後にhtml_download関数を呼び出す
  html_download(tabIndex, plane_html);
});

// main関数
function html_download(tabIndex, plane_html) {
console.log("html_download called");
  var html = new HtmlElement(tabIndex);
  var download = new Download(html.html, html.title);
  var plane_download = new Download(plane_html, 'plane_' + html.title);
  console.log(html.html);
}

// htmlの各要素を持つクラス
class HtmlElement {
  constructor(tabIndex) {
    this._html = document.getElementsByTagName("html")[0];
    this.html = this.doctype + '\n' + this._html.outerHTML;
    this.title = tabIndex + '_' + this._html.getElementsByTagName("title")[0].innerHTML;
    console.log("HtmlElement created:", this.html, this.title);
  }
  //doctypeのタグを取得
  get doctype() {
    var node = document.doctype;
    var doctype = "<!DOCTYPE "
      + node.name
      + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '')
      + (!node.publicId && node.systemId ? ' SYSTEM' : '')
      + (node.systemId ? ' "' + node.systemId + '"' : '')
      + '>';
    return doctype;
  }
}

// ダウンロードに関するクラス
class Download {
  constructor(_download_text, _download_file_name) {
    // テキストファイルとしてダウンロードするテキストの中身
    this.text = _download_text;
    // ダウンロードするテキストファイルの名前
    this.download_file_name = _download_file_name;
    console.log("Download created:", this.text, this.download_file_name);
    this.download();
  }

  download = () => {
    var blob = new Blob([this.text], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    // ダウンロードリンクを作成
    var a = document.createElement('a');
    a.href = url;
    a.download = this.download_file_name + '.html';
    a.style.display = 'none';
    document.body.appendChild(a);
    // リンクをクリックしてダウンロードを開始
    a.click();
    document.body.removeChild(a);
    console.log("Download initiated");
  }
}


