var play_game = true;
var jumping = false;
var falling = false;
var framerate = 1;
var timerate = 0.03;
var rex = document.getElementById('rex');
var floor = document.getElementById('floor');
var line = document.getElementById('line');
var loss = document.getElementById('loss');
var score = document.getElementById('score');
var y;
var cact_x = 80;
var time = 0;
var floorval = ' - . `- ._ - `-` _,- - . `- ._ - `-` _,- - . `- ._ - `-` _,- - . `- ._ - `-` _,-';
var bumpval = '________________________________________________________________________.-._____'
var ducking = false;
var lose = false;

var rex_shape1 = '&nbsp;&nbsp;&nbsp;[o ]<br>\\ / /-<br>&nbsp;}_\'-';
var rex_shape2 = '&nbsp;&nbsp;&nbsp;[o ]<br>\\ / /-<br>&nbsp;\'-}_';
var rex_shape3 = '<br>&nbsp;&nbsp;&nbsp;[o ]<br>==}_}-';
var cactus = '&nbsp;n <br>nHn<br>&nbsp;H';

function init() {
    y = 0;
}

function restart() {
    lose = false;
    play_game = true;
    loss.innerHTML = '';
    y = 0;
    floor.innerHTML = floorval;
    line.innerHTML = bumpval;
    cact_x = 80;
    time = 0;
    requestAnimationFrame(mainLoop);
}

function play(event) {
    var key = event.keyCode;
    if (key == 32){
        if (!play_game) {
            play_game = true;
            requestAnimationFrame(mainLoop);
        }
        else if (time == 0) requestAnimationFrame(mainLoop);
        else if (lose) {
            restart();
        } else if (!jumping && !falling) jumping = true;
    }
    else if (key == 27) play_game = false;
    else if (key == 38 && !jumping && !falling) jumping = true;
    else if (key == 40 && y == -1) ducking = true
}

function play_mobile(event) {
    if (time == 0) requestAnimationFrame(mainLoop);
    else if (!jumping && !falling) jumping = true;
    if (lose) restart();
    if (!play_game) {
        play_game = true;
        requestAnimationFrame(mainLoop);
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

function move_elem(time, id, x){
    var x = 80 - Math.round(time*8)%80;
    var elem = document.getElementById(id);
    elem.setAttribute("style", "position: absolute; margin-left:"+x+"vw");
    return x;
}

function check_loss(x, y) {
    if (x == 1 && y < 5) return true;
    else return false;
}

function mainLoop() {
    if (!lose){
        time += timerate
        if (Math.round(time*100)%5 == 1){
            y = update_rex(y);
        }
        var new_floor = update_floor(time, floorval);
        var new_bump = update_floor(time, bumpval);
        cact_x = move_elem(time, 'cact', cact_x);
        var adjust = (-y) -1;

        var score_num = Math.round(time*100);
        rex.setAttribute("style", "position: absolute; margin-top:"+adjust+"vw");
        if (!ducking) {
            rex.innerHTML = (Math.round(time*2)%2) ? rex_shape1 : rex_shape2;
        }
        else rex.innerHTML = rex_shape3;
        floor.innerHTML = new_floor;
        line.innerHTML = new_bump;
        score.innerHTML = score_num;
        document.getElementById('cact').innerHTML = cactus;
        lose = check_loss(cact_x, y);
        if (play_game) {
            requestAnimationFrame(mainLoop);
        }
        else return
    } else {
        loss.innerHTML = "you lose :("
    }
}