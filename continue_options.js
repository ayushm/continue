var usernumber;

chrome.storage.sync.get("usernumber", function(data) {
	usernumber = data.usernumber;
});


console.log("usernumber: "+usernumber);

if(usernumber!=null && usernumber!="undefined") {
	document.getElementById('number-text-field').value = usernumber;
	console.log("hello");
}

document.getElementById('submit-button').addEventListener("click", function() {
	var text = document.getElementById('number-text-field').value;

	if(text && text!="undefined") {
		chrome.storage.sync.set({"usernumber":text}, function() {console.log("set new value");});
		alert(text);
	} else {
		alert('fuck');
	}
});
