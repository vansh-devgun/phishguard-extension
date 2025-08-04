console.log("🟢 PhishGuard content script loaded");

const scannedUrls = new Set();
const phishTankUrl = 'https://checkurl.phishtank.com/checkurl/';

function checkWithVirusTotal(url) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { type: 'check-url', url },
      (response) => {
        if (chrome.runtime.lastError || response?.error) {
          console.error('VT error from background:', chrome.runtime.lastError || response);
          reject(chrome.runtime.lastError || new Error('VT failed'));
        } else {
          const data = response.data;
          const score = data?.data?.attributes?.last_analysis_stats?.malicious || 0;
          console.log(`VT scanned ${url} - Malicious score: ${score}`);
          if (score > 0) {
            resolve(data);
          } else {
            resolve(null);
          }
        }
      }
    );
  });
}

async function checkWithPhishTank(url) {
  const formData = new URLSearchParams();
  formData.append('url', url);
  formData.append('format', 'json');

  try {
    const response = await fetch(phishTankUrl, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      console.warn("PhishTank request failed");
      return null;
    }

    const data = await response.json();
    const isPhishing = data?.results?.valid && data?.results?.in_database;
    console.log(`PhishTank checked ${url} - Is phishing: ${isPhishing}`);
    return isPhishing ? data : null;
  } catch (err) {
    console.error("PhishTank error:", err);
    return null;
  }
}

function createPopup(link, source, details) {
  console.log("🚨 Creating popup for", link);
  const popup = document.createElement('div');
  popup.innerHTML = `
    <strong>⚠️ Phishing Warning</strong><br>
    Source: ${source}<br>
    Link: ${link}<br>
    <em>${details}</em><br>
    <button id="ignore-btn">Ignore</button>
  `;
  Object.assign(popup.style, {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    background: '#fff3cd',
    color: '#856404',
    border: '1px solid #ffeeba',
    padding: '10px',
    zIndex: 9999,
    fontSize: '14px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)'
  });
  document.body.appendChild(popup);

  popup.querySelector('#ignore-btn').onclick = () => {
    popup.remove();
  };
}

function scanLinks() {
  const links = document.querySelectorAll('a[href]');
  console.log(`🔍 Found ${links.length} links to scan`);

  links.forEach(async (a) => {
    const href = a.href;
    if (scannedUrls.has(href)) return;
    scannedUrls.add(href);

    try {
      const vtResult = await checkWithVirusTotal(href);
      const ptResult = await checkWithPhishTank(href);

      if (vtResult) {
        createPopup(href, "VirusTotal", `Malicious score: ${vtResult.data.attributes.last_analysis_stats.malicious}`);
      } else if (ptResult) {
        createPopup(href, "PhishTank", "Reported phishing site.");
      } else {
        console.log(`✅ Link safe: ${href}`);
      }
    } catch (e) {
      console.error("Error checking phishing URL:", e);
    }
  });
}

// Run scan on page load
window.addEventListener('load', scanLinks);

// Watch for new DOM content (SPAs, dynamic content)
const observer = new MutationObserver(() => {
  setTimeout(scanLinks, 1000);
});
observer.observe(document.body, { childList: true, subtree: true });
