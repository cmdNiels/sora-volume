document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('volume-slider');

    // Load saved volume and initialize slider
    chrome.storage.local.get(['soraVolume'], ({ soraVolume = 50 }) => {
        slider.value = soraVolume;
    });

    // Update volume on slider change
    slider.addEventListener('input', () => {
        const volume = slider.value / 100;
        chrome.storage.local.set({ soraVolume: parseInt(slider.value, 10) });
        
        // Apply to current tab
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            if (tab) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: (vol) => {
                        const videos = document.querySelectorAll('video');
                        videos.forEach(video => video.volume = vol);
                    },
                    args: [volume]
                });
            }
        });
    });
});
