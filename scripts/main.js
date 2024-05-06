function excecute_content_script() {
  browser.tabs
    .executeScript({ file: "/scripts/content_script.js" });
}

function logTabs(tabs) {
  for (let tab of tabs) {
    // tab.url requires the `tabs` permission
    console.log(tab.url);
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}



const f1 = document.getElementById("function1");

f1.addEventListener("click", (e) => {
  excecute_content_script();
  var querying = browser.tabs.query({});
  querying.then(logTabs, onError);
});

