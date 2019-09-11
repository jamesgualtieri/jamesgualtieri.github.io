var history_array = ["!#/bin/sh"];
var std_out = document.getElementById("std_out");
var h_index = 0;

function std_in() { 
    var key = window.event.keyCode;
    var div = document.getElementById("std_in");
    //return
    if(key == 13) {
        const input = div.value;
        history_array.push(input);
        log(input)
        parse(input);
        div.value="";
        play_beep_boop();
        return false;
    }
    //up
    else if(key == 38) {
        console.log(h_index);
        if (h_index < history_array.length - 1) h_index += 1;
        div.value = history_array[h_index]
        return false;
    } 
    //down
    else if(key == 40) { 
        console.log(h_index);
        if (1 < h_index) h_index -= 1;
        div.value = history_array[h_index]
        return false;
    }
    else return true;
}

function parse(input) {
    var new_div = document.createElement("DIV");
    new_div.className="line";
    std_out.appendChild(new_div);
    type_line("longer phraseee", new_div);
}

function parse(input){
    if (input=="h" || input == "history") {
        log_history();
    } else if (input=="c" || input == "clear") {
        clear_std_out();
    } else if (input=="help") {
        log_help()
    } else if (input=="ls") {
        log_ls()
    } else if (input.startsWith("cd")) {
        cd(input);
    } else if (input.startsWith("echo ")) {
        echo(input);
    } else if (input.startsWith("cat ")) {
        cat(input);
    } else if (input =="") {
        log("");
    } else if (input =="!#/bin/sh") {
        window.location.href = "index.html";
    } else {
        log_error(input);
    }
}

function log_history() {
    for (i = 0; i < history_array.length - 1; i++){
        var elem=document.createElement("DIV");
        elem.className = "line";
        elem.innerHTML = history_array[i];
        std_out.appendChild(elem);
    }
}

function clear_std_out() {
    while(std_out.firstChild) {
        std_out.removeChild(std_out.firstChild);
    }
}

function log_error(input) {
    console.log(input);
    var elem=document.createElement("DIV");
    elem.className = "line";
    elem.innerHTML = "<br>unable to interpret \'" + 
        input + ` \' <br>type \'help\' for a list of useful commands<br>
        this is a simple website, not a real shell ;)`
    std_out.appendChild(elem);
}

function log_help() {
    var elem=document.createElement("DIV");
    elem.className = "line";
    elem.innerHTML = `<br>
-----------------------------www.jamesgualtieri.com----------------------------<br>
----------------------------------micro shell----------------------------------<br>
        &nbsp; <br>
        help: give a list of useful commands<br>
        history: see list of previous entered commands<br>
        clear: clear the console<br>
        ls: give a list of navigable items, e.g. page names, writeups<br>
        cd: usage \'cd {page}\', navigate to a page <br>
        cat: usage \'cat {item}\' log writeup to console.`
    std_out.appendChild(elem);
}

function log_ls() {
    log("<br>name_________________________________type");
    var ls=document.getElementById('ls-target');
    console.log(ls);
    for (i=0; i < ls.childNodes.length; i++){
        if (ls.childNodes[i].innerHTML){
            var elem=document.createElement("DIV");
            elem.innerHTML=ls.childNodes[i].innerHTML;
            std_out.appendChild(elem);
        }
    }
    var elem = document.createElement("BR");
    std_out.appendChild(elem);
}

function echo(input) {
    log(input.substring(5,input.length));
}

function cd(input) {
    const page = input.substring(3,input.length);
    console.log(page);
    if (page == "~" || page =="$HOME" || page=="..") 
        window.location.href = "index.html";
    else {
        window.location.href = page;

    }
}

function cat(input) {
    arg = input.substring(4, input.length);
    var div = document.getElementById(arg);
    if (!div) {
        log ("error: there is writeup on this directory for: " + arg);
        return;
    }
    var elem=document.createElement("DIV");
    elem.className="line";
    elem.innerHTML=div.innerHTML;
    std_out.appendChild(elem);
}

function log(input) {
    var elem=document.createElement("DIV");
    elem.className = "line";
    elem.innerHTML = "&nbsp;" + input + "<br>";
    std_out.appendChild(elem);
}

function play_beep_boop(){
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