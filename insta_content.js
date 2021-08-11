// 'var srcset = document.getElementsByClassName("y-yJ5")[0].srcset.split(",");\n' +
// 'var url_obj = {}\n' +
// 'for(i=0;i<srcset.length;i++){\n'+
// 'var ur = srcset[i].split(" ");\n'+
// 'url_obj[ur[1].slice(0,-1)] = ur[0]}\n'+
// 'var temp = url_obj[Math.max(...Object.keys(url_obj))]\n'+

var img_url_val = null;
var init = true;


document.addEventListener("contextmenu", function(event){
    // console.log(event);
    // console.log(event.path);
    // console.log(event.path[1]);
    try {
        init = false;
        let img = event.path[1].getElementsByTagName('img')[0];
        console.log(img)
        let srcset = img.srcset.split(",");
        let url_o = {};
        let url_l = "";
        for (let i = 0; i < srcset.length; i++) {
            url_l = srcset[i].split(" ");
            url_o[url_l[1].slice(0, -1)] = url_l[0];
        }
        ;
        let img_url = url_o[Math.max(...Object.keys(url_o))];
        console.log(img_url)
        img_url_val = img_url
    } catch (e) {
        console.log(e);
        init = true;
    }

}, true);


function insta_right_click() {
    if (init) {
        alert("invalid section");
    } else {
        window.open(img_url_val, "_blank");
    }
}


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     // 2. A page requested user data, respond with a copy of `user`
//     if (message === 'image-click') {
//         console.log("hhhiiiii");
//         sendResponse(img_url_val);
//     }
// });
