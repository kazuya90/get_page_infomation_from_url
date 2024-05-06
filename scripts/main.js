function excecute_content_script() {
  browser.tabs
    .executeScript({ file: "/scripts/content_script.js" });
}

const f1 = document.getElementById("function1")

f1.addEventListener("click", (e) => {
  excecute_content_script();
});

