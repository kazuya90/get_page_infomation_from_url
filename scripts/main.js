//アクティブなタブで実行するスクリプト
function excecute_content_script() {
  browser.tabs
    .executeScript({ file: "/scripts/content_script.js" });
}

//画像をダウンロード
function downloadScreenshot(dataUri, title) {
  let link = document.createElement('a');
  link.href = dataUri;
  link.download = title + '.png';
  link.click();
}


//ツールバーに表示されたボタンを取得
const f1 = document.getElementById("function1");

//ボタンクリック時すべてのタブでcontent_script.jsを実行
f1.addEventListener("click", (e) => {
  // excecute_content_script();
  var querying = browser.tabs.query({}, tabs => {
    for (let tab of tabs) {
      //コンテンツスクリプトを実行
      browser.tabs.update(tab.id, { active: true }, excecute_content_script());
      //画面をキャプチャしてダウンロード
      //高さを取得する
      browser.tabs.executeScript(tab.id, {
        code: 'document.documentElement.scrollHeight'
      }).then(results => {
        let fullHeight = results[0];
        //キャプチャを実行
        browser.tabs.captureTab(
          tab.id, {
          format: 'png',
          rect: { x: 0, y: 0, width: window.screen.width, height: fullHeight }
        }).then(imageUri => {
          // スクリーンショットの画像URIを取得
          downloadScreenshot(imageUri, tab.title);
        });
      });
    }
  });
});


