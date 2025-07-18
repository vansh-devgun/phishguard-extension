const vtApiKey = 'YOUR_VT_API_KEY_HERE'; // Replace with your actual key when running locally

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

