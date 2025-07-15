# 🛡️ PhishGuard – Real-Time Phishing Link Detector (Chrome Extension)

PhishGuard is a lightweight, frontend-only Chrome extension that **detects phishing or malicious links** in real time using the **VirusTotal API**. It scans every visible hyperlink on the webpages you visit and alerts users with a popup if a potentially dangerous URL is found.

No backend, no tracking, just client-side security 🔒

---

## 🚀 Features

- ✅ **Real-time scanning** of all `<a href="">` links on page load and DOM updates
- 🔍 **VirusTotal API** integration for threat intelligence
- ⚠️ **Instant popup alerts** for suspicious/malicious links
- ⚙️ **Background script architecture** to handle CORS and API keys
- 🧠 Fully built using **Manifest V3 + Vanilla JavaScript**
- 🧩 No user data is tracked or stored – privacy first

---

## 🖼️ Screenshot

<img width="1901" height="1025" alt="Screenshot 2025-07-15 144458" src="https://github.com/user-attachments/assets/26c9aae1-d9b1-4d2c-ab14-c930e02eb70e" /> 
*A phishing alert triggered by VirusTotal detection*

---

## 🛠️ Tech Stack

- JavaScript (ES6)
- Chrome Extensions (Manifest V3)
- VirusTotal Public API v3
- HTML/CSS for popup design

---

## 🧪 How It Works

1. On every page load (or link DOM change), the extension scans all visible links.
2. Each link is:
   - **Encoded and sent to VirusTotal API** for threat analysis
   - (Optional) You can add PhishTank as a second layer
3. If a link is marked **malicious or phishing**, a warning popup appears with:
   - Link details
   - Threat source (e.g., VirusTotal)
   - Malicious score
   - Action button to ignore or close

---

## 🔐 VirusTotal API Setup

This extension uses a **public VirusTotal API key**, which you must provide manually.

### 📌 Steps:
1. Get your free key from: [https://virustotal.com](https://virustotal.com)
2. Open `background.js`
3. Replace the placeholder:
```js
const vtApiKey = 'YOUR_API_KEY_HERE';
```

**⚠️ DO NOT SHARE YOUR API KEY IN PUBLIC REPOS.**

---

## 📦 Installation (Developer Mode)

1. Clone or download this repo
2. Go to `chrome://extensions/`
3. Enable **Developer mode** (top right)
4. Click **"Load unpacked"** and select this folder
5. Visit any site to test live link detection

---

## 📁 File Structure

```
📦 phishguard-extension
├── background.js         // Handles VirusTotal API call
├── content.js            // Scans links & shows alerts
├── manifest.json         // Manifest V3 config
├── popup.html/css/js     // (Optional) Extension popup UI
├── icons/                // 16x16, 48x48, 128x128 icons
└── screenshots/          // For documentation/screenshots
```

---

## 🧠 Ideas for Future Enhancements

- Add **PhishTank** as a second API source
- Add **whitelist/blacklist** feature for users
- Customize popup UI (animations, themes)
- Export alert logs to local file
- Add "Report False Positive" button

---

## 👨‍💻 Author

**Vansh Devgun**  
Cybersecurity Enthusiast | Chrome Extension Dev  
[LinkedIn](https://www.linkedin.com/in/devgunvansh/)
[GitHub](https://github.com/vansh-devgun)

---

## 📄 License

This project is licensed under the MIT License.
