var counter = 0;
var child = 0;

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
		play_boop()
	}
	else if ((key == 40 || key == 83)&& child < len-1){
		child += size;
		play_boop()
	}
	else if (key == 13){
        play_boop()
		toggle_open()
	}
	else if (key == 27){
        play_boop()
		toggle_closed()
	}
	for (var i = 0; i < len; i++){
		var current = body.children[i];
		var next = current.children[1];
		current.className = current.className.replace("-active", "");
		next.className = next.className.replace("-active", "");
	}
	var activeElem = body.children[child];
	var activeNext = activeElem.children[1]
    console.log(activeNext)
	activeElem.className += "-active";
	activeNext.className += "-active";
}

function sub_navigate(event) {
    var key = event.keyCode;
    if (key == 27){
        window.history.back()
    }
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
    var proj = document.getElementById("projects")
    var home = document.getElementById("home")
    var resume = document.getElementById("resume")
    var exp = document.getElementById("experience")
    if (elem == proj) {
        window.location.href = "projects.html";
    }
    else if (elem == home) {
        window.location.href = "index.html";
    }
    else if (elem == resume) {
        window.location.href = "/media/resume.pdf";
    }
    else if (elem == exp) {
        window.location.href = "experience.html";
    }
    else if (elem.style.display != "block") {
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
    play_boop()

    if (id == "projects") {
        window.location.href = "projects.html";
    }
    else if (id == "home") {
        window.location.href = "index.html";
    }
    else if (id == "experience") {
        window.location.href = "experience.html";
    }
    else if (id == "resume") {
        window.location.href = "/media/resume.pdf";
    }
    else if (elem.style.display == "block") {
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

function play_boop(){
	boop = new sound("media/boop.wav");
    boop.play();
}

function sound(src) {
    var old_sound = document.getElementById('beep-boop')
	if (old_sound != null){
		old_sound.parentNode.removeChild(old_sound);
	}
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    this.sound.setAttribute('id', 'beep-boop');
    this.sound.style.display = 'none';

    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

function go_back() {
    window.location.hash = window.location.lasthash[window.location.lasthash.length-1];
    //blah blah blah
    window.location.lasthash.pop();
}