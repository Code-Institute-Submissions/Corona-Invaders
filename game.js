
//javascript code to reposition spaceship to the left and the right. 

var spaceShip = {
    top: 500,
    left: 265
};

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
}

function moveSpaceShip() {
   document.getElementById("spaceShip").style.left = spaceShip.left + "px";
}
