// MIT License
// Copyright (c) 2020 Luis Espino

function reflex_agent(location, state){
   	if (state=="DIRTY") return "CLEAN";
   	else if (location=="A") return "RIGHT";
   	else if (location=="B") return "LEFT";
}

function random_dirt(states) {
	let random = Math.floor(Math.random() * 3);
	if (random == 1) {
		states[1] = "DIRTY";
		document.getElementById("log").innerHTML+="<br>Dirty A";
	} else if (random == 2) {
		states[2] = "DIRTY";
		document.getElementById("log").innerHTML+="<br>Dirty B";
	}
}

function state_key(states) {
	return states.join('-');
}

function test(states, visiteds) {
	var key = state_key(states);
	if (!visiteds[key]) {
		document.getElementById("log").innerHTML+="<br>State: ".concat(key);
	}
	var location = states[0];		
	var state = states[0] == "A" ? states[1] : states[2];
	var action_result = reflex_agent(location, state);
	document.getElementById("log").innerHTML+="<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);

	visiteds[key] = true;

	if(Object.keys(visiteds).length == 8) {
		document.getElementById("log").innerHTML+="<br>All states visited";
		return;
	}

	if (action_result == "CLEAN"){
		if (location == "A") states[1] = "CLEAN";
		else if (location == "B") states[2] = "CLEAN";
	}
	else if (action_result == "RIGHT") states[0] = "B";
	else if (action_result == "LEFT") states[0] = "A";
	
	random_dirt(states);
	document.getElementById("log").innerHTML+="<br>";
	setTimeout(function(){ test(states, visiteds); }, 2000);
}

var states = ["A","DIRTY","DIRTY"];
var visiteds = {};
test(states, visiteds);	
