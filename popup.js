'use strict';

// list of urls to navigate
let urls_list = [
    'https://website.com/page-1',
    'https://website.com/page-2',
    'https://website.com/page-3',
    'https://website.com/page-4',
    'https://website.com/page-5',
];

var tab_title = '';
function display_h1 (results){
    console.log(results);
    // document.querySelector("#id1").innerHTML = "<p>tab title: " + tab_title + "</p><p>dom h1: " + results + "</p>";
    var i =document.createElement("a");
    i.href = results;
    i.download =true;
    document.querySelector("#id1").appendChild(i);
}

// start navigation when #startNavigation button is clicked
startNavigation.onclick = function(element) {
    // query the current tab to find its id
    // chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
    //     for(let i=0; i<urls_list.length; i++) {
    //         // navigate to next url
    //         await goToPage(urls_list[i], i+1, tabs[0].id);
    //
    //         // wait for 5 seconds
    //         await waitSeconds(5);
    //     }
    //
    //     // navigation of all pages is finished
    //     alert('Navigation Completed');
    // });
    chrome.tabs.query({active: true}, function(tabs) {
        var tab = tabs[0];
        tab_title = tab.title;
        chrome.tabs.executeScript(tab.id, {
            code: 'console.log("downloading...11"); \n' +
                  // 'var temp = document.getElementsByClassName("y-yJ5")[0].src;\n' +
                'var srcset = document.getElementsByClassName("y-yJ5")[0].srcset.split(",");\n' +
                'var url_obj = {}\n' +
                'for(i=0;i<srcset.length;i++){\n'+
                    'var ur = srcset[i].split(" ");\n'+
                    'url_obj[ur[1].slice(0,-1)] = ur[0]}\n'+
                'var temp = url_obj[Math.max(...Object.keys(url_obj))]\n'+

                'var a = document.createElement(\'a\');\n' +
                'a.href = temp;\n' +
                'a.target = \'_blank\';\n' +
                '\n' +
                'document.querySelector("body").appendChild(a); \n' +
                'a.click();\n' +
                'a.remove();'
            // code: 'document.querySelector("h2").textContent'
        }, display_h1);
    });
};

async function goToPage(url, url_index, tab_id) {
    return new Promise(function(resolve, reject) {
        // update current tab with new url
        chrome.tabs.update({url: url});

        // fired when tab is updated
        chrome.tabs.onUpdated.addListener(function openPage(tabID, changeInfo) {
            // tab has finished loading, validate whether it is the same tab
            if(tab_id == tabID && changeInfo.status === 'complete') {
                // remove tab onUpdate event as it may get duplicated
                chrome.tabs.onUpdated.removeListener(openPage);

                // fired when content script sends a message
                chrome.runtime.onMessage.addListener(function getDOMInfo(message) {
                    // remove onMessage event as it may get duplicated
                    chrome.runtime.onMessage.removeListener(getDOMInfo);

                    // save data from message to a JSON file and download
                    let json_data = {
                        title: JSON.parse(message).title,
                        h1: JSON.parse(message).h1,
                        url: url
                    };

                    let blob = new Blob([JSON.stringify(json_data)], {type: "application/json;charset=utf-8"});
                    let objectURL = URL.createObjectURL(blob);
                    chrome.downloads.download({ url: objectURL, filename: ('content/' + url_index + '/data.json'), conflictAction: 'overwrite' });
                });

                // execute content script
                chrome.tabs.executeScript({ file: 'script.js' }, function() {
                    // resolve Promise after content script has executed
                    resolve();
                });
            }
        });
    });
}

// async function to wait for x seconds
async function waitSeconds(seconds) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, seconds*1000);
    });
}

// var srcset = document.getElementsByClassName("y-yJ5")[0].srcset.split(",");
// var url_obj = {}
//
// for(i=0;i<srcset.length;i++){
//     var ur = srcset[i].split(" ");
//     url_obj[ur[1].slice(0,-1)] = ur[0];
// }
// var temp = url_obj[Math.max(...Object.keys(url_obj))]
