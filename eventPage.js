// function instaRightClicked(data,tab){
// console.log(data);
// console.log(tab);
//     chrome.tabs.executeScript(tab.id, {
//         code: 'console.log("downloading...11"); \n ' +
//             'insta_right_click();'
//
//         // code: 'document.querySelector("h2").textContent'
//     }, function (result) {
//         console.log(result)
//     });
//
//
// };


chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "id": "InstaImage",
        "title": "Insta Image Open",
        "contexts": ["selection","link","image","all"]
    });


    chrome.contextMenus.create({
        "id": "InstaImageBulkDownload",
        "title": "Insta Image add to download queue",
        "contexts": ["selection","link","image","all"]
    });


    chrome.contextMenus.onClicked.addListener(function (info,tab) {

        if(tab){
            if(info.menuItemId === "InstaImage"){
                chrome.tabs.executeScript(
                    tab.id,
                    {code: 'console.log("insta image downloading..."); \n ' +
                            'insta_right_click();'},
                    function (result) {console.log(result)}
                );
            }
            if(info.menuItemId === "InstaImageBulkDownload"){
                chrome.tabs.executeScript(
                    tab.id,
                    {code: 'console.log("add image to list"); \n ' +
                            'bulk_download();'},
                    function (result) {console.log(result)}
                );
            }
        }

    });
});


//
// chrome.contextMenus.create({
//     "id": "InstaImage",
//     "title": "Insta Image Open",
//     "contexts": ["selection","link","image","all"]
// });
//
