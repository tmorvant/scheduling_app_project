function validate() {
	var username = document.forms["accountform"]["username"].value;
	var password = document.forms["accountform"]["password"].value;
	var password2 = document.forms["accountform"]["password2"].value;
	
	var value = 1;
	
	document.getElementById("warning1").innerHTML = "";
	var paragraph2 = document.getElementById("warning1");
	
	if (username.length == 0) {
		var text7 = document.createTextNode("*Username cannot be blank ");
		paragraph2.appendChild(text7);
		value = 0;
	}
	else {
		if (!alphaNumCheck(username)) {
			var text5 = document.createTextNode("*Username must be alphanumeric");
			paragraph2.appendChild(text5);
			value = 0;
		}
	}
	
	document.getElementById("warning").innerHTML = "";
	var paragraph = document.getElementById("warning");
	var br = document.createElement("br");
	
	checkArray = checkPassword(password);
	
	if (password.length == 0) {
		var text6 = document.createTextNode("*Password cannot be blank ");
		paragraph.appendChild(text6);
		value = 0;
	}
	if (password == password2) {
		if (checkArray[0] == 1) {
			var text0 = document.createTextNode("*Password must contain lowercase letter ");
			paragraph.appendChild(text0);
			paragraph.appendChild(br);
			value = 0;
		}
		if (checkArray[1] == 1) {
			var text1 = document.createTextNode("*Password must contain uppercase letter ");
			paragraph.appendChild(text1);
			paragraph.appendChild(br);
			value = 0;
		}
		if (checkArray[2] == 1) {
			var text2 = document.createTextNode("*Password must contain number ");
			paragraph.appendChild(text2);
			paragraph.appendChild(br);
			value = 0;
		}
		if (checkArray[3] == 1) {
			var text3 = document.createTextNode("*Password must contain special character ");
			paragraph.appendChild(text3);
			paragraph.appendChild(br);
			value = 0;
		}
	}
	else {
		var text4 = document.createTextNode("*Passwords must match");
		paragraph.appendChild(text4);
		value = 0;
	}
	
	if (value == 1) {
		return true;
	}
	else {
		return false;
	}
}

function checkPassword(password) {
	var lowercase = /[a-z]/g;
	var uppercase = /[A-Z]/g;
	var number = /[0-9]/g;
	var special = /[!@#$%^&*]/g;
	var checks = [0, 0, 0, 0];
	
	if (!password.match(lowercase)) {
		checks[0] = 1;
	}
	if (!password.match(uppercase)) {
		checks[1] = 1;
	}
	if (!password.match(number)) {
		checks[2] = 1;	
	}
	if (!password.match(special)) {
		checks[3] = 1;
	}
	return checks;
}

function getNotification(bool, ID) {
	var label = document.getElementById("labelNotify" + ID);
    if (label == null) {
        label = document.createElement("LABEL");
        label.id = "labelNotify" + ID;
        label.setAttribute( 'class', 'errorMessage' );
    }
	
    if(ID=="username"){
		label.innerHTML = bool ? "" : "Must contain something alphanumeric.";
	}else if(ID=="password"){
		label.innerHTML = bool ? "" : "Passwords must not be blank.";
	}else if(ID=="password2"){
		label.innerHTML = bool ? "" : "Passwords must match.";
	}
    return label;
}


function getImage(bool, ID) {
    var image = document.getElementById("image" + ID);
    if (image == null) {
        image = new Image(15, 15);
        image.id = "image" + ID;
    }
    image.src = bool ? './correct.png' : './wrong.png';
    return image;
}

function alphaNumCheck(entry) {
    let regex = /^[a-z0-9]+$/i;
    if (entry != null && entry.match(regex)) {
        return true;
    } else {
        return false;
    }
}

function passwordCheck(entry, other) {
    let regex = /^[a-z0-9]+$/i;
    if (entry != null && entry.match(regex) && entry == other) {
        return true;
    } else {
        return false;
    }
}

function createAccount(){
	var info = {
		username:	document.getElementById("username").value,
		password:	document.getElementById("password").value
	}
	
	var formBody = [];
	for (var property in info) {
	  var encodedKey = encodeURIComponent(property);
	  var encodedValue = encodeURIComponent(info[property]);
	  formBody.push(encodedKey + "=" + encodedValue);
	}
	formBody = formBody.join("&");
	
	if(validate()){
		window.fetch('http://localhost:3000/newAccountReq', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		  },
		  body: formBody,
		}).then(function(data) {
			data.text().then(function(value){
				if(value == "create_bad"){
					alert("Account name taken");
				}
			});
		});
		
		javascript:history.back()
	}
}