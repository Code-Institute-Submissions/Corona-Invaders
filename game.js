
//javascript code to reposition spaceship to the left and the right. 

var spaceship = {
    top: 500,
    left: 265
};

document.onkeydown = function(e) {
    console.log(e.keyCode);

if (e.keyCode == 37){
    console.log("LEFT");
    spaceship.left = spaceship.left - 10;
    moveSpaceship()
}
else if (e.keyCode == 39){
    console.log("RIGHT");
    spaceship.left = spaceship.left + 10;
    moveSpaceship()
}
}

function movespaceship() {
   document.getElementById("spaceship").style.left = spaceship.left + "px";
}
