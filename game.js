
//Javascript code to * reposition spaceship to the left and the right * Fire red laser

var spaceShip = {
    top: 500,
    left: 265
};

var redLaser = [];

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
    redLaser.push ({
        left: spaceShip.left + 15,
        top: spaceShip.top
    })
}
}

function moveSpaceShip() {
   document.getElementById("spaceShip").style.left = spaceShip.left + "px";
}

function drawredLaser () {
    document.getElementById("redLasers").innerHTML= "";
    for (var redLaser = 0; redLaser < redLasers.length; redLaser = redLaser + 1){

    }
}