let scores, roundScore, activePlayer, gamePlaying, previousRoll, winnerScore;

const diceImg = document.querySelector("#dice");
const inputSetScore = document.getElementById("set-score");

init();

document.querySelector(".roll-dice").addEventListener("click", function() {
  if (gamePlaying) {
    let dice = Math.floor(Math.random() * 6) + 1;
    diceImg.src = "./images/dice-" + dice + ".png";
    diceImg.alt = "dice-image";
    upCurScr(dice);
  }
});

document.querySelector(".hold").addEventListener("click", function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;

    document.querySelector("#player-" + activePlayer + "-score").textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= winnerScore) {
      document.querySelector(".options").style.display = "none";
      document.querySelector("#player-" + activePlayer).textContent =
        "Winner!!!";
      document.querySelector("#current-score-" + activePlayer).textContent =
        "0";
      diceImg.src = "";
      diceImg.alt = "";
      gamePlaying = false;
    } else nextPlayer();
  }
});

document.querySelector(".new-game").addEventListener("click", () => {
  document.querySelector(".game-section").classList.add("blur-filter");
  document.querySelector(".new-game-popup").classList.add("show-content");

  document.querySelector(".play-button").addEventListener("click", () => {
    if (inputSetScore.value >= 20 && inputSetScore.value <= 200) {
      winnerScore = inputSetScore.value;
      document.querySelector(".options").style.display = "block";
      document.querySelector(".game-section").classList.remove("blur-filter");
      document
        .querySelector(".new-game-popup")
        .classList.remove("show-content");
      init();
    }
  });
});

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  previousRoll = 0;
  gamePlaying = true;

  document.getElementById("player-0-score").textContent = "0";
  document.getElementById("player-1-score").textContent = "0";
  document.getElementById("current-score-0").textContent = "0";
  document.getElementById("current-score-1").textContent = "0";
  document.getElementById("player-0").textContent = "Player 1";
  document.getElementById("player-1").textContent = "Player 2";
  document.querySelector(".player-0-section").classList.remove("active");
  document.querySelector(".player-1-section").classList.remove("active");
  document.querySelector(".player-0-section").classList.remove("non-active");
  document.querySelector(".player-1-section").classList.remove("non-active");
  document.querySelector(".player-0-section").classList.add("active");
  document.querySelector(".player-1-section").classList.add("non-active");
  diceImg.src = "";
  diceImg.alt = "";
}

//upgrade round score
function upCurScr(dice) {
  if (dice == 1) {
    gamePlaying = false;
    setTimeout(function() {
      nextPlayer();
      gamePlaying = true;
    }, 700);
  } else if (previousRoll == 6 && dice == 6) {
    setTimeout(function() {
      scores[activePlayer] = 0;
      document.querySelector("#player-" + activePlayer + "-score").textContent =
        scores[activePlayer];
      document.querySelector("#current-score-" + activePlayer).textContent =
        "0";
    }, 200);
    gamePlaying = false;
    setTimeout(function() {
      nextPlayer();
      gamePlaying = true;
    }, 700);
  } else {
    previousRoll = dice;
    roundScore += dice;
    document.querySelector(
      "#current-score-" + activePlayer
    ).textContent = roundScore;
  }
}

function nextPlayer() {
  previousRoll = 0;
  document.querySelector("#current-score-" + activePlayer).textContent = "0";
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.querySelector(".player-0-section").classList.toggle("active");
  document.querySelector(".player-1-section").classList.toggle("active");
  document.querySelector(".player-0-section").classList.toggle("non-active");
  document.querySelector(".player-1-section").classList.toggle("non-active");
  diceImg.src = "";
  diceImg.alt = "";
}
