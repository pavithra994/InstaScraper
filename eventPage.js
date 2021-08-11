function instaRightClicked(data,tab){
console.log(data);
console.log(tab);
    chrome.tabs.executeScript(tab.id, {
        code: 'console.log("downloading...11"); \n ' +
            'insta_right_click();'
            
        // code: 'document.querySelector("h2").textContent'
    }, function (result) {
        console.log(result)
    });


};


chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "id": "InstaImage",
        "title": "Insta Image Open",
        "contexts": ["selection","link","image","all"]
    });


    chrome.contextMenus.onClicked.addListener(instaRightClicked);
});
