console.log('hello');

var player = document.getElementsByClassName('html5-player-chrome')[0];

var button = document.createElement('DIV');
button.className = "ytp-button continueCustomButton";
button.setAttribute('tabindex',"6201");

button.onclick = test;

player.insertBefore(button,player.childNodes[4]);

console.log(button);

var logoURL = chrome.extension.getURL('images/logo_medium.png');
var iconURL = chrome.extension.getURL('images/logo_icon.png');
var icon = document.createElement('IMG');
icon.src = iconURL;
//icon.src = "https://farm9.staticflickr.com/8115/8673546462_73b2df8cb3.jpg";
icon.id = "continue-icon";

var continueLabel = document.createElement('P');
continueLabel.innerHTML = "continue";
continueLabel.id = "continue-label";

button.appendChild(icon);
button.appendChild(continueLabel);




var settingsDiv = document.createElement('DIV');
settingsDiv.className = "ytp-menu-container";
settingsDiv.id="continueSettingsContainer";

settingsDiv.innerHTML = '<img id="continueLogo" src="'+logoURL+'" width="50px"/><h1 id="continueHeader">continue</h1>( <input class="phoneTextField" type="text" id="areaCode"/> ) <input class="phoneTextField" type="text" id="firstThree"/> &#8212 <input class="phoneTextField" type="text" id="lastFour"/><br/><button value="update" id="updateNumberButton">Update Number</button><br/><button value="send" id="continueSubmitButton">Send</button>';


var defaultMenu = document.getElementsByClassName('ytp-menu-container')[0];
defaultMenu.parentNode.insertBefore(settingsDiv,defaultMenu);


function test() {
	var time = document.getElementsByClassName('ytp-progress-bar-container')[0].childNodes[1].getAttribute('aria-valuenow');
	//alert(time);

	//var shareInput = document.getElementsByClassName('yt-uix-form-input-text share-panel-url')[0].value;
	var videoURL = getVideoParameterFromURL(); //shareInput.substring(shareInput.indexOf('tu.be/')+6);

	
	var userNumber;
	chrome.storage.sync.get("phone", function(data) {
		userNumber = data.phone;

		if(userNumber==null || userNumber=="undefined") {
			alert("You have not set your phone number yet. Please visit the extension settings page to do this.");
		} else {
			var url = "http://ayushmehra.com/continue/sendText.php?youtube="+videoURL+"&phone="+userNumber+"&time="+time;

			var areaCodeNode = document.getElementById('areaCode');
			var firstThreeNode = document.getElementById('firstThree');
			var lastFourNode = document.getElementById('lastFour');

			if(userNumber.length==11) {
				userNumber = userNumber.substring(1);
			}

			areaCodeNode.value = userNumber.substring(0,3);
			firstThreeNode.value = userNumber.substring(3,6);
			lastFourNode.value = userNumber.substring(6);

			//alert(url);

			//var win = window.open(url, '_blank');
			// 1234567890
		}

	});

	


	

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

function getVideoParameterFromURL() {
    param = 'v'.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + param + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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