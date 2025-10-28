# Sora Volume Extension

Lightweight Chrome extension that allows you to control the volume of the main video on a Sora page using a convenient slider.

## Installation
1. Clone or download this repository.
2. Open `chrome://extensions` (Chrome), `edge://extensions` (Edge), or `about:debugging#/runtime/this-firefox` (Firefox).
3. Enable Developer mode (not needed for Firefox).
4. Click "Load unpacked" (Chrome/Edge) or "Load Temporary Add-on" (Firefox) and select this repository's folder.

## Usage
1. Open a Sora page with a video (URL like `https://sora.chatgpt.com/...`).
2. Click the extension icon in the toolbar to open the volume control slider.
3. Adjust the slider to set the video volume to your desired level.

## Privacy & Permissions
- The extension requests minimal permissions: activeTab, scripting, storage, and host permission for `https://sora.chatgpt.com/*` so it can access the page to control the video volume.
- No data is sent to any server. All work happens locally in your browser.
