function addActivity(activity) {
  const divBy = 10;
  if (localStorage.getItem("activities") == null) {
    localStorage.setItem(
      "activities",
      JSON.stringify([
        { ...activity, time: Math.round(new Date().getTime() / divBy) },
      ])
    );
  } else {
    let activities = JSON.parse(localStorage.getItem("activities"));
    activities.push({
      ...activity,
      time: Math.round(new Date().getTime() / divBy),
    });
    localStorage.setItem("activities", JSON.stringify(activities));
  }
}

chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.onActivated.addListener((e) => {
    chrome.tabs.get(e.tabId, (tab) => {
      if (localStorage.getItem("tracking") != null) {
        let message = `Visited ${
          tab.url === "" ? "new tab" : tab.url.split("/")[2]
        } at ${new Date().toLocaleTimeString()}`;
        addActivity({ message, url: tab.url });
      }
    });
  });

  // eslint-disable-next-line no-unused-vars
  chrome.tabs.onCreated.addListener((tab) => {
    if (localStorage.getItem("tracking") != null) {
      const message = `Created a new tab at ${new Date().toLocaleTimeString()}`;
      addActivity({ message, url: "" });
    }
  });

  // eslint-disable-next-line no-unused-vars
  chrome.tabs.onRemoved.addListener((tabId, _) => {
    // eslint-disable-next-line no-unused-vars
    if (localStorage.getItem("tracking") != null) {
      const message = `Removed a tab at ${new Date().toLocaleTimeString()}`;
      addActivity({ message, url: "" });
    }
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (localStorage.getItem("tracking") != null) {
      if (changeInfo.url) {
        const message = `Visited a ${
          changeInfo.url === "" ? "new tab" : changeInfo.url.split("/")[2]
        } at ${new Date().toLocaleTimeString()}`;
        addActivity({ message, url: changeInfo.url });
      } else if (changeInfo.audible) {
        const message = `Audio was fired from ${
          tab.url === "" ? "new tab" : tab.url.split("/")[2]
        } at ${new Date().toLocaleTimeString()}`;
        addActivity({ message, url: tab.url });
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  chrome.downloads.onCreated.addListener((download) => {
    if (localStorage.getItem("tracking") != null) {
      const message = `Downloaded file ${
        download.referrer
      } at ${new Date().toLocaleTimeString()}`;
      addActivity({ message, url: download.url });
    }
  });

  // eslint-disable-next-line no-unused-vars
  chrome.windows.onBoundsChanged.addListener((window) => {
    if (localStorage.getItem("tracking") != null) {
      const message = `Resized a window at ${new Date().toLocaleTimeString()}`;
      addActivity({ message, url: "" });
    }
  });

  // eslint-disable-next-line no-unused-vars
  chrome.windows.onCreated.addListener((window) => {
    if (localStorage.getItem("tracking") != null) {
      const message = `Created a new window at ${new Date().toLocaleTimeString()}`;
      addActivity({ message, url: "" });
    }
  });

  // eslint-disable-next-line no-unused-vars
  chrome.windows.onFocusChanged.addListener((window) => {
    if (localStorage.getItem("tracking") != null) {
      const message = `Switched to a new window at ${new Date().toLocaleTimeString()}`;
      addActivity({ message, url: "" });
    }
  });

  // eslint-disable-next-line no-unused-vars
  chrome.windows.onRemoved.addListener((window) => {
    if (localStorage.getItem("tracking") != null) {
      const message = `Removed a window at ${new Date().toLocaleTimeString()}`;
      addActivity({ message, url: "" });
    }
  });
});
