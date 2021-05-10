// GAME VARIABLES
let min = 1,
  max = 10,
  winnigNum = getRandomNumber(min, max),
  guessesLeft = 3;

// UI variables
const
  UIgameDiv = document.querySelector('#game'),
  UIminNum = document.querySelector('.min-num'),
  UImaxNum = document.querySelector('.max-num'),
  UIguessInput = document.querySelector('#guess-input'),
  UIguessBtn = document.querySelector('#guess-btn'),
  UImessage = document.querySelector(".message");

// show min and max number in UI
UIminNum.textContent = min;
UImaxNum.textContent = max;

// Listen to play-again button, since it is dynamic, use event delegation
UIgameDiv.addEventListener('mousedown', function (e) {
  if (e.target.classList.contains('play-again')) {
    window.location.reload();
  }
});


// Listen to guess btn event
UIguessBtn.addEventListener('click', function () {
  // Parse the input value into Number, empty string when parsed to number is NaN
  const guess = parseInt(UIguessInput.value);
  // VALIDATE THE GUESS INPUT
  if (isNaN(guess) || guess < min || guess > max) {
    showMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  else if (guess === winnigNum) {
    // Gameover - won
    gameOver(`${guess} is the correct answer, YOU WON!`, true);

  }
  else {
    // wrong number
    guessesLeft -= 1
    if (guessesLeft === 0) {
      // Gameover - Lost
      gameOver(`OOPS! you ran out of guesses. Correct number was ${winnigNum}`, false);

    }
    else {
      //Wrong guess try again
      showMessage(`WRONG GUESS! ${guessesLeft} more guesses left`, 'red');
      UIguessInput.value = "";

    }
  }
})

function showMessage(msg, color) {
  UImessage.textContent = msg;
  UImessage.style.color = color;
  UIguessInput.style.borderColor = color;
}

function gameOver(msg, won) {
  // disable input
  UIguessInput.disabled = true;
  // set message
  showMessage(msg, won == true ? 'green' : 'red');
  // change the button and add a class
  UIguessBtn.value = 'play Again';
  UIguessBtn.className += ' play-again';
}

function getRandomNumber(min, max) {
  return (Math.floor(Math.random() * (max - min + 1) + min));
}