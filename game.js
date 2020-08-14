
document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const resultDisplay = document.querySelector('#result')
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

function moveCoronaInvaders() {	
	const leftEdge = coronaInvaders[0] % width === 0
	const rightEdge = coronaInvaders[coronaInvaders.length - 1] % width === width - 1
	
	if((leftEdge && direction === -1) || (rightEdge && direction === 1)){
	direction = width
	} else if (direction === width) {
	if (leftEdge) direction = 1
    else direction = -1
    // you hear exciting space music when you play the game
    gameMusic.play();
	}
	for (let i = 0; i <= coronaInvaders.length - 1; i++) {
    squares[coronaInvaders[i]].classList.remove('invader')
    gameMusic.play();
	}
	for (let i = 0; i <= coronaInvaders.length - 1; i++) {
    coronaInvaders[i] += direction
    gameMusic.play();
	}
	for (let i = 0; i <= coronaInvaders.length - 1; i++) {
        if (!coronaInvadersTakenDown.includes(i)){
            squares[coronaInvaders[i]].classList.add('invader')
            gameMusic.play();
        }
        
}


// Code for Game Over
// If the corona alien comes in contact with the spaceship the game is over

if(squares[currentSpaceShipIndex].classList.contains('invader', 'spaceship')) {
    resultDisplay.textContent = 'Game Over'
    squares[currentSpaceShipIndex].classList.add('explosion')
    clearInterval(invaderID)
    // when you lose you hear an explosion sound
    gameOver.play();
    gameMusic.pause();
}


// if any of the corona aliens miss the spaceship , but reach end of the grid, the game is also over

for (let i = 0; i <= coronaInvaders.length -1; i++) {
    if(coronaInvaders[i] > (squares.length - (width-1))) {
        resultDisplay.textContent = 'Game Over'
        clearInterval (invaderID)
        // when you lose you hear an explosion sound
         gameOver.play();
         gameMusic.pause();
    }

// Code if you Win the Game

if(coronaInvadersTakenDown.length === coronaInvaders.length) {
      console.log(coronaInvadersTakenDown.length)
      console.log(coronaInvaders.length)
      resultDisplay.textContent = 'You Win'
      clearInterval(invaderId)
      // when you win you hear kids cheering
      youWin.play();
    }

}
}

invaderID = setInterval(moveCoronaInvaders, 500)


// Code for shooting at the corona Invaders with lasers

function shoot(e) {
    let laserId
    let currentLaserIndex = currentSpaceShipIndex
    

    //move the laser from the shooter to the corona invader

    function moveLaser() {
      squares[currentLaserIndex].classList.remove('laser')
      currentLaserIndex -= width
      squares[currentLaserIndex].classList.add('laser')
      if(squares[currentLaserIndex].classList.contains('invader')) {
        squares[currentLaserIndex].classList.remove('laser')
        squares[currentLaserIndex].classList.remove('invader')
        squares[currentLaserIndex].classList.add('boom')
        
        

// Let the boom appear for a short time


        setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250)
        clearInterval(laserId)

        const coronaTakenDown = coronaInvaders.indexOf(currentLaserIndex)
        coronaInvadersTakenDown.push(coronaTakenDown)
        result++
        resultDisplay.textContent = result
        boom.play();
      }

      if(currentLaserIndex < width) {
        clearInterval(laserId)
        setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100)
      }
    }

// I want the laser to be shooted with the spacebar key on my keyboard

switch(e.keyCode) {
      case 32:
        laserId = setInterval(moveLaser, 100)
        break
    }
  }

  document.addEventListener('keyup', shoot)


})

// load audio files


const gameMusic = new Audio();
const youWin = new Audio();
const gameOver = new Audio();
const boom = new Audio();

gameMusic.src = "assets/audio/GameMusic.mp3"
youWin.src = "assets/audio/cheering.mp3"
gameOver.src = "assets/audio/GameOver.wav"
boom.src = "assets/audio/boom.wav"