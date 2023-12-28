'use strict';

// Elements
const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Buttons
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let currentScore, currentPlayer, score, stillPlaying;

let init = function() {
  currentScore = 0;
  currentPlayer = 0;
  score = [0, 0];
  stillPlaying = true;
  
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
  console.log('niyi');
}
init();

let switchPlayer = function () {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentScore = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function() {
  if (stillPlaying) {
      // Generating random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    console.log(diceRoll);
    
    // Displaying dice roll
    diceEl.classList.remove('hidden');
    diceEl.src =`dice-${diceRoll}.png`;

    // Check if dice roll is 1
    //  Add dice roll to current score
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${currentPlayer}`).textContent = currentScore;
    } else {
      // switch palyers
      switchPlayer();
    }
  }
})

// Holding score functionality
btnHold.addEventListener('click', function() {
  if (stillPlaying){
      // Adding current score to total score
    score[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent = score[currentPlayer];

    // check if total score is >= 100
      if (score[currentPlayer] >= 100) {
        document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
        diceEl.classList.add('hidden');
        stillPlaying = false;
      }

    // Switch players
    switchPlayer();
  }
})

//  Resetting the game
btnNew.addEventListener('click', init)