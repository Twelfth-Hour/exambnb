chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.create({ url: "src/index.html" });
});
