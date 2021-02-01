var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'planner'
});

connection.connect(function(error){
	if(!!error){
		console.log('Could not connect to DB');
	}else{
		console.log('Connected to DB');
	}
});

app.post('/loginReq', function (req, res) {
	let username = req.body.username;
	let password = req.body.password;
	connection.query("SELECT password FROM users WHERE username='" + username + "';", function(error, rows, fields){
		if(!!error){
			res.send("Error");
		}else if(rows[0].password == password){
			res.send("login_good");
		}else{
			res.send("login_bad");
		}
	});
});

app.post('/newAccountReq', function (req, res) {
	let username = req.body.username;
	let password = req.body.password;
	
	connection.query("SELECT username FROM users WHERE username='" + username + "';", function(error, rows, fields){
		if(!!error){
			res.send("Error");
		}else if(rows[0].password != null){
			res.send("create_bad");
			return;
		}
	});
	
	var query = "INSERT INTO users (username, password) VALUES ('" + username + "', '" + password + "');";
	console.log(query);
	connection.query(query, function(error, rows, fields){
		if(!!error){
			res.send("create_bad");
			console.log("bad");
		}else{
			res.send("create_good");
			console.log("good");
		}
	});
});

app.post('/newTaskReq', function (req, res) {
	connection.query("INSERT INTO tasks (username, name, type, date, description, priority, difficulty) VALUES ('"
	 + req.body.username + "', '" + req.body.taskName + "', '" + req.body.type + "', '" + req.body.dueDate
	   + "', '" + req.body.description + "', '" + req.body.priority + "', '" + req.body.difficulty + "')", function(error, rows, fields){
		if(!!error){
			res.send("create_bad");
		}else{
			res.send("create_good");
		}
	});
});

app.post('/tasksReq/:username/:day', function (req, res) {
	var query = "SELECT * FROM planner.tasks WHERE username='" + req.params.username
	 + "' AND date LIKE '" + req.params.day + "%';";
	console.log(query);
	connection.query(query, function(error, rows, fields){
		if(!!error){
			res.send("get_bad " + query);
		}else{
			res.send(JSON.stringify(rows));
		}
	});
});

app.post('/taskReq/:username/:day/:name', function (req, res) {
	var query = "SELECT * FROM planner.tasks WHERE username='" + req.params.username
	 + "' AND date LIKE '" + req.params.day
	 + "%' AND name='" + req.params.name + "';";
	console.log(query);
	connection.query(query, function(error, rows, fields){
		if(!!error){
			res.send("get_bad " + query);
		}else{
			res.send(JSON.stringify(rows));
		}
	});
});

app.post('/deleteTaskReq/:username/:day/:name', function (req, res) {
	var query = "DELETE FROM planner.tasks WHERE username='" + req.params.username
	 + "' AND date LIKE '" + req.params.day
	 + "%' AND name='" + req.params.name + "';";
	console.log(query);
	connection.query(query, function(error, rows, fields){
		if(!!error){
			res.send("del_bad " + query);
		}else{
			res.send("del_good");
		}
	});
});

app.listen(3000, function () {
	console.log('App listening on port 3000');
});