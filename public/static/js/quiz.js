const input = document.querySelector('input');
input.addEventListener('input', updateValue);
var teams = ["patriots", "bills", "jets", "dolphins", "ravens", "browns", "bengals", "steelers", "49ers", "seahawks", "rams", "cardinals", "buccaneers", "saints", "panthers", "falcons", "packers", "bears", "vikings", "lions", "eagles", "giants", "washington", "cowboys", "chiefs", "raiders", "broncos", "chargers", "colts", "titans", "texans", "jaguars"]
const score = document.getElementById('score');
var correct = 0;
var in_game = false;
var resetted = true;
var sec =60;
var clock = document.getElementById("time");
function time(){
	if(in_game){
	sec-=1;
	if(sec<0){
	    score.innerHTML = "Final Score: " +correct+ "/32"; 
		in_game = false
	}
	else{
	clock.innerHTML = "Time: "+sec;
	}}
}
const resetbtn = document.getElementById("reset");
resetbtn.addEventListener('click', reset);
function reset(){
	correct =0;
	in_game = false;
	sec = 60;
	clock.innerHTML = "Time: "+sec;
	teams = ["patriots", "bills", "jets", "dolphins", "ravens", "browns", "bengals", "steelers", "49ers", "seahawks", "rams", "cardinals", "buccaneers", "saints", "panthers", "falcons", "packers", "bears", "vikings", "lions", "eagles", "giants", "washington", "cowboys", "chiefs", "raiders", "broncos", "chargers", "colts", "titans", "texans", "jaguars"]
	resetted = true;
	score.innerHTML = "Score: "+correct;
	ids = ["AN1", "AN2", "AN3", "AN4", "AE1", "AE2", "AE3", "AE4", "AS1", "AS2", "AS3", "AS4", "AW1", "AW2", "AW3", "AW4","NN1", "NN2", "NN3", "NN4", "NE1", "NE2", "NE3", "NE4", "NS1", "NS2", "NS3", "NS4", "NW1", "NW2", "NW3", "NW4"]
	ids.forEach((id)=> {
	var box = document.getElementById(id);
  	box.innerHTML = "";
  	});
}
const startbtn = document.getElementById("start");
startbtn.addEventListener('click', start);
function start(){
	if(resetted){
	in_game = true;
	resetted = false;
	}
	else{
	}
}
var mytimer = setInterval(time, 1000);
function updateValue(e) {
  if(in_game){
  var guess = e.target.value.toLowerCase();
  score.innerHTML = ""+teams.includes(guess);
  if (teams.includes(guess)){
  	var index = teams.indexOf(guess);
	teams.splice(index,1);
  	correct = correct+1;
  	score.innerHTML = "Score: "+correct;
  	input.value ="";
  	var team = guess.charAt(0).toUpperCase() + guess.slice(1);
  	var id;
  	if("Bills"==team)
  		id="AE1";
  	else if("Dolphins"==team)
  		id="AE2";
  	else if("Patriots"==team)
  		id="AE3";
  	else if("Jets"==team)
  		id="AE4";
  	else if("Chiefs"==team)
  		id="AW1";
  	else if("Raiders"==team)
  		id="AW2";
  	else if("Broncos"==team)
  		id="AW3";
  	else if("Chargers"==team)
  		id="AW4";
  	else if("Steelers"==team)
  		id="AN1";
  	else if("Browns"==team)
  		id="AN2";
  	else if("Ravens"==team)
  		id="AN3";
  	else if("Bengals"==team)
  		id="AN4";
  	else if("Colts"==team)
  		id="AS1";
  	else if("Titans"==team)
  		id="AS2";
  	else if("Texans"==team)
  		id="AS3";
  	else if("Jaguars"==team)
  		id="AS4";
  	else if("Eagles"==team)
  		id="NE1";
  	else if("Giants"==team)
  		id="NE2";
  	else if("Washington"==team)
  		id="NE3";
  	else if("Cowboys"==team)
  		id="NE4";
  	else if("Seahawks"==team)
  		id="NW1";
  	else if("Rams"==team)
  		id="NW2";
  	else if("Cardinals"==team)
  		id="NW3";
  	else if("49ers"==team)
  		id="NW4";
  	else if("Packers"==team)
  		id="NN1";
  	else if("Bears"==team)
  		id="NN2";
  	else if("Vikings"==team)
  		id="NN3";
  	else if("Lions"==team)
  		id="NN4";
  	else if("Saints"==team)
  		id="NS1";
  	else if("Buccaneers"==team)
  		id="NS2";
  	else if("Panthers"==team)
  		id="NS3";
  	else if("Falcons"==team)
  		id="NS4";
  	var box = document.getElementById(id);
  	box.innerHTML = team;
  }
  else{
  	score.innerHTML = "Score: "+correct;
  }
}
}