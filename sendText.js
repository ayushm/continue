
var time = getParameterByName('time');
var youtube = getParameterByName('youtube');
var number = getParameterByName('phone');

var url = "http://ayushmehra.com/continue/sendText.php?youtube="+youtube+"&phone="+number+"&time="+time;

console.log(url);

setTimeout(function(){document.getElementById('sendTextIFrame').src = url;},2000);




function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

