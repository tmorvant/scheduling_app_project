// this script got from www.htmlbestcodes.com-Coded by: Krishna Eydat -->
// Edited by Thomas Hotard to fit the needs of our project -->

var tasksss = false;

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
			}
			setBack();
			if(tasks.length>0){
				setStorage();
			}
		});
	});
	//console.log(sessionStorage.getItem("isTask"));
	return tasks;
}

function setBack() {
	window.sessionStorage.setItem("isTask","0");
}

function setStorage(){
	window.sessionStorage.setItem("isTask", "1");
	console.log(sessionStorage.getItem("isTask"));
	tasksss = true;
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

var day_of_week = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
var month_of_year = new Array('January','February','March','April','May','June','July','August','September','October','November','December');

//  DECLARE AND INITIALIZE VARIABLES
var Calendar = new Date();



var year = Calendar.getFullYear();     // Returns year
var month = Calendar.getMonth();    // Returns month (0-11)
var today = Calendar.getDate();    // Returns day (1-31)
var weekday = Calendar.getDay();    // Returns day (1-31)

function chooseDay(number) {
	var strDate = "";
	if(number.toString().length < 2){
		strDate = strDate.concat(year, "-", month+1, "-0", number);
	}
	else {
		strDate = strDate.concat(year, "-", month+1, "-", number);
	}
	window.sessionStorage.setItem('date', strDate);
}

var DAYS_OF_WEEK = 7;    // "constant" for number of days in a week
var DAYS_OF_MONTH = 31;    // "constant" for number of days in a month
var cal;    // Used for printing

Calendar.setDate(1);    // Start the calendar day at '1'
Calendar.setMonth(month);    // Start the calendar month at now


/* VARIABLES FOR FORMATTING
NOTE: You can format the 'BORDER', 'BGCOLOR', 'CELLPADDING', 'BORDERCOLOR'
      tags to customize your caledanr's look. */

var TR_start = '<TR>';
var TR_end = '</TR>';
var highlight_start = '<TD WIDTH="60"><TABLE CELLSPACING=0 BORDER=0 BGCOLOR=39bf7c BORDERCOLOR=CCCCCC><TR><TD WIDTH=60><H3><B><CENTER>';
var highlight_end   = '</CENTER></TD></TR></TABLE></H3></B>';
var TD_start = '<TD WIDTH="60"><H3><CENTER>';
var TD_end = '</CENTER></H3></TD>';
var task_start = '<TD WIDTH="60"><TABLE CELLSPACING=0 BORDER=0 BGCOLOR=#ff5c77 BORDERCOLOR=CCCCCC><TR><TD WIDTH=60><H3><B><CENTER>';
var task_end = '</CENTER></TD></TR></TABLE></H3></B>';



/* BEGIN CODE FOR CALENDAR
NOTE: You can format the 'BORDER', 'BGCOLOR', 'CELLPADDING', 'BORDERCOLOR'
tags to customize your calendar's look.*/

cal =  '<TABLE BORDER=3 CELLSPACING=0 CELLPADDING=0 BORDERCOLOR=BLACK BGCOLOR=#84f0c8><TR><TD>';
cal += '<TABLE BORDER=2 CELLSPACING=7 CELLPADDING=2>' + TR_start;
cal += '<TD COLSPAN="' + DAYS_OF_WEEK + '" BGCOLOR="#328585"><CENTER><B>';
cal += month_of_year[month]  + '   ' + year + '</B>' + TD_end + TR_end;
cal += TR_start;

//   DO NOT EDIT BELOW THIS POINT  //

// LOOPS FOR EACH DAY OF WEEK


for(index=0; index < DAYS_OF_WEEK; index++)
{

// BOLD TODAY'S DAY OF WEEK
if(weekday == index)
cal += TD_start + '<B>' + day_of_week[index] + '</B>' + TD_end;

// PRINTS DAY
else
cal += TD_start + day_of_week[index] + TD_end;
}

cal += TD_end + TR_end;
cal += TR_start;



// FILL IN BLANK GAPS UNTIL TODAY'S DAY
for(index=0; index < Calendar.getDay(); index++) {
	
	cal += TD_start + '  ' + TD_end;
	
}
// LOOPS FOR EACH DAY IN CALENDAR
for(index=0; index < DAYS_OF_MONTH; index++)
{
if( Calendar.getDate() > index )
{
  // RETURNS THE NEXT DAY TO PRINT
  week_day =Calendar.getDay();

  // START NEW ROW FOR FIRST DAY OF WEEK
  if(week_day == 0)
  cal += TR_start;

  if(week_day != DAYS_OF_WEEK)
  {

  // SET VARIABLE INSIDE LOOP FOR INCREMENTING PURPOSES
  var day  = index+1;
  chooseDay(day);
  getTasks();
  
  // HIGHLIGHT TODAY'S DATE
  if( today==Calendar.getDate() )
  cal += highlight_start + '<A HREF="daySchedule.html"><ID=' + day + ' ONCLICK="chooseDay(' + day + ')">' + day + '</A>'+ highlight_end + TD_end;
	
  else if (tasksss == true) 
  cal += task_start + '<A HREF="daySchedule.html"><ID=' + day + ' ONCLICK="chooseDay(' + day + ')">' + day + '</A>' + task_end + TD_end;
	
	
  // PRINTS DAY
  else
  cal += TD_start + '<A HREF="daySchedule.html"><ID=' + day + ' ONCLICK="chooseDay(' + day + ')">' + day + '</A>' + TD_end;

  console.log(window.sessionStorage.getItem("isTask"));
  }

  // END ROW FOR LAST DAY OF WEEK
  if(week_day == DAYS_OF_WEEK)
  cal += TR_end;
  }

  // INCREMENTS UNTIL END OF THE MONTH
  Calendar.setDate(Calendar.getDate()+1);

}// end for loop

cal += '</TD></TR></TABLE></TABLE>';

//  PRINT CALENDAR
document.write(cal);