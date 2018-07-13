var counter = 0;
var child = 0;

var heading = `
     ██╗ █████╗ ███╗   ███╗███████╗███████╗
     ██║██╔══██╗████╗ ████║██╔════╝██╔════╝
     ██║███████║██╔████╔██║█████╗  ███████╗
██   ██║██╔══██║██║╚██╔╝██║██╔══╝  ╚════██║
╚█████╔╝██║  ██║██║ ╚═╝ ██║███████╗███████║
 ╚════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝
`
function test(){
	div1 = document.getElementById("div1");

	var span = document.createElement("span");
	var node = document.createTextNode("A");
	span.appendChild(node);
	div1.appendChild(span);
}

function navigate(event) {
	const size = 1
	var key = event.keyCode;
	console.log(key)
	body = document.getElementById('div1');
	var len = body.children.length;
	if ((key == 38 || key == 87)&& child != 0){
		child -= size;
	}
	else if ((key == 40 || key == 83)&& child < len-1){
		child += size;
	}
	else if (key == 13){
		toggle_open()
	}
	else if (key == 27){
		toggle_closed()
	}
	for (var i = 0; i < len; i++){
		var current = body.children[i];
		var next = current.children[1];
		console.log(current.children[1])
		current.className = current.className.replace("-active", "");
		next.className = next.className.replace("-active", "");
	}
	var activeElem = body.children[child];
	var activeNext = activeElem.children[1]
	// var activeElem2 = body.children[child+1];
	activeElem.className += "-active";
	activeNext.className += "-active";
}


function writeCharacter(char) {
	counter ++;
	div1 = document.getElementById("div1");
	if (counter %20 == 0){
		div1.appendChild(document.createElement("div"));
	}
	var span = document.createElement("span");
	var node = document.createTextNode(char.toString());
	span.appendChild(node);
	div1.appendChild(span);

}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function writeString(string){
	var end = string.length;
	for (var i = 0; i < string.length; i++) {
		writeCharacter(string[i]);
	}

}

function toggle_open() {
    var elem = document.getElementsByClassName("next-active")[0].children[0];
    if (elem.style.display != "block") {
        elem.style.display = "block";
    }
}

function toggle_closed() {
    var elem = document.getElementsByClassName("next-active")[0].children[0];
    if (elem.style.display != "none") {
        elem.style.display = "none";
    } 
}

function toggle(id) {
    var elem = document.getElementById(id);
    console.log(elem.style.display)
    if (elem.style.display == "block") {
        elem.style.display = "none";
    } 
    else {
    	elem.style.display = "block"
    }
}

function go(){
	str = document.getElementById('text').value;
	writeString(str)
}