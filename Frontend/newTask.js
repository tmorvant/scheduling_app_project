function prep(){
	if(sessionStorage.getItem("edit") == "1"){
		document.getElementById("taskName").value = sessionStorage.getItem("eTaskName");
		document.getElementById("type").value = sessionStorage.getItem("eType");
		document.getElementById("dueDate").value = sessionStorage.getItem("eDueDate");
		document.getElementById("description").value = sessionStorage.getItem("eDescription");
		document.getElementById("priority").value = sessionStorage.getItem("ePriority").slice(-1);
		document.getElementById("difficulty").value = sessionStorage.getItem("eDifficulty").slice(-1);
	}
}

function deleteTask(){
	fetch("http://localhost:3000/deleteTaskReq/" + window.sessionStorage.getItem('username') + "/" + window.sessionStorage.getItem('date') + "/" + window.sessionStorage.getItem('eTaskName'), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		}
	}).then(function(data) {
		data.text().then(function(value){
			if(value == "del_good"){
				javascript:history.back();
			}
		});
	});
}

function validate() {
	var tnCheck = alphaNumCheck(document.getElementById("taskName").value);
	var image1 = getImage(Boolean(tnCheck), "taskName");
	var tnNotify=getNotification(Boolean(tnCheck), "taskName");
	document.getElementById("taskName1").appendChild(image1);
	document.getElementById("taskName1").appendChild(tnNotify);
	
	var typeCheck = selectCheck(document.getElementById("type").value);
	var image2 = getImage(Boolean(typeCheck), "type");
	var typeNotify=getNotification(Boolean(typeCheck), "type");
	document.getElementById("type1").appendChild(image2);
	document.getElementById("type1").appendChild(typeNotify);
	
	var dateCheck = dateValidCheck(document.getElementById("dueDate").value);
	var image3 = getImage(Boolean(dateCheck), "dueDate");
	var dateNotify=getNotification(Boolean(dateCheck), "dueDate");
	document.getElementById("dueDate1").appendChild(image3);
	document.getElementById("dueDate1").appendChild(dateNotify);
	
	var descCheck = alphaNumCheck(document.getElementById("description").value);
	var image4 = getImage(Boolean(descCheck), "description");
	var descNotify=getNotification(Boolean(descCheck), "description");
	document.getElementById("description1").appendChild(image4);
	document.getElementById("description1").appendChild(descNotify);
	
	var priCheck = digitCheck(document.getElementById("priority").value);
	var image5 = getImage(Boolean(priCheck), "priority");
	var priNotify=getNotification(Boolean(priCheck), "priority");
	document.getElementById("priority1").appendChild(image5);
	document.getElementById("priority1").appendChild(priNotify);
	
	var diffCheck = digitCheck(document.getElementById("difficulty").value);
	var image6 = getImage(Boolean(diffCheck), "difficulty");
	var diffNotify=getNotification(Boolean(diffCheck), "difficulty");
	document.getElementById("difficulty1").appendChild(image6);
	document.getElementById("difficulty1").appendChild(diffNotify);
	
	if(Boolean(tnCheck)&&Boolean(typeCheck)&&Boolean(dateCheck)&&Boolean(descCheck)&&Boolean(priCheck)&&Boolean(diffCheck)){
		deleteTask();
		submit();
	}
}

function getNotification(bool, ID) {
	var label = document.getElementById("labelNotify" + ID);
    if (label == null) {
        label = document.createElement("LABEL");
        label.id = "labelNotify" + ID;
        label.setAttribute( 'class', 'errorMessage' );
    }
	
    if(ID=="taskName"){
		label.innerHTML = bool ? "" : "Must contain something alphanumeric.";
	}else if(ID=="type"){
		label.innerHTML = bool ? "" : "Must select something.";
	}else if(ID=="dueDate"){
		label.innerHTML = bool ? "" : "Must enter date.";
	}else if(ID=="description"){
		label.innerHTML = bool ? "" : "Must contain something alphanumeric.";
	}else if(ID=="priority"){
		label.innerHTML = bool ? "" : "Must contain a single digit.";
	}else if(ID=="difficulty"){
		label.innerHTML = bool ? "" : "Must contain a single digit.";
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

function selectCheck(entry){
	if(entry=="select"){
		return false;
	}else{
		return true;
	}
}

function alphaNumCheck(entry) {
    let regex = /^[a-z0-9]+$/i;
    if (entry != null && entry.match(regex)) {
        return true;
    } else {
        return false;
    }
}

function dateValidCheck(entry) {
    let regex = /^[-:a-z0-9]+$/i;
    if (entry != null && entry.match(regex)) {
        return true;
    } else {
        return false;
    }
}

function digitCheck(entry) {
	if(entry.length > 1){
		return false;
	}
    let regex = /^[0-9]+$/i;
    if (entry != null && entry.match(regex)) {
        return true;
    } else {
        return false;
    }
}

function submit(){
	var task = {
		username:	window.sessionStorage.getItem('username'),
		taskName:	document.getElementById("taskName").value,
		type:		document.getElementById("type").value,
		dueDate:	document.getElementById("dueDate").value,
		description:document.getElementById("description").value,
		priority:	document.getElementById("priority").value,
		difficulty:	document.getElementById("difficulty").value
	}

	var formBody = [];
	for (var property in task) {
		var encodedKey = encodeURIComponent(property);
		var encodedValue = encodeURIComponent(task[property]);
		formBody.push(encodedKey + "=" + encodedValue);
	}
	formBody = formBody.join("&");

	window.fetch('http://localhost:3000/newTaskReq', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		},
		body: formBody,
	}).then(function(data) {
		data.text().then(function(value){
			if(value == "create_good"){
				if(sessionStorage.getItem("edit") == "1"){
					sessionStorage.setItem("edit", "0");
				}
				window.location.href = "home.html";
			}else{
				console.log('bad');
			}
		});
	});
}