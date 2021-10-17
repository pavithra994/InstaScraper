chrome.webRequest.onBeforeRequest.addListener(
    function() {
        return {cancel: true};
    },
    {
        urls: ["https://www.instagram.com/*/*/*/like/"]
    },
    ["blocking"]
);


// "*://site.com/test/*",
