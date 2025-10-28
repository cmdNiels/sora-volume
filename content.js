// Apply saved volume to all videos on page load
chrome.storage.local.get(['soraVolume'], ({ soraVolume = 50 }) => {
    const volume = soraVolume / 100;
    setVideoVolume(volume);
    observeNewVideos(volume);
});

// Set volume for all video elements
function setVideoVolume(volume) {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => video.volume = volume);
}

// Observe for new video elements and set their volume
function observeNewVideos(volume) {
    const observer = new MutationObserver(() => {
        setVideoVolume(volume);
    });

    observer.observe(document.body, { childList: true, subtree: true });
}
