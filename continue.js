
var player = document.getElementsByClassName('html5-player-chrome')[0];

var button = document.createElement('DIV');
button.className = "ytp-button continueCustomButton";
button.setAttribute('tabindex',"6201");

button.onclick = openSettingsMenu;

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

//settingsDiv.innerHTML = '<div id="continueContainerHeader"><img id="continueLogo" src="'+logoURL+'" width="50px"/><h1 id="continueHeader">continue</h1></div><br><br><br><div id="phoneNumberContainer"></div><br/><button value="update" id="updateNumberButton">Update Number</button><br/><button value="send" id="continueSubmitButton">Send</button>';
settingsDiv.innerHTML = '<div id="numberContainer"><h1 id="numberHeader"></h1></div><button class="continueButton" id="setNumberButton">set one now</button><button class="continueButton" id="sendTextButton">continue there <img src="'+logoURL+'" width="32px" style="vertical-align:middle;"/></button>';
settingsDiv.style.display = "none";


var defaultMenu = document.getElementsByClassName('ytp-menu-container')[0];
defaultMenu.parentNode.insertBefore(settingsDiv,defaultMenu);

var sendTextButton = document.getElementById('sendTextButton');
var setNumberButton = document.getElementById('setNumberButton');
var phoneDiv = document.getElementById('numberHeader');

setNumberButton.onclick = function() {window.open(chrome.extension.getURL('continue_options.html'),'_blank')};
sendTextButton.onclick = sendTextButtonPressed;

var userNumber;


function openSettingsMenu() {
	var time = document.getElementsByClassName('ytp-progress-bar-container')[0].childNodes[1].getAttribute('aria-valuenow');
	//alert(time);

	//var shareInput = document.getElementsByClassName('yt-uix-form-input-text share-panel-url')[0].value;
	var videoURL = getVideoParameterFromURL(); //shareInput.substring(shareInput.indexOf('tu.be/')+6);

	
	chrome.storage.sync.get("phone", function(data) {
		userNumber = data.phone;

		if(userNumber==null || userNumber=="undefined") {
			//alert("You have not set your phone number yet. Please visit the extension settings page to do this.");

			phoneDiv.innerHTML = "no # found";

			sendTextButton.style.display = "none";
			setNumberButton.style.display = "inline";



		} else {
			console.log('reachedadsfasdfasdf');
			var url = "http://ayushmehra.com/continue/sendText.php?youtube="+videoURL+"&phone="+userNumber+"&time="+time;

			var formattedNumber = "";

			if(userNumber.length==11) {
				formattedNumber = userNumber.substring(0,1);
				userNumber = userNumber.substring(1);
			}

			formattedNumber = formattedNumber+"("+userNumber.substring(0,3)+") "+userNumber.substring(3,6)+"-"+userNumber.substring(6);

			phoneDiv.innerHTML = formattedNumber;

			//alert(url);

			//var win = window.open(url, '_blank');
			// 1234567890
		}

	});

	if(settingsDiv.style.display=="none") {
		settingsDiv.style.display="inline";
	} else {
		settingsDiv.style.display="none";
	}

	

}

function getVideoParameterFromURL() {
    param = 'v'.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + param + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}




function setNumberButtonPressed() {

	if(document.getElementById('numberPopup')==null) {
		console.log('helloasdf');
		var setNumberPopup = document.createElement('DIV');
		setNumberPopup.id = "numberPopup";
		setNumberPopup.innerHTML = '<img src="chrome-extension://nmgnohconkldmjidgbcikocgimbambnf/images/logo_medium.png" id="popupLogo"/><div id="popupLabelContainer"><h1 id="popupLabelHeader">continue</h1></div><div id="textFieldContainer"><input type="text" maxlength="2" id="countryCode"/>(<input type="text" maxlength="3" id="areaCode"/>)<input type="text" maxlength="3" id="firstThree"/>-<input type="text" maxlength="4" id="lastFour"/><br/><button onclick="closePopup()" id="closePopupButton">cancel</button><button onclick="processInput()" id="popupSubmitButton">set number</button></div>';
		document.body.appendChild(setNumberPopup);
	} else {
		document.getElementById('numberPopup').style.display = "inline";
	}

	

}

function sendTextButtonPressed() {
	var time = document.getElementsByClassName('ytp-progress-bar-container')[0].childNodes[1].getAttribute('aria-valuenow');
	var videoURL = getVideoParameterFromURL();
	var url = chrome.extension.getURL('sendText.html')+"?youtube="+videoURL+"&phone="+userNumber+"&time="+time;
	window.open(url,'_blank');
}

function processInput() {
	alert('hello');
	document.getElementById('numberPopup').style.display = "none";
}


