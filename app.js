/* 
Game Function:
- player must guess a number between min and max
- player gets a certain amount of guesses
- notify player of remaining guesses
- notify the player of the correct answer if they lose
- let the player choose to play again
*/

//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI elements
const game = document.querySelector("#game"),
      minNum = document.querySelector(".min-num"),
      maxNum = document.querySelector(".max-num"),
      guessBtn = document.querySelector("#guess-btn"),
      guessInput = document.querySelector("#guess-input"),
      message = document.querySelector(".message");

//Assign UI Min and Max
minNum.textContent = min
maxNum.textContent = max

//play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener("click", function(){
    let guess = parseInt((guessInput.value));
    console.log(guess);
    //Validate
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number betweeen ${min} and ${max}`, 'red')
    } else

    //Check if won
    if(guess === winningNum){
        //Game Over - won
        gameOver(true, `${winningNum} is the correct number, YOU WIN!`)
   
    } else {
        //wrong number
        guessesLeft -= 1

        //check if guesses left
        if(guessesLeft === 0) {
            //game over - lose
            gameOver(false, `Game Over, You lose. The correct number was ${winningNum}.`)
            
        } else {
            //game continues - answer wrong
            
            //change border color
            guessInput.style.borderColor = 'red'
            //clear input
            guessInput.value = ''
            //set message
            setMessage(`${guess} is not corect. Guesses left: ${guessesLeft}`, 'red')

        }
    }
})

// Set message
function setMessage(msg, color){
    message.style.color = color
    message.textContent = msg
}

//get winning number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min + 1) + min)
}

// Game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red'
    
    // Disable input
    guessInput.disabled = true
    //change border color
    guessInput.style.borderColor = color
    //set message
    setMessage(msg, color)
    
    // Play again
    guessBtn.value = "Play Again?"
    guessBtn.className += "play-again"
}


