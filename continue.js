var userNumber;
var settingsDiv;
var sendTextButton;
var setNumberButton;
var phoneDiv;



if(document.getElementsByClassName('html5-player-chrome').length>0) {
	init();
}


setInterval(function(){
	if(!document.getElementById('continuePlayerButton')) {
		init();
	}
},3000);


function openSettingsMenu() {
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

			var formattedNumber = "";

			if(userNumber.length==11) {
				formattedNumber = userNumber.substring(0,1);
				userNumber = userNumber.substring(1);
			}

			formattedNumber = formattedNumber+"("+userNumber.substring(0,3)+") "+userNumber.substring(3,6)+"-"+userNumber.substring(6);

			phoneDiv.innerHTML = formattedNumber;
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
		var setNumberPopup = document.createElement('DIV');
		setNumberPopup.id = "numberPopup";
		setNumberPopup.innerHTML = '<img src="chrome-extension://nmgnohconkldmjidgbcikocgimbambnf/images/logo_medium.png" id="popupLogo"/><div id="popupLabelContainer"><h1 id="popupLabelHeader">continue</h1></div><div id="textFieldContainer"><input type="text" maxlength="2" id="countryCode"/>(<input type="text" maxlength="3" id="areaCode"/>)<input type="text" maxlength="3" id="firstThree"/>-<input type="text" maxlength="4" id="lastFour"/><br/><button onclick="closePopup()" id="closePopupButton">cancel</button><button onclick="processInput()" id="popupSubmitButton">set number</button></div>';
		document.body.appendChild(setNumberPopup);
	} else {
		document.getElementById('numberPopup').style.display = "inline";
	}

	

}

function sendTextButtonPressed() {
	//var time = document.getElementsByClassName('ytp-progress-bar-container')[0].childNodes[1].getAttribute('aria-valuenow');
	var time = document.getElementsByClassName('ytp-time-current')[0].innerHTML;
	var times = time.split(":");
	var seconds = times[times.length-1];
	var minutes = times[times.length-2];
	var hours = 0;
	if(times.length>2) {
		hours = times[0];
	}

	var videoURL = getVideoParameterFromURL();

	var button = document.getElementById('sendTextButton');	

	button.disabled = true;
	var orig = phoneDiv.innerHTML;
	phoneDiv.innerHTML = "<span style='padding: 0 30px;'>SENDING...</span>";

	var queryString = "?youtube="+videoURL+"&phone="+userNumber+"&h="+hours+"&m="+minutes+"&s="+seconds;
	var url = "http://ayushmehra.com/continue/sendText.php?youtube="+videoURL+"&phone="+userNumber+"&h="+hours+"&m="+minutes+"&s="+seconds;
	chrome.runtime.sendMessage({
	    method: 'POST',
	    action: 'xhttp',
	    url: url,
	    data: queryString
	}, function(responseText) {
	    
	    if(responseText=="success") { //success
	    	
	    	phoneDiv.innerHTML = "<span style='padding: 0 55px;'>SENT!</span>";

	    	setTimeout(function(){
	    		settingsDiv.style.display = "none";
	    		phoneDiv.innerHTML = orig;
	    		button.disabled = false;
	    	}, 1000);

	    } else { //failed
	    	phoneDiv.innerHTML = "<span style='font-size: 60%;'>FAILED. TRY AGAIN LATER</font>";

	    	setTimeout(function(){
	    		settingsDiv.style.display = "none";
	    		phoneDiv.innerHTML = orig;
	    		button.disabled = false;
	    	}, 1000);
	    }

	});
}


function init() {
	var player = document.getElementsByClassName('ytp-chrome-controls')[0];

	var button = document.createElement('DIV');
	button.className = "ytp-button continueCustomButton";
	button.id = "continuePlayerButton";
	button.setAttribute('tabindex',"36");

	button.onclick = openSettingsMenu;

	player.insertBefore(button,player.childNodes[8]);

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
	//button.appendChild(continueLabel);

	settingsDiv = document.createElement('DIV');
	settingsDiv.className = "ytp-popup";
	settingsDiv.id="continueSettingsContainer";

	//settingsDiv.innerHTML = '<div id="continueContainerHeader"><img id="continueLogo" src="'+logoURL+'" width="50px"/><h1 id="continueHeader">continue</h1></div><br><br><br><div id="phoneNumberContainer"></div><br/><button value="update" id="updateNumberButton">Update Number</button><br/><button value="send" id="continueSubmitButton">Send</button>';
	settingsDiv.innerHTML = '<div id="numberContainer"><h1 id="numberHeader"></h1></div><button class="continueButton" id="setNumberButton">set one now</button><button class="continueButton" id="sendTextButton">continue there <img src="'+logoURL+'" width="32px" style="vertical-align:middle;"/></button>';
	settingsDiv.style.display = "none";


	var defaultMenu = document.getElementsByClassName('ytp-settings-menu')[0];
	defaultMenu.parentNode.insertBefore(settingsDiv,defaultMenu);

	sendTextButton = document.getElementById('sendTextButton');
	setNumberButton = document.getElementById('setNumberButton');
	phoneDiv = document.getElementById('numberHeader');

	setNumberButton.onclick = function() {var time = document.getElementsByClassName('ytp-progress-bar-container')[0].childNodes[1].getAttribute('aria-valuenow');window.location = chrome.extension.getURL('continue_options.html')+"?video="+getVideoParameterFromURL()+"&time="+time;};
	sendTextButton.onclick = sendTextButtonPressed;


	var buttonRect = button.getBoundingClientRect();
	var progressBarRect = document.getElementsByClassName('ytp-progress-bar-container')[0].getBoundingClientRect();
	var player = document.getElementsByClassName('html5-video-content')[0];
	var playerRect = player.getBoundingClientRect();

	var buttonLeftOffset = buttonRect.left - playerRect.left;
	var progressBarBottomOffset = parseInt(player.style.height) - (progressBarRect.top - playerRect.top);

	//console.log(buttonLeftOffset+" - "+progressBarBottomOffset);

	settingsDiv.style.left = buttonLeftOffset+"px";
	settingsDiv.style.bottom = progressBarBottomOffset+15+"px";

}


