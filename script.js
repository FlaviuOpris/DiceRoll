'use strict';
//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

//Starting conditions
let scores, currentScore, activePlayer, playing;

//Random player start
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer;
  playing = true;
  diceEl.classList.add(`hidden`);
  document.querySelector(`.player--0`).classList.remove(`player--winner`);
  document.querySelector(`.player--1`).classList.remove(`player--winner`);
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  document.querySelector(`.player--0`).classList.remove(`player--active`);
  document.querySelector(`.player--1`).classList.remove(`player--active`);
  activePlayer = Math.random() < 0.5 ? 0 : 1;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add(`player--active`);
};

init();

//Switch player function
const switchplayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
  diceEl.classList.add(`hidden`);
};

//Rolling dice functionallity
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    //Generate a random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display the roll
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;

    //Check for rolled 1.
    if (dice !== 1) {
      //Adding score to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //If true, switch to next player
      switchplayer();
    }
  }
});

//Score hold functionality
btnHold.addEventListener(`click`, function () {
  if (playing) {
    //1. Adding the current score to total score of the active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //Check if total score is >100
    if (scores[activePlayer] >= 100) {
      playing = false;
      console.log(`Player ${activePlayer} wins`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      diceEl.classList.add(`hidden`);
      //Switch player
    } else {
      switchplayer();
    }
  }
});

btnNew.addEventListener(`click`, init);
