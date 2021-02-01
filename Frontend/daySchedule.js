function start(){
	document.getElementById("day").innerHTML = sessionStorage.getItem('date');
	getTasks();
}

function Task(un, tn, type, dd, desc, pri, diff) {
	this.username = un;
	this.taskName = tn;
	this.type = type;
	this.dueDate = dd;
	this.description = desc;
	this.priority = pri;
	this.difficulty = diff;
}

function setName(name){
	sessionStorage.setItem("taskName", name);
	window.location.href = "Task.html";
}

function getTasks(){
	var tasks = [];
	fetch("http://localhost:3000/tasksReq/" + window.sessionStorage.getItem('username') + "/" + window.sessionStorage.getItem('date'), {
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
				for(var i=0; i<tarr.length; i++){
					tasks.push(new Task(tarr[i].username, tarr[i].name, tarr[i].type, tarr[i].date, tarr[i].description, tarr[i].priority, tarr[i].difficulty));
				}
				var table = document.getElementById("schedule");
				var taskName1 = "";
				for(var j=0;j<2;j++){
					for(var i=1;i<=12;i++){
						taskName1 = "";
						var tr = document.createElement('TR');
						table.appendChild(tr);
						
						var td = document.createElement('TD');
						td.width='75';
						if(j==0){
							td.appendChild(document.createTextNode(i + ":00 AM"));
						}else{
							td.appendChild(document.createTextNode(i + ":00 PM"));
						}
						tr.appendChild(td);
						var trr;
						var tdd;
						var set = 0;
						for(var g=0; g<tasks.length; g++){
							var time = tasks[g].dueDate.substring(11,13);
							if(time.startsWith("0")){
								time = time.substring(1);
							}
							
							if((j==0 && time==i) || (j==1 && i==time-12)){
								if(set){
									trr = document.createElement('TR');
									table.appendChild(trr);
									tdd = document.createElement('TD');
									tdd.width='75';
									tdd.appendChild(document.createTextNode(""));
									
								}
								td = document.createElement('TD');
								td.width='100';
								taskName1 = tasks[g].taskName;
								td.setAttribute("onclick", "setName('" + taskName1 + "')", "cursor: pointer");
								td.appendChild(document.createTextNode(taskName1));
								if(set){
									
									trr.appendChild(tdd);
									trr.appendChild(td);
								}else{
									tr.appendChild(td);
									
								}
								set = 1;
							}
						}
						if(!set){
							td = document.createElement('TD');
							td.width='100';
							td.appendChild(document.createTextNode(""));
							tr.appendChild(td);
						}
					}
				}
				console.log(tarr);
			}
		});
	});
	return tasks;
}