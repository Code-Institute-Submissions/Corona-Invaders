
// The DOMContentLoaded event fires when my initial HTML document has been completely loaded and parsed

document.addEventListener('DOMContentLoaded', () => {

//The const keyword creates a read-only reference to a value. 
//The const keyword creates block-scoped variables whose values can’t be reassigned. https://www.javascripttutorial.net/es6/javascript-const/    
    const squares = document.querySelectorAll('.grid div')
    const resultDisplay = document.querySelector('#result')

//The let statement declares a block-scoped local variable, optionally initializing it to a value.
// https://developer.mozilla.org/
    let width = 15;
    let currentSpaceShipIndex = 194
    let currentInvaderIndex = 0
    let coronaInvadersTakenDown = []
    let result = 0
    let direction = 1
    let invaderId

    
//These are the corona invaders that appear in my squares array. Its their position in my grid

const coronaInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

// Draw the corona alien invaders. 
// The forEach() method callbacks the invader array and add invader to my squares at 0 in currentInvaderIndex.
// with classList.add I add my pink corona invader

coronaInvaders.forEach( invader => squares[currentInvaderIndex + invader].classList.add('invader'))

// Draw the spaceship. 
// Using classList.add to add my spaceship in the grid of squares at 194

squares[currentSpaceShipIndex].classList.add('spaceship')


//I use a function to perform a task and its to move the blue spaceship from left to right in my squares grid

function moveSpaceShip(e) {
    squares[currentSpaceShipIndex].classList.remove('spaceship')
    switch(e.keyCode) {

    // 37 is the left arrow on my keyboard
        case 37:
            //-= Subtraction assignment
            if(currentSpaceShipIndex % width !== 0) currentSpaceShipIndex -=1
            //The break statement "jumps out" of the loop.
            break
    // 39 is the right arrow on my keyboard
        case 39:
            // += Addition assignment
            if(currentSpaceShipIndex % width < width -1) currentSpaceShipIndex +=1
            break
    }
    squares[currentSpaceShipIndex].classList.add('spaceship')
}

//The keydown event is fired when a key is pressed.
//The document.addEventListener() method attaches the keydown to moveSpaceShip to the document.
document.addEventListener('keydown', moveSpaceShip)



// Move the corona aliens and put them in a time loop

function moveCoronaInvaders() {	
    // Define left edge and right edge, so the corona invaders don't carry on outside the grid
	const leftEdge = coronaInvaders[0] % width === 0
	const rightEdge = coronaInvaders[coronaInvaders.length - 1] % width === width - 1
    
  // move a whole row direction
	if((leftEdge && direction === -1) || (rightEdge && direction === 1)){
	direction = width
	} else if (direction === width) {
	if (leftEdge) direction = 1
    else direction = -1

    // you hear exciting space music when you play the game
    gameMusic.play();

    // Invaders array to move all the corona invaders
	}
	for (let i = 0; i <= coronaInvaders.length - 1; i++) {
    squares[coronaInvaders[i]].classList.remove('invader')
    gameMusic.play();
    }
    //
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