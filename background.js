
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "someId",
    title: "run Foo",
    contexts: ["editable"],
    documentUrlPatterns: ["https://github.com/*"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == "someId") {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: doThing
    });
  }
});

function doThing(){
  document.title = "Foo ran!";
  console.log("foo really ran");
}

function runInTab(tabId){
  chrome.scripting.executeScript({
    target: {tabId},
    func: doThing
  });
}

chrome.commands.onCommand.addListener((command, tab) => {
  if (command == "foo") {
    runInTab(tab.id);
  }
});
chrome.action.onClicked.addListener((tab) => {
  runInTab(tab.id);
});