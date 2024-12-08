//アクティブなタブで実行するスクリプト
function excecute_content_script() {
  browser.tabs.executeScript({ file: "/scripts/content_script.js" });
}

//ツールバーに表示されたボタンを取得
const dom_button = document.getElementById("dom_button");

//ボタンクリック時すべてのタブでcontent_script.jsを実行
dom_button.addEventListener("click", (e) => {
  browser.tabs.query({}, tabs => {
    tabs.forEach((tab, tabIndex) => {
      // コンテンツスクリプトを実行
      browser.tabs.executeScript(tab.id, {
        file: "/scripts/content_script.js"
      }, () => {
        //アクティブなタブのhtmlを取得
        var plane_html = gethtml(tab.url);
        // tabIndexをcontent_script.jsにメッセージとして送信
        browser.tabs.sendMessage(tab.id, { tabIndex: tabIndex, plane_html: plane_html });
      });
    });
  });
});

//アクティブなタブのhtmlを取得
function gethtml(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send();
  return xhr.responseText;
}