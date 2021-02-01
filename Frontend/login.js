function validate() {
	
	var usernameCheck = document.getElementById("username").value;
	var passwordCheck = document.getElementById("password").value;
	
	if (username.length == 0 || password.length == 0) {
		document.getElementById("passMessage").innerHTML = "";
		var warning = document.getElementById("passMessage");
		var blankMessage = document.createTextNode("*Please fill out username and password");
		warning.appendChild(blankMessage);
		return;
	}
	else {
		login();
	}
	
}

function login() {
	//add in validation for blank
	var info = {
		username: document.getElementById("username").value,
		password: document.getElementById("password").value
	}
	window.sessionStorage.setItem("username", info.username);

	var formBody = [];
	for (var property in info) {
		var encodedKey = encodeURIComponent(property);
		var encodedValue = encodeURIComponent(info[property]);
		formBody.push(encodedKey + "=" + encodedValue);
	}
	formBody = formBody.join("&");

	window.fetch('http://localhost:3000/loginReq', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		},
		body: formBody,
	}).then(function(data) {
		data.text().then(function(value){
			if(value == "login_good"){
				good();
			}else{
				bad();
			}
		});
	});
}

function good(){
	console.log("here1");
	window.location.href = "home.html";
}

function bad(){
	document.getElementById("passMessage").innerHTML = "";
	var wrong = document.getElementById("passMessage");
	var invalid = document.createTextNode("*Username and Password do not match");
	wrong.appendChild(invalid);
}



















