
//Javascript code to * reposition spaceship to the left and the right * Fire red laser

var spaceShip = {
    top: 500,
    left: 265
};

var redLasers = [];

document.onkeydown = function(e) {
    console.log(e.keyCode);

if (e.keyCode == 37){
    console.log("LEFT");
    spaceShip.left = spaceShip.left - 10;
    moveSpaceShip()
}
else if (e.keyCode == 39){
    console.log("RIGHT");
    spaceShip.left = spaceShip.left + 10;
    moveSpaceShip()
}

// Red laser 
else if (e.keyCode == 32){
    console.log("FIRE");
    redLasers.push ({
        left: spaceShip.left + 15,
        top: spaceShip.top
    })
    drawRedLasers()
}
}

function moveSpaceShip() {
   document.getElementById("spaceShip").style.left = spaceShip.left + "px";
}

function drawRedLasers () {
    document.getElementById("redLasers").innerHTML= "";
    for (var redLaser = 0; redLaser < redLasers.length; redLaser = redLaser + 1){
    document.getElementById("redLasers").innerHTML +=
    "<div class='redLaser' style='left ${redLasers[redLaser].left}px; top:${redLasers[redLaser].top}px;'></div>";
}
}

//Because my page scrolls down when I pressed the spacebar, I used this code to fix that:
window.onkeydown = function(e) { 
  return !(e.keyCode == 32);
};