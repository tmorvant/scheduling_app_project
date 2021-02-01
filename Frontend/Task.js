function load(){
	fetch("http://localhost:3000/taskReq/" + window.sessionStorage.getItem('username') + "/" + window.sessionStorage.getItem('date') + "/" + window.sessionStorage.getItem('taskName'), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		}
	}).then(function(data) {
		data.text().then(function(value){
			if(value == "get_bad"){
				console.log("bad");
			}else{
				var tarr = JSON.parse(value);
				document.getElementById("taskName").innerHTML = tarr[0].name;
				document.getElementById("type").innerHTML = tarr[0].type;
				document.getElementById("dueDate").innerHTML = tarr[0].date;
				document.getElementById("description").innerHTML = tarr[0].description;
				document.getElementById("priority").innerHTML = "Priority: " + tarr[0].priority;
				document.getElementById("difficulty").innerHTML = "Difficulty: " + tarr[0].difficulty;
			}
		});
	});
}

function editTask(){
	sessionStorage.setItem("edit", "1");
	sessionStorage.setItem("eTaskName", document.getElementById("taskName").innerHTML);
	sessionStorage.setItem("eType", document.getElementById("type").innerHTML);
	sessionStorage.setItem("eDueDate", document.getElementById("dueDate").innerHTML);
	sessionStorage.setItem("eDescription", document.getElementById("description").innerHTML);
	sessionStorage.setItem("ePriority", document.getElementById("priority").innerHTML);
	sessionStorage.setItem("eDifficulty", document.getElementById("difficulty").innerHTML);
	window.location.href = "newTask.html";
}

function deleteTask(){
	fetch("http://localhost:3000/deleteTaskReq/" + window.sessionStorage.getItem('username') + "/" + window.sessionStorage.getItem('date') + "/" + window.sessionStorage.getItem('taskName'), {
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