//アクティブなタブで実行するスクリプト
function excecute_content_script() {
  browser.tabs
    .executeScript({ file: "/scripts/content_script.js" });
}

//ツールバーに表示されたボタンを取得
const f1 = document.getElementById("function1");

//ボタンクリック時すべてのタブでcontent_script.jsを実行
f1.addEventListener("click", (e) => {
  // excecute_content_script();
  var querying = browser.tabs.query({}, tabs => {
    for (let tab of tabs) {
      browser.tabs.update(tab.id, { active: true }, excecute_content_script());
    }
  });
});

