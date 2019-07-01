var play_game = true;
var jumping = false;
var falling = false;
var framerate = 1;
var timerate = 0.01;
var rex = document.getElementById('rex');
var floor = document.getElementById('floor');
var line = document.getElementById('line');
var y;
var time = 0;
var floorval = ' - . `- ._ - `-` _,- - . `- ._ - `-` _,- - . `- ._ - `-` _,- - . `- ._ - `-` _,-';
var bumpval = '_____________________________________________________________________________.-.'
var ducking = false;

var rex_shape1 = '&nbsp;&nbsp;&nbsp;[o ]<br>\\ / /-<br>&nbsp;}_\'-'
var rex_shape2 = '&nbsp;&nbsp;&nbsp;[o ]<br>\\ / /-<br>&nbsp;\'-}_'
var rex_shape3 = '<br>&nbsp;&nbsp;&nbsp;[o ]<br>==}_}_'
function init() {
    y = 0;
}

function play(event) {
    var key = event.keyCode;
    console.log(key);
    if (key == 32){
        play_game = true;
        requestAnimationFrame(mainLoop);
    }
    else if (key == 27) {
        play_game = false;
    }
    else if (key == 38 && !jumping && !falling){
        jumping = true;
    }
    else if (key == 40 && y == -1){
        ducking = true
    }
}

function keyup(event) {
    ducking = false;
}

function update_rex(y) {
    if (jumping) {
        y+= 1;
        if (y >= 10) {
            jumping = false;
            falling = true;
        }
    }
    else if (y >= 0 & !jumping && falling) {
        y -= 1;
    }
    else falling = false;
    return y;
}

function update_floor(time, whichval){
    var mod = Math.round(time*8)%80;
    var str = whichval;
    var ret = str.substring(mod, 80).concat() + str.substring(0, mod);
    return ret;
}

function mainLoop() {
    time += timerate
    if (Math.round(time*100)%8 == 1){
        y = update_rex(y);
    }
    var new_floor = update_floor(time, floorval);
    var new_bump = update_floor(time, bumpval);

    console.log("y: " + y + ", time = " + time + " ducking: " + ducking);
    var adjust = (-y) -1;

    rex.setAttribute("style", "position: absolute; margin-top:"+adjust+"vh");
    if (!ducking) {
        rex.innerHTML = (Math.round(time*2)%2) ? rex_shape1 : rex_shape2;
    }
    else rex.innerHTML = rex_shape3;
    floor.innerHTML = new_floor;
    line.innerHTML = new_bump;
    if (play_game) {
        requestAnimationFrame(mainLoop);
    }
    else return

}
// requestAnimationFrame(mainLoop);