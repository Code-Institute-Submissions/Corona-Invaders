/*
Comment your code

Notice the comment above the function specifically describes:
1. What it does,
2. What the arguments are, if any (both a description and datatype)
3a. What the function returns, if anything (both a description and datatype),
3b. Any exceptions/errors thrown by the function
*/


//Because my page scrolls down when I pressed the spacebar, I used this code to fix that. I found this code on https://stackoverflow.com/questions/22559830/html-prevent-space-bar-from-scrolling-page
window.onkeydown = function(e) {
    return !(e.keyCode == 32);
};

/* I learned from my mentor Brian today I could better use let instead of var.
var uses something called ‘hoisting’, which can lead to unexpected results.
let and const are both block-scoped. Which means you can declare them in for loop or if statement, and they will only be valid for that block. 
This helps with spotting bugs and makes your code more robust.*/

let spaceship = {
    top: 500,
    left: 265
};
let lasers = [];
let coronas =  [
            { left: 200, top: 100 },
            { left: 300, top: 100 },
            { left: 400, top: 100 },
            { left: 500, top: 100 },
            { left: 600, top: 100 },
            { left: 700, top: 100 },
            { left: 200, top: 175 },
            { left: 300, top: 175 },
            { left: 400, top: 175 },
            { left: 500, top: 175 },
            { left: 600, top: 175 },
            { left: 700, top: 175 }
        ];


document.onkeydown = function(e) {
    console.log(e.keyCode);

    //move spaceship to the left
    if (e.keyCode == 37) {
        console.log("LEFT");
        spaceship.left = spaceship.left - 15;
        moveSpaceship();
    }

    //move spaceship to the right
    else if (e.keyCode == 39) {
        console.log("RIGHT");
        spaceship.left = spaceship.left + 15;
        moveSpaceship();
    }

    // Fire lasers
    else if (e.keyCode == 32) {
        console.log("FIRE");
        lasers.push({
            left: spaceship.left + 15,
            top: spaceship.top - 15
        });
        drawLasers();
    }
    moveSpaceship();
};

function moveSpaceship() {
    document.getElementById("spaceship").style.left = spaceship.left + "px";
    document.getElementById("spaceship").style.top + "px";
}

function drawLasers() {
            document.getElementById('lasers').innerHTML = ""
            for(var i = 0 ; i < lasers.length ; i++ ) {
                document.getElementById('lasers').innerHTML += `<div class='laser' style='left:${lasers[i].left}px; top:${lasers[i].top}px'></div>`;
            }
        }

function moveLasers() {
    for (var i = 0; i < lasers.length; i++) {
        lasers[i].top = lasers[i].top - 8;
    }
}

 function drawCoronas() {
            document.getElementById('coronas').innerHTML = ""
            for(var i = 0 ; i < coronas.length ; i++ ) {
                document.getElementById('coronas').innerHTML += `<div class='corona' style='left:${coronas[i].left}px; top:${coronas[i].top}px'></div>`;
            }
        }

function moveCoronas() {
    for (var i = 0; i < coronas.length; i++) {
        coronas[i].top = coronas[i].top + 1;
    }
}

function collisionDetection() {
    for (var corona = 0; corona < coronas.length; corona++) {
        for (var laser = 0; laser < lasers.length; laser++) {
            if (
                lasers[laser].left >= coronas[corona].left &&
                lasers[laser].left <= (coronas[corona].left + 50) &&
                lasers[laser].top <= (coronas[corona].top + 50) &&
                lasers[laser].top >= coronas[corona].top
            ) {
                coronas.splice(corona, 1);
                laser.splice(laser, 1);
            }
        }
    }
}

function gameLoop() {
    setTimeout(gameLoop, 1000);
    moveLasers();
    drawLasers();
    drawCoronas();
    moveCoronas();
    collisionDetection();
}

gameLoop();