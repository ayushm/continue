/*chrome.storage.sync.set({'value': "12"}, function() {
    chrome.storage.sync.get("value", function(data) {
      console.log("data", data.value);
    });
  });
*/

var phone;

var video = getParameterByName('video');
var time = getParameterByName('time');

chrome.storage.sync.get("phone", function(data) {
	phone = data.phone;
	console.log("usernumber: "+phone);
	if(phone!=null && phone!="undefined") {
		document.getElementById('number-text-field').value = phone;
		console.log("hello");
	}
});

document.getElementById('logo').src = chrome.extension.getURL('images/logo_large.png');


document.getElementById('submit-button').addEventListener("click", function() {
	var textField = document.getElementById('number-text-field');
	var text = document.getElementById('number-text-field').value;

	if(text && text!="undefined") {
		//chrome.storage.sync.set({'usernumber':3}, function() {console.log("set new value");});

		if(isNaN(text)) {
			textField.placeholder = "Do not format your #";
			textField.value = "";
			console.log('not a number');
		}
		else if(text.length>12) {
			textField.placeholder = "Number is too long";
			textField.value = "";
		}
		else if(text.length<10) {
			textField.placeholder = "Number is too short";
			textField.value = "";
		}
		else {
			chrome.storage.sync.set({'phone': text}, function() {
			    
			});

			chrome.storage.sync.get("phone", function(data) {
		      console.log("data", data.phone);
		    });

			//alert(text);
			var x;
			chrome.storage.sync.get("phone", function(data) {
				x = data.phone;
				console.log("x:"+x);
				window.location = "http://www.youtube.com/watch?v="+video+"&t="+time;
			});
		}
		
	} else {
		//alert('something went wrong');
		textField.placeholder = "Enter your phone #";
		textField.value = "";
	}
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

