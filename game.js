//Because my page scrolls down when I pressed the spacebar, I used this code to fix that. I found this code on https://stackoverflow.com/questions/22559830/html-prevent-space-bar-from-scrolling-page
window.onkeydown = function(e) { 
  return !(e.keyCode == 32);
};


//Javascript code to * reposition spaceship to the left and the right * Draw red Lasers

var spaceShip = {
    top: 500,
    left: 265
};
var redLasers = [];
var blueCoronas = [
            { left: 200, top: 100 },
            { left: 300, top: 100 },
            { left: 400, top: 100 },
            { left: 500, top: 100 },
            { left: 600, top: 100 },
            { left: 700, top: 100 },
            { left: 800, top: 100 },
            { left: 900, top: 100 },
            { left: 200, top: 175 },
            { left: 300, top: 175 },
            { left: 400, top: 175 },
            { left: 500, top: 175 },
            { left: 600, top: 175 },
            { left: 700, top: 175 },
            { left: 800, top: 175 },
            { left: 900, top: 175 }
        ];


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

function drawRedLasers() {
    document.getElementById("redLasers").innerHTML=""
    for (var redLaser = 0; redLaser < redLasers.length; redLaser = redLaser + 1){
    document.getElementById("redLasers").innerHTML +=
    "<div class='redLaser' style='left:${redLasers[redLaser].left}px; top:${redLasers[redLaser].top}px;'></div>";
}
}

function moveRedLasers() {
            for(var i = 0 ; i < redLasers.length ; i++ ) {
                redLasers[i].top = redLasers[i].top - 8
            }
        }

function drawCorona() {
    document.getElementById("blueCoronas").innerHTML=""
    for (var blueCorona = 0; blueCorona < blueCoronas.length; blueCorona = blueCorona + 1){
    document.getElementById("blueCoronas").innerHTML +=
    "<div class='blueCorona' style='left:${blueCoronas[blueCorona].left}px; top:${blueCoronas[blueCorona].top}px;'></div>";
}
}

function gameLoop() {
            setTimeout(gameLoop, 1000)
            moveRedLasers();
            drawRedLasers();
            drawCorona();
}

gameLoop()
