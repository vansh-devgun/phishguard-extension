document.getElementById('scan-now').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        alert("PhishGuard is rescanning this page...");
        window.dispatchEvent(new Event('load'));
      }
    });
  });
});
