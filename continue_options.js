/*chrome.storage.sync.set({'value': "12"}, function() {
    chrome.storage.sync.get("value", function(data) {
      console.log("data", data.value);
    });
  });
*/

var phone;

chrome.storage.sync.get("phone", function(data) {
	phone = data.phone;
	console.log("usernumber: "+phone);
	if(phone!=null && phone!="undefined") {
		document.getElementById('number-text-field').value = phone;
		console.log("hello");
	}
});


document.getElementById('submit-button').addEventListener("click", function() {
	var text = document.getElementById('number-text-field').value;

	if(text && text!="undefined") {
		//chrome.storage.sync.set({'usernumber':3}, function() {console.log("set new value");});

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
		});
		
	} else {
		alert('something went wrong');
	}
});


