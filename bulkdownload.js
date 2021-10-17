
function instaBulkDonloadClicked(data,tab){
    console.log(data);
    console.log(tab);
    chrome.tabs.executeScript(tab.id, {
        code: 'console.log("add image to list"); \n ' +
            'bulk_download();'

        // code: 'document.querySelector("h2").textContent'
    }, function (result) {
        console.log(result)
    });


};


chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "id": "InstaImageBulkDownload",
        "title": "Insta Image add to download queue",
        "contexts": ["selection","link","image","all"]
    });


    chrome.contextMenus.onClicked.addListener(instaBulkDonloadClicked);
});



