const vtApiKey = 'a87874f732faad72264517a05961216a6580be77433f48d38388fa3cf94fae50';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'check-url') {
    const encodedUrl = btoa(message.url).replace(/=+$/, '');
    fetch(`https://www.virustotal.com/api/v3/urls/${encodedUrl}`, {
      headers: {
        'x-apikey': vtApiKey
      }
    })
      .then(response => response.json())
      .then(data => sendResponse({ data }))
      .catch(error => {
        console.error('VirusTotal request failed', error);
        sendResponse({ error: true });
      });

    return true; // keeps message channel open for async response
  }
});

