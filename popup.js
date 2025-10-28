document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('volume-slider');
    const volumeValue = document.getElementById('volume-value');

    // Load saved volume and set video volume
    chrome.storage.local.get(['soraVolume'], ({ soraVolume = 50 }) => {
        slider.value = soraVolume;
        volumeValue.textContent = `${soraVolume}%`;
        updateVideoVolume(soraVolume / 100);
        observeNewVideos(soraVolume / 100); // Observe for new videos
    });

    // Update volume on slider change
    slider.addEventListener('input', () => {
        const volume = slider.value;
        volumeValue.textContent = `${volume}%`;
        chrome.storage.local.set({ soraVolume: parseInt(volume, 10) }); // Ensure value is saved as an integer
        updateVideoVolume(volume / 100);
    });

    // Helper to update video volume
    const updateVideoVolume = (volume) => {
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
    };

    // Observe for new video elements and set their volume
    const observeNewVideos = (volume) => {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            if (tab) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: (vol) => {
                        const observer = new MutationObserver(() => {
                            const videos = document.querySelectorAll('video');
                            videos.forEach(video => video.volume = vol);
                        });

                        observer.observe(document.body, { childList: true, subtree: true });
                    },
                    args: [volume]
                });
            }
        });
    };
});
