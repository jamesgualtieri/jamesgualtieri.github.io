
  function startTime() {
    var now = new Date();
    var h = ((now.getHours() + 11) % 12 + 1);
    var m = now.getMinutes();
    var s = now.getSeconds();
    m = addZerostoNumberslessThanten(m);
    s = addZerostoNumberslessThanten(s);

  var string = h + ":" + m + ":" + s;
  var img = numberToimagesOfyou(string);
  document.getElementById('clock').innerHTML = img;

  var t = setTimeout(startTime, 1000);
}

function addZerostoNumberslessThanten(i) {
  if (i < 10) {
    i = "0" + i
  } 
  return i;
}

function numberToimagesOfyou(s) {
  var canvas = ""
  for (var i = 0; i < s.length; i++) {
    canvas = canvas + "<img width='12.5%' src='" + img[s[i]] + "'/>"
  }
  return canvas
}


var img = {
  "1": "img/1.png",
  "2": "img/2.png",
  "3": "img/3.png",
  "4": "img/4.png",
  "5": "img/5.png",
  "6": "img/6.png",
  "7": "img/7.png",
  "8": "img/8.png",
  "9": "img/9.png",
  "0": "img/0.png",
  ":": "img/colon.png"
}

//code in part derived from https://stackoverflow.com/questions/42964421/digital-clock-with-images
