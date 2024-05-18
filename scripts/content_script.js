//htmlの各要素を持つクラス
class HtmlElement {
  constructor() {
    this._html = document.getElementsByTagName("html")[0];
    this.html = this._html.outerHTML;
    this.title = this._html.getElementsByTagName("title")[0].innerHTML;
    this._html
  }
}

//画面キャプチャクラス
class Capture {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.setAttributeCanvas();
    this.ctx = this.canvas.getContext("2d");
    this.ctx.drawWindow(window._content, 0, 0, width, height, "rgb(0,0,0)");
    this.appendpage();
  }

  setAttributeCanvas = () => {
    this.canvas.setAttribute("height", window._content.document.height);
    this.canvas.setAttribute("width", window._content.document.width);
  }
  appendpage = () => {
    body = document.getElementsByTagName("body")[0];
    body.append("test");
    console.log(this.canvas);
  }

}

//ダウンロードに関するクラス
class Download {
  constructor(_download_text, _download_file_name) {
    //テキストファイルとしてダウンロードするテキストの中身
    this.text = _download_text;
    //ダウンロードするテキストファイルの名前
    this.download_file_name = _download_file_name;
    this.download();
  }

  download = (text) => {
    var blob = new Blob([this.text], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    // ダウンロードリンクを作成
    var a = document.createElement('a');
    a.href = url;
    a.download = this.download_file_name + '.txt';
    a.style.display = 'none';
    document.body.appendChild(a);
    // リンクをクリックしてダウンロードを開始
    a.click();
  }
}


//DOM構築のため５秒待機
function main() {
  var html = new HtmlElement();
  var download = new Download(html.html, html.title);
  var capture = new Capture();
}
setTimeout(main, 5000);
