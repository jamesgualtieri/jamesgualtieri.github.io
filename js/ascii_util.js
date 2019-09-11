var raw = "";
var str = "";
var time = 0.0


function init() {
    raw = '............'
}

function convert_raw_to_format(raw, width, height){
    console.log(raw, width, height);
    str = "";
    if (raw.length != width*height) {
        console.log("mismatched data");
        return "";
    }
    for (i = 0; i < height; i++) { 
      for (j = 0; j < width; j++) {
        str += raw[i*width + j];
      }
      str += "<br>";
    }
    return str;
}

function test() {
    str = convert_raw_to_format(raw, 4, 3);
    console.log(str);
    requestAnimationFrame(mainLoop);
    console.log(div1);
}

function update_raw(raw){
    var i = Math.round(time) % raw.length;
    console.log(i);
    if (i == 0) raw = "0" + raw.substring(1, raw.length);
    else raw = raw.substring(0, i-1)+ "0" + raw.substring(i, raw.length);
    return convert_raw_to_format(raw, 4, 3);

}

function mainLoop() {
    time+= 0.06
    console.log(time);
    str = update_raw(raw);
    var div1 = document.getElementById('div1');
    var div2 = document.getElementById('div2');
    div1.innerHTML = raw;
    div2.innerHTML = str;
    requestAnimationFrame(mainLoop);
}