document.getElementById('logo').src = chrome.extension.getURL('images/logo_large.png');
var time = getParameterByName('time');
var youtube = getParameterByName('youtube');
var number = getParameterByName('phone');

var url = "http://ayushmehra.com/continue/sendText.php?youtube="+youtube+"&phone="+number+"&time="+time;

console.log(url);

setTimeout(function(){document.getElementById('sendTextIFrame').src = url;},2000);

for(var i=0; i<3; i++) {
	setTimeout(function(){document.getElementById('message').innerHTML+=" . ";},1000*(i+1));
}

setTimeout(function(){document.getElementById('message').innerHTML="Sent! This page will now auto close."},3200);

setTimeout(function(){window.close()}, 5000);

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

