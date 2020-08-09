document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const resyltDisplay = document.querySelector('#result')
    let width = 15;
    let currentSpaceShipIndex = 194
    let currentInvaderIndex = 0
    let coronaInvadersTakenDown = []
    let result = 0
    let direction = 1
    let invaderId


//define the corona alien invaders how to appear in my squares array, set their position

const coronaInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

// Draw the corona alien inavers

coronaInvaders.forEach( invader => squares[currentInvaderIndex + invader].classList.add('invader'))

// Draw the spaceship

squares[currentSpaceShipIndex].classList.add('spaceship')

//Move the spaceship from left to right

function moveSpaceShip(e) {
    squares[currentSpaceShipIndex].classList.remove('spaceship')
    switch(e.keyCode) {

    // left arrow on my keyboard
        case 37:
            if(currentSpaceShipIndex % width !== 0) currentSpaceShipIndex -=1
            break
    // right arrow on my keyboard
        case 39:
            if(currentSpaceShipIndex % width < width -1) currentSpaceShipIndex +=1
            break
    }
    squares[currentSpaceShipIndex].classList.add('spaceship')
}
document.addEventListener('keydown', moveSpaceShip)

// Move the corona aliens and put them in a time loop

const moveInvaders () {
    const letfEdge coronaInvaders[0] % width === 0
    const rightEdge coronaInvaders[coronaInvaders.length -1] % width === width -1

    if ((leftEdge && direction === -1)) || ((rightEdge && direction === -1)){
        direction = width
    } else if (direction === width){
        if (leftEdge) direction = -1
        else direction = -1
    }
for (let i = 0; i <= coronaInvaders.length -1; i++){
    squares[coronaInvaders[i]].classList.remove('invader')
}
for (let i = 0; i <= coronaInvaders.length -1; i++){
    coronaInvader[i] += direction
}
for (let i = 0; i <= coronaInvaders.length -1; i++){
    squares[coronaInvaders[i]].classList.add('invader')

})

