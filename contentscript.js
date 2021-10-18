console.log("chrome extension party!");
console.log(img_arr);

var img_set = [...new Set(img_arr)];

let xhr = new XMLHttpRequest();
let url = "http://127.0.0.1:5000/bulkDownload";

// open a connection
xhr.open("POST", url, true);

// Set the request header i.e. which type of content you are sending
xhr.setRequestHeader("Content-Type", "application/json");
// xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
// Create a state change callback
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {

        // Print received data from server
        alert("download completed")
    }
};

// Converting JSON data to string
var data = JSON.stringify({ "img_arr": img_set });

// Sending data with the request
xhr.send(data);



// for(i=0;i<img_set.length;i++){
//
//     var url25346 = img_set[i];
//     try{
//         var filename11334fgdh = url25346.toString().match(/[\w-]+.(jpg|png|txt)/g)[0];
//
//     }catch (e) {
//         var filename11334fgdh = "donload_from_insta.jpg";
//     }
//
//     fetch(url25346)
//         .then(response => response.blob())
//         .then(blob => {
//             var abdgrycd1234 = document.createElement("a");
//             abdgrycd1234.href = URL.createObjectURL(blob);
//             abdgrycd1234.download = url25346.toString().match(/[\w-]+.(jpg|png|txt)/g)[0];
//             abdgrycd1234.click();
//             delete abdgrycd1234;
//         })
//         .catch(console.error);
//
//
// };


img_set = [];
img_arr = [];
