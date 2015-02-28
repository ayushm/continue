console.log('hello');

var player = document.getElementsByClassName('html5-player-chrome')[0];

var button = document.createElement('DIV');
button.className = "ytp-button continueCustomButton";
button.setAttribute('tabindex',"6201");

button.onclick = test;

player.insertBefore(button,player.childNodes[4]);

console.log(button);



function test() {
	var time = document.getElementsByClassName('ytp-progress-bar-container')[0].childNodes[1].getAttribute('aria-valuenow');
	alert(time);

	
	var userNumber;
	chrome.storage.sync.get("usernumber", function(data) {
		userNumber = data.usernumber;
	});

	if(userNumber==null || userNumber=="undefined") {
		alert("You have not set your phone number yet. Please visit the extension settings page to do this.");
	} else {
		var url = "http://ayushmehra.com/continue/sendText.php?youtube="+userNumber;

		alert(url);

		//var win = window.open(url, '_blank');
	}


	

/*
	var frame = document.createElement('IFRAME');
	document.body.appendChild(frame);
	frame.src = url;
	//frame.style="display:none;";
	console.log(frame);

	

	var request = new XMLHttpRequest();
	var url = "http://ayushmehra.com/continue/sendText.php?youtube=asadf";
	request.open("GET", url, true);
	request.send();

	var account_sid = "87bb86c97d1f07940927119197070239";        
	var auth_token = "AC32cd17ac887d4db94e7b49efceb40cb3";
	var fromNumber = "+16693420095"; // test number
	var toNumber = "+14087592950";
	var text = "hello here is the time: "+time+" seconds";

	var fromNumberEnc = encodeURIComponent(fromNumber); 
	var toNumberEnc = encodeURIComponent(toNumber);
	var textEnc = encodeURIComponent(text);

	var request = new XMLHttpRequest();
	var url = "https://" + account_sid + ":" + auth_token + "@api.twilio.com/2010-04-01/Accounts/" + account_sid + "/SMS/Messages.json";
	request.open("POST", url, true);
	var postData = "From="+fromNumberEnc+"&To="+toNumberEnc+"&Body="+textEnc;
	request.send(postData);

	

	var account_sid = "87bb86c97d1f07940927119197070239";        
	var auth_token = "AC32cd17ac887d4db94e7b49efceb40cb3";
	var fromNumber = "+16693420095"; // test number
	var toNumber = "+14087592950";
	var text = "hello here is the time: "+time+" seconds";

	var fromNumberEnc = encodeURIComponent(fromNumber); 
	var toNumberEnc = encodeURIComponent(toNumber);
	var textEnc = encodeURIComponent(text);
	var body = "From=" + fromNumberEnc + "&To=" + toNumberEnc + "&Body=" + textEnc;
    httpRequest.post({
        url: "https://" + account_sid + ":" + auth_token +
             "@api.twilio.com/2010-04-01/Accounts/" + account_sid + "/SMS/Messages.json",
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: body
    }, function (err, resp, body) {
        console.log(body);
    });

*/

}

/*


var x = document.getElementById('watch-action-panels').style="display: box;";
x.className = "watch-action-panels yt-uix-button-panel yt-card yt-card-has-padding";

var time = document.getElementsByClassName('share-panel-start-at-time')[0].value;

var button = document.createElement('DIV');
button.className = "yt-uix-button yt-uix-button-size-default continueCustomButton";
//button.setAttribute('tabindex',"6201");

var buttonContainer = document.getElementById('watch8-secondary-actions');

buttonContainer.appendChild(button);

console.log(button);


*/