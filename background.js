'use strict';

// activate extension when host is www.website.com
chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'www.instagram.com'},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.directive) {
            case "popup-click":
                console.log("hi");
                // console.log(img_arr);
                // execute the content script
                chrome.tabs.executeScript(null, { // defaults to the current tab
                    file: "contentscript.js", // script to inject into page and run in sandbox
                    allFrames: true // This injects script into iframes in the page and doesn't work before 4.0.266.0.
                });
                sendResponse({}); // sending back empty response to sender
                break;
            default:
                // helps debug when request directive doesn't match
                alert("Unmatched request of '" + request + "' from script to background.js from " + sender);
        }
    }
);

